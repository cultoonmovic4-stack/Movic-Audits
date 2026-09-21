# Merit Media — Entity Relationship Diagram

## 1. Purpose

This document defines the entity relationships for the Merit Media database.

The ERD is the structural reference for:

* Laravel migrations
* Eloquent models
* Foreign keys
* Database constraints
* API relationships
* Admin content management

The database uses a relational MySQL structure.

---

# 2. High-Level ERD

```text
┌─────────────────────┐
│       users         │
├─────────────────────┤
│ PK id               │
│ name                │
│ email               │
│ password            │
│ role                │
│ remember_token      │
│ created_at          │
│ updated_at          │
└──────────┬──────────┘
           │
           │ 1
           │
           │ *
┌──────────▼──────────┐
│       media         │
├─────────────────────┤
│ PK id               │
│ FK uploaded_by      │
│ disk                │
│ path                │
│ original_name       │
│ mime_type           │
│ size                │
│ alt_text            │
│ created_at          │
│ updated_at          │
└──────┬───────┬──────┘
       │       │
       │       │
       │       ├───────────────────────┐
       │       │                       │
       │       ▼                       ▼
       │  ┌───────────────┐     ┌───────────────┐
       │  │   services    │     │ blog_posts    │
       │  ├───────────────┤     ├───────────────┤
       │  │ PK id         │     │ PK id         │
       │  │ title         │     │ category_id   │
       │  │ slug          │     │ author_id     │
       │  │ description   │     │ featured_img  │
       │  │ image_id      │     │ title         │
       │  │ status        │     │ slug          │
       │  │ sort_order    │     │ excerpt       │
       │  │ timestamps    │     │ content       │
       │  └───────┬───────┘     │ status        │
       │          │             │ published_at  │
       │          │             │ seo_title     │
       │          │             │ seo_description│
       │          │             └───────────────┘
       │          │
       │          ▼
       │  ┌───────────────┐
       │  │   bookings    │
       │  ├───────────────┤
       │  │ PK id         │
       │  │ service_id    │
       │  │ name          │
       │  │ email         │
       │  │ phone         │
       │  │ event_date    │
       │  │ event_location│
       │  │ message       │
       │  │ status        │
       │  │ internal_notes│
       │  └───────────────┘
       │
       ├───────────────────────────────┐
       │                               │
       ▼                               ▼
┌────────────────────┐        ┌─────────────────────┐
│   testimonials     │        │ portfolio_albums    │
├────────────────────┤        ├─────────────────────┤
│ PK id              │        │ PK id               │
│ client_name        │        │ category_id         │
│ content            │        │ title               │
│ client_image_id    │        │ slug                │
│ status             │        │ description         │
│ sort_order         │        │ cover_image_id      │
│ created_at         │        │ status              │
│ updated_at         │        │ featured            │
└────────────────────┘        │ sort_order          │
                              └──────────┬──────────┘
                                         │
                                         │ 1
                                         │
                                         │ *
                              ┌──────────▼──────────┐
                              │ portfolio_images    │
                              ├─────────────────────┤
                              │ PK id               │
                              │ album_id            │
                              │ media_id            │
                              │ caption             │
                              │ sort_order          │
                              │ created_at          │
                              │ updated_at          │
                              └─────────────────────┘
```

---

# 3. Portfolio Relationships

```text
┌─────────────────────────┐
│ portfolio_categories    │
├─────────────────────────┤
│ PK id                   │
│ name                    │
│ slug                    │
│ description             │
│ sort_order              │
│ created_at              │
│ updated_at              │
└────────────┬────────────┘
             │
             │ 1
             │
             │ *
┌────────────▼────────────┐
│ portfolio_albums        │
├─────────────────────────┤
│ PK id                   │
│ FK category_id          │
│ title                   │
│ slug                    │
│ description             │
│ FK cover_image_id       │
│ status                  │
│ featured                │
│ sort_order              │
│ created_at              │
│ updated_at              │
│ deleted_at              │
└────────────┬────────────┘
             │
             │ 1
             │
             │ *
┌────────────▼────────────┐
│ portfolio_images        │
├─────────────────────────┤
│ PK id                   │
│ FK album_id             │
│ FK media_id             │
│ caption                 │
│ sort_order              │
│ created_at              │
│ updated_at              │
└────────────┬────────────┘
             │
             │ *
             │
             │ 1
┌────────────▼────────────┐
│         media           │
├─────────────────────────┤
│ PK id                   │
│ FK uploaded_by          │
│ disk                    │
│ path                    │
│ original_name           │
│ mime_type               │
│ size                    │
│ alt_text                │
│ created_at              │
│ updated_at              │
└─────────────────────────┘
```

## Portfolio cardinality

```text
Portfolio Category
       1
       │
       │ has many
       ▼
Portfolio Albums
       1
       │
       │ has many
       ▼
Portfolio Images
       │
       │ references
       ▼
     Media
```

A category can contain many albums.

An album can contain many portfolio images.

Each portfolio image references one media record.

---

# 4. Blog Relationships

```text
┌─────────────────────────┐
│    blog_categories      │
├─────────────────────────┤
│ PK id                   │
│ name                    │
│ slug                    │
│ description             │
│ created_at              │
│ updated_at              │
└────────────┬────────────┘
             │
             │ 1
             │
             │ *
┌────────────▼────────────┐
│       blog_posts        │
├─────────────────────────┤
│ PK id                   │
│ FK category_id          │
│ FK author_id            │
│ FK featured_image_id    │
│ title                   │
│ slug                    │
│ excerpt                 │
│ content                 │
│ status                  │
│ published_at            │
│ seo_title               │
│ seo_description         │
│ created_at              │
│ updated_at              │
│ deleted_at              │
└──────┬──────────┬───────┘
       │          │
       │          │
       ▼          ▼
     users       media
```

## Blog cardinality

```text
Blog Category
      1
      │
      │ has many
      ▼
Blog Posts
      │
      ├──────────> User
      │             author
      │
      └──────────> Media
                    featured image
```

A blog post belongs to zero or one category.

A user can author many blog posts.

A blog post can have zero or one featured image.

---

# 5. Service and Booking Relationships

```text
┌─────────────────────────┐
│        services         │
├─────────────────────────┤
│ PK id                   │
│ title                   │
│ slug                    │
│ short_description       │
│ description             │
│ FK image_id             │
│ status                  │
│ sort_order              │
│ created_at              │
│ updated_at              │
│ deleted_at              │
└────────────┬────────────┘
             │
             │ 1
             │
             │ *
┌────────────▼────────────┐
│        bookings         │
├─────────────────────────┤
│ PK id                   │
│ FK service_id           │
│ name                    │
│ email                   │
│ phone                   │
│ event_date              │
│ event_location          │
│ message                 │
│ status                  │
│ internal_notes          │
│ created_at              │
│ updated_at              │
│ deleted_at              │
└─────────────────────────┘
```

## Important relationship rule

`bookings.service_id` is nullable.

This allows a visitor to submit a general enquiry without selecting a particular service.

A booking should remain historically meaningful even if the associated service is later archived.

---

# 6. User Relationships

```text
                     ┌────────────────────┐
                     │       users        │
                     ├────────────────────┤
                     │ PK id              │
                     │ name               │
                     │ email              │
                     │ password           │
                     │ role               │
                     └──────┬─────┬───────┘
                            │     │
                  ┌─────────┘     └──────────┐
                  │                          │
                  ▼                          ▼
             ┌─────────┐               ┌────────────┐
             │  media  │               │ blog_posts │
             └─────────┘               └────────────┘
```

A user may:

* Upload many media files
* Author many blog posts

The initial system uses administrators as the primary authenticated users.

---

# 7. Testimonial Relationships

```text
┌─────────────────────────┐
│      testimonials       │
├─────────────────────────┤
│ PK id                   │
│ client_name             │
│ content                 │
│ FK client_image_id      │
│ status                  │
│ sort_order              │
│ created_at              │
│ updated_at              │
│ deleted_at              │
└────────────┬────────────┘
             │
             │ optional
             ▼
┌─────────────────────────┐
│         media           │
└─────────────────────────┘
```

A testimonial may have an optional client image.

Testimonials can be displayed on multiple public pages without duplicating their database records.

---

# 8. Contact Messages

Contact messages are intentionally independent from bookings.

```text
┌─────────────────────────┐
│    contact_messages     │
├─────────────────────────┤
│ PK id                   │
│ name                    │
│ email                   │
│ phone                   │
│ subject                 │
│ message                 │
│ status                  │
│ created_at              │
│ updated_at              │
│ deleted_at              │
└─────────────────────────┘
```

There is no required relationship between a contact message and a booking.

This keeps the two communication workflows separate:

```text
General contact
      │
      ▼
Contact Messages


Service enquiry
      │
      ▼
Bookings
```

---

# 9. Complete Relationship Map

The complete relationship model can be summarized as:

```text
USERS
 │
 ├──────────────< MEDIA
 │                  │
 │                  ├──────────────< PORTFOLIO_IMAGES
 │                  │
 │                  ├──────────────< SERVICES
 │                  │
 │                  ├──────────────< BLOG_POSTS
 │                  │
 │                  └──────────────< TESTIMONIALS
 │
 └──────────────< BLOG_POSTS


SERVICES
 │
 └──────────────< BOOKINGS


PORTFOLIO_CATEGORIES
 │
 └──────────────< PORTFOLIO_ALBUMS
                         │
                         └──────────────< PORTFOLIO_IMAGES


BLOG_CATEGORIES
 │
 └──────────────< BLOG_POSTS
```

---

# 10. Relationship Cardinality Table

| Parent             | Child           | Relationship | Required                 |
| ------------------ | --------------- | ------------ | ------------------------ |
| User               | Media           | One-to-many  | Optional uploader        |
| User               | Blog Post       | One-to-many  | Optional author          |
| Media              | Service         | One-to-many  | Optional service image   |
| Media              | Portfolio Album | One-to-many  | Optional cover           |
| Media              | Portfolio Image | One-to-many  | Required                 |
| Media              | Blog Post       | One-to-many  | Optional featured image  |
| Media              | Testimonial     | One-to-many  | Optional client image    |
| Service            | Booking         | One-to-many  | Booking service optional |
| Portfolio Category | Portfolio Album | One-to-many  | Category optional        |
| Portfolio Album    | Portfolio Image | One-to-many  | Required                 |
| Blog Category      | Blog Post       | One-to-many  | Category optional        |

---

# 11. Foreign Key Map

```text
media.uploaded_by
    → users.id

services.image_id
    → media.id

portfolio_albums.category_id
    → portfolio_categories.id

portfolio_albums.cover_image_id
    → media.id

portfolio_images.album_id
    → portfolio_albums.id

portfolio_images.media_id
    → media.id

blog_posts.category_id
    → blog_categories.id

blog_posts.author_id
    → users.id

blog_posts.featured_image_id
    → media.id

testimonials.client_image_id
    → media.id

bookings.service_id
    → services.id
```

---

# 12. Delete and Archive Relationships

Relationships must protect historical data.

## Services → Bookings

A service should not be physically deleted in a way that destroys historical booking information.

Recommended behavior:

```text
Service deleted/archived
        │
        └──> Existing bookings remain
```

The application may retain the service relationship while the service is soft-deleted, depending on the final migration strategy.

---

## Portfolio Albums → Portfolio Images

Removing an album should remove or detach its portfolio-image records according to the final migration strategy.

The physical media files should not automatically be deleted merely because a portfolio relationship was removed.

---

## Users → Blog Posts

Removing an administrator should not remove the blog posts they authored.

Historical blog content must remain intact.

The final implementation may use nullable `author_id` when an administrator is removed.

---

# 13. Public Content Relationships

Public pages should consume only appropriate published records.

For example:

```text
GET /api/services
        │
        ▼
services
        │
        └── status = published
```

Similarly:

```text
GET /api/blog
        │
        ▼
blog_posts
        │
        └── status = published
```

And:

```text
GET /api/portfolio
        │
        ▼
portfolio_albums
        │
        └── status = published
```

Draft records remain administrative data.

---

# 14. Admin Relationships

The admin application operates across the same relational structure.

```text
Admin
  │
  ├── Manage Services
  │       └── Service → Media
  │
  ├── Manage Portfolio
  │       ├── Category
  │       ├── Album
  │       ├── Images
  │       └── Media
  │
  ├── Manage Blog
  │       ├── Category
  │       ├── Post
  │       ├── Author
  │       └── Featured Media
  │
  ├── Manage Testimonials
  │       └── Media
  │
  ├── Manage Bookings
  │       └── Service
  │
  └── Manage Contact Messages
```

---

# 15. Eloquent Model Mapping

The initial Laravel models should correspond closely to the database entities.

```text
User
Media
Service
PortfolioCategory
PortfolioAlbum
PortfolioImage
BlogCategory
BlogPost
Testimonial
Booking
ContactMessage
```

Example relationship definitions conceptually:

```php
// Service
public function image()
{
    return $this->belongsTo(Media::class, 'image_id');
}

public function bookings()
{
    return $this->hasMany(Booking::class);
}
```

```php
// PortfolioAlbum
public function category()
{
    return $this->belongsTo(PortfolioCategory::class);
}

public function coverImage()
{
    return $this->belongsTo(Media::class, 'cover_image_id');
}

public function images()
{
    return $this->hasMany(PortfolioImage::class, 'album_id');
}
```

```php
// PortfolioImage
public function album()
{
    return $this->belongsTo(PortfolioAlbum::class);
}

public function media()
{
    return $this->belongsTo(Media::class);
}
```

```php
// BlogPost
public function category()
{
    return $this->belongsTo(BlogCategory::class);
}

public function author()
{
    return $this->belongsTo(User::class, 'author_id');
}

public function featuredImage()
{
    return $this->belongsTo(Media::class, 'featured_image_id');
}
```

The actual implementations will be created during Laravel backend development.

---

# 16. Database Naming Conventions

Laravel conventions should be followed.

## Tables

Use plural snake_case:

```text
users
media
services
portfolio_categories
portfolio_albums
portfolio_images
blog_categories
blog_posts
testimonials
bookings
contact_messages
```

## Primary keys

Use:

```text
id
```

## Foreign keys

Use:

```text
<singular_table_name>_id
```

Examples:

```text
service_id
category_id
album_id
media_id
author_id
```

## Boolean fields

Use descriptive names:

```text
featured
```

## Ordering fields

Use:

```text
sort_order
```

---

# 17. ERD Implementation Rule

The ERD is a design reference, not a replacement for Laravel migrations.

The implementation sequence should be:

```text
ERD
  ↓
Laravel migrations
  ↓
Database
  ↓
Eloquent models
  ↓
API resources/controllers
  ↓
React application
```

If the actual requirements change during implementation, the ERD and migrations must be updated together.

---

# 18. Schema Change Policy

Any change to the database structure should update:

1. `DATABASE.md`
2. `database/ERD.md`
3. Laravel migration(s)
4. Relevant Eloquent model(s)
5. API documentation where applicable
6. Frontend types/services where applicable
7. Seeders/tests where applicable

Database changes should not be made only inside the database manually.

The migration history must remain reproducible.

---

# 19. Final Initial Schema

The initial schema consists of:

```text
users
media

services

portfolio_categories
portfolio_albums
portfolio_images

blog_categories
blog_posts

testimonials

bookings
contact_messages
```

This structure supports the initial Merit Media public website and administration system while keeping the database focused on actual application requirements.

Future features should extend this model through deliberate migrations rather than introducing unnecessary tables during the initial build.
