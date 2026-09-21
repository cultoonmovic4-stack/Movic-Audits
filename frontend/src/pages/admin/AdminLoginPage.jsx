import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import FormField from '../../components/ui/FormField';
import { Input } from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import SeoHead from '../../components/common/SeoHead';

export function AdminLoginPage() {
  const { login, isAuthenticated, isAdmin, error: authError, clearError } = useAuth();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin/dashboard';

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, isAdmin, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    setLocalError(null);
    setLoading(true);

    try {
      await login(credentials);
      navigate(from, { replace: true });
    } catch (err) {
      setLocalError(err.message || 'Authentication failed. Please verify email and password.');
    } finally {
      setLoading(false);
    }
  };

  const displayError = localError || authError;

  return (
    <>
      <SeoHead title="Administrator Login" robots="noindex, nofollow" />

      <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 bg-[#FAF8F6]">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-4 focus-visible:outline-[#A5BCD6]">
              <div className="w-10 h-10 bg-[#513229] flex items-center justify-center text-white font-black text-xl rounded-sm">
                M
              </div>
            </Link>
            <h1 className="text-2xl font-black tracking-tight text-[#231815] uppercase">
              Movic Audits
            </h1>
            <p className="text-xs font-semibold tracking-widest text-[#82756E] uppercase mt-1">
              Content Management System
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white p-8 border border-[#E8E3DF] rounded-sm shadow-xs">
            {displayError && (
              <div className="mb-6 p-4 bg-[#DC2626]/10 border border-[#DC2626]/20 rounded-sm text-xs font-medium text-[#DC2626]">
                {displayError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField id="email" label="Administrator Email" required>
                <Input
                  id="email"
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  placeholder="admin@movicaudits.test"
                  required
                  autoComplete="email"
                />
              </FormField>

              <FormField id="password" label="Password" required>
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
              </FormField>

              <div className="pt-2">
                <Button type="submit" variant="primary" size="md" fullWidth isLoading={loading}>
                  Sign In to Administration
                </Button>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-[#E8E3DF] text-center">
              <Link to="/" className="text-xs font-semibold text-[#82756E] hover:text-[#231815] transition-colors">
                &larr; Return to Public Website
              </Link>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-[#82756E]">
            Protected system. Authorized media administrators only.
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLoginPage;
