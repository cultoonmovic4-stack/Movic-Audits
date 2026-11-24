import { useParams, Link } from 'react-router-dom';
import Container from '../../components/ui/Container';
import SeoHead from '../../components/common/SeoHead';
import ImageReveal from '../../components/motion/ImageReveal';
import BLOG_POSTS from '../../data/blogPosts';

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function BlogPostPage() {
  const { slug } = useParams();
  const currentIndex = BLOG_POSTS.findIndex((item) => item.slug === slug);
  const post = currentIndex >= 0 ? BLOG_POSTS[currentIndex] : null;

  if (!post) {
    return (
      <section className="bg-[#FAF8F6] text-[#231815] py-24 border-b border-[#E8E3DF]">
        <Container className="text-center max-w-xl mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#513229] mb-3 block">
            Journal Archive
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#231815] mb-4">
            Article Not Found
          </h1>
          <p className="text-sm text-[#584C46] mb-8 leading-relaxed">
            The requested journal entry does not exist in our curated archive.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#513229] hover:bg-[#3E251E] text-[#FAF8F6] text-xs font-bold uppercase tracking-[0.16em] rounded-xs transition-colors min-h-[44px]"
          >
            <span>&larr; Return to Journal</span>
          </Link>
        </Container>
      </section>
    );
  }

  const nextPost = BLOG_POSTS[(currentIndex + 1) % BLOG_POSTS.length];

  return (
    <>
      <SeoHead
        title={post.title}
        description={post.excerpt}
      />

      <article className="bg-[#FAF8F6] text-[#231815] border-b border-[#E8E3DF]">
        <Container className="pt-10 sm:pt-14 pb-16 sm:pb-24">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex items-center justify-between gap-4">
              <Link
                to="/blog"
                className="text-xs font-bold uppercase tracking-[0.18em] text-[#513229] hover:text-[#231815] transition-colors"
              >
                &larr; Back to Journal
              </Link>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#82756E]">
                {post.issue} &middot; {post.readTime}
              </span>
            </div>

            <header data-aos="fade-up" className="pb-8 mb-10 border-b border-[#D5CDC7]">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-[#513229]" aria-hidden="true" />
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#513229]">
                  {post.category.name}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.08] text-[#231815] mb-5">
                {post.title}
              </h1>

              <p className="text-base sm:text-lg text-[#584C46] leading-relaxed mb-6">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#82756E]">
                <span className="font-bold text-[#231815]">{post.author.name}</span>
                <span aria-hidden="true">&middot;</span>
                <span>{post.author.role}</span>
                <span aria-hidden="true">&middot;</span>
                <span>{formatDate(post.published_at)}</span>
              </div>
            </header>

            {post.featured_media && (
              <div data-aos="fade-up" data-aos-delay="100" className="mb-12 border border-[#E8E3DF] bg-[#231815]">
                <ImageReveal
                  src={post.featured_media.url}
                  alt={post.featured_media.alt_text || post.title}
                  className="aspect-[16/9] w-full"
                  loading="eager"
                />
              </div>
            )}

            <div className="bg-white border border-[#D5CDC7] p-7 sm:p-12 lg:p-14 space-y-10">
              {post.sections.map((section) => (
                <div key={section.heading} className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#231815]">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((para) => (
                    <p key={para.slice(0, 32)} className="text-sm sm:text-base text-[#584C46] leading-[1.8]">
                      {para}
                    </p>
                  ))}
                </div>
              ))}

              {post.pullQuote && (
                <blockquote className="pl-6 border-l-2 border-[#513229] bg-[#FAF8F6] py-6 pr-6 border-y border-r border-y-[#E8E3DF] border-r-[#E8E3DF]">
                  <p className="text-base sm:text-lg font-semibold text-[#231815] leading-relaxed">
                    &ldquo;{post.pullQuote}&rdquo;
                  </p>
                  <footer className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#513229]">
                    {post.author.name} &mdash; {post.author.role}
                  </footer>
                </blockquote>
              )}
            </div>

            {/* Next Essay Strip */}
            <div className="mt-10 pt-8 border-t border-[#D5CDC7] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#82756E] block mb-1">
                  Up Next in the Journal
                </span>
                <Link
                  to={`/blog/${nextPost.slug}`}
                  className="text-base sm:text-lg font-extrabold text-[#231815] hover:text-[#513229] transition-colors"
                >
                  {nextPost.title} &rarr;
                </Link>
              </div>

              <Link
                to="/blog"
                className="text-xs font-bold uppercase tracking-[0.18em] text-[#513229] hover:text-[#231815] shrink-0"
              >
                All Essays
              </Link>
            </div>
          </div>
        </Container>
      </article>
    </>
  );
}

export default BlogPostPage;
