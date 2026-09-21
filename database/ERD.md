# Movic Audits Database ERD

## 1. Purpose

This document defines the Entity Relationship Diagram (ERD) for the Movic Audits application.

The ERD describes:

* Database entities
* Primary keys
* Foreign keys
* Relationships
* Cardinality
* Important constraints
* Data ownership
* Relationship behavior

The Laravel migrations and Eloquent models should implement this structure unless a documented architectural decision changes it.

---

# 2. High-Level ERD

```text
┌──────────────────────┐
│        users         │
├──────────────────────┤
│ PK id                │
│ name                 │
│ email                │
│ password             │
│ role                 │
│ remember_token       │
│ created_at           │
│ updated_at           │
└──────────┬───────────┘
           │
           │ 1:N
           ├─────────────────────────────┐
           │                             │
           ▼                             ▼
┌──────────────────────┐       ┌──────────────────────┐
│        media         │       │     blog_posts      │
├──────────────────────┤       ├──────────────────────┤
│ PK id                │       │ PK id                │
│ disk                 │       │ FK category_id       │
│ path                 │       │ FK author_id         │
│ original_name        │       │ FK featured_media_id│
│ mime_type            │       │ title                │
│ size                 │       │ slug                 │
│ alt_text             │       │ excerpt              │
│ FK uploaded_by       │       │ content              │
│ created_at           │       │ status               │
│ updated_at           │       │ published_at         │
└──────────┬───────────┘       │ seo_title            │
           │                   │ seo_description      │
           │                   │ created_at           │
           │                   │ updated_at           │
           │                   └──────────┬───────────┘
           │                              │
           │                              │ N:1
           │                              ▼
           │                   ┌──────────────────────┐
           │                   │   blog_categories   │
           │                   ├──────────────────────┤
           │                   │ PK id                │
           │                   │ name                 │
           │                   │ slug                 │
           │                   │ description          │
           │                   │ created_at           │
           │                   │ updated_at           │
           │                   └──────────────────────┘
           │
           │
           ├─────────────────────────────────────┐
           │                                     │
           ▼                                     ▼
┌──────────────────────┐             ┌──────────────────────┐
│       services       │             │    testimonials      │
├──────────────────────┤             ├──────────────────────┤
│ PK id                │             │ PK id                │
│ title                │             │ client_name          │
│ slug                 │             │ content              │
│ short_description    │             │ FK client_image...   │
│ description          │             │ status               │
│ FK media_id          │             │ sort_order           │
│ status               │             │ created_at           │
│ sort_order           │             │ updated_at           │
│ created_at           │             └──────────────────────┘
│ updated_at           │
└──────────┬───────────┘
           │
           │ 1:N
           ▼
┌──────────────────────┐
│       bookings       │
├──────────────────────┤
│ PK id                │
│ name                 │
│ email                │
│ phone                │
│ FK service_id        │
│ event_date           │
│ event_location       │
│ message              │
│ status               │
│ internal_notes       │
│ created_at           │
│ updated_at           │
└──────────────────────┘


┌──────────────────────────┐
│  portfolio_categories    │
├──────────────────────────┤
│ PK id                    │
│ name                     │
│ slug                     │
│ description              │
│ sort_order               │
│ created_at               │
│ updated_at               │
└────────────┬─────────────┘
             │
             │ 1:N
             ▼
┌──────────────────────────┐
│    portfolio_albums      │
├──────────────────────────┤
│ PK id                    │
│ FK category_id           │
│ title                    │
│ slug                     │
│ description              │
│ FK cover_media_id        │
│ status                   │
│ featured                 │
│ sort_order               │
│ created_at               │
│ updated_at               │
└────────────┬─────────────┘
             │
             │ 1:N
             ▼
┌──────────────────────────┐
│    portfolio_images      │
├──────────────────────────┤
│ PK id                    │
│ FK album_id              │
│ FK media_id              │
│ caption                  │
│ alt_text                 │
│ sort_order               │
│ created_at               │
│ updated_at               │
└──────────────────────────┘


┌──────────────────────────┐
│     contact_messages     │
├──────────────────────────┤
│ PK id                    │
│ name                     │
│ email                    │
│ phone                    │
│ subject                  │
│ message                  │
│ status                   │
│ created_at               │
│ updated_at               │
└──────────────────────────┘
```

---

# 3. Relationship Summary

| Parent Entity     | Child Entity   | Relationship                     |
| ----------------- | -------------- | -------------------------------- |
| User              | Media          | One-to-many                      |
| User              | BlogPost       | One-to-many                      |
| Media             | Service        | One-to-many / optional reference |
| Media             | PortfolioAlbum | One-to-many / optional reference |
| Media             | PortfolioImage | One-to-many                      |
| Media             | BlogPost       | One-to-many / optional reference |
| Media             | Testimonial    | One-to-many / optional reference |
| Service           | Booking        | One-to-many                      |
| PortfolioCategory | PortfolioAlbum | One-to-many                      |
| PortfolioAlbum    | PortfolioImage | One-to-many                      |
| BlogCategory      | BlogPost       | One-to-many                      |
| BlogPost          | BlogCategory   | Many-to-one                      |
| Booking           | Service        | Many-to-one / optional           |
| PortfolioImage    | Media          | Many-to-one                      |

---

# 4. Users Entity

## Table

```text
users
```

## Primary Key

```text
id
```

## Important fields

```text
id
name
email
password
role
remember_token
created_at
updated_at
```

## Relationships

```text
User
 ├── hasMany Media
 └── hasMany BlogPosts
```

### Relationship diagram

```text
User
 │
 ├──────────────< Media
 │
 └──────────────< BlogPost
```

A user represents an authenticated application user.

The initial implementation uses the user entity primarily for administrators.

---

# 5. Media Entity

## Table

```text
media
```

## Primary Key

```text
id
```

## Foreign Key

```text
uploaded_by → users.id
```

## Important fields

```text
id
disk
path
original_name
mime_type
size
alt_text
uploaded_by
created_at
updated_at
```

## Relationships

```text
Media
 └── belongsTo User
```

Media is also referenced by several content entities.

```text
Media
 ├── referenced by Services
 ├── referenced by PortfolioAlbums
 ├── referenced by PortfolioImages
 ├── referenced by BlogPosts
 └── referenced by Testimonials
```

The database stores media metadata and storage references rather than binary file contents.

---

# 6. Services Entity

## Table

```text
services
```

## Primary Key

```text
id
```

## Foreign Key

```text
media_id → media.id
```

The media relationship is optional because a service may exist before an image is assigned.

## Important fields

```text
id
title
slug
short_description
description
media_id
status
sort_order
created_at
updated_at
```

## Relationships

```text
Service
 ├── belongsTo Media
 └── hasMany Bookings
```

### Diagram

```text
Media
  │
  │ 0:N
  ▼
Service
  │
  │ 1:N
  ▼
Booking
```

---

# 7. Portfolio Category Entity

## Table

```text
portfolio_categories
```

## Primary Key

```text
id
```

## Important fields

```text
id
name
slug
description
sort_order
created_at
updated_at
```

## Relationship

```text
PortfolioCategory
 └── hasMany PortfolioAlbums
```

### Diagram

```text
PortfolioCategory
        │
        │ 1:N
        ▼
PortfolioAlbum
```

A category can contain multiple portfolio albums.

---

# 8. Portfolio Album Entity

## Table

```text
portfolio_albums
```

## Primary Keys and Foreign Keys

```text
PK id
FK category_id → portfolio_categories.id
FK cover_media_id → media.id
```

## Important fields

```text
id
category_id
title
slug
description
cover_media_id
status
featured
sort_order
created_at
updated_at
```

## Relationships

```text
PortfolioAlbum
 ├── belongsTo PortfolioCategory
 ├── belongsTo Media (cover)
 └── hasMany PortfolioImages
```

### Diagram

```text
PortfolioCategory
        │
        │ 1:N
        ▼
PortfolioAlbum
        │
        │ 1:N
        ▼
PortfolioImage
```

---

# 9. Portfolio Image Entity

## Table

```text
portfolio_images
```

## Foreign Keys

```text
album_id → portfolio_albums.id
media_id → media.id
```

## Important fields

```text
id
album_id
media_id
caption
alt_text
sort_order
created_at
updated_at
```

## Relationships

```text
PortfolioImage
 ├── belongsTo PortfolioAlbum
 └── belongsTo Media
```

### Diagram

```text
PortfolioAlbum
      │
      │ 1:N
      ▼
PortfolioImage
      │
      │ N:1
      ▼
    Media
```

This design allows the same media architecture to be reused throughout the application.

---

# 10. Blog Category Entity

## Table

```text
blog_categories
```

## Primary Key

```text
id
```

## Important fields

```text
id
name
slug
description
created_at
updated_at
```

## Relationship

```text
BlogCategory
 └── hasMany BlogPosts
```

### Diagram

```text
BlogCategory
      │
      │ 1:N
      ▼
  BlogPost
```

---

# 11. Blog Post Entity

## Table

```text
blog_posts
```

## Foreign Keys

```text
category_id → blog_categories.id
author_id → users.id
featured_media_id → media.id
```

`category_id` and `featured_media_id` may be nullable depending on publishing requirements.

`author_id` should normally be required.

## Important fields

```text
id
category_id
author_id
featured_media_id
title
slug
excerpt
content
status
published_at
seo_title
seo_description
created_at
updated_at
```

## Relationships

```text
BlogPost
 ├── belongsTo BlogCategory
 ├── belongsTo User
 └── belongsTo Media
```

### Diagram

```text
BlogCategory ──────< BlogPost >────── User
                         │
                         ▼
                       Media
```

---

# 12. Testimonial Entity

## Table

```text
testimonials
```

## Foreign Key

```text
client_image_media_id → media.id
```

The client image is optional.

## Important fields

```text
id
client_name
content
client_image_media_id
status
sort_order
created_at
updated_at
```

## Relationship

```text
Testimonial
 └── belongsTo Media
```

Testimonials are reusable content blocks and can be displayed on multiple public pages.

---

# 13. Booking Entity

## Table

```text
bookings
```

## Foreign Key

```text
service_id → services.id
```

The service relationship may be nullable because a visitor may submit an enquiry without selecting a specific service.

## Important fields

```text
id
name
email
phone
service_id
event_date
event_location
message
status
internal_notes
created_at
updated_at
```

## Relationship

```text
Booking
 └── belongsTo Service
```

### Diagram

```text
Service
   │
   │ 1:N
   ▼
Booking
```

A booking retains its own customer-submitted information independently of the service record.

---

# 14. Contact Message Entity

## Table

```text
contact_messages
```

## Primary Key

```text
id
```

## Important fields

```text
id
name
email
phone
subject
message
status
created_at
updated_at
```

The contact message does not require a foreign-key relationship to a user or service.

Visitors can submit messages without having an account.

---

# 15. Complete Relationship Map

```text
                                  ┌─────────────┐
                                  │    Users    │
                                  └──────┬──────┘
                                         │
                           ┌─────────────┴─────────────┐
                           │                           │
                           ▼                           ▼
                    ┌─────────────┐              ┌─────────────┐
                    │    Media    │              │ Blog Posts  │
                    └──────┬──────┘              └──────┬──────┘
                           │                             │
          ┌────────────────┼───────────────┐            │
          │                │               │            ▼
          ▼                ▼               ▼      ┌──────────────┐
     ┌─────────┐     ┌────────────┐  ┌────────────┤ Blog Category │
     │Services │     │ Portfolio  │  │Testimonials└──────────────┘
     └────┬────┘     │   Albums   │  └────────────┘
          │           └─────┬──────┘
          │                 │
          ▼                 ▼
     ┌─────────┐     ┌────────────┐
     │Bookings │     │ Portfolio  │
     └─────────┘     │   Images   │
                     └─────┬──────┘
                           │
                           ▼
                        Media


       ┌───────────────────────┐
       │ Portfolio Categories  │
       └───────────┬───────────┘
                   │
                   ▼
             Portfolio Albums


       ┌───────────────────────┐
       │   Contact Messages    │
       └───────────────────────┘
```

---

# 16. Cardinality Reference

## Users → Media

```text
1 User
   └── 0..N Media
```

One administrator can upload many media records.

A media record belongs to one uploader unless the implementation explicitly allows system-generated media without an uploader.

---

## Users → Blog Posts

```text
1 User
   └── 0..N Blog Posts
```

One administrator can author multiple blog posts.

Each blog post has one primary author.

---

## Services → Bookings

```text
1 Service
   └── 0..N Bookings
```

A service can be selected by many booking enquiries.

A booking may have zero or one selected service.

---

## Portfolio Categories → Albums

```text
1 Portfolio Category
   └── 0..N Portfolio Albums
```

An album belongs to one category.

A category can contain many albums.

---

## Portfolio Albums → Images

```text
1 Portfolio Album
   └── 0..N Portfolio Images
```

An album can contain many images.

Each portfolio image belongs to one album.

---

## Media → Portfolio Images

```text
1 Media
   └── 0..N Portfolio Image References
```

A media record can potentially be referenced by more than one record.

The application should avoid unintended duplicate references where uniqueness is required by business rules.

---

## Blog Categories → Posts

```text
1 Blog Category
   └── 0..N Blog Posts
```

A blog post may belong to one category, depending on the final content requirements.

---

## Media → Blog Posts

```text
1 Media
   └── 0..N Blog Posts
```

A media record can serve as the featured image for blog content.

---

## Media → Testimonials

```text
1 Media
   └── 0..N Testimonials
```

A testimonial may optionally reference a client image.

---

# 17. Optional Relationships

The following relationships should be nullable where appropriate:

```text
services.media_id
portfolio_albums.cover_media_id
blog_posts.category_id
blog_posts.featured_media_id
testimonials.client_image_media_id
bookings.service_id
```

This prevents the database from requiring information that is not always available.

---

# 18. Required Relationships

The following relationships should normally be required:

```text
portfolio_albums.category_id
portfolio_images.album_id
portfolio_images.media_id
blog_posts.author_id
media.uploaded_by
```

These relationships represent core ownership or structural dependencies.

The exact nullability of `media.uploaded_by` may be adjusted if system-generated media is introduced.

---

# 19. Delete & Archive Relationships

The database must distinguish between deletion and archiving.

For content with historical business value:

```text
Archive
   ↓
Preserve record
   ↓
Hide from normal public queries
```

This is preferable to deleting records that may be referenced by historical bookings or reports.

Examples:

```text
Service → archived
BlogPost → archived
PortfolioAlbum → archived
Testimonial → archived
```

Bookings and contact messages should normally be preserved rather than automatically deleted.

---

# 20. Media Reference Rules

Media is a shared resource.

Before permanently deleting a media record, the application should determine whether it is referenced by:

```text
services.media_id
portfolio_albums.cover_media_id
portfolio_images.media_id
blog_posts.featured_media_id
testimonials.client_image_media_id
```

If a media record is still referenced, deletion should either:

* Be prevented,
* Require reassignment,
* Or be handled through a controlled cleanup process.

The physical file should not be deleted simply because one reference was removed.

---

# 21. Database Constraints

The following constraints should be enforced where practical.

### Unique

```text
users.email
services.slug
portfolio_categories.slug
portfolio_albums.slug
blog_categories.slug
blog_posts.slug
```

### Foreign keys

```text
media.uploaded_by
services.media_id
portfolio_albums.category_id
portfolio_albums.cover_media_id
portfolio_images.album_id
portfolio_images.media_id
blog_posts.category_id
blog_posts.author_id
blog_posts.featured_media_id
testimonials.client_image_media_id
bookings.service_id
```

### Required values

Fields required for the application's core functionality should be non-null.

---

# 22. Recommended Indexes

The following indexes should be considered during migration creation.

```text
users
 └── email UNIQUE

media
 └── uploaded_by

services
 ├── slug UNIQUE
 ├── status
 └── sort_order

portfolio_categories
 ├── slug UNIQUE
 └── sort_order

portfolio_albums
 ├── category_id
 ├── slug UNIQUE
 ├── status
 ├── featured
 └── sort_order

portfolio_images
 ├── album_id
 ├── media_id
 └── sort_order

blog_categories
 └── slug UNIQUE

blog_posts
 ├── category_id
 ├── author_id
 ├── slug UNIQUE
 ├── status
 └── published_at

testimonials
 ├── status
 └── sort_order

bookings
 ├── service_id
 ├── status
 ├── event_date
 └── created_at

contact_messages
 ├── status
 └── created_at
```

The final migration should only create indexes that provide a meaningful query benefit.

---

# 23. Eloquent Relationship Mapping

The intended Laravel relationship methods are approximately:

### User

```php
hasMany(Media::class, 'uploaded_by')
hasMany(BlogPost::class, 'author_id')
```

### Media

```php
belongsTo(User::class, 'uploaded_by')

hasMany(Service::class)
hasMany(PortfolioAlbum::class, 'cover_media_id')
hasMany(PortfolioImage::class)
hasMany(BlogPost::class, 'featured_media_id')
hasMany(Testimonial::class, 'client_image_media_id')
```

### Service

```php
belongsTo(Media::class)
hasMany(Booking::class)
```

### PortfolioCategory

```php
hasMany(PortfolioAlbum::class, 'category_id')
```

### PortfolioAlbum

```php
belongsTo(PortfolioCategory::class, 'category_id')
belongsTo(Media::class, 'cover_media_id')
hasMany(PortfolioImage::class, 'album_id')
```

### PortfolioImage

```php
belongsTo(PortfolioAlbum::class, 'album_id')
belongsTo(Media::class, 'media_id')
```

### BlogCategory

```php
hasMany(BlogPost::class, 'category_id')
```

### BlogPost

```php
belongsTo(BlogCategory::class, 'category_id')
belongsTo(User::class, 'author_id')
belongsTo(Media::class, 'featured_media_id')
```

### Testimonial

```php
belongsTo(Media::class, 'client_image_media_id')
```

### Booking

```php
belongsTo(Service::class, 'service_id')
```

---

# 24. Query Patterns

The database should support common application queries efficiently.

### Published services

```text
services
WHERE status = 'published'
ORDER BY sort_order
```

### Published portfolio

```text
portfolio_albums
WHERE status = 'published'
ORDER BY sort_order
```

### Featured portfolio

```text
portfolio_albums
WHERE status = 'published'
AND featured = true
```

### Published blog posts

```text
blog_posts
WHERE status = 'published'
AND published_at <= current time
ORDER BY published_at DESC
```

### New bookings

```text
bookings
WHERE status = 'new'
ORDER BY created_at DESC
```

### New contact messages

```text
contact_messages
WHERE status = 'new'
ORDER BY created_at DESC
```

These queries should be implemented through Eloquent/query builder rather than raw SQL unless there is a justified reason otherwise.

---

# 25. Public Data Flow

A typical public content query follows:

```text
React
  ↓
GET /api/v1/services
  ↓
Laravel Controller
  ↓
Service Model
  ↓
Eloquent Query
  ↓
MySQL
  ↓
ServiceResource
  ↓
JSON
  ↓
React
```

The public API should retrieve only content that is eligible for public display.

For example, draft services should not appear in the public services endpoint.

---

# 26. Administrative Data Flow

Administrative requests follow:

```text
React Admin
  ↓
Authenticated API Request
  ↓
Authentication Middleware
  ↓
Authorization
  ↓
Form Request Validation
  ↓
Controller
  ↓
Service Layer where required
  ↓
Eloquent
  ↓
MySQL
  ↓
API Resource
  ↓
JSON
  ↓
React Admin
```

Administrative responses may contain fields that are intentionally excluded from public responses.

---

# 27. No Generic CMS Table Initially

The ERD intentionally does not contain a generic:

```text
pages
```

or:

```text
content_blocks
```

table.

The initial website can manage its required dynamic entities directly.

This avoids creating a generic content-management system before the project has a demonstrated need for one.

If future requirements introduce:

* Dynamic About sections
* Editable homepage blocks
* Site-wide settings
* Navigation management
* Footer management

the schema can be extended deliberately.

---

# 28. No Payments Table Initially

The initial application does not implement online payments.

Therefore, there is no:

```text
payments
transactions
invoices
```

entity in the initial ERD.

If online payment functionality becomes a requirement, it should be designed separately rather than adding speculative payment tables now.

---

# 29. No Client Account Tables Initially

Visitors do not require customer accounts in the initial system.

Therefore, bookings and contact messages are associated with submitted contact information rather than a customer account.

This keeps the initial system simpler.

A client-account architecture can be introduced later if requirements change.

---

# 30. ERD Implementation Rules

The following rules apply when converting this ERD into Laravel migrations:

1. Create referenced tables before dependent tables.
2. Use foreign keys for real relationships.
3. Add unique constraints for public slugs.
4. Add indexes for common filtering and lookup fields.
5. Use nullable foreign keys where relationships are optional.
6. Avoid unnecessary polymorphic relationships.
7. Avoid unnecessary database duplication.
8. Preserve historical business records.
9. Use migrations as the authoritative schema definition.
10. Keep the ERD synchronized with meaningful schema changes.

---

# 31. Schema Change Process

When a database change is required:

```text
Requirement
    ↓
Review DATABASE.md
    ↓
Review ERD
    ↓
Determine relationship/constraint impact
    ↓
Create Laravel migration
    ↓
Update Eloquent models
    ↓
Update API Resources/validation
    ↓
Update tests
    ↓
Update DATABASE.md / ERD.md
```

Database changes should not be made only in a local MySQL interface without corresponding migration code.

---

# 32. Final ERD Reference

The core application relationship model can be summarized as:

```text
                         USERS
                           │
                 ┌─────────┴─────────┐
                 │                   │
                 ▼                   ▼
               MEDIA            BLOG POSTS
                 │                   │
        ┌────────┼────────┐          │
        │        │        │          ▼
        ▼        ▼        ▼     BLOG CATEGORIES
    SERVICES  PORTFOLIO  TESTIMONIALS
        │      ALBUMS
        │        │
        ▼        ▼
     BOOKINGS PORTFOLIO
              IMAGES
                 │
                 ▼
               MEDIA


PORTFOLIO CATEGORIES
          │
          ▼
   PORTFOLIO ALBUMS
          │
          ▼
   PORTFOLIO IMAGES
          │
          ▼
        MEDIA


CONTACT MESSAGES
```

The ERD establishes a normalized relational foundation for the application while keeping the initial database intentionally focused.

The Laravel migrations, models, API layer, and administrative interface should all remain consistent with this structure.
