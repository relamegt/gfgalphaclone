import path from 'path';

import dotenvFlow from 'dotenv-flow';

import { configSchema, Config } from './schema';

dotenvFlow.config({
  path: path.resolve(__dirname, '../../'),
  silent: false,
});

const rawConfig = {
  node: {
    env: process.env.NODE_ENV || 'development',
  },
  server: {
    port: parseInt(process.env.PORT || '3001', 10),
    host: process.env.HOST || '0.0.0.0',
    apiPrefix: process.env.API_PREFIX || '/api',
  },
  astraDb: {
    id: process.env.ASTRA_DB_ID || '',
    region: process.env.ASTRA_DB_REGION || '',
    keyspace: process.env.ASTRA_DB_KEYSPACE || '',
    clientId: process.env.ASTRA_DB_CLIENT_ID || '',
    clientSecret: process.env.ASTRA_DB_CLIENT_SECRET || '',
    secureConnectBundle: process.env.ASTRA_DB_SECURE_CONNECT_BUNDLE,
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  },
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
  },
};

let config: Config;

try {
  config = configSchema.parse(rawConfig);
} catch (error) {
  console.error('Configuration validation failed:', error);
  throw new Error('Invalid configuration');
}

export default config;
