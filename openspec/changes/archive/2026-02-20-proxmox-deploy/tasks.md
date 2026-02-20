## 1. Docker Image

- [x] 1.1 Create `deploy/Dockerfile` with multi-stage build (Node build stage → Nginx serve stage)
- [x] 1.2 Create `deploy/nginx.conf` with gzip, SPA fallback (`try_files`), cache headers for hashed assets, no-cache for `index.html`
- [x] 1.3 Verify image builds successfully with `docker build -f deploy/Dockerfile .`
- [x] 1.4 Verify the running container serves the app and returns `index.html` for unknown routes

## 2. LXC Setup Script

- [x] 2.1 Create `deploy/setup-lxc.sh` that creates a privileged Debian LXC via `pct create`
- [x] 2.2 Add Docker CE installation inside the LXC (apt repo setup, install, enable service)
- [x] 2.3 Add CLI flags for container ID, hostname, storage, memory, and network bridge with defaults
- [x] 2.4 Add idempotency check — skip creation if container ID already exists
- [x] 2.5 Mark script executable and add usage help (`--help`)

## 3. Deploy Script

- [x] 3.1 Create `deploy/deploy.sh` that accepts target host as required argument and `--port` as optional (default `8080`)
- [x] 3.2 Add step: build Docker image locally with a fixed tag (`5oclocksomewhere:latest`)
- [x] 3.3 Add step: `docker save` image to tarball, `scp` to target host
- [x] 3.4 Add step: SSH into target, `docker load` image, stop/remove old container, start new one with port mapping
- [x] 3.5 Add cleanup: remove local tarball after transfer
- [x] 3.6 Mark script executable and add usage help (`--help`)
