import { astraDb } from '@utils/database';
import logger from '@utils/logger';
import { Request, Response } from 'express';

export const getHealth = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const dbHealth = await astraDb.checkHealth();

    const health = {
      status: dbHealth.connected ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: dbHealth,
    };

    const statusCode = dbHealth.connected ? 200 : 503;

    res.status(statusCode).json(health);
  } catch (error) {
    logger.error({ error, msg: 'Health check failed' });
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getStatus = (_req: Request, res: Response): void => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '0.1.0',
    environment: process.env.NODE_ENV || 'development',
  });
};
