import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import { AuthProvider } from './AuthContext';
import useAuth from '../hooks/useAuth';
import authService from '../services/authService';

function TestConsumer() {
  const { user, status, isAuthenticated, isAdmin, login, logout } = useAuth();

  return (
    <div>
      <span data-testid="status">{status}</span>
      <span data-testid="auth-flag">{isAuthenticated ? 'yes' : 'no'}</span>
      <span data-testid="admin-flag">{isAdmin ? 'yes' : 'no'}</span>
      <span data-testid="user-email">{user?.email || 'none'}</span>
      <button onClick={() => login({ email: 'admin@movicaudits.test', password: 'password' })}>
        Log In
      </button>
      <button onClick={logout}>Log Out</button>
    </div>
  );
}

describe('AuthContext', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('initializes to unauthenticated state when /me returns 401', async () => {
    vi.spyOn(authService, 'getMe').mockRejectedValue({
      status: 401,
      message: 'Unauthenticated.',
    });

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    // Initial state is loading
    expect(screen.getByTestId('status').textContent).toBe('loading');

    // Transitions to unauthenticated
    await waitFor(() => {
      expect(screen.getByTestId('status').textContent).toBe('unauthenticated');
      expect(screen.getByTestId('auth-flag').textContent).toBe('no');
      expect(screen.getByTestId('user-email').textContent).toBe('none');
    });
  });

  it('authenticates user when /me returns valid admin data', async () => {
    const adminUser = {
      id: 1,
      name: 'Movic Administrator',
      email: 'admin@movicaudits.test',
      role: 'admin',
    };

    vi.spyOn(authService, 'getMe').mockResolvedValue({
      success: true,
      data: adminUser,
    });

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('status').textContent).toBe('authenticated');
      expect(screen.getByTestId('auth-flag').textContent).toBe('yes');
      expect(screen.getByTestId('admin-flag').textContent).toBe('yes');
      expect(screen.getByTestId('user-email').textContent).toBe('admin@movicaudits.test');
    });
  });

  it('handles login and logout flow', async () => {
    vi.spyOn(authService, 'getMe')
      .mockRejectedValueOnce({ status: 401, message: 'Unauthenticated.' })
      .mockResolvedValueOnce({
        success: true,
        data: { id: 1, email: 'admin@movicaudits.test', role: 'admin' },
      });

    vi.spyOn(authService, 'login').mockResolvedValue({
      success: true,
      data: { user: { id: 1, email: 'admin@movicaudits.test', role: 'admin' } },
    });

    vi.spyOn(authService, 'logout').mockResolvedValue({
      success: true,
    });

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('status').textContent).toBe('unauthenticated');
    });

    // Trigger login
    await act(async () => {
      screen.getByText('Log In').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('status').textContent).toBe('authenticated');
      expect(screen.getByTestId('user-email').textContent).toBe('admin@movicaudits.test');
    });

    // Trigger logout
    await act(async () => {
      screen.getByText('Log Out').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('status').textContent).toBe('unauthenticated');
      expect(screen.getByTestId('user-email').textContent).toBe('none');
    });
  });
});
