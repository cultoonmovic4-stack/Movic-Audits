import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import Container from '../../components/ui/Container';
import SeoHead from '../../components/common/SeoHead';
import ImageReveal from '../../components/motion/ImageReveal';
import BLOG_POSTS from '../../data/blogPosts';

function formatLongDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatShortDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const leadPost = BLOG_POSTS[0];
  const archivePosts = BLOG_POSTS.slice(1);

  const categories = useMemo(() => {
    const map = new Map();
    BLOG_POSTS.forEach((post) => {
      if (post.category?.slug && post.category?.name) {
        map.set(post.category.slug, post.category.name);
      }
    });
    return Array.from(map.entries()).map(([slug, name]) => ({ slug, name }));
  }, []);

  // Avoid repeating the Cover Story photo directly underneath when viewing All Dispatches
  const visiblePosts =
    selectedCategory === 'all'
      ? archivePosts
      : BLOG_POSTS.filter((p) => p.category?.slug === selectedCategory);

  useEffect(() => {
    const isJsdom = typeof navigator !== 'undefined' && navigator.userAgent?.includes('jsdom');
    if (isJsdom || typeof window === 'undefined') return undefined;
    const frameId = requestAnimationFrame(() => AOS.refreshHard());
    return () => cancelAnimationFrame(frameId);
  }, [selectedCategory]);

  return (
    <>
      <SeoHead
        title="Journal & Field Notes"
        description="Essays, camera technical notes, and creative perspectives from the Movic Audits production team."
      />

      {/* Blog Hero — Print Broadsheet & Cover Story */}
      <section className="bg-white text-[#231815] border-b border-[#E8E3DF]">
        <Container className="pt-12 sm:pt-16 lg:pt-20 pb-14 sm:pb-20">
          {/* Top Magazine Masthead */}
          <div
            data-aos="fade-up"
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-8 mb-10 border-b border-[#D5CDC7]"
          >
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-[#513229]" aria-hidden="true" />
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#513229]">
                  Editorial &amp; Insights
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-extrabold tracking-tight leading-[1.05] text-[#231815]">
                Field Notes &amp; Technical Journal
              </h1>
            </div>

            <div className="lg:col-span-4 lg:text-right space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#513229] block">
                Movic Audits Press &middot; {String(BLOG_POSTS.length).padStart(2, '0')} Essays
              </span>
              <p className="text-xs sm:text-sm text-[#584C46] leading-relaxed">
                Essays on natural lighting, cinema optics, and disciplined production craft.
              </p>
            </div>
          </div>

          {/* Cover Story 7/5 Split */}
          {leadPost && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div data-aos="fade-up" data-aos-delay="80" className="lg:col-span-7">
                <Link
                  to={`/blog/${leadPost.slug}`}
                  className="group block border border-[#E8E3DF] hover:border-[#513229] transition-colors bg-[#231815]"
                >
                  <ImageReveal
                    src={leadPost.featured_media.url}
                    alt={leadPost.featured_media.alt_text || leadPost.title}
                    className="aspect-[16/10] w-full"
                    loading="eager"
                  />
                </Link>
              </div>

              <div data-aos="fade-up" data-aos-delay="140" className="lg:col-span-5">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#82756E] pb-4 mb-5 border-b border-[#E8E3DF]">
                  <span className="text-[#513229]">Cover Essay &middot; {leadPost.category.name}</span>
                  <span aria-hidden="true">/</span>
                  <span>{leadPost.readTime}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-[1.14] text-[#231815] mb-4">
                  <Link to={`/blog/${leadPost.slug}`} className="hover:text-[#513229] transition-colors">
                    {leadPost.title}
                  </Link>
                </h2>

                <p className="text-sm text-[#584C46] leading-relaxed mb-6">
                  {leadPost.excerpt}
                </p>

                <div className="flex items-center justify-between pt-5 border-t border-[#E8E3DF]">
                  <div className="text-[11px] text-[#82756E]">
                    <span className="font-bold text-[#231815] block">{leadPost.author.name}</span>
                    <span>{formatLongDate(leadPost.published_at)}</span>
                  </div>

                  <Link
                    to={`/blog/${leadPost.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-[#513229] hover:bg-[#3E251E] text-[#FAF8F6] text-xs font-bold uppercase tracking-[0.16em] rounded-xs transition-colors min-h-[42px]"
                  >
                    <span>Read Essay</span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* Journal Archive — Sticky Topics + Reading Column */}
      <section className="bg-[#F3EFEA] text-[#231815] border-b border-[#D5CDC7]">
        <Container className="py-14 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Sticky Topic Sidebar */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-[#513229]" aria-hidden="true" />
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#513229]">
                  Journal Index
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#231815] mb-6">
                Browse by Topic
              </h2>

              <nav aria-label="Filter journal by topic" className="space-y-1 mb-8">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left py-3 pl-4 pr-3 border-l-2 transition-colors cursor-pointer flex items-center justify-between text-xs font-bold uppercase tracking-[0.16em] ${
                    selectedCategory === 'all'
                      ? 'border-l-[#513229] bg-white text-[#231815]'
                      : 'border-l-[#D5CDC7] text-[#584C46] hover:border-l-[#513229] hover:text-[#231815]'
                  }`}
                >
                  <span>All Dispatches</span>
                  <span className="text-[#82756E]">{String(BLOG_POSTS.length).padStart(2, '0')}</span>
                </button>

                {categories.map((cat) => {
                  const count = BLOG_POSTS.filter((p) => p.category?.slug === cat.slug).length;
                  const isActive = selectedCategory === cat.slug;
                  return (
                    <button
                      key={cat.slug}
                      type="button"
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left py-3 pl-4 pr-3 border-l-2 transition-colors cursor-pointer flex items-center justify-between text-xs font-bold uppercase tracking-[0.16em] ${
                        isActive
                          ? 'border-l-[#513229] bg-white text-[#231815]'
                          : 'border-l-[#D5CDC7] text-[#584C46] hover:border-l-[#513229] hover:text-[#231815]'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[#82756E]">{String(count).padStart(2, '0')}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="bg-[#231815] text-[#FAF8F6] p-6 border border-[#3A2B26]">
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#A5BCD6] block mb-2.5">
                  Editorial Standard
                </span>
                <p className="text-xs text-[#C0B7B2] leading-relaxed">
                  Every essay is written firsthand from real sets, lighting diagrams, and post-production rooms in Kampala.
                </p>
              </div>
            </aside>

            {/* Right Stacked Reading Plates */}
            <div className="lg:col-span-8 space-y-8">
              {visiblePosts.map((post) => (
                <article
                  key={post.slug}
                  data-aos="fade-up"
                  className="bg-white border border-[#D5CDC7]"
                >
                  <div className="px-6 py-3.5 bg-[#FAF8F6] border-b border-[#E8E3DF] flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em]">
                    <span className="text-[#513229]">{post.issue} &middot; {post.category.name}</span>
                    <span className="text-[#82756E]">{post.readTime}</span>
                  </div>

                  <Link to={`/blog/${post.slug}`} className="block border-b border-[#E8E3DF] bg-[#231815]">
                    <ImageReveal
                      src={post.featured_media.url}
                      alt={post.featured_media.alt_text || post.title}
                      className="aspect-[16/9] w-full"
                    />
                  </Link>

                  <div className="p-7 sm:p-9">
                    <h3 className="text-2xl font-extrabold tracking-tight text-[#231815] leading-snug mb-3">
                      <Link to={`/blog/${post.slug}`} className="hover:text-[#513229] transition-colors">
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-sm text-[#584C46] leading-relaxed mb-6">
                      {post.excerpt}
                    </p>

                    <div className="pt-5 border-t border-[#E8E3DF] flex items-center justify-between text-xs">
                      <span className="text-[#82756E]">
                        <strong className="text-[#231815]">{post.author.name}</strong> &middot; {formatShortDate(post.published_at)}
                      </span>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="font-bold uppercase tracking-[0.16em] text-[#513229] hover:text-[#231815] transition-colors"
                      >
                        Read Full Essay &rarr;
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export default BlogPage;
