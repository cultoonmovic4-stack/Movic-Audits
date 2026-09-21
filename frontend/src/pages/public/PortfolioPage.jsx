import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/ui/Container';
import Section from '../../components/ui/Section';
import { PageHeader } from '../../components/ui/Container';
import SeoHead from '../../components/common/SeoHead';
import ResponsiveImage from '../../components/common/ResponsiveImage';
import { EmptyState, LoadingState } from '../../components/ui/States';
import Button from '../../components/ui/Button';
import publicService from '../../services/publicService';
import Reveal from '../../components/motion/Reveal';

export function PortfolioPage() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    let isMounted = true;
    publicService.getPortfolio()
      .then((res) => {
        if (isMounted && res?.data && Array.isArray(res.data)) {
          setAlbums(res.data);
        }
      })
      .catch(() => {
        // Handled cleanly; remains empty
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredAlbums =
    selectedCategory === 'all'
      ? albums
      : albums.filter((a) => a.category?.slug === selectedCategory);

  return (
    <>
      <SeoHead
        title="Visual Portfolio & Case Studies"
        description="Curated collection of commercial photography, cinematic films, and commissioned visual projects by Movic Audits."
      />

      <Section variant="canvas">
        <Container>
          <Reveal variant="fade-up">
            <PageHeader
              eyebrow="Selected Works"
              title="Portfolio & Case Studies"
              subtitle="Explore our curated body of work across commercial stills, brand films, and documentary commissions."
              actions={
                <Link to="/contact">
                  <Button variant="secondary" size="sm">
                    Request Private Reel
                  </Button>
                </Link>
              }
            />
          </Reveal>

          {loading ? (
            <LoadingState message="Loading portfolio archive..." />
          ) : albums.length === 0 ? (
            <Reveal variant="fade-up">
              <div className="mt-8 max-w-2xl mx-auto">
                <EmptyState
                  title="Client Archive Under Curation"
                  description="Our public portfolio archive is currently being updated with recent commercial commissions and editorial series. Private screening reels and customized case study decks are available upon request."
                  actionText="Contact Production Desk"
                  onAction={() => window.location.assign('/contact')}
                />
              </div>
            </Reveal>
          ) : (
            <>
              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 mb-8 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className={`text-xs font-semibold px-3.5 py-1.5 rounded-sm transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-[#513229] text-[#FAF8F6]'
                      : 'bg-white text-[#584C46] border border-[#E8E3DF] hover:bg-[#F3EFEA]'
                  }`}
                >
                  All Projects
                </button>
              </div>

              {/* Albums Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAlbums.map((album, index) => (
                  <Reveal key={album.slug} variant="fade-up" delay={index * 50}>
                    <Link
                      to={`/portfolio/${album.slug}`}
                      className="group block bg-white border border-[#E8E3DF] rounded-sm overflow-hidden hover:border-[#513229] transition-colors shadow-xs"
                    >
                      <ResponsiveImage
                        media={album.cover_media}
                        aspectRatio="aspect-[16/10]"
                        alt={album.title}
                      />
                      <div className="p-6">
                        {album.category && (
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#A5BCD6] mb-1 block">
                            {album.category.name}
                          </span>
                        )}
                        <h3 className="text-lg font-bold text-[#231815] group-hover:text-[#513229] transition-colors mb-2">
                          {album.title}
                        </h3>
                        {album.description && (
                          <p className="text-xs text-[#584C46] line-clamp-2 leading-relaxed">
                            {album.description}
                          </p>
                        )}
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </>
          )}
        </Container>
      </Section>
    </>
  );
}

export default PortfolioPage;
