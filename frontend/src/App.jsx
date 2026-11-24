import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AOS from 'aos';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';

export function App() {
  useEffect(() => {
    const isJsdom = typeof navigator !== 'undefined' && navigator.userAgent?.includes('jsdom');
    if (isJsdom || typeof window === 'undefined') return;

    AOS.init({
      duration: 750,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
      disable: () =>
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    });
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
