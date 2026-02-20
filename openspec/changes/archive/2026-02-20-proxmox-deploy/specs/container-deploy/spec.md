## ADDED Requirements

### Requirement: Build a production Docker image
The system SHALL provide a Dockerfile that produces a container image serving the Vite production build via Nginx. The image SHALL use a multi-stage build: the first stage builds the app, the second stage copies the output into an Nginx image. The final image SHALL listen on port 80.

#### Scenario: Successful image build
- **GIVEN** the repository is cloned and Docker is installed
- **WHEN** the user runs `docker build -f deploy/Dockerfile .` from the repo root
- **THEN** Docker SHALL produce a tagged image that serves the app on port 80

#### Scenario: Image serves the SPA correctly
- **GIVEN** a built Docker image is running
- **WHEN** a browser requests any path (e.g., `/`, `/foo/bar`)
- **THEN** Nginx SHALL respond with `index.html` so client-side routing works

### Requirement: Nginx configuration for static SPA serving
The system SHALL include an Nginx config at `deploy/nginx.conf` that enables gzip compression for text-based assets, sets long-lived cache headers for hashed assets (`/assets/*`), disables caching for `index.html`, and falls back to `index.html` for unknown routes.

#### Scenario: Hashed assets are cached
- **GIVEN** the app is running in the Docker container
- **WHEN** a browser requests a file matching `/assets/*`
- **THEN** the response SHALL include a `Cache-Control` header with a max-age of at least 30 days

#### Scenario: index.html is not cached
- **GIVEN** the app is running in the Docker container
- **WHEN** a browser requests `/` or `/index.html`
- **THEN** the response SHALL include a `Cache-Control` header that prevents caching (e.g., `no-cache`)

#### Scenario: Gzip compression is enabled
- **GIVEN** the app is running in the Docker container
- **WHEN** a browser requests a text-based asset with `Accept-Encoding: gzip`
- **THEN** the response SHALL be gzip-compressed

### Requirement: LXC setup script
The system SHALL provide a script at `deploy/setup-lxc.sh` that creates a Proxmox LXC container with Docker CE installed. The script SHALL accept configurable parameters for container ID, hostname, storage, memory, and network bridge, with sensible defaults. The script SHALL be idempotent — running it again on an existing container SHALL not fail or duplicate resources.

#### Scenario: Create a new LXC container
- **GIVEN** the user has SSH access to a Proxmox host
- **WHEN** the user runs `deploy/setup-lxc.sh` with a container ID that does not exist
- **THEN** the script SHALL create an LXC container with Docker installed and running

#### Scenario: Re-run on existing container
- **GIVEN** an LXC container with the specified ID already exists
- **WHEN** the user runs `deploy/setup-lxc.sh` with that container ID
- **THEN** the script SHALL skip creation and report that the container already exists

#### Scenario: Configurable parameters
- **GIVEN** the user wants non-default settings
- **WHEN** the user passes flags for container ID, hostname, storage, memory, or bridge
- **THEN** the script SHALL use those values instead of defaults

### Requirement: One-command deploy script
The system SHALL provide a script at `deploy/deploy.sh` that builds the Docker image locally, transfers it to the target LXC container, and starts the service. The script SHALL accept the target host (IP or hostname) as a required argument and a port mapping as an optional argument (default: `8080:80`).

#### Scenario: Full deploy from dev machine
- **GIVEN** the LXC container is set up and reachable via SSH
- **WHEN** the user runs `deploy/deploy.sh <host>`
- **THEN** the script SHALL build the image, transfer it via SSH, stop any existing container for this app, and start a new one

#### Scenario: Custom port mapping
- **GIVEN** the user wants the app on a port other than 8080
- **WHEN** the user runs `deploy/deploy.sh <host> --port 3000`
- **THEN** the Docker container SHALL be started with port 3000 mapped to container port 80

#### Scenario: Deploy is re-runnable
- **GIVEN** the app is already running on the target
- **WHEN** the user runs `deploy/deploy.sh <host>` again
- **THEN** the script SHALL replace the running container with the new image without leaving orphaned containers
