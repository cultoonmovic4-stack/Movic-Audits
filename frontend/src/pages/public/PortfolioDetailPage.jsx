import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Container from '../../components/ui/Container';
import Section from '../../components/ui/Section';
import { PageHeader } from '../../components/ui/Container';
import SeoHead from '../../components/common/SeoHead';
import ResponsiveImage from '../../components/common/ResponsiveImage';
import { LoadingState } from '../../components/ui/States';
import Button from '../../components/ui/Button';
import publicService from '../../services/publicService';

export function PortfolioDetailPage() {
  const { slug } = useParams();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let isMounted = true;
    publicService.getPortfolioAlbum(slug)
      .then((res) => {
        if (isMounted && res?.data) {
          setAlbum(res.data);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => {
        if (isMounted) setNotFound(true);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <Section variant="canvas" className="py-24">
        <Container>
          <LoadingState message="Loading case study details..." />
        </Container>
      </Section>
    );
  }

  if (notFound || !album) {
    return (
      <Section variant="canvas" className="py-24">
        <Container className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#513229] mb-2 block">
            Portfolio Record
          </span>
          <h1 className="text-3xl font-extrabold text-[#231815] mb-4">
            Case Study Not Found
          </h1>
          <p className="text-sm text-[#584C46] mb-8 leading-relaxed">
            The requested portfolio album does not exist in the active public archive.
          </p>
          <Link to="/portfolio">
            <Button variant="primary">Return to Portfolio</Button>
          </Link>
        </Container>
      </Section>
    );
  }

  return (
    <>
      <SeoHead
        title={album.title}
        description={album.description || `Case study for ${album.title} by Movic Audits.`}
      />

      <Section variant="canvas">
        <Container>
          <PageHeader
            breadcrumbs={
              <Link to="/portfolio" className="hover:underline font-semibold text-[#513229]">
                &larr; Back to Portfolio
              </Link>
            }
            eyebrow={album.category?.name || 'Case Study'}
            title={album.title}
            subtitle={album.description}
            actions={
              <Link to="/book">
                <Button variant="primary" size="sm">
                  Inquire About Similar Production
                </Button>
              </Link>
            }
          />

          {album.images && album.images.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {album.images.map((img) => (
                <div
                  key={img.id}
                  className="bg-white border border-[#E8E3DF] rounded-sm overflow-hidden"
                >
                  <ResponsiveImage
                    media={img.media}
                    aspectRatio="aspect-[4/3]"
                    alt={img.caption || album.title}
                  />
                  {img.caption && (
                    <div className="p-3 text-xs text-[#82756E] border-t border-[#E8E3DF]">
                      {img.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 bg-white border border-[#E8E3DF] rounded-sm text-center text-xs text-[#82756E] mt-8">
              No gallery stills currently linked to this album.
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}

export default PortfolioDetailPage;
