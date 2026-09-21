import { useParams, Link } from 'react-router-dom';
import { PageHeader } from '../../components/ui/Container';
import SeoHead from '../../components/common/SeoHead';
import Button from '../../components/ui/Button';

export function AdminBookingsPage() {
  return (
    <>
      <SeoHead title="Client Bookings — Admin" robots="noindex, nofollow" />

      <PageHeader
        eyebrow="Inquiries"
        title="Production Bookings"
        subtitle="Review, approve, and manage incoming shoot requests."
      />

      <div className="bg-white border border-[#E8E3DF] rounded-sm p-6 text-xs text-[#584C46]">
        <p>No shoot booking inquiries currently pending.</p>
      </div>
    </>
  );
}

export function AdminBookingDetailPage() {
  const { id } = useParams();

  return (
    <>
      <SeoHead title={`Booking #${id} — Admin`} robots="noindex, nofollow" />

      <PageHeader
        breadcrumbs={<Link to="/admin/bookings" className="hover:underline">&larr; Back to Bookings</Link>}
        eyebrow="Booking Details"
        title={`Booking #${id}`}
        subtitle="Review client shoot requirements, location, date, and status."
      />

      <div className="bg-white p-6 border border-[#E8E3DF] rounded-sm">
        <Link to="/admin/bookings">
          <Button variant="secondary" size="sm">Back to Bookings</Button>
        </Link>
      </div>
    </>
  );
}

export function AdminMessagesPage() {
  return (
    <>
      <SeoHead title="Contact Messages — Admin" robots="noindex, nofollow" />

      <PageHeader
        eyebrow="Inquiries"
        title="Contact Messages"
        subtitle="Incoming correspondence submitted through the public contact form."
      />

      <div className="bg-white border border-[#E8E3DF] rounded-sm p-6 text-xs text-[#584C46]">
        <p>No unread contact messages.</p>
      </div>
    </>
  );
}

export function AdminMessageDetailPage() {
  const { id } = useParams();

  return (
    <>
      <SeoHead title={`Message #${id} — Admin`} robots="noindex, nofollow" />

      <PageHeader
        breadcrumbs={<Link to="/admin/messages" className="hover:underline">&larr; Back to Messages</Link>}
        eyebrow="Message Detail"
        title={`Message #${id}`}
        subtitle="Review message contents and sender details."
      />

      <div className="bg-white p-6 border border-[#E8E3DF] rounded-sm">
        <Link to="/admin/messages">
          <Button variant="secondary" size="sm">Back to Messages</Button>
        </Link>
      </div>
    </>
  );
}
