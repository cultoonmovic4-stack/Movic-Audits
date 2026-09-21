import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import apiClient, { ApiError } from './apiClient';

describe('apiClient', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('unwraps a standard successful API envelope', async () => {
    const mockEnvelope = {
      success: true,
      message: 'Resource retrieved.',
      data: { id: 1, title: 'Commercial Photography' },
      meta: { timestamp: '2026-09-21T00:00:00Z' },
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: {
        get: (header) => (header === 'content-type' ? 'application/json' : null),
      },
      json: async () => mockEnvelope,
    });

    const result = await apiClient.get('/api/v1/services/1');
    expect(result).toEqual(mockEnvelope);
    expect(result.success).toBe(true);
    expect(result.data.title).toBe('Commercial Photography');
  });

  it('parses 422 validation errors into structured ApiError', async () => {
    const errorEnvelope = {
      success: false,
      message: 'The given data was invalid.',
      data: null,
      errors: {
        email: ['The email field is required.'],
        password: ['The password field is required.'],
      },
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 422,
      headers: {
        get: (header) => (header === 'content-type' ? 'application/json' : null),
      },
      json: async () => errorEnvelope,
    });

    await expect(apiClient.post('/api/v1/auth/login', {})).rejects.toThrow(ApiError);

    try {
      await apiClient.post('/api/v1/auth/login', {});
    } catch (err) {
      expect(err.status).toBe(422);
      expect(err.message).toBe('The given data was invalid.');
      expect(err.errors.email).toEqual(['The email field is required.']);
    }
  });

  it('parses 401 unauthenticated responses into ApiError', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      headers: {
        get: (header) => (header === 'content-type' ? 'application/json' : null),
      },
      json: async () => ({
        success: false,
        message: 'Unauthenticated. Please log in to continue.',
      }),
    });

    try {
      await apiClient.get('/api/v1/admin/ping');
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError);
      expect(err.status).toBe(401);
      expect(err.message).toBe('Unauthenticated. Please log in to continue.');
    }
  });

  it('parses 404 not found errors', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      headers: {
        get: (header) => (header === 'content-type' ? 'application/json' : null),
      },
      json: async () => ({
        success: false,
        message: 'The requested resource was not found.',
      }),
    });

    try {
      await apiClient.get('/api/v1/services/non-existent');
    } catch (err) {
      expect(err.status).toBe(404);
      expect(err.message).toBe('The requested resource was not found.');
    }
  });

  it('handles network failure properly', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Failed to fetch'));

    try {
      await apiClient.get('/api/v1/ping');
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError);
      expect(err.status).toBe(0);
      expect(err.message).toContain('Network connection failure');
    }
  });
});
