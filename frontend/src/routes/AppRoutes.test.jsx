import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { AuthContext } from '../context/AuthContext';

function renderWithContext(initialRoute = '/', authContextValue = {}) {
  const defaultAuth = {
    user: null,
    status: 'unauthenticated',
    isAuthenticated: false,
    isAdmin: false,
    login: vi.fn(),
    logout: vi.fn(),
    checkAuth: vi.fn(),
    clearError: vi.fn(),
    ...authContextValue,
  };

  return render(
    <AuthContext.Provider value={defaultAuth}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <AppRoutes />
      </MemoryRouter>
    </AuthContext.Provider>
  );
}

describe('AppRoutes', () => {
  it('renders HomePage at public route /', () => {
    renderWithContext('/');
    expect(screen.getByText(/Visual storytelling/i)).toBeInTheDocument();
    expect(screen.getByText(/that moves people\./i)).toBeInTheDocument();
    expect(screen.getByText(/Production Disciplines/i)).toBeInTheDocument();
  });

  it('renders AboutPage at /about', () => {
    renderWithContext('/about');
    expect(screen.getByText(/About Movic Audits/i)).toBeInTheDocument();
    expect(screen.getByText(/Our Working Process/i)).toBeInTheDocument();
  });

  it('renders ServicesPage at /services', () => {
    renderWithContext('/services');
    expect(screen.getByRole('heading', { level: 1, name: /Production Services/i })).toBeInTheDocument();
  });

  it('renders PortfolioPage at /portfolio', () => {
    renderWithContext('/portfolio');
    expect(screen.getByText(/Portfolio & Case Studies/i)).toBeInTheDocument();
  });

  it('renders BlogPage at /blog', () => {
    renderWithContext('/blog');
    expect(screen.getByText(/Field Notes & Technical Journal/i)).toBeInTheDocument();
  });

  it('renders ContactPage at /contact', () => {
    renderWithContext('/contact');
    expect(screen.getByText(/Contact Movic Audits/i)).toBeInTheDocument();
  });

  it('renders BookingPage at /book', () => {
    renderWithContext('/book');
    expect(screen.getByText(/Book a Production Session/i)).toBeInTheDocument();
  });

  it('redirects unauthenticated user accessing /admin/dashboard to /admin/login', async () => {
    renderWithContext('/admin/dashboard', {
      user: null,
      status: 'unauthenticated',
      isAuthenticated: false,
      isAdmin: false,
    });

    await waitFor(() => {
      expect(screen.getByText(/Content Management System/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Sign In to Administration/i })).toBeInTheDocument();
    });
  });

  it('allows authenticated admin user to access /admin/dashboard', () => {
    renderWithContext('/admin/dashboard', {
      user: { id: 1, name: 'Lead Admin', email: 'admin@movicaudits.test', role: 'admin' },
      status: 'authenticated',
      isAuthenticated: true,
      isAdmin: true,
    });

    expect(screen.getByText(/Administrative Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Published Services/i)).toBeInTheDocument();
  });

  it('renders NotFoundPage on unknown route', () => {
    renderWithContext('/random-unknown-path');
    expect(screen.getByText(/Resource Not Found/i)).toBeInTheDocument();
    expect(screen.getByText(/Error 404/i)).toBeInTheDocument();
  });
});
