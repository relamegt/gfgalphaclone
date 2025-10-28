beforeAll(() => {
  process.env.NODE_ENV = 'test';
  process.env.PORT = '3002';
  process.env.ASTRA_DB_ID = 'test-db-id';
  process.env.ASTRA_DB_REGION = 'test-region';
  process.env.ASTRA_DB_KEYSPACE = 'test_keyspace';
  process.env.ASTRA_DB_CLIENT_ID = 'test-client-id';
  process.env.ASTRA_DB_CLIENT_SECRET = 'test-client-secret';
  process.env.LOG_LEVEL = 'silent';
});

afterAll(() => {
  jest.clearAllMocks();
});
