import pino from 'pino';

import config from '@config/index';

const logger = pino({
  level: config.logging.level,
  transport:
    config.node.env === 'development'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
          },
        }
      : undefined,
  formatters: {
    level: label => {
      return { level: label };
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

export default logger;
