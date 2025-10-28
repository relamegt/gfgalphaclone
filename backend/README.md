# Backend Package

Production-ready Express + TypeScript backend with Astra DB connectivity.

## Features

- **Express.js** - Fast, unopinionated web framework
- **TypeScript** - Type-safe development
- **Astra DB** - DataStax Cassandra driver integration
- **Security** - Helmet, CORS, rate limiting
- **Logging** - Pino for high-performance logging
- **Configuration** - Environment-based config with validation (Zod)
- **API Documentation** - OpenAPI/Swagger docs
- **Testing** - Jest with comprehensive test coverage
- **Layered Architecture** - Routes → Controllers → Services → Repositories

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Astra DB account and database

### Installation

```bash
pnpm install
```

### Configuration

1. Copy the example environment file:

```bash
cp .env.example .env.development
```

2. Update the `.env.development` file with your Astra DB credentials:

```env
ASTRA_DB_ID=your-database-id
ASTRA_DB_REGION=your-region
ASTRA_DB_KEYSPACE=your_keyspace
ASTRA_DB_CLIENT_ID=your-client-id
ASTRA_DB_CLIENT_SECRET=your-client-secret
ASTRA_DB_SECURE_CONNECT_BUNDLE=./secure-connect-bundle.zip
```

3. Download your Astra DB secure connect bundle and place it in the backend directory.

### Development

Start the development server with hot reload:

```bash
pnpm dev
```

The server will start on `http://localhost:3001` by default.

### Building

Build the TypeScript code for production:

```bash
pnpm build
```

Output will be in the `dist/` directory.

### Testing

Run all tests:

```bash
pnpm test
```

Run tests in watch mode:

```bash
pnpm test:watch
```

Generate coverage report:

```bash
pnpm test:coverage
```

### Type Checking

Run TypeScript type checking:

```bash
pnpm typecheck
```

### Linting

Run ESLint:

```bash
pnpm lint
```

Auto-fix linting issues:

```bash
pnpm lint:fix
```

## Architecture

### Directory Structure

```
backend/
├── src/
│   ├── config/          # Configuration and environment management
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Express middleware
│   ├── repositories/    # Data access layer
│   ├── routes/          # API route definitions
│   ├── services/        # Business logic layer
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions and helpers
│   ├── tests/           # Test setup and utilities
│   ├── app.ts           # Express app configuration
│   └── index.ts         # Application entry point
├── dist/                # Compiled JavaScript (gitignored)
└── package.json
```

### Layered Architecture

1. **Routes** - Define API endpoints and map to controllers
2. **Controllers** - Handle HTTP requests/responses
3. **Services** - Contain business logic
4. **Repositories** - Handle database operations

## API Endpoints

### System Endpoints

- `GET /api/health` - Health check with database status
- `GET /api/status` - Basic API status

### API Documentation

Swagger UI is available in development mode at:

```
http://localhost:3001/api-docs
```

## Environment Variables

| Variable                         | Description                               | Default                 |
| -------------------------------- | ----------------------------------------- | ----------------------- |
| `NODE_ENV`                       | Environment (development/production/test) | `development`           |
| `PORT`                           | Server port                               | `3001`                  |
| `HOST`                           | Server host                               | `0.0.0.0`               |
| `ASTRA_DB_ID`                    | Astra database ID                         | -                       |
| `ASTRA_DB_REGION`                | Astra database region                     | -                       |
| `ASTRA_DB_KEYSPACE`              | Keyspace name                             | -                       |
| `ASTRA_DB_CLIENT_ID`             | Client ID for authentication              | -                       |
| `ASTRA_DB_CLIENT_SECRET`         | Client secret for authentication          | -                       |
| `ASTRA_DB_SECURE_CONNECT_BUNDLE` | Path to secure connect bundle             | -                       |
| `API_PREFIX`                     | API route prefix                          | `/api`                  |
| `CORS_ORIGIN`                    | Allowed CORS origins (comma-separated)    | `http://localhost:3000` |
| `RATE_LIMIT_WINDOW_MS`           | Rate limit window in milliseconds         | `900000`                |
| `RATE_LIMIT_MAX_REQUESTS`        | Max requests per window                   | `100`                   |
| `LOG_LEVEL`                      | Logging level                             | `info`                  |

## Security Features

- **Helmet** - Sets security-related HTTP headers
- **CORS** - Configurable cross-origin resource sharing
- **Rate Limiting** - Prevents abuse and DDoS attacks
- **Input Validation** - Request validation using Zod schemas

## Logging

The application uses Pino for high-performance logging:

- Structured JSON logging
- Pretty printing in development
- Request/response logging with pino-http
- Automatic log levels based on HTTP status codes

## Database

### Astra DB Integration

The application uses DataStax Cassandra driver to connect to Astra DB:

```typescript
import { astraDb } from '@utils/database';

// Get client instance
const client = astraDb.getClient();

// Check connection status
const isConnected = astraDb.getConnectionStatus();

// Health check
const health = await astraDb.checkHealth();
```

### Migrations

Database migrations and keyspace bootstrapping are handled in the `bootstrapKeyspace()` method in `src/utils/database.ts`.

## Development Workflow

1. Create a new branch for your feature
2. Implement your changes following the layered architecture
3. Add unit tests for new code
4. Run tests and type checking: `pnpm test && pnpm typecheck`
5. Lint your code: `pnpm lint:fix`
6. Commit your changes with conventional commit messages
7. Push and create a pull request

## Testing

The project uses Jest with ts-jest for testing:

- Unit tests for utilities, config, and controllers
- Integration tests for API endpoints
- Mocked database connections for testing
- Coverage reports generated in `coverage/` directory

## Production Deployment

1. Build the application:

   ```bash
   pnpm build
   ```

2. Set production environment variables

3. Start the server:
   ```bash
   NODE_ENV=production pnpm start
   ```

## Troubleshooting

### Database Connection Issues

- Verify your Astra DB credentials
- Ensure the secure connect bundle is in the correct location
- Check firewall rules and network connectivity
- Review logs for specific error messages

### Port Already in Use

Change the `PORT` environment variable to use a different port:

```bash
PORT=3002 pnpm dev
```

## Contributing

Please read the [CONTRIBUTING.md](../CONTRIBUTING.md) in the root directory for contribution guidelines.

## License

This project is private and proprietary.
