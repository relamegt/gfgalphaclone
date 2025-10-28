import { AstraDatabase } from './database';

jest.mock('cassandra-driver', () => ({
  Client: jest.fn().mockImplementation(() => ({
    connect: jest.fn().mockResolvedValue(undefined),
    shutdown: jest.fn().mockResolvedValue(undefined),
    execute: jest.fn().mockResolvedValue({ rows: [] }),
  })),
}));

jest.mock('@config/index', () => ({
  __esModule: true,
  default: {
    astraDb: {
      id: 'test-db-id',
      region: 'test-region',
      keyspace: 'test_keyspace',
      clientId: 'test-client-id',
      clientSecret: 'test-secret',
      secureConnectBundle: undefined,
    },
  },
}));

jest.mock('@utils/logger', () => ({
  __esModule: true,
  default: {
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
  },
}));

describe('AstraDatabase', () => {
  describe('connect', () => {
    it('should handle connection without secure bundle', async () => {
      const db = new AstraDatabase();
      await db.connect();

      expect(db.getConnectionStatus()).toBe(true);
    });

    it('should not reconnect if already connected', async () => {
      const db = new AstraDatabase();
      await db.connect();
      await db.connect();

      expect(db.getConnectionStatus()).toBe(true);
    });
  });

  describe('checkHealth', () => {
    it('should return connected status when database is connected', async () => {
      const db = new AstraDatabase();
      await db.connect();

      const health = await db.checkHealth();

      expect(health.connected).toBe(true);
      expect(health.keyspace).toBe('test_keyspace');
    });

    it('should return disconnected status when database is not connected', async () => {
      const db = new AstraDatabase();

      const health = await db.checkHealth();

      expect(health.connected).toBe(false);
      expect(health.error).toBeDefined();
    });
  });

  describe('disconnect', () => {
    it('should disconnect from database', async () => {
      const db = new AstraDatabase();
      await db.connect();
      await db.disconnect();

      expect(db.getConnectionStatus()).toBe(false);
    });
  });

  describe('getClient', () => {
    it('should return the client instance when not connected', () => {
      const db = new AstraDatabase();
      const client = db.getClient();

      expect(client).toBeNull();
    });

    it('should return the client instance when connected', async () => {
      const db = new AstraDatabase();
      await db.connect();

      const client = db.getClient();

      expect(client).toBeDefined();
    });
  });
});
