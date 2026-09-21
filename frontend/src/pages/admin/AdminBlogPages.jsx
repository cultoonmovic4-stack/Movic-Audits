import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/ui/Container';
import SeoHead from '../../components/common/SeoHead';
import Button from '../../components/ui/Button';

export function AdminBlogCategoriesPage() {
  return (
    <>
      <SeoHead title="Blog Categories — Admin" robots="noindex, nofollow" />

      <PageHeader
        eyebrow="Editorial Taxonomy"
        title="Journal Categories"
        subtitle="Manage blog post topic classifications."
        actions={<Button variant="primary" size="sm">+ New Category</Button>}
      />

      <div className="bg-white border border-[#E8E3DF] rounded-sm p-6 text-xs text-[#584C46]">
        <p>Categories configured: Field Notes, Technical Breakdowns, Creative Direction.</p>
      </div>
    </>
  );
}

export function AdminBlogPage() {
  return (
    <>
      <SeoHead title="Manage Journal — Admin" robots="noindex, nofollow" />

      <PageHeader
        eyebrow="Editorial Desk"
        title="Journal Articles & Field Notes"
        subtitle="Author, schedule, edit, and publish editorial content."
        actions={
          <Link to="/admin/blog/posts/create">
            <Button variant="primary" size="sm">+ Write Post</Button>
          </Link>
        }
      />

      <div className="bg-white border border-[#E8E3DF] rounded-sm p-6 text-xs text-[#584C46]">
        <div className="flex items-center justify-between py-3 border-b border-[#E8E3DF]">
          <div>
            <span className="font-bold text-[#231815] text-sm block">Lighting for High-Contrast Architectural Stills</span>
            <span className="text-[#82756E]">Published &bull; September 2026</span>
          </div>
          <Link to="/admin/blog/posts/1/edit" className="font-bold text-[#513229] hover:underline">
            Edit &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}

export function AdminBlogPostFormPage() {
  return (
    <>
      <SeoHead title="Journal Article Editor — Admin" robots="noindex, nofollow" />

      <PageHeader
        breadcrumbs={<Link to="/admin/blog" className="hover:underline">&larr; Back to Journal</Link>}
        eyebrow="Article Editor"
        title="Journal Post Editor"
        subtitle="Draft and publish editorial pieces with sanitized HTML and media bindings."
      />

      <div className="max-w-2xl bg-white p-8 border border-[#E8E3DF] rounded-sm space-y-4">
        <div className="text-xs text-[#82756E] p-4 bg-[#F3EFEA] rounded-sm">
          Sanitized HTML rich-text editor and featured image selector will be attached in Phase 6.
        </div>
        <Link to="/admin/blog">
          <Button variant="secondary" size="sm">Back to Articles</Button>
        </Link>
      </div>
    </>
  );
}
