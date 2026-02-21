## Context

The app is a static SPA (Vite + React + TypeScript) with no backend. The production build is a set of static files (`dist/`) that need to be served by a web server. The target environment is an existing Proxmox VE cluster on the home network, with a reverse proxy already in place to handle TLS and routing.

## Goals / Non-Goals

**Goals:**

- One-command deploy from a dev machine to a running service on Proxmox
- Reproducible builds via Docker — same image runs identically everywhere
- Minimal LXC footprint (no full VM overhead for a static site)
- Easy teardown and redeploy

**Non-Goals:**

- CI/CD pipeline or automated builds on push
- Multi-environment support (staging, production)
- TLS termination (handled by the existing reverse proxy)
- Container orchestration (no Kubernetes, Docker Swarm, etc.)
- Automatic DNS or reverse proxy configuration

## Decisions

### 1. Multi-stage Dockerfile: build + serve

**Choice**: A two-stage Dockerfile — first stage uses `node:lts-alpine` to run `npm ci && npm run build`, second stage copies `dist/` into `nginx:alpine` and serves it.

**Alternatives considered**:

- **Single-stage with Node serving static files**: Larger image, unnecessary Node runtime in production.
- **Build outside Docker, copy dist/ in**: Loses reproducibility — build depends on host Node version.

**Rationale**: Multi-stage keeps the final image tiny (~30 MB), ensures the build is reproducible, and Nginx is purpose-built for serving static files efficiently.

### 2. Nginx configuration: SPA-friendly static serving

**Choice**: Custom `nginx.conf` with:

- `try_files $uri $uri/ /index.html` for SPA client-side routing fallback
- Gzip compression for text assets
- Cache-control headers for hashed assets (long cache) vs `index.html` (no cache)
- Listen on port 80 inside the container

**Rationale**: Standard SPA serving pattern. Port 80 inside the container is mapped to a host port by Docker.

### 3. LXC setup: Debian-based container with Docker CE

**Choice**: A bash script that uses the Proxmox `pct` CLI to:

1. Create a privileged LXC container from a Debian template
2. Install Docker CE inside the LXC
3. Configure the container to start on boot

The script accepts parameters for container ID, hostname, storage, and network bridge with sensible defaults.

**Alternatives considered**:

- **Unprivileged LXC**: Docker inside unprivileged LXC requires extra kernel config and is fragile. Not worth it for a home lab.
- **Full VM**: Works but wastes resources for a static site. LXC is ~10x lighter.
- **Run Nginx directly in LXC (no Docker)**: Simpler but loses the reproducible image benefit. Harder to update — Docker lets you swap images atomically.

**Rationale**: Privileged LXC with Docker is the simplest reliable path for running containers on Proxmox. The setup script is idempotent — safe to re-run.

### 4. Deploy script: build, transfer, restart

**Choice**: A single `deploy.sh` script that:

1. Builds the Docker image locally
2. Saves it as a tarball (`docker save`)
3. Transfers the tarball to the LXC via `scp`
4. SSHs into the LXC, loads the image (`docker load`), stops the old container, starts a new one

The script takes the LXC host/IP as an argument.

**Alternatives considered**:

- **Push to a registry (Docker Hub, private registry)**: Adds infrastructure (registry) for a single-app home lab. Overkill.
- **Build on the LXC itself**: Requires Node.js toolchain on the LXC, defeats the purpose of Docker isolation.

**Rationale**: `docker save/load` over SSH is the simplest approach for a single-host deployment with no registry. The tarball is ~30 MB — transfers in seconds on a LAN.

### 5. File layout: `deploy/` directory

**Choice**:

```
deploy/
├── Dockerfile
├── nginx.conf
├── setup-lxc.sh
└── deploy.sh
```

**Rationale**: Keeps all deployment concerns isolated from application code. The Dockerfile references the repo root as its build context.

## Risks / Trade-offs

- **Privileged LXC security** → Acceptable for a home lab. The container only runs Nginx serving static files — minimal attack surface.
- **Manual reverse proxy config** → The user must point their existing reverse proxy at the LXC's IP:port. This is intentional (non-goal) since proxy setups vary widely.
- **No zero-downtime deploy** → The deploy script stops the old container before starting the new one. For a personal SPA with no persistent connections, a few seconds of downtime is fine.
- **Docker-in-LXC kernel compatibility** → Requires Proxmox host kernel features (overlay2, etc.). Standard on recent Proxmox versions (7+). If issues arise, the setup script will fail early with a clear error.
