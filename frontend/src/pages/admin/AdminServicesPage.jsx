import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/ui/Container';
import SeoHead from '../../components/common/SeoHead';
import Button from '../../components/ui/Button';

export function AdminServicesPage() {
  return (
    <>
      <SeoHead title="Manage Services — Admin" robots="noindex, nofollow" />

      <PageHeader
        eyebrow="Content Management"
        title="Production Services"
        subtitle="Manage public service offerings, descriptions, features, and pricing tiers."
        actions={
          <Link to="/admin/services/create">
            <Button variant="primary" size="sm">+ New Service</Button>
          </Link>
        }
      />

      <div className="bg-white border border-[#E8E3DF] rounded-sm overflow-hidden">
        <table className="w-full text-left text-xs text-[#584C46]">
          <thead className="bg-[#FAF8F6] border-b border-[#E8E3DF] text-[#231815] font-bold uppercase tracking-wider">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Slug</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8E3DF]">
            <tr>
              <td className="p-4 font-bold text-[#231815]">Commercial Photography</td>
              <td className="p-4 font-mono text-[11px]">commercial-photography</td>
              <td className="p-4"><span className="px-2 py-0.5 bg-[#2E7D32]/10 text-[#2E7D32] rounded-xs font-bold">Published</span></td>
              <td className="p-4 text-right">
                <Link to="/admin/services/1/edit" className="text-[#513229] font-bold hover:underline">Edit</Link>
              </td>
            </tr>
            <tr>
              <td className="p-4 font-bold text-[#231815]">Cinematic Videography</td>
              <td className="p-4 font-mono text-[11px]">cinematic-videography</td>
              <td className="p-4"><span className="px-2 py-0.5 bg-[#2E7D32]/10 text-[#2E7D32] rounded-xs font-bold">Published</span></td>
              <td className="p-4 text-right">
                <Link to="/admin/services/2/edit" className="text-[#513229] font-bold hover:underline">Edit</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminServicesPage;
