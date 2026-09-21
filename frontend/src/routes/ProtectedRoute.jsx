import { Navigate, Outlet, useLocation, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { LoadingState } from '../components/ui/States';
import Button from '../components/ui/Button';

export function ProtectedRoute() {
  const { user, status, isAdmin, logout } = useAuth();
  const location = useLocation();

  if (status === 'loading') {
    return <LoadingState fullScreen message="Verifying administrative credentials..." />;
  }

  if (status === 'unauthenticated') {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Ensure authenticated user possesses admin role
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#FAF8F6]">
        <div className="max-w-md w-full bg-white p-8 border border-[#E8E3DF] rounded-sm text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#DC2626]/10 text-[#DC2626] flex items-center justify-center font-bold">
            !
          </div>
          <h2 className="text-xl font-bold text-[#231815] mb-2">Unauthorized Access</h2>
          <p className="text-sm text-[#584C46] mb-6">
            Your account ({user?.email}) does not have administrative permissions for Movic Audits.
          </p>
          <div className="flex justify-center gap-3">
            <Button variant="secondary" size="sm" onClick={logout}>
              Sign Out
            </Button>
            <Link to="/">
              <Button variant="primary" size="sm">
                Return Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;
