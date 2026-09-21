import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/ui/Container';
import SeoHead from '../../components/common/SeoHead';
import Button from '../../components/ui/Button';

export function AdminPortfolioCategoriesPage() {
  return (
    <>
      <SeoHead title="Portfolio Categories — Admin" robots="noindex, nofollow" />

      <PageHeader
        eyebrow="Portfolio Taxonomy"
        title="Portfolio Categories"
        subtitle="Organize visual work by discipline (e.g. Commercial Stills, Architecture, Documentaries)."
        actions={<Button variant="primary" size="sm">+ New Category</Button>}
      />

      <div className="bg-white border border-[#E8E3DF] rounded-sm p-6">
        <ul className="divide-y divide-[#E8E3DF] text-xs text-[#584C46]">
          <li className="py-3 flex items-center justify-between font-bold text-[#231815]">
            <span>Commercial Stills (slug: <code>commercial-stills</code>)</span>
            <span className="text-[#513229]">Edit</span>
          </li>
          <li className="py-3 flex items-center justify-between font-bold text-[#231815]">
            <span>Architectural Series (slug: <code>architectural-series</code>)</span>
            <span className="text-[#513229]">Edit</span>
          </li>
          <li className="py-3 flex items-center justify-between font-bold text-[#231815]">
            <span>Cinematic Film (slug: <code>cinematic-film</code>)</span>
            <span className="text-[#513229]">Edit</span>
          </li>
        </ul>
      </div>
    </>
  );
}

export function AdminPortfolioAlbumsPage() {
  return (
    <>
      <SeoHead title="Portfolio Albums — Admin" robots="noindex, nofollow" />

      <PageHeader
        eyebrow="Portfolio Content"
        title="Portfolio Albums"
        subtitle="Manage photo and video case study albums."
        actions={
          <Link to="/admin/portfolio/albums/create">
            <Button variant="primary" size="sm">+ New Album</Button>
          </Link>
        }
      />

      <div className="bg-white border border-[#E8E3DF] rounded-sm p-6">
        <div className="flex items-center justify-between text-xs py-3 border-b border-[#E8E3DF]">
          <div>
            <span className="font-bold text-[#231815] text-sm block">North Ridge Expedition</span>
            <span className="text-[#82756E]">Commercial Landscape &bull; 8 Images</span>
          </div>
          <Link to="/admin/portfolio/albums/1/edit" className="text-xs font-bold text-[#513229] hover:underline">
            Manage Album &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}

export function AdminPortfolioAlbumFormPage() {
  return (
    <>
      <SeoHead title="Album Editor — Admin" robots="noindex, nofollow" />

      <PageHeader
        breadcrumbs={<Link to="/admin/portfolio/albums" className="hover:underline">&larr; Back to Albums</Link>}
        eyebrow="Portfolio Editor"
        title="Portfolio Album Editor"
        subtitle="Configure album metadata, category, cover media, and attached gallery stills."
      />

      <div className="max-w-2xl bg-white p-8 border border-[#E8E3DF] rounded-sm space-y-4">
        <div className="text-xs text-[#82756E] p-4 bg-[#F3EFEA] rounded-sm">
          Full relational gallery image uploader and reordering interface will be wired during Phase 6.
        </div>
        <Link to="/admin/portfolio/albums">
          <Button variant="secondary" size="sm">Back to Albums</Button>
        </Link>
      </div>
    </>
  );
}
