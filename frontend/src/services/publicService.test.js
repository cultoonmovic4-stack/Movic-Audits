import { describe, it, expect, vi, beforeEach } from 'vitest';
import { publicService } from './publicService';
import apiClient from './apiClient';

vi.mock('./apiClient', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

describe('publicService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches published services', async () => {
    const mockServices = [{ id: 1, title: 'Photography' }];
    apiClient.get.mockResolvedValueOnce({ data: { data: mockServices } });

    const result = await publicService.getServices();
    expect(apiClient.get).toHaveBeenCalledWith('/api/v1/services');
    expect(result.data.data).toEqual(mockServices);
  });

  it('fetches service detail by slug', async () => {
    const mockService = { id: 1, title: 'Photography', slug: 'photography' };
    apiClient.get.mockResolvedValueOnce({ data: { data: mockService } });

    const result = await publicService.getService('photography');
    expect(apiClient.get).toHaveBeenCalledWith('/api/v1/services/photography');
    expect(result.data.data).toEqual(mockService);
  });

  it('fetches portfolio albums with category filter', async () => {
    const mockAlbums = [{ id: 1, title: 'Editorial Dawn' }];
    apiClient.get.mockResolvedValueOnce({ data: { data: mockAlbums } });

    const result = await publicService.getPortfolio({ category: 'commercial' });
    expect(apiClient.get).toHaveBeenCalledWith('/api/v1/portfolio?category=commercial');
    expect(result.data.data).toEqual(mockAlbums);
  });

  it('fetches portfolio album detail by slug', async () => {
    const mockAlbum = { id: 1, title: 'Editorial Dawn', slug: 'editorial-dawn' };
    apiClient.get.mockResolvedValueOnce({ data: { data: mockAlbum } });

    const result = await publicService.getPortfolioAlbum('editorial-dawn');
    expect(apiClient.get).toHaveBeenCalledWith('/api/v1/portfolio/editorial-dawn');
    expect(result.data.data).toEqual(mockAlbum);
  });

  it('fetches blog posts', async () => {
    const mockPosts = { data: [{ id: 1, title: 'Lighting Techniques' }], meta: {} };
    apiClient.get.mockResolvedValueOnce({ data: mockPosts });

    const result = await publicService.getBlogPosts();
    expect(apiClient.get).toHaveBeenCalledWith('/api/v1/blog');
    expect(result.data).toEqual(mockPosts);
  });

  it('fetches blog post detail by slug', async () => {
    const mockPost = { id: 1, title: 'Lighting Techniques', slug: 'lighting-techniques' };
    apiClient.get.mockResolvedValueOnce({ data: { data: mockPost } });

    const result = await publicService.getBlogPost('lighting-techniques');
    expect(apiClient.get).toHaveBeenCalledWith('/api/v1/blog/lighting-techniques');
    expect(result.data.data).toEqual(mockPost);
  });

  it('fetches testimonials', async () => {
    const mockTestimonials = [{ id: 1, quote: 'Exceptional craft' }];
    apiClient.get.mockResolvedValueOnce({ data: { data: mockTestimonials } });

    const result = await publicService.getTestimonials();
    expect(apiClient.get).toHaveBeenCalledWith('/api/v1/testimonials');
    expect(result.data.data).toEqual(mockTestimonials);
  });

  it('submits contact inquiry form', async () => {
    const payload = { name: 'Jane Doe', email: 'jane@example.com', message: 'Hello' };
    apiClient.post.mockResolvedValueOnce({ data: { message: 'Inquiry received' } });

    const result = await publicService.sendContactMessage(payload);
    expect(apiClient.post).toHaveBeenCalledWith('/api/v1/contact', payload);
    expect(result.data).toEqual({ message: 'Inquiry received' });
  });

  it('submits booking session request', async () => {
    const payload = { client_name: 'Jane Doe', client_email: 'jane@example.com', service_id: 1 };
    apiClient.post.mockResolvedValueOnce({ data: { message: 'Booking submitted' } });

    const result = await publicService.sendBookingRequest(payload);
    expect(apiClient.post).toHaveBeenCalledWith('/api/v1/bookings', payload);
    expect(result.data).toEqual({ message: 'Booking submitted' });
  });
});
