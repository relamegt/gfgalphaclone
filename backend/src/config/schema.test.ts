import { configSchema } from './schema';

describe('Config Schema Validation', () => {
  it('should validate a valid configuration', () => {
    const validConfig = {
      node: {
        env: 'development' as const,
      },
      server: {
        port: 3001,
        host: '0.0.0.0',
        apiPrefix: '/api',
      },
      astraDb: {
        id: 'test-db-id',
        region: 'us-east-1',
        keyspace: 'test_keyspace',
        clientId: 'test-client-id',
        clientSecret: 'test-secret',
      },
      cors: {
        origin: 'http://localhost:3000',
      },
      rateLimit: {
        windowMs: 900000,
        maxRequests: 100,
      },
      logging: {
        level: 'info' as const,
      },
    };

    const result = configSchema.safeParse(validConfig);
    expect(result.success).toBe(true);
  });

  it('should fail validation with missing required fields', () => {
    const invalidConfig = {
      node: {
        env: 'development',
      },
      server: {
        port: 3001,
      },
      astraDb: {
        id: '',
        region: '',
        keyspace: '',
        clientId: '',
        clientSecret: '',
      },
    };

    const result = configSchema.safeParse(invalidConfig);
    expect(result.success).toBe(false);
  });

  it('should apply default values', () => {
    const minimalConfig = {
      node: {
        env: 'development',
      },
      server: {
        port: 3001,
        host: '0.0.0.0',
        apiPrefix: '/api',
      },
      astraDb: {
        id: 'test-db-id',
        region: 'us-east-1',
        keyspace: 'test_keyspace',
        clientId: 'test-client-id',
        clientSecret: 'test-secret',
      },
      cors: {
        origin: 'http://localhost:3000',
      },
      rateLimit: {
        windowMs: 900000,
        maxRequests: 100,
      },
      logging: {
        level: 'info',
      },
    };

    const result = configSchema.parse(minimalConfig);
    expect(result.server.port).toBe(3001);
    expect(result.node.env).toBe('development');
  });

  it('should reject invalid environment values', () => {
    const invalidConfig = {
      node: {
        env: 'invalid',
      },
      server: {
        port: 3001,
        host: '0.0.0.0',
        apiPrefix: '/api',
      },
      astraDb: {
        id: 'test-db-id',
        region: 'us-east-1',
        keyspace: 'test_keyspace',
        clientId: 'test-client-id',
        clientSecret: 'test-secret',
      },
      cors: {
        origin: 'http://localhost:3000',
      },
      rateLimit: {
        windowMs: 900000,
        maxRequests: 100,
      },
      logging: {
        level: 'info',
      },
    };

    const result = configSchema.safeParse(invalidConfig);
    expect(result.success).toBe(false);
  });
});
