import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/ui/Container';
import Section from '../../components/ui/Section';
import { PageHeader } from '../../components/ui/Container';
import SeoHead from '../../components/common/SeoHead';
import ResponsiveImage from '../../components/common/ResponsiveImage';
import { EmptyState, LoadingState } from '../../components/ui/States';
import publicService from '../../services/publicService';
import Reveal from '../../components/motion/Reveal';

export function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    publicService.getBlogPosts()
      .then((res) => {
        if (isMounted && res?.data && Array.isArray(res.data)) {
          setPosts(res.data);
        }
      })
      .catch(() => {
        // Fallback handled cleanly
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <SeoHead
        title="Journal & Field Notes"
        description="Essays, camera technical notes, and creative perspectives from the Movic Audits production team."
      />

      <Section variant="canvas">
        <Container>
          <Reveal variant="fade-up">
            <PageHeader
              eyebrow="Editorial & Insights"
              title="Field Notes & Technical Journal"
              subtitle="Perspectives on photography craft, motion cinematography, and media production discipline."
            />
          </Reveal>

          {loading ? (
            <LoadingState message="Loading journal articles..." />
          ) : posts.length === 0 ? (
            <Reveal variant="fade-up">
              <div className="mt-8 max-w-2xl mx-auto">
                <EmptyState
                  title="Editorial Desk in Preparation"
                  description="Technical breakdowns, camera tests, and behind-the-scenes essays are currently undergoing editorial review. New articles will be published shortly."
                  actionText="Explore Production Services"
                  onAction={() => window.location.assign('/services')}
                />
              </div>
            </Reveal>
          ) : (
            <div className="space-y-8 mt-8 max-w-4xl">
              {posts.map((post, index) => (
                <Reveal key={post.slug} variant="fade-up" delay={index * 50}>
                  <article
                    className="bg-white border border-[#E8E3DF] rounded-sm overflow-hidden hover:border-[#513229] transition-colors p-8 shadow-xs"
                  >
                    {post.featured_media && (
                      <div className="mb-6 -mx-8 -mt-8 border-b border-[#E8E3DF]">
                        <ResponsiveImage
                          media={post.featured_media}
                          aspectRatio="aspect-[16/9]"
                          alt={post.title}
                        />
                      </div>
                    )}

                    <div className="flex items-center gap-3 text-xs text-[#82756E] mb-3">
                      {post.category && (
                        <span className="font-bold uppercase tracking-wider text-[#A5BCD6]">
                          {post.category.name}
                        </span>
                      )}
                      {post.published_at && (
                        <span>
                          {new Date(post.published_at).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      )}
                      {post.author && <span>&bull; By {post.author.name}</span>}
                    </div>

                    <h2 className="text-2xl font-bold text-[#231815] mb-3">
                      <Link to={`/blog/${post.slug}`} className="hover:text-[#513229] transition-colors">
                        {post.title}
                      </Link>
                    </h2>

                    {post.excerpt && (
                      <p className="text-sm text-[#584C46] leading-relaxed mb-6">
                        {post.excerpt}
                      </p>
                    )}

                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-xs font-bold uppercase tracking-wider text-[#513229] inline-flex items-center gap-1 hover:underline"
                    >
                      Read Article &rarr;
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}

export default BlogPage;
