import path from 'path';

import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import config from '@config/index';
import { errorHandler, notFoundHandler } from '@middleware/errorHandler';
import { rateLimiter } from '@middleware/rateLimiter';
import { requestLogger } from '@middleware/requestLogger';
import routes from '@routes/index';
import express, { Application } from 'express';

const app: Application = express();

app.use(helmet());

app.use(
  cors({
    origin: config.cors.origin,
    credentials: true,
  })
);

app.use(compression());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(requestLogger);

app.use(rateLimiter);

if (config.node.env === 'development') {
  const swaggerDocument = YAML.load(
    path.join(__dirname, 'config', 'swagger.yaml')
  );
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.use(config.server.apiPrefix, routes);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
