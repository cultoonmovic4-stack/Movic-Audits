import { PageHeader } from '../../components/ui/Container';
import SeoHead from '../../components/common/SeoHead';
import Button from '../../components/ui/Button';

export function AdminMediaPage() {
  return (
    <>
      <SeoHead title="Media Library — Admin" robots="noindex, nofollow" />

      <PageHeader
        eyebrow="Asset Management"
        title="Centralized Media Library"
        subtitle="Upload, categorize, inspect, and link photographic stills and video media assets."
        actions={<Button variant="primary" size="sm">+ Upload Asset</Button>}
      />

      <div className="bg-white border border-[#E8E3DF] rounded-sm p-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#F3EFEA] flex items-center justify-center text-[#513229]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          </div>
          <h3 className="text-sm font-bold text-[#231815] mb-1">Central Media Repository</h3>
          <p className="text-xs text-[#584C46] leading-relaxed mb-4">
            Directly connected to backend <code>MediaService</code> with strict JPEG, PNG, and WebP validation.
          </p>
          <p className="text-[11px] text-[#82756E]">
            Full drag-and-drop uploader and gallery asset picker will be active in Phase 6.
          </p>
        </div>
      </div>
    </>
  );
}

export default AdminMediaPage;
