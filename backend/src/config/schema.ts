import { z } from 'zod';

export const configSchema = z.object({
  node: z.object({
    env: z.enum(['development', 'production', 'test']).default('development'),
  }),
  server: z.object({
    port: z.number().int().positive().default(3001),
    host: z.string().default('0.0.0.0'),
    apiPrefix: z.string().default('/api'),
  }),
  astraDb: z.object({
    id: z.string().min(1),
    region: z.string().min(1),
    keyspace: z.string().min(1),
    clientId: z.string().min(1),
    clientSecret: z.string().min(1),
    secureConnectBundle: z.string().optional(),
  }),
  cors: z.object({
    origin: z.string().transform(val => val.split(',')),
  }),
  rateLimit: z.object({
    windowMs: z.number().int().positive().default(900000),
    maxRequests: z.number().int().positive().default(100),
  }),
  logging: z.object({
    level: z
      .enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace'])
      .default('info'),
  }),
});

export type Config = z.infer<typeof configSchema>;
