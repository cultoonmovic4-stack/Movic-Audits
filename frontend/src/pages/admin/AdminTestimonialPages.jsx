import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/ui/Container';
import SeoHead from '../../components/common/SeoHead';
import Button from '../../components/ui/Button';

export function AdminTestimonialsPage() {
  return (
    <>
      <SeoHead title="Client Testimonials — Admin" robots="noindex, nofollow" />

      <PageHeader
        eyebrow="Social Proof"
        title="Client Testimonials"
        subtitle="Manage verified client feedback and quotations."
        actions={
          <Link to="/admin/testimonials/create">
            <Button variant="primary" size="sm">+ New Testimonial</Button>
          </Link>
        }
      />

      <div className="bg-white border border-[#E8E3DF] rounded-sm p-6 text-xs text-[#584C46]">
        <p>No testimonials recorded yet.</p>
      </div>
    </>
  );
}

export function AdminTestimonialFormPage() {
  return (
    <>
      <SeoHead title="Testimonial Editor — Admin" robots="noindex, nofollow" />

      <PageHeader
        breadcrumbs={<Link to="/admin/testimonials" className="hover:underline">&larr; Back to Testimonials</Link>}
        eyebrow="Testimonial Editor"
        title="Edit Testimonial"
        subtitle="Configure client name, company, quote, and avatar media."
      />

      <div className="max-w-xl bg-white p-8 border border-[#E8E3DF] rounded-sm">
        <Link to="/admin/testimonials">
          <Button variant="secondary" size="sm">Back to Testimonials</Button>
        </Link>
      </div>
    </>
  );
}
