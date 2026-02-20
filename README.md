# It's 5 O'Clock Somewhere

A real-time web application that displays every city in the world where it's currently 5:00 PM (happy hour). Built as a test project for **spec-driven development** — exploring how structured specifications and AI-assisted workflows can guide the full lifecycle of a software project from design through deployment.

## About This Project

This project serves as a proving ground for spec-driven development practices. The goal is to evaluate how well a specification-first approach works when combined with AI tooling to plan, implement, test, and deploy a complete application. The app itself is intentionally simple so the focus stays on the development methodology rather than domain complexity.

## How It Works

- Uses the browser's native `Intl` API to enumerate all supported timezones
- Filters for timezones where the local time is exactly 5 PM (17:00)
- Displays matching cities in a responsive grid with search filtering
- Auto-refreshes every 60 seconds as the happy hour window moves across the globe

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI | React 19, TypeScript |
| Build | Vite |
| Unit Tests | Vitest |
| E2E Tests | Playwright |
| Server | Nginx (Alpine) |
| Container | Docker (multi-stage build) |
| Infrastructure | Proxmox LXC |

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run unit tests
npm run test

# Run E2E tests
npm run test:e2e

# Lint and format
npm run lint
npm run format

# Production build
npm run build
```

## Deployment

The `deploy/` directory contains everything needed to containerize and ship the app.

### Docker Build

The multi-stage Dockerfile builds the Vite app with Node.js, then serves the static output via Nginx on port 80.

### SSH Deploy

```bash
./deploy/deploy.sh <host> [port]
```

Builds the Docker image for `linux/amd64`, transfers it to the remote host via SCP, and starts the container. Defaults to port 8080.

### Proxmox LXC Setup

```bash
./deploy/setup-lxc.sh
```

Provisions a Debian 12 LXC container on Proxmox with Docker pre-installed. Configurable via variables at the top of the script (container ID, hostname, memory, network bridge).

## Project Structure

```
.
├── src/
│   ├── App.tsx              # Main application component
│   ├── components/
│   │   ├── Header.tsx       # Title and theme toggle
│   │   ├── SearchBar.tsx    # City search input
│   │   ├── CityList.tsx     # City grid container
│   │   ├── CityCard.tsx     # Individual city card
│   │   └── ThemeToggle.tsx  # Dark/light mode switch
│   └── utils/
│       ├── timezone.ts      # Happy hour detection logic
│       └── timezone.test.ts # Unit tests
├── e2e/                     # Playwright E2E tests
├── deploy/
│   ├── Dockerfile           # Multi-stage Docker build
│   ├── nginx.conf           # SPA-aware Nginx config
│   ├── deploy.sh            # SSH deployment script
│   └── setup-lxc.sh        # Proxmox LXC provisioning
├── package.json
├── vite.config.ts
└── playwright.config.ts
```

## Features

- **Real-time updates** — city list refreshes every 60 seconds
- **Search** — filter cities by name
- **Dark/light theme** — persisted in localStorage
- **Responsive layout** — CSS Grid with auto-fill columns
- **SPA routing** — Nginx configured with index.html fallback
- **Aggressive caching** — hashed assets cached 30 days, index.html always fresh
