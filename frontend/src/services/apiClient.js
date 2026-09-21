/**
 * Movic Audits — Centralized API Client
 *
 * Implements authoritative handling for Laravel REST API envelope:
 * { success: boolean, message: string, data: any, meta?: object, errors?: object }
 *
 * Handles Sanctum SPA session authentication via secure HTTP-only cookies
 * and CSRF token propagation.
 */

export class ApiError extends Error {
  constructor(message, status, errors = {}, data = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
    this.data = data;
  }
}

/**
 * Extract XSRF-TOKEN cookie for Laravel CSRF protection
 */
function getXsrfToken() {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^|;\\s*)XSRF-TOKEN=([^;]*)'));
  return match ? decodeURIComponent(match[2]) : null;
}

const BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');

async function request(endpoint, options = {}) {
  const url = endpoint.startsWith('http')
    ? endpoint
    : `${BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  const headers = {
    Accept: 'application/json',
    ...(options.headers || {}),
  };

  // Attach X-XSRF-TOKEN header for state-changing requests if present
  const method = (options.method || 'GET').toUpperCase();
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    const xsrfToken = getXsrfToken();
    if (xsrfToken) {
      headers['X-XSRF-TOKEN'] = xsrfToken;
    }
  }

  // Auto-set Content-Type for JSON payloads unless FormData is used
  if (options.body && !(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
    if (typeof options.body === 'object') {
      options.body = JSON.stringify(options.body);
    }
  }

  const config = {
    ...options,
    method,
    headers,
    credentials: 'include', // Authoritative: Always include HTTP-only cookies
  };

  let response;
  try {
    response = await fetch(url, config);
  } catch (networkError) {
    throw new ApiError(
      'Network connection failure. Please verify server connectivity.',
      0,
      {},
      networkError
    );
  }

  // Attempt to parse JSON response
  let payload = null;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }
  }

  if (!response.ok) {
    const status = response.status;
    const message =
      payload?.message ||
      (status === 401
        ? 'Unauthenticated. Please log in to continue.'
        : status === 403
        ? 'Access forbidden. You do not have permission to perform this action.'
        : status === 404
        ? 'The requested resource was not found.'
        : status === 422
        ? 'The provided data was invalid.'
        : status === 429
        ? 'Too many requests. Please slow down and try again.'
        : 'An unexpected server error occurred.');

    const errors = payload?.errors || {};
    throw new ApiError(message, status, errors, payload?.data || null);
  }

  // Standard API Envelope success handling
  return payload;
}

export const apiClient = {
  get: (endpoint, options = {}) => request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, data, options = {}) =>
    request(endpoint, { ...options, method: 'POST', body: data }),
  put: (endpoint, data, options = {}) =>
    request(endpoint, { ...options, method: 'PUT', body: data }),
  patch: (endpoint, data, options = {}) =>
    request(endpoint, { ...options, method: 'PATCH', body: data }),
  delete: (endpoint, options = {}) => request(endpoint, { ...options, method: 'DELETE' }),
};

export default apiClient;
