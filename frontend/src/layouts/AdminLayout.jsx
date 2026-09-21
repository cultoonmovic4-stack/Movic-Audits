import { useState } from 'react';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export function AdminLayout() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navSections = [
    {
      title: 'Overview',
      items: [
        { label: 'Dashboard', to: '/admin/dashboard' },
      ],
    },
    {
      title: 'Content Management',
      items: [
        { label: 'Services', to: '/admin/services' },
        { label: 'Portfolio Categories', to: '/admin/portfolio/categories' },
        { label: 'Portfolio Albums', to: '/admin/portfolio/albums' },
        { label: 'Blog Categories', to: '/admin/blog/categories' },
        { label: 'Blog Posts', to: '/admin/blog' },
        { label: 'Testimonials', to: '/admin/testimonials' },
      ],
    },
    {
      title: 'Client Inquiries',
      items: [
        { label: 'Bookings', to: '/admin/bookings' },
        { label: 'Contact Messages', to: '/admin/messages' },
      ],
    },
    {
      title: 'System & Media',
      items: [
        { label: 'Media Library', to: '/admin/media' },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F6] text-[#231815]">
      {/* Admin Topbar */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E8E3DF] h-16 flex items-center px-4 sm:px-6 lg:px-8 justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 text-[#584C46] hover:bg-[#F3EFEA] rounded-sm focus-visible:outline-[#513229]"
            aria-label="Toggle Admin Navigation"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Link to="/admin/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#513229] flex items-center justify-center text-white font-black text-sm rounded-sm">
              M
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-tight text-[#231815] uppercase">
                Movic Audits
              </span>
              <span className="text-[9px] font-bold tracking-widest text-[#82756E] uppercase">
                CMS Administration
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex text-xs font-semibold text-[#584C46] hover:text-[#231815] transition-colors"
          >
            View Live Site &rarr;
          </Link>

          <div className="h-4 w-px bg-[#E8E3DF] hidden sm:block" />

          <div className="flex items-center gap-3">
            <div className="flex flex-col text-right hidden md:block">
              <span className="text-xs font-bold text-[#231815] leading-tight">
                {user?.name || 'Administrator'}
              </span>
              <span className="text-[10px] text-[#82756E] leading-tight">
                {user?.email || 'admin@movicaudits.test'}
              </span>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="text-xs font-semibold px-3 py-1.5 border border-[#D5CDC7] hover:bg-[#F3EFEA] text-[#584C46] hover:text-[#231815] rounded-sm transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Sidebar Navigation */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-[#E8E3DF] pt-16 lg:pt-0 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="h-full overflow-y-auto p-4 flex flex-col justify-between">
            <nav className="space-y-6" aria-label="Admin Navigation">
              {navSections.map((section) => (
                <div key={section.title}>
                  <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#82756E] px-3 mb-2">
                    {section.title}
                  </h3>
                  <ul className="space-y-1">
                    {section.items.map((item) => (
                      <li key={item.to}>
                        <NavLink
                          to={item.to}
                          end={item.to === '/admin/dashboard'}
                          onClick={() => setSidebarOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center px-3 py-2 text-xs font-semibold rounded-sm transition-colors ${
                              isActive
                                ? 'bg-[#513229] text-white'
                                : 'text-[#584C46] hover:bg-[#F3EFEA] hover:text-[#231815]'
                            }`
                          }
                        >
                          {item.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

            <div className="p-3 bg-[#F3EFEA] rounded-sm text-xs text-[#82756E]">
              <p className="font-bold text-[#231815] mb-0.5">Movic Audits v1.0</p>
              <p className="text-[10px]">Authoritative Local Environment</p>
            </div>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-[#231815]/30 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Main Admin Content */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
