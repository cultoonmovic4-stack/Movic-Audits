# SEO Documentation

## 1. Purpose

Search engine optimization is a core requirement of the Movic Audits public website.

The SEO architecture should ensure that the site is:

* Discoverable by search engines
* Properly indexed
* Structured around meaningful URLs
* Accessible to search crawlers
* Fast and mobile-friendly
* Easy to share on social platforms
* Semantically structured
* Maintainable as content grows

SEO should be implemented as part of the application architecture rather than added only after development.

---

# 2. SEO Architecture

The public website uses React/Vite for the user interface and Laravel for the backend API.

SEO responsibilities are therefore divided between the frontend and backend.

```text id="m5x2qd"
React Frontend
├── Page titles
├── Meta descriptions
├── Canonical URLs
├── Open Graph metadata
├── Structured content presentation
├── Semantic HTML
└── SEO-friendly routing

Laravel Backend
├── Public content
├── Slugs
├── Published status
├── SEO fields
├── Sitemap data
└── Public API resources

Deployment
├── robots.txt
├── sitemap.xml
├── HTTPS
└── Performance
```

---

# 3. SEO Goals

The initial SEO implementation should support:

* Branded searches
* Service-related searches
* Portfolio discovery
* Blog discovery
* Local business visibility
* Social sharing
* Search-engine crawling
* Search-engine indexing
* Clear page relevance

SEO should prioritize useful content and technical quality rather than artificial keyword manipulation.

---

# 4. SEO-Friendly URLs

Public URLs should be short, readable, and meaningful.

Examples:

```text id="f0b9j7"
/about
/services
/services/wedding-photography
/services/video-production
/portfolio
/portfolio/project-name
/blog
/blog/article-title
/contact
/booking
```

Avoid URLs such as:

```text id="8c3y4r"
/page?id=42
/content.php?id=17
/service/123
```

Where content is identifiable by a slug, the slug should normally be used.

---

# 5. Slugs

Dynamic content should use unique slugs.

Applicable entities include:

* Services
* Portfolio albums
* Blog posts
* Blog categories
* Portfolio categories

Example:

```text id="q6m9c4"
Title:
Professional Event Photography

Slug:
professional-event-photography
```

Result:

```text id="p8v3x1"
/services/professional-event-photography
```

Slugs should be:

* Lowercase
* Human-readable
* URL-safe
* Unique within their resource
* Stable after publication where practical

---

# 6. Slug Changes

Changing a published slug can break existing links.

The initial implementation should therefore avoid unnecessary slug changes.

If slug history and redirects become necessary later, the backend can introduce a redirect mechanism.

Potential future structure:

```text id="8h1v6z"
Old URL
   ↓
301 Redirect
   ↓
New URL
```

This should only be introduced when there is an actual requirement.

---

# 7. Page Titles

Every indexable public page should have a meaningful `<title>`.

Examples:

```text id="q9r1mb"
Home:
Merit Media | Photography, Video & Media Services

About:
About Merit Media

Services:
Media Services | Merit Media

Portfolio:
Portfolio | Merit Media

Blog:
Blog | Merit Media

Contact:
Contact Merit Media
```

Dynamic pages should include the content title where appropriate.

Example:

```text id="u6j8k0"
Professional Event Photography | Merit Media
```

Titles should be descriptive rather than stuffed with repeated keywords.

---

# 8. Meta Descriptions

Important public pages should have unique meta descriptions.

A meta description should:

* Describe the page accurately
* Encourage useful search-result context
* Be unique where practical
* Avoid keyword stuffing

Examples:

```text id="x4g5b2"
Services:
Explore Merit Media's photography, video and media services for events, brands and organizations.

Portfolio:
Explore selected photography and video projects created by Merit Media.
```

Descriptions should be generated from meaningful page content rather than duplicated across the entire site.

---

# 9. Dynamic SEO Metadata

Dynamic content should support SEO metadata where useful.

Blog posts already include:

```text id="2n5w8k"
seo_title
seo_description
```

These fields may be used for:

* Page title
* Meta description
* Social metadata where appropriate

If custom SEO metadata is not provided, the application should fall back to the normal content title and excerpt.

---

# 10. Canonical URLs

Indexable public pages should have a canonical URL where appropriate.

Example:

```html id="l0z2cp"
<link rel="canonical" href="https://example.com/blog/example-post" />
```

Canonical URLs help search engines understand the preferred version of a page.

The canonical URL should use the production HTTPS domain.

---

# 11. Duplicate Content

The application should avoid creating unnecessary duplicate URLs.

Potential sources include:

* Multiple query-string variations
* Duplicate routes
* Unnecessary URL parameters
* Duplicate category paths
* Multiple representations of the same content

Where query parameters are required for filtering, they should generally not create unintended indexable duplicates.

---

# 12. Robots.txt

The production site should provide a `robots.txt` file.

Its purpose is to communicate crawling guidance to search engines.

Typical considerations include allowing public content while preventing crawling of private administrative routes.

For example, the admin area should not be intended for search indexing.

Conceptually:

```text id="z2t8qk"
User-agent: *
Disallow: /admin/
```

The exact production configuration should be verified against the deployed routing architecture.

---

# 13. Admin Pages and Search Engines

Administrative pages must not be publicly indexable.

This is primarily achieved through authentication and server-side access control.

The application should not rely solely on:

```html id="7r5s9m"
<meta name="robots" content="noindex">
```

to protect administrative content.

Authentication is the security mechanism.

---

# 14. XML Sitemap

The production website should provide an XML sitemap.

The sitemap should contain indexable public URLs such as:

```text id="g1x8n2"
/
/about
/services
/services/{slug}
/portfolio
/portfolio/{slug}
/blog
/blog/{slug}
/contact
/booking
```

Only appropriate public and indexable content should be included.

Draft and archived content should not appear in the sitemap.

---

# 15. Sitemap Generation

The sitemap may initially be generated dynamically from Laravel.

The backend can query:

* Published services
* Published portfolio albums
* Published blog posts
* Other indexable public content

This keeps the sitemap synchronized with the database.

A static sitemap can also be used if the site's content volume remains small, but dynamic generation provides a cleaner long-term approach.

---

# 16. Sitemap Metadata

Where supported, sitemap entries may include useful timestamps such as last modification dates.

The sitemap should not attempt to manipulate search rankings through arbitrary change frequencies or priority values.

The most important requirement is that the sitemap accurately represents the site's current indexable URLs.

---

# 17. Structured Data

Structured data may be used to help search engines understand the website.

Potential schema types include:

* Organization
* LocalBusiness where appropriate
* WebSite
* WebPage
* Article
* BreadcrumbList
* Service

The exact schema types should correspond to the actual content and business characteristics.

Structured data must describe real page content.

---

# 18. Organization Structured Data

The homepage may include organization-level structured data containing appropriate public business information.

Potential information includes:

```text id="x7k2p0"
Business Name
Website URL
Logo
Contact Information
Social Profiles
```

Only verified and publicly intended information should be included.

---

# 19. Local Business SEO

If Merit Media is targeting local searches, the site should provide consistent business information across its public website.

Important information can include:

* Business name
* Service area
* Contact details
* Location where publicly appropriate
* Opening/contact information where applicable

The same business information should be represented consistently wherever it appears.

---

# 20. Service SEO

Each important service should have a dedicated, indexable page.

Example:

```text id="u8c2d5"
Photography
Video Production
Event Coverage
Corporate Media
```

Service pages should contain useful information such as:

* Service title
* Description
* Relevant imagery
* Benefits or capabilities
* Portfolio examples
* Call to action
* Contact/booking pathway

The objective is to provide useful information rather than simply repeat keywords.

---

# 21. Portfolio SEO

Portfolio pages should have descriptive titles and URLs.

Portfolio albums should contain:

* Meaningful title
* Description where appropriate
* Descriptive image alternative text
* Relevant project information
* Appropriate metadata

Example:

```text id="e7q1p4"
/portfolio/corporate-event-coverage
```

Portfolio images should not rely solely on filenames for context.

---

# 22. Image SEO

Images should be optimized for both accessibility and search visibility.

Each meaningful image should have appropriate alternative text.

Example:

```text id="r4k8s2"
Good:
Photographer covering a corporate event in Kampala

Poor:
IMG_4827.jpg
```

Decorative images may use empty alternative text when appropriate.

---

# 23. Image Performance

Images should be appropriately sized and compressed.

Where supported, modern formats such as WebP may be used.

The frontend should consider:

* Responsive image sizes
* Lazy loading
* Appropriate dimensions
* Compression
* Browser caching
* Image placeholders where useful

Large original uploads should not automatically be served at full resolution to every visitor.

---

# 24. Semantic HTML

The public website should use meaningful semantic HTML.

Examples:

```html id="c7g1f4"
<header>
<nav>
<main>
<section>
<article>
<footer>
```

Headings should follow a logical hierarchy.

For example:

```text id="m0d5a2"
H1
 ├── H2
 │    ├── H3
 │    └── H3
 └── H2
```

Heading levels should not be selected merely for visual sizing.

---

# 25. Accessibility and SEO

Accessibility and SEO often reinforce each other.

The website should provide:

* Semantic HTML
* Descriptive links
* Meaningful headings
* Image alternative text
* Keyboard accessibility
* Form labels
* Useful error messages
* Responsive layouts

Accessibility requirements are documented further in `FRONTEND.md`.

---

# 26. Internal Linking

Public pages should link naturally to related content.

Examples:

```text id="v5x7h3"
Service Page
    ↓
Related Portfolio
    ↓
Booking / Contact

Blog Post
    ↓
Related Service
    ↓
Booking / Contact
```

Internal links help users discover content and help search engines understand relationships between pages.

---

# 27. Breadcrumbs

Breadcrumb navigation may be used on deeper public pages.

Example:

```text id="h3j8q5"
Home
  → Services
    → Professional Event Photography
```

Breadcrumbs can improve navigation and may also support `BreadcrumbList` structured data.

They should not be added where they provide no meaningful navigation benefit.

---

# 28. Blog SEO

Blog posts should provide:

* Unique title
* Unique URL
* Excerpt
* Useful body content
* Publication date
* Author information where appropriate
* Featured image
* Appropriate category
* SEO title where needed
* SEO description where needed

The content should be useful to visitors and written for humans first.

---

# 29. Blog Publication Status

Only published blog posts should be publicly indexable.

The backend must ensure that draft or archived content cannot accidentally appear through public API endpoints.

The frontend should not rely on hiding unpublished content as the only protection.

---

# 30. Social Sharing

Public pages should support social sharing metadata where useful.

Open Graph metadata may include:

```text id="p3k7n5"
og:title
og:description
og:url
og:image
og:type
```

Blog posts and portfolio pages should use relevant images when available.

---

# 31. Twitter/X Metadata

Where social sharing on X is relevant, the site may provide appropriate card metadata.

Potential fields include:

```text id="d9m2v1"
twitter:card
twitter:title
twitter:description
twitter:image
```

Social metadata should use the same underlying page information rather than introducing unnecessary duplicate content management.

---

# 32. SEO-Friendly Error Pages

The application should provide appropriate responses for:

```text id="q8f3s6"
404 Not Found
500 Server Error
```

A missing public resource should return an appropriate HTTP 404 response.

The frontend should display a useful user-facing 404 page rather than treating every missing page as successful content.

---

# 33. HTTP Status Codes and SEO

Correct HTTP status codes are important.

Examples:

```text id="t4h7n1"
200  Page/content exists
301  Permanent redirect
302  Temporary redirect where appropriate
404  Resource does not exist
410  Resource intentionally removed where appropriate
500  Server error
```

The application should avoid returning HTTP 200 for pages that do not actually exist.

---

# 34. Client-Side Routing Considerations

React Router provides the site's navigation experience, but deployment must ensure that direct requests to valid public routes resolve correctly.

For example:

```text id="q1z4p7"
/services
/blog
/portfolio/project-name
```

A visitor should be able to load these URLs directly rather than receiving a server-level 404 simply because the route is handled by React.

The production web server must therefore be configured appropriately for the frontend application.

---

# 35. Rendering Strategy

The initial architecture uses React/Vite.

SEO-sensitive content should therefore be implemented carefully.

The project should prioritize:

* Correct metadata
* Crawlable URLs
* Server-accessible public routes
* Sitemap
* Structured data
* Semantic HTML
* Fast page loading

If organic search becomes a major requirement and client-side rendering creates measurable limitations, server-side rendering or pre-rendering can be considered later.

This should be based on actual requirements rather than introducing unnecessary architecture prematurely.

---

# 36. Page Performance

Performance is an important SEO consideration.

The frontend should aim to minimize:

* JavaScript bundle size
* Unnecessary API requests
* Large images
* Render-blocking resources
* Layout shifts
* Unused dependencies

Recommended techniques include:

* Code splitting
* Lazy loading
* Image optimization
* Browser caching
* Efficient API requests
* Pagination
* Component reuse

---

# 37. Core Web Vitals

The website should be designed with modern performance measurements in mind.

Important areas include:

* Loading performance
* Responsiveness
* Visual stability

The exact measurements should be monitored after deployment using appropriate real-world or testing tools.

Performance work should be based on measured bottlenecks.

---

# 38. Mobile SEO

The public website must be fully responsive.

Important requirements include:

* Mobile-friendly layouts
* Readable text
* Proper viewport configuration
* Touch-friendly controls
* Responsive images
* No unnecessary horizontal scrolling

The mobile experience should not be treated as a secondary version of the website.

---

# 39. Search Console and Webmaster Tools

After deployment, the site may be connected to appropriate search-engine webmaster tools.

These tools can help monitor:

* Indexing
* Search queries
* Crawl issues
* Sitemap processing
* Search visibility
* Structured-data issues

These integrations are operational rather than core application dependencies.

---

# 40. Analytics

Analytics is not required for the core application architecture.

If analytics is introduced later, it should:

* Respect applicable privacy requirements
* Avoid collecting unnecessary information
* Be loaded efficiently
* Not interfere with core functionality
* Be documented as a third-party integration

Analytics should not become a prerequisite for the website to function.

---

# 41. SEO Content Management

The admin panel should make important SEO fields manageable where appropriate.

For blog posts:

```text id="u4n8r2"
SEO Title
SEO Description
```

For other content types, SEO fields should only be introduced if they provide clear value.

The project should avoid creating unnecessary generic SEO fields for every database table.

---

# 42. SEO Content Guidelines

Administrators should aim for:

* Clear page titles
* Accurate descriptions
* Descriptive URLs
* Useful content
* Meaningful headings
* Descriptive image alt text
* Natural internal links
* Accurate publication information

Avoid:

* Keyword stuffing
* Duplicate descriptions everywhere
* Misleading titles
* Hidden keyword text
* Automatically generated low-value pages
* Excessive duplicate category pages

---

# 43. SEO Checklist

Before launch:

### Technical SEO

* [ ] HTTPS enabled
* [ ] Public URLs work directly
* [ ] 404 page implemented
* [ ] Correct HTTP status codes
* [ ] robots.txt available
* [ ] XML sitemap available
* [ ] Canonical URLs configured
* [ ] Admin routes protected
* [ ] Draft content excluded from public indexing

### Metadata

* [ ] Page titles configured
* [ ] Meta descriptions configured
* [ ] Dynamic content metadata implemented
* [ ] Open Graph metadata implemented
* [ ] Social images configured where appropriate

### Content

* [ ] Services have descriptive pages
* [ ] Portfolio pages have meaningful titles
* [ ] Blog posts have useful metadata
* [ ] Images have appropriate alt text
* [ ] Headings are structured logically
* [ ] Internal links are meaningful

### Structured Data

* [ ] Organization/business schema reviewed
* [ ] Article schema reviewed
* [ ] Breadcrumb schema reviewed where applicable
* [ ] Structured data matches visible page content

### Performance

* [ ] Images optimized
* [ ] Lazy loading used where appropriate
* [ ] JavaScript bundles reviewed
* [ ] API requests optimized
* [ ] Mobile performance reviewed

---

# 44. Final SEO Architecture

The SEO model can be summarized as:

```text id="g6r1w8"
                 Public Website
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
     Content         Metadata       Structure
        │              │              │
        ▼              ▼              ▼
   Services         Titles        Semantic HTML
   Portfolio        Descriptions  Headings
   Blog             Canonicals    Internal Links
                    OG Tags
                    Schema
                       │
                       ▼
                  Search Crawlers
                       │
             ┌─────────┴─────────┐
             ▼                   ▼
         robots.txt          sitemap.xml
             │                   │
             └─────────┬─────────┘
                       ▼
                 Search Engines
```

The goal is to make the website technically accessible to search engines while providing genuinely useful public content.

SEO should therefore be treated as a combination of **technical architecture, content quality, accessibility, performance, and clear information structure**, rather than as a separate marketing layer added after development.
