#!/usr/bin/env bash
set -euo pipefail

# Defaults
CTID=200
HOSTNAME="5oclocksomewhere"
STORAGE="local-lvm"
MEMORY=512
BRIDGE="vmbr0"
TEMPLATE="local:vztmpl/debian-12-standard_12.7-1_amd64.tar.zst"

usage() {
    cat <<EOF
Usage: $(basename "$0") [OPTIONS]

Create a privileged Debian LXC container on Proxmox with Docker CE installed.
Must be run on the Proxmox host.

Options:
  --ctid ID         Container ID (default: $CTID)
  --hostname NAME   Container hostname (default: $HOSTNAME)
  --storage STORE   Proxmox storage for rootfs (default: $STORAGE)
  --memory MB       Memory limit in MB (default: $MEMORY)
  --bridge BRIDGE   Network bridge (default: $BRIDGE)
  --template PATH   Container template (default: $TEMPLATE)
  --help            Show this help message
EOF
    exit 0
}

while [[ $# -gt 0 ]]; do
    case "$1" in
        --ctid)     CTID="$2"; shift 2 ;;
        --hostname) HOSTNAME="$2"; shift 2 ;;
        --storage)  STORAGE="$2"; shift 2 ;;
        --memory)   MEMORY="$2"; shift 2 ;;
        --bridge)   BRIDGE="$2"; shift 2 ;;
        --template) TEMPLATE="$2"; shift 2 ;;
        --help)     usage ;;
        *)          echo "Unknown option: $1"; usage ;;
    esac
done

# Idempotency check
if pct status "$CTID" &>/dev/null; then
    echo "Container $CTID already exists — skipping creation."
    exit 0
fi

echo "Creating LXC container $CTID ($HOSTNAME)..."
pct create "$CTID" "$TEMPLATE" \
    --hostname "$HOSTNAME" \
    --storage "$STORAGE" \
    --rootfs "$STORAGE:8" \
    --memory "$MEMORY" \
    --swap 256 \
    --net0 "name=eth0,bridge=$BRIDGE,ip=dhcp" \
    --features nesting=1,keyctl=1 \
    --unprivileged 0 \
    --onboot 1

echo "Starting container..."
pct start "$CTID"

echo "Waiting for container to boot..."
sleep 5

echo "Installing Docker CE..."
pct exec "$CTID" -- bash -c '
    apt-get update
    apt-get install -y ca-certificates curl gnupg

    install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    chmod a+r /etc/apt/keyrings/docker.gpg

    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
        > /etc/apt/sources.list.d/docker.list

    apt-get update
    apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

    systemctl enable docker
    systemctl start docker
'

echo "Container $CTID is ready with Docker installed."
