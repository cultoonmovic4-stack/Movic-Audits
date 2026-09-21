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

export function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let isMounted = true;
    publicService.getBlogPost(slug)
      .then((res) => {
        if (isMounted && res?.data) {
          setPost(res.data);
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
          <LoadingState message="Loading journal entry..." />
        </Container>
      </Section>
    );
  }

  if (notFound || !post) {
    return (
      <Section variant="canvas" className="py-24">
        <Container className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#513229] mb-2 block">
            Journal Archive
          </span>
          <h1 className="text-3xl font-extrabold text-[#231815] mb-4">
            Article Not Found
          </h1>
          <p className="text-sm text-[#584C46] mb-8 leading-relaxed">
            The requested article does not exist or has been unpublished.
          </p>
          <Link to="/blog">
            <Button variant="primary">Return to Journal</Button>
          </Link>
        </Container>
      </Section>
    );
  }

  return (
    <>
      <SeoHead
        title={post.seo_title || post.title}
        description={post.seo_description || post.excerpt}
      />

      <Section variant="canvas">
        <Container>
          <div className="max-w-3xl mx-auto">
            <PageHeader
              breadcrumbs={
                <Link to="/blog" className="hover:underline font-semibold text-[#513229]">
                  &larr; Back to Journal
                </Link>
              }
              eyebrow={post.category?.name || 'Field Note'}
              title={post.title}
              subtitle={
                post.published_at &&
                `Published on ${new Date(post.published_at).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}${post.author ? ` by ${post.author.name}` : ''}`
              }
            />

            {post.featured_media && (
              <div className="mb-8 border border-[#E8E3DF] rounded-sm overflow-hidden bg-white">
                <ResponsiveImage
                  media={post.featured_media}
                  aspectRatio="aspect-[16/9]"
                  alt={post.title}
                />
              </div>
            )}

            <div className="bg-white p-8 sm:p-12 border border-[#E8E3DF] rounded-sm prose prose-neutral max-w-none text-sm sm:text-base leading-relaxed text-[#584C46] space-y-4">
              {post.content ? (
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              ) : (
                <p>{post.excerpt}</p>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

export default BlogPostPage;
