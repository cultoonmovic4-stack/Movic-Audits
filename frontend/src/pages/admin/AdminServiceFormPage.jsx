import { useParams, Link } from 'react-router-dom';
import { PageHeader } from '../../components/ui/Container';
import SeoHead from '../../components/common/SeoHead';
import FormField from '../../components/ui/FormField';
import { Input, Textarea, Select } from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export function AdminServiceFormPage() {
  const { id } = useParams();
  const isEditing = Boolean(id);

  return (
    <>
      <SeoHead
        title={`${isEditing ? 'Edit Service' : 'Create Service'} — Admin`}
        robots="noindex, nofollow"
      />

      <PageHeader
        breadcrumbs={<Link to="/admin/services" className="hover:underline">&larr; Back to Services</Link>}
        eyebrow="Service Editor"
        title={isEditing ? `Edit Service #${id}` : 'Create New Service'}
        subtitle="Configure title, URL slug, description, cover media, and publishing status."
      />

      <div className="max-w-2xl bg-white p-8 border border-[#E8E3DF] rounded-sm space-y-4">
        <FormField id="title" label="Service Title" required>
          <Input id="title" placeholder="e.g. Commercial Photography" defaultValue={isEditing ? 'Commercial Photography' : ''} />
        </FormField>

        <FormField id="slug" label="URL Slug (leave blank for auto-generation)">
          <Input id="slug" placeholder="e.g. commercial-photography" defaultValue={isEditing ? 'commercial-photography' : ''} />
        </FormField>

        <FormField id="status" label="Publication Status" required>
          <Select id="status" defaultValue="published">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </Select>
        </FormField>

        <FormField id="description" label="Service Overview" required>
          <Textarea id="description" rows={5} placeholder="Describe service scope..." />
        </FormField>

        <div className="pt-4 flex gap-3">
          <Button variant="primary">Save Service</Button>
          <Link to="/admin/services">
            <Button variant="secondary">Cancel</Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default AdminServiceFormPage;
