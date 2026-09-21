/**
 * Movic Audits — Public API Service
 * Handles data retrieval and submissions for public-facing website views.
 */

import apiClient from './apiClient';

export const publicService = {
  /**
   * Retrieve published services list
   */
  async getServices() {
    return apiClient.get('/api/v1/services');
  },

  /**
   * Retrieve single published service by slug
   */
  async getService(slug) {
    return apiClient.get(`/api/v1/services/${slug}`);
  },

  /**
   * Retrieve published portfolio albums
   */
  async getPortfolio(params = {}) {
    const query = new URLSearchParams(params).toString();
    const endpoint = query ? `/api/v1/portfolio?${query}` : '/api/v1/portfolio';
    return apiClient.get(endpoint);
  },

  /**
   * Retrieve single portfolio album detail by slug
   */
  async getPortfolioAlbum(slug) {
    return apiClient.get(`/api/v1/portfolio/${slug}`);
  },

  /**
   * Retrieve published blog articles
   */
  async getBlogPosts() {
    return apiClient.get('/api/v1/blog');
  },

  /**
   * Retrieve single published blog post by slug
   */
  async getBlogPost(slug) {
    return apiClient.get(`/api/v1/blog/${slug}`);
  },

  /**
   * Retrieve published testimonials
   */
  async getTestimonials() {
    return apiClient.get('/api/v1/testimonials');
  },

  /**
   * Submit client contact message
   */
  async sendContactMessage(data) {
    return apiClient.post('/api/v1/contact', data);
  },

  /**
   * Submit client booking request
   */
  async sendBookingRequest(data) {
    return apiClient.post('/api/v1/bookings', data);
  },
};

export default publicService;
