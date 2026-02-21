## Why

The app works locally but has no path to run on the home network. Adding a simple, repeatable deployment to the existing Proxmox cluster makes it accessible from any device on the LAN (and beyond, via the existing reverse proxy) without manual steps beyond running a script.

## What Changes

- Add a Dockerfile that builds the Vite production bundle and serves it with Nginx
- Add an Nginx config tuned for a static SPA (gzip, cache headers, fallback to `index.html`)
- Add a Proxmox LXC helper script that creates a lightweight container, installs Docker, pulls/runs the image, and exposes the service on a predictable port
- Add a one-command deploy script that builds the image, transfers it to the Proxmox host, and restarts the container

## Capabilities

### New Capabilities

- `container-deploy`: Dockerfile, Nginx config, and deployment scripts for building and running the app in a Docker-based Proxmox LXC container

### Modified Capabilities

_(none — no app behavior changes)_

## Impact

- **Code**: No application code changes. All new files are in a `deploy/` directory at the repo root
- **Dependencies**: Docker (inside the LXC), Nginx (inside the Docker image). No new npm dependencies
- **Infrastructure**: One new LXC container on the existing Proxmox cluster; one port allocation for the existing reverse proxy to target
- **Rollback plan**: Destroy the LXC container (`pct destroy <id>`). No app code is affected
- **Affected teams**: Solo project — no downstream consumers
