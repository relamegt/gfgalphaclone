# Monorepo Project

A full-stack monorepo application with React frontend, Express backend, and shared services.

## 🚀 Project Vision

This monorepo is designed to provide a scalable, maintainable architecture for building modern web applications. It combines:

- **Frontend**: A React-based user interface
- **Backend**: An Express.js API server
- **Services**: Shared utilities including code execution judges and streaming helpers

The monorepo structure enables code sharing, consistent tooling, and streamlined development workflows across all packages.

## 🛠️ Tech Stack

### Frontend

- **React**: UI library for building interactive user interfaces
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and dev server

### Backend

- **Express.js**: Minimal and flexible Node.js web application framework
- **TypeScript**: Type-safe JavaScript
- **Node.js**: Runtime environment

### Services

- **Judge Service**: Code execution and evaluation
- **Streaming Helpers**: Real-time data streaming utilities

### Shared Tooling

- **pnpm**: Fast, disk space efficient package manager
- **ESLint**: Code linting and quality enforcement
- **Prettier**: Code formatting
- **Husky**: Git hooks for automation
- **Commitlint**: Conventional commit message enforcement
- **TypeScript**: Shared type definitions

## 📁 High-Level Architecture

```
monorepo-project/
├── frontend/          # React frontend application
├── backend/           # Express API server
├── services/          # Shared services (judge, streaming)
├── .husky/            # Git hooks configuration
├── package.json       # Root package with workspace configuration
├── pnpm-workspace.yaml # pnpm workspace definition
└── README.md          # This file
```

### Package Structure

Each package (`frontend`, `backend`, `services`) is independently configured with:

- Its own `package.json` for dependencies
- Dedicated scripts for development, building, and testing
- Ability to import shared code from sibling packages

## 🏁 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js**: >= 18.0.0 (Use nvm: `nvm use`)
- **pnpm**: >= 8.0.0 (`npm install -g pnpm`)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd monorepo-project
   ```

2. Install dependencies for all packages:

   ```bash
   pnpm install
   ```

   This single command installs dependencies across all workspace packages.

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your specific configuration values.

### Development

#### Run all services in development mode:

```bash
pnpm dev
```

This starts both frontend and backend in parallel.

#### Run specific packages:

```bash
# Frontend only
pnpm --filter @monorepo/frontend dev

# Backend only
pnpm --filter @monorepo/backend dev

# Services only
pnpm --filter @monorepo/services dev
```

### Building

Build all packages for production:

```bash
pnpm build
```

### Testing

Run tests across all packages:

```bash
pnpm test
```

### Code Quality

#### Linting

```bash
# Check for linting issues
pnpm lint

# Auto-fix linting issues
pnpm lint:fix
```

#### Formatting

```bash
# Check formatting
pnpm format:check

# Auto-format code
pnpm format
```

#### Type Checking

```bash
pnpm typecheck
```

## 🌍 Environment Variables

Environment variables are configured per package. See `.env.example` for a complete list of available variables.

### Backend

- `NODE_ENV`: Environment (development, production)
- `PORT`: Server port (default: 3001)
- `API_URL`: Backend API URL

### Frontend

- `VITE_API_URL`: Backend API URL for frontend requests

### Services

- `JUDGE_SERVICE_URL`: URL for code execution judge service
- `CODE_EXECUTION_TIMEOUT`: Timeout for code execution (ms)

**Important**: Never commit `.env` files to version control. Use `.env.example` as a template.

## 🤝 Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our development process, coding standards, and how to submit pull requests.

## 📋 Available Scripts

From the root directory:

| Script              | Description                            |
| ------------------- | -------------------------------------- |
| `pnpm dev`          | Start all services in development mode |
| `pnpm build`        | Build all packages for production      |
| `pnpm test`         | Run tests across all packages          |
| `pnpm lint`         | Lint all code                          |
| `pnpm lint:fix`     | Auto-fix linting issues                |
| `pnpm format`       | Format all code with Prettier          |
| `pnpm format:check` | Check code formatting                  |
| `pnpm typecheck`    | Type-check all TypeScript code         |

## 🔧 Git Hooks

This project uses Husky for Git hooks:

- **pre-commit**: Runs lint-staged to lint and format staged files
- **commit-msg**: Validates commit messages follow conventional commits

## 📝 Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

Example:

```bash
git commit -m "feat(backend): add user authentication endpoint"
```

## 📜 License

[Specify your license here]

## 👥 Team

[Add team members or maintainers here]
