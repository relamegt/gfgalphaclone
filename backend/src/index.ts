import config from '@config/index';
import { astraDb } from '@utils/database';
import logger from '@utils/logger';

import app from './app';

const server = app.listen(config.server.port, config.server.host, async () => {
  logger.info({
    msg: 'Server started',
    port: config.server.port,
    host: config.server.host,
    env: config.node.env,
  });

  try {
    await astraDb.connect();
    logger.info('Application initialized successfully');
  } catch (error) {
    logger.error({ error, msg: 'Failed to initialize application' });
  }
});

const gracefulShutdown = async (signal: string) => {
  logger.info({ msg: 'Shutdown signal received', signal });

  server.close(async () => {
    logger.info('HTTP server closed');

    try {
      await astraDb.disconnect();
      logger.info('Database connection closed');
      process.exit(0);
    } catch (error) {
      logger.error({ error, msg: 'Error during shutdown' });
      process.exit(1);
    }
  });

  setTimeout(() => {
    logger.error('Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('unhandledRejection', (reason, promise) => {
  logger.error({
    msg: 'Unhandled Rejection',
    reason,
    promise,
  });
});

process.on('uncaughtException', error => {
  logger.error({
    msg: 'Uncaught Exception',
    error: error.message,
    stack: error.stack,
  });
  process.exit(1);
});

export default server;
