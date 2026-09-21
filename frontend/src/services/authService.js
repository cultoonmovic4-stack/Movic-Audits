/**
 * Movic Audits — Authentication Service
 * Communicates with Laravel Sanctum SPA endpoints.
 */

import apiClient from './apiClient';

export const authService = {
  /**
   * Request CSRF cookie before authentication attempts
   */
  async getCsrfCookie() {
    return apiClient.get('/sanctum/csrf-cookie');
  },

  /**
   * Log in user using credentials
   */
  async login(credentials) {
    // Ensure fresh CSRF cookie before posting login
    await this.getCsrfCookie();
    return apiClient.post('/api/v1/auth/login', credentials);
  },

  /**
   * Retrieve current authenticated user profile
   */
  async getMe() {
    return apiClient.get('/api/v1/auth/me');
  },

  /**
   * Log out currently authenticated session
   */
  async logout() {
    return apiClient.post('/api/v1/auth/logout');
  },

  /**
   * Health ping for public API
   */
  async ping() {
    return apiClient.get('/api/v1/ping');
  },

  /**
   * Verify administrative access
   */
  async adminPing() {
    return apiClient.get('/api/v1/admin/ping');
  },
};

export default authService;
