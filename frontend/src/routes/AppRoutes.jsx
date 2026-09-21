import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts & Route Guards
import PublicLayout from '../layouts/PublicLayout';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from './ProtectedRoute';

// Public Pages
import HomePage from '../pages/public/HomePage';
import AboutPage from '../pages/public/AboutPage';
import ServicesPage from '../pages/public/ServicesPage';
import ServiceDetailPage from '../pages/public/ServiceDetailPage';
import PortfolioPage from '../pages/public/PortfolioPage';
import PortfolioDetailPage from '../pages/public/PortfolioDetailPage';
import BlogPage from '../pages/public/BlogPage';
import BlogPostPage from '../pages/public/BlogPostPage';
import ContactPage from '../pages/public/ContactPage';
import BookingPage from '../pages/public/BookingPage';
import NotFoundPage from '../pages/public/NotFoundPage';

// Admin Pages
import AdminLoginPage from '../pages/admin/AdminLoginPage';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import AdminServicesPage from '../pages/admin/AdminServicesPage';
import AdminServiceFormPage from '../pages/admin/AdminServiceFormPage';
import {
  AdminPortfolioCategoriesPage,
  AdminPortfolioAlbumsPage,
  AdminPortfolioAlbumFormPage,
} from '../pages/admin/AdminPortfolioPages';
import {
  AdminBlogCategoriesPage,
  AdminBlogPage,
  AdminBlogPostFormPage,
} from '../pages/admin/AdminBlogPages';
import {
  AdminTestimonialsPage,
  AdminTestimonialFormPage,
} from '../pages/admin/AdminTestimonialPages';
import {
  AdminBookingsPage,
  AdminBookingDetailPage,
  AdminMessagesPage,
  AdminMessageDetailPage,
} from '../pages/admin/AdminInquiryPages';
import AdminMediaPage from '../pages/admin/AdminMediaPage';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Application Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/portfolio/:slug" element={<PortfolioDetailPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/booking" element={<Navigate to="/book" replace />} />
      </Route>

      {/* Admin Authentication Route (Unprotected) */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Admin Protected Routes (Protected by AuthGuard) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />

          {/* Services Admin */}
          <Route path="/admin/services" element={<AdminServicesPage />} />
          <Route path="/admin/services/create" element={<AdminServiceFormPage />} />
          <Route path="/admin/services/:id/edit" element={<AdminServiceFormPage />} />

          {/* Portfolio Admin */}
          <Route path="/admin/portfolio" element={<Navigate to="/admin/portfolio/albums" replace />} />
          <Route path="/admin/portfolio/categories" element={<AdminPortfolioCategoriesPage />} />
          <Route path="/admin/portfolio/albums" element={<AdminPortfolioAlbumsPage />} />
          <Route path="/admin/portfolio/albums/create" element={<AdminPortfolioAlbumFormPage />} />
          <Route path="/admin/portfolio/albums/:id/edit" element={<AdminPortfolioAlbumFormPage />} />

          {/* Blog Admin */}
          <Route path="/admin/blog" element={<AdminBlogPage />} />
          <Route path="/admin/blog/categories" element={<AdminBlogCategoriesPage />} />
          <Route path="/admin/blog/posts/create" element={<AdminBlogPostFormPage />} />
          <Route path="/admin/blog/posts/:id/edit" element={<AdminBlogPostFormPage />} />

          {/* Testimonials Admin */}
          <Route path="/admin/testimonials" element={<AdminTestimonialsPage />} />
          <Route path="/admin/testimonials/create" element={<AdminTestimonialFormPage />} />
          <Route path="/admin/testimonials/:id/edit" element={<AdminTestimonialFormPage />} />

          {/* Inquiries Admin */}
          <Route path="/admin/bookings" element={<AdminBookingsPage />} />
          <Route path="/admin/bookings/:id" element={<AdminBookingDetailPage />} />
          <Route path="/admin/messages" element={<AdminMessagesPage />} />
          <Route path="/admin/messages/:id" element={<AdminMessageDetailPage />} />

          {/* Centralized Media Admin */}
          <Route path="/admin/media" element={<AdminMediaPage />} />
        </Route>
      </Route>

      {/* Global 404 Fallback */}
      <Route element={<PublicLayout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
