import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/ui/Container';
import SeoHead from '../../components/common/SeoHead';
import useAuth from '../../hooks/useAuth';

export function AdminDashboardPage() {
  const { user } = useAuth();

  const metrics = [
    { label: 'Published Services', value: '3', to: '/admin/services', description: 'Active offerings' },
    { label: 'Portfolio Albums', value: '4', to: '/admin/portfolio/albums', description: 'Curated projects' },
    { label: 'Journal Posts', value: '2', to: '/admin/blog', description: 'Published articles' },
    { label: 'Active Testimonials', value: '0', to: '/admin/testimonials', description: 'Client reviews' },
    { label: 'Pending Bookings', value: '0', to: '/admin/bookings', description: 'New shoot requests' },
    { label: 'Unread Messages', value: '0', to: '/admin/messages', description: 'Client inquiries' },
  ];

  return (
    <>
      <SeoHead title="Admin Dashboard" robots="noindex, nofollow" />

      <PageHeader
        eyebrow="Overview"
        title="Administrative Dashboard"
        subtitle={`Welcome back, ${user?.name || 'Administrator'}. Manage website content, media assets, and incoming inquiries.`}
      />

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {metrics.map((metric) => (
          <Link
            key={metric.label}
            to={metric.to}
            className="block p-6 bg-white border border-[#E8E3DF] rounded-sm hover:border-[#513229] transition-colors"
          >
            <div className="text-xs font-bold uppercase tracking-wider text-[#82756E] mb-2">
              {metric.label}
            </div>
            <div className="text-3xl font-black text-[#231815] mb-1">
              {metric.value}
            </div>
            <div className="text-xs text-[#584C46] flex items-center justify-between">
              <span>{metric.description}</span>
              <span className="font-bold text-[#513229]">&rarr;</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions Panel */}
      <div className="bg-white p-6 border border-[#E8E3DF] rounded-sm">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#231815] mb-4">
          Quick Content Actions
        </h3>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/admin/services/create"
            className="text-xs font-semibold px-3.5 py-2 bg-[#513229] text-white hover:bg-[#3E251E] rounded-sm"
          >
            + Create Service
          </Link>
          <Link
            to="/admin/portfolio/albums/create"
            className="text-xs font-semibold px-3.5 py-2 bg-[#513229] text-white hover:bg-[#3E251E] rounded-sm"
          >
            + New Portfolio Album
          </Link>
          <Link
            to="/admin/blog/posts/create"
            className="text-xs font-semibold px-3.5 py-2 bg-[#513229] text-white hover:bg-[#3E251E] rounded-sm"
          >
            + Write Journal Post
          </Link>
          <Link
            to="/admin/media"
            className="text-xs font-semibold px-3.5 py-2 border border-[#513229] text-[#513229] hover:bg-[#513229]/5 rounded-sm"
          >
            Manage Media Assets
          </Link>
        </div>
      </div>
    </>
  );
}

export default AdminDashboardPage;
