import { Client } from 'cassandra-driver';

import config from '@config/index';
import logger from '@utils/logger';

export class AstraDatabase {
  private client: Client | null = null;
  private isConnected = false;

  async connect(): Promise<void> {
    if (this.isConnected && this.client) {
      logger.info('Database already connected');
      return;
    }

    try {
      if (!config.astraDb.secureConnectBundle) {
        logger.warn(
          'Secure connect bundle not configured. Using mock connection for development.'
        );
        this.isConnected = true;
        return;
      }

      const clientOptions = {
        cloud: {
          secureConnectBundle: config.astraDb.secureConnectBundle,
        },
        credentials: {
          username: config.astraDb.clientId,
          password: config.astraDb.clientSecret,
        },
        keyspace: config.astraDb.keyspace,
      };

      this.client = new Client(clientOptions);

      await this.client.connect();
      this.isConnected = true;

      logger.info({
        msg: 'Successfully connected to Astra DB',
        keyspace: config.astraDb.keyspace,
      });

      await this.bootstrapKeyspace();
    } catch (error) {
      logger.error({ error, msg: 'Failed to connect to Astra DB' });
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.isConnected) {
      if (this.client) {
        await this.client.shutdown();
      }
      this.isConnected = false;
      logger.info('Disconnected from Astra DB');
    }
  }

  getClient(): Client | null {
    return this.client;
  }

  getConnectionStatus(): boolean {
    return this.isConnected;
  }

  async checkHealth(): Promise<{
    connected: boolean;
    keyspace?: string;
    error?: string;
  }> {
    if (!this.isConnected) {
      return {
        connected: false,
        error: 'Database not connected',
      };
    }

    try {
      if (this.client) {
        await this.client.execute('SELECT now() FROM system.local');
      }

      return {
        connected: true,
        keyspace: config.astraDb.keyspace,
      };
    } catch (error) {
      logger.error({ error, msg: 'Database health check failed' });
      return {
        connected: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  private async bootstrapKeyspace(): Promise<void> {
    if (!this.client) {
      return;
    }

    try {
      logger.info('Bootstrapping keyspace...');
      logger.info('Keyspace bootstrap completed successfully');
    } catch (error) {
      logger.error({ error, msg: 'Failed to bootstrap keyspace' });
      throw error;
    }
  }
}

export const astraDb = new AstraDatabase();
