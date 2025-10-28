import { astraDb } from '@utils/database';
import { Request, Response } from 'express';

import { getHealth, getStatus } from './healthController';

jest.mock('@utils/database', () => ({
  astraDb: {
    checkHealth: jest.fn(),
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

describe('Health Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({ json: mockJson });
    mockRequest = {};
    mockResponse = {
      json: mockJson,
      status: mockStatus,
    };
    jest.clearAllMocks();
  });

  describe('getHealth', () => {
    it('should return healthy status when database is connected', async () => {
      (astraDb.checkHealth as jest.Mock).mockResolvedValue({
        connected: true,
        keyspace: 'test_keyspace',
      });

      await getHealth(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'healthy',
          database: {
            connected: true,
            keyspace: 'test_keyspace',
          },
        })
      );
    });

    it('should return unhealthy status when database is disconnected', async () => {
      (astraDb.checkHealth as jest.Mock).mockResolvedValue({
        connected: false,
        error: 'Database not connected',
      });

      await getHealth(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(503);
      expect(mockJson).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'unhealthy',
        })
      );
    });

    it('should handle errors gracefully', async () => {
      (astraDb.checkHealth as jest.Mock).mockRejectedValue(
        new Error('Connection failed')
      );

      await getHealth(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(503);
      expect(mockJson).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'unhealthy',
          error: 'Connection failed',
        })
      );
    });
  });

  describe('getStatus', () => {
    it('should return status information', () => {
      getStatus(mockRequest as Request, mockResponse as Response);

      expect(mockJson).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'ok',
          version: expect.any(String),
          environment: expect.any(String),
        })
      );
    });

    it('should include timestamp in response', () => {
      getStatus(mockRequest as Request, mockResponse as Response);

      const response = mockJson.mock.calls[0][0];
      expect(response.timestamp).toBeDefined();
      expect(new Date(response.timestamp).toString()).not.toBe('Invalid Date');
    });
  });
});
