#!/usr/bin/env bash
set -euo pipefail

IMAGE_NAME="5oclocksomewhere"
IMAGE_TAG="latest"
CONTAINER_NAME="5oclocksomewhere"
TARBALL="/tmp/${IMAGE_NAME}.tar"
PORT=8080

usage() {
    cat <<EOF
Usage: $(basename "$0") <host> [OPTIONS]

Build the Docker image, transfer it to the target host, and start the container.

Arguments:
  host              Target host (IP or hostname) reachable via SSH

Options:
  --port PORT       Host port to map to container port 80 (default: $PORT)
  --help            Show this help message
EOF
    exit 0
}

if [[ $# -eq 0 ]]; then
    echo "Error: target host is required."
    usage
fi

HOST=""
while [[ $# -gt 0 ]]; do
    case "$1" in
        --port)  PORT="$2"; shift 2 ;;
        --help)  usage ;;
        -*)      echo "Unknown option: $1"; usage ;;
        *)       HOST="$1"; shift ;;
    esac
done

if [[ -z "$HOST" ]]; then
    echo "Error: target host is required."
    usage
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "Building image ${IMAGE_NAME}:${IMAGE_TAG} for linux/amd64..."
docker build --platform linux/amd64 -f "$SCRIPT_DIR/Dockerfile" -t "${IMAGE_NAME}:${IMAGE_TAG}" "$REPO_ROOT"

echo "Saving image to tarball..."
docker save "${IMAGE_NAME}:${IMAGE_TAG}" -o "$TARBALL"

echo "Transferring image to $HOST..."
scp "$TARBALL" "$HOST:/tmp/${IMAGE_NAME}.tar"

echo "Loading image and restarting container on $HOST..."
ssh "$HOST" bash -s <<REMOTE
set -euo pipefail
docker load -i /tmp/${IMAGE_NAME}.tar
rm -f /tmp/${IMAGE_NAME}.tar
docker stop $CONTAINER_NAME 2>/dev/null || true
docker rm $CONTAINER_NAME 2>/dev/null || true
docker run -d --name $CONTAINER_NAME --restart unless-stopped -p ${PORT}:80 ${IMAGE_NAME}:${IMAGE_TAG}
echo "Container running on port ${PORT}"
REMOTE

echo "Cleaning up local tarball..."
rm -f "$TARBALL"

echo "Deploy complete — app is running at http://${HOST}:${PORT}"
