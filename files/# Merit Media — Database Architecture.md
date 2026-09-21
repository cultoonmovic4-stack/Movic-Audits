# Merit Media — Database Architecture

## 1. Purpose

This document defines the database architecture for the Merit Media website.

The database will use **MySQL** and will be accessed exclusively through the Laravel backend using **Eloquent ORM**.

The React frontend must never connect directly to MySQL.

The database is responsible for storing:

* Administrator accounts
* Services
* Portfolio categories and albums
* Portfolio images
* Blog categories and posts
* Testimonials
* Bookings/enquiries
* Contact messages
* Uploaded media metadata

The schema is designed to support the initial website while leaving room for future expansion.

---

# 2. Database Technology

| Item                | Technology                                          |
| ------------------- | --------------------------------------------------- |
| Database            | MySQL                                               |
| ORM                 | Laravel Eloquent                                    |
| Migrations          | Laravel migrations                                  |
| Seeders             | Laravel database seeders                            |
| Local database      | MySQL through Laragon                               |
| Production database | MySQL-compatible database                           |
| Character set       | `utf8mb4`                                           |
| Collation           | `utf8mb4_unicode_ci` or project-standard equivalent |

All tables should use:

* Primary key: `id`
* Auto-incrementing integer IDs unless there is a specific reason to use another identifier
* `created_at`
* `updated_at`

Laravel migrations are the source of truth for the physical schema.

---

# 3. Database Design Principles

The database should follow these principles:

1. **Data integrity**

   * Foreign keys should be used where relationships exist.
   * Required fields should be enforced at database level where practical.
   * Invalid relationships should not be allowed.

2. **Normalization**

   * Repeated data should not unnecessarily be duplicated.
   * Categories, media, users, and other reusable entities should have their own tables.

3. **Clear relationships**

   * Each relationship should have an explicit foreign key.
   * Relationship names should remain consistent across Laravel models.

4. **Maintainability**

   * Tables should represent clear business concepts.
   * Avoid generic tables whose purpose is difficult to understand.

5. **Performance**

   * Frequently queried columns should have appropriate indexes.
   * Slugs should be indexed and unique where appropriate.
   * Foreign keys should be indexed.

6. **Scalability**

   * The schema should allow additional services, portfolio projects, blog posts, testimonials and administrators without structural changes.

7. **Recoverability**

   * Content that administrators may accidentally remove should support soft deletion where appropriate.

---

# 4. Core Entities

The initial database contains the following major entities:

```text
Users
  │
  ├── Media
  │
  ├── Blog Posts
  │
  └── Administrative actions

Services
  │
  └── Bookings

Portfolio Categories
  │
  └── Portfolio Albums
          │
          └── Portfolio Images
                    │
                    └── Media

Blog Categories
  │
  └── Blog Posts
          │
          ├── User (author)
          └── Media (featured image)

Testimonials
  │
  └── Media (optional client image)

Contact Messages
```

---

# 5. Users Table

Laravel's `users` table will store administrator accounts.

## Table

`users`

## Purpose

Stores authenticated administrative users who can access the `/admin` area.

## Proposed fields

| Field            | Type         | Required | Description                    |
| ---------------- | ------------ | -------: | ------------------------------ |
| `id`             | BIGINT       |      Yes | Primary key                    |
| `name`           | VARCHAR(255) |      Yes | Administrator name             |
| `email`          | VARCHAR(255) |      Yes | Login email                    |
| `password`       | VARCHAR(255) |      Yes | Hashed password                |
| `role`           | VARCHAR(50)  |      Yes | Administrator role             |
| `remember_token` | VARCHAR(100) |       No | Laravel authentication support |
| `created_at`     | TIMESTAMP    |      Yes | Creation time                  |
| `updated_at`     | TIMESTAMP    |      Yes | Last update time               |

## Role

The initial system can use:

```text
admin
```

The database should still include a role field so additional roles can be introduced later without redesigning authentication.

Possible future roles include:

```text
admin
editor
manager
```

These roles are not required for the initial implementation.

## Constraints

* `email` must be unique.
* Passwords must never be stored in plain text.
* Authentication must be handled by Laravel.

---

# 6. Media Table

## Table

`media`

## Purpose

Stores metadata about uploaded files.

The actual binary files should be stored in the configured Laravel filesystem/storage system.

The database stores references and metadata rather than the binary file itself.

## Proposed fields

| Field           | Type         | Required | Description                |
| --------------- | ------------ | -------: | -------------------------- |
| `id`            | BIGINT       |      Yes | Primary key                |
| `uploaded_by`   | BIGINT       |       No | User who uploaded the file |
| `disk`          | VARCHAR(50)  |      Yes | Storage disk               |
| `path`          | VARCHAR(500) |      Yes | File storage path          |
| `original_name` | VARCHAR(255) |      Yes | Original filename          |
| `mime_type`     | VARCHAR(100) |      Yes | MIME type                  |
| `size`          | BIGINT       |      Yes | File size in bytes         |
| `alt_text`      | VARCHAR(255) |       No | Accessibility/SEO text     |
| `created_at`    | TIMESTAMP    |      Yes | Upload time                |
| `updated_at`    | TIMESTAMP    |      Yes | Last update time           |

## Relationship

```text
User 1 ──── * Media
```

An administrator can upload many media files.

## Notes

The `media` table allows images to be reused by different parts of the website.

For example, one uploaded image could potentially be used as:

* A service image
* A portfolio cover image
* A blog featured image

The system should avoid storing the same physical file multiple times unnecessarily.

---

# 7. Services Table

## Table

`services`

## Purpose

Stores the services offered by Merit Media.

## Proposed fields

| Field               | Type         | Required | Description              |
| ------------------- | ------------ | -------: | ------------------------ |
| `id`                | BIGINT       |      Yes | Primary key              |
| `title`             | VARCHAR(255) |      Yes | Service name             |
| `slug`              | VARCHAR(255) |      Yes | URL-friendly identifier  |
| `short_description` | TEXT         |       No | Short service summary    |
| `description`       | LONGTEXT     |      Yes | Full service description |
| `image_id`          | BIGINT       |       No | Associated media         |
| `status`            | VARCHAR(30)  |      Yes | Publication status       |
| `sort_order`        | INT          |      Yes | Display order            |
| `created_at`        | TIMESTAMP    |      Yes | Creation time            |
| `updated_at`        | TIMESTAMP    |      Yes | Last update time         |
| `deleted_at`        | TIMESTAMP    |       No | Soft deletion time       |

## Status

Initial values:

```text
draft
published
```

## Relationships

```text
Media 1 ──── * Services
Services 1 ──── * Bookings
```

A booking may optionally reference the service requested by the visitor.

---

# 8. Portfolio Categories Table

## Table

`portfolio_categories`

## Purpose

Groups portfolio projects into logical categories.

Examples might eventually include:

* Weddings
* Corporate
* Events
* Commercial
* Photography
* Videography

The actual categories will be determined from the finalized business content.

## Proposed fields

| Field         | Type         | Required | Description             |
| ------------- | ------------ | -------: | ----------------------- |
| `id`          | BIGINT       |      Yes | Primary key             |
| `name`        | VARCHAR(255) |      Yes | Category name           |
| `slug`        | VARCHAR(255) |      Yes | URL-friendly identifier |
| `description` | TEXT         |       No | Category description    |
| `sort_order`  | INT          |      Yes | Display order           |
| `created_at`  | TIMESTAMP    |      Yes | Creation time           |
| `updated_at`  | TIMESTAMP    |      Yes | Last update time        |

## Constraints

* `name` should be unique where appropriate.
* `slug` must be unique.

---

# 9. Portfolio Albums Table

## Table

`portfolio_albums`

## Purpose

Represents an individual portfolio project or album.

An album can contain multiple images.

## Proposed fields

| Field            | Type         | Required | Description             |
| ---------------- | ------------ | -------: | ----------------------- |
| `id`             | BIGINT       |      Yes | Primary key             |
| `category_id`    | BIGINT       |       No | Portfolio category      |
| `title`          | VARCHAR(255) |      Yes | Album/project title     |
| `slug`           | VARCHAR(255) |      Yes | URL-friendly identifier |
| `description`    | TEXT         |       No | Project description     |
| `cover_image_id` | BIGINT       |       No | Album cover image       |
| `status`         | VARCHAR(30)  |      Yes | Publication status      |
| `featured`       | BOOLEAN      |      Yes | Whether featured        |
| `sort_order`     | INT          |      Yes | Display order           |
| `created_at`     | TIMESTAMP    |      Yes | Creation time           |
| `updated_at`     | TIMESTAMP    |      Yes | Last update time        |
| `deleted_at`     | TIMESTAMP    |       No | Soft deletion time      |

## Relationships

```text
Portfolio Category 1 ──── * Portfolio Albums

Portfolio Album 1 ──── * Portfolio Images

Media 1 ──── * Portfolio Albums
```

An album can belong to one category.

An album can contain many images.

---

# 10. Portfolio Images Table

## Table

`portfolio_images`

## Purpose

Connects portfolio albums with uploaded media while storing album-specific information such as captions and display order.

## Proposed fields

| Field        | Type         | Required | Description            |
| ------------ | ------------ | -------: | ---------------------- |
| `id`         | BIGINT       |      Yes | Primary key            |
| `album_id`   | BIGINT       |      Yes | Portfolio album        |
| `media_id`   | BIGINT       |      Yes | Uploaded media         |
| `caption`    | VARCHAR(500) |       No | Optional image caption |
| `sort_order` | INT          |      Yes | Display order          |
| `created_at` | TIMESTAMP    |      Yes | Creation time          |
| `updated_at` | TIMESTAMP    |      Yes | Last update time       |

## Relationship

```text
Portfolio Album 1 ──── * Portfolio Images
Media 1 ──── * Portfolio Images
```

This separates file information from portfolio presentation information.

---

# 11. Blog Categories Table

## Table

`blog_categories`

## Purpose

Groups blog posts into categories.

## Proposed fields

| Field         | Type         | Required | Description             |
| ------------- | ------------ | -------: | ----------------------- |
| `id`          | BIGINT       |      Yes | Primary key             |
| `name`        | VARCHAR(255) |      Yes | Category name           |
| `slug`        | VARCHAR(255) |      Yes | URL-friendly identifier |
| `description` | TEXT         |       No | Category description    |
| `created_at`  | TIMESTAMP    |      Yes | Creation time           |
| `updated_at`  | TIMESTAMP    |      Yes | Last update time        |

## Constraints

* `name` should be unique.
* `slug` must be unique.

---

# 12. Blog Posts Table

## Table

`blog_posts`

## Purpose

Stores articles published on the Merit Media website.

## Proposed fields

| Field               | Type         | Required | Description                         |
| ------------------- | ------------ | -------: | ----------------------------------- |
| `id`                | BIGINT       |      Yes | Primary key                         |
| `category_id`       | BIGINT       |       No | Blog category                       |
| `author_id`         | BIGINT       |       No | User who created/published the post |
| `featured_image_id` | BIGINT       |       No | Featured media                      |
| `title`             | VARCHAR(255) |      Yes | Article title                       |
| `slug`              | VARCHAR(255) |      Yes | URL identifier                      |
| `excerpt`           | TEXT         |       No | Short article summary               |
| `content`           | LONGTEXT     |      Yes | Full article content                |
| `status`            | VARCHAR(30)  |      Yes | Publication status                  |
| `published_at`      | TIMESTAMP    |       No | Publication date                    |
| `seo_title`         | VARCHAR(255) |       No | SEO title                           |
| `seo_description`   | TEXT         |       No | SEO description                     |
| `created_at`        | TIMESTAMP    |      Yes | Creation time                       |
| `updated_at`        | TIMESTAMP    |      Yes | Last update time                    |
| `deleted_at`        | TIMESTAMP    |       No | Soft deletion time                  |

## Status

Initial values:

```text
draft
published
```

## Relationships

```text
Blog Category 1 ──── * Blog Posts

User 1 ──── * Blog Posts

Media 1 ──── * Blog Posts
```

A blog post may have one category, one author and one featured image.

---

# 13. Testimonials Table

## Table

`testimonials`

## Purpose

Stores client testimonials displayed throughout the website.

Testimonials are treated as reusable content rather than requiring a standalone public page.

## Proposed fields

| Field             | Type         | Required | Description           |
| ----------------- | ------------ | -------: | --------------------- |
| `id`              | BIGINT       |      Yes | Primary key           |
| `client_name`     | VARCHAR(255) |      Yes | Client name           |
| `content`         | TEXT         |      Yes | Testimonial text      |
| `client_image_id` | BIGINT       |       No | Optional client image |
| `status`          | VARCHAR(30)  |      Yes | Publication status    |
| `sort_order`      | INT          |      Yes | Display order         |
| `created_at`      | TIMESTAMP    |      Yes | Creation time         |
| `updated_at`      | TIMESTAMP    |      Yes | Last update time      |
| `deleted_at`      | TIMESTAMP    |       No | Soft deletion time    |

## Status

```text
draft
published
```

## Relationship

```text
Media 1 ──── * Testimonials
```

---

# 14. Bookings Table

## Table

`bookings`

## Purpose

Stores service enquiries and booking requests submitted through the website.

A booking is initially an enquiry. It does not automatically mean that the service has been confirmed.

## Proposed fields

| Field            | Type         | Required | Description             |
| ---------------- | ------------ | -------: | ----------------------- |
| `id`             | BIGINT       |      Yes | Primary key             |
| `service_id`     | BIGINT       |       No | Requested service       |
| `name`           | VARCHAR(255) |      Yes | Client name             |
| `email`          | VARCHAR(255) |      Yes | Client email            |
| `phone`          | VARCHAR(50)  |      Yes | Client phone            |
| `event_date`     | DATE         |       No | Requested event date    |
| `event_location` | VARCHAR(255) |       No | Event location          |
| `message`        | TEXT         |       No | Additional requirements |
| `status`         | VARCHAR(30)  |      Yes | Booking status          |
| `internal_notes` | TEXT         |       No | Private admin notes     |
| `created_at`     | TIMESTAMP    |      Yes | Submission time         |
| `updated_at`     | TIMESTAMP    |      Yes | Last update time        |
| `deleted_at`     | TIMESTAMP    |       No | Soft deletion time      |

## Status

Initial workflow:

```text
new
contacted
in_progress
confirmed
completed
cancelled
```

The exact workflow may be refined during implementation.

## Relationship

```text
Service 1 ──── * Bookings
```

`service_id` should be nullable because a visitor may submit a general enquiry without selecting a specific service.

---

# 15. Contact Messages Table

## Table

`contact_messages`

## Purpose

Stores messages submitted through the general contact form.

Contact messages are separate from booking requests because not every visitor contacting Merit Media is requesting a booking.

## Proposed fields

| Field        | Type         | Required | Description        |
| ------------ | ------------ | -------: | ------------------ |
| `id`         | BIGINT       |      Yes | Primary key        |
| `name`       | VARCHAR(255) |      Yes | Sender name        |
| `email`      | VARCHAR(255) |      Yes | Sender email       |
| `phone`      | VARCHAR(50)  |       No | Optional phone     |
| `subject`    | VARCHAR(255) |       No | Message subject    |
| `message`    | TEXT         |      Yes | Message content    |
| `status`     | VARCHAR(30)  |      Yes | Message status     |
| `created_at` | TIMESTAMP    |      Yes | Submission time    |
| `updated_at` | TIMESTAMP    |      Yes | Last update time   |
| `deleted_at` | TIMESTAMP    |       No | Soft deletion time |

## Status

Initial values:

```text
new
read
replied
archived
```

---

# 16. Entity Relationships

The main relationships are:

```text
USERS
  │
  ├───────────────< MEDIA
  │
  └───────────────< BLOG_POSTS
                         │
                         ├──── > BLOG_CATEGORIES
                         │
                         └──── > MEDIA


SERVICES
  │
  └───────────────< BOOKINGS


PORTFOLIO_CATEGORIES
  │
  └───────────────< PORTFOLIO_ALBUMS
                         │
                         ├──── > MEDIA (cover)
                         │
                         └────────────< PORTFOLIO_IMAGES
                                            │
                                            └──── > MEDIA


TESTIMONIALS
  │
  └──── > MEDIA


CONTACT_MESSAGES
```

Where:

```text
1 ──── *
```

means one-to-many.

And:

```text
* ──── 1
```

means many-to-one.

---

# 17. Foreign Key Rules

Foreign keys should enforce database relationships.

## Proposed foreign keys

### Media

```text
media.uploaded_by
    → users.id
```

### Services

```text
services.image_id
    → media.id
```

### Portfolio Albums

```text
portfolio_albums.category_id
    → portfolio_categories.id

portfolio_albums.cover_image_id
    → media.id
```

### Portfolio Images

```text
portfolio_images.album_id
    → portfolio_albums.id

portfolio_images.media_id
    → media.id
```

### Blog Posts

```text
blog_posts.category_id
    → blog_categories.id

blog_posts.author_id
    → users.id

blog_posts.featured_image_id
    → media.id
```

### Testimonials

```text
testimonials.client_image_id
    → media.id
```

### Bookings

```text
bookings.service_id
    → services.id
```

---

# 18. Delete Behavior

Foreign-key deletion behavior should be selected deliberately.

For example:

### Categories

A category should not be deleted automatically if doing so would unexpectedly delete associated content.

### Services

Deleting a service should not delete historical booking records.

Therefore, historical bookings should be allowed to remain even if a service is later archived or soft-deleted.

### Portfolio Albums

Deleting an album should not blindly delete the underlying media file if that media could be referenced elsewhere.

### Users

Deleting an administrator should not automatically delete blog posts they previously authored.

Historical content should remain intact.

The final migrations must explicitly define the desired `ON DELETE` behavior rather than relying on database defaults.

---

# 19. Soft Deletes

Soft deletion is recommended for content that administrators may accidentally remove.

Initial candidates:

```text
services
portfolio_albums
blog_posts
testimonials
bookings
contact_messages
```

Soft deletion allows the application to hide a record without immediately destroying it.

Media files require additional handling because deleting a database record does not necessarily mean the physical file should be removed.

Soft deletion behavior should be implemented consistently through Laravel's `SoftDeletes` functionality where used.

---

# 20. Status Fields

Status values should be controlled by application-level validation.

The initial status model is:

### Services

```text
draft
published
```

### Portfolio Albums

```text
draft
published
```

### Blog Posts

```text
draft
published
```

### Testimonials

```text
draft
published
```

### Bookings

```text
new
contacted
in_progress
confirmed
completed
cancelled
```

### Contact Messages

```text
new
read
replied
archived
```

The implementation should avoid allowing arbitrary status strings through the API.

---

# 21. Slugs

The following content types use slugs:

* Services
* Portfolio categories
* Portfolio albums
* Blog categories
* Blog posts

Example:

```text
title:
Wedding Photography

slug:
wedding-photography
```

Slugs should be:

* URL-safe
* Unique within their table
* Stable once published unless there is a deliberate reason to change them

If a published slug changes in the future, redirect handling may be required to protect existing links and SEO.

---

# 22. Indexing Strategy

The database should index fields commonly used for lookup, filtering and ordering.

## Recommended indexes

### Users

```text
email
```

### Services

```text
slug
status
sort_order
```

### Portfolio Categories

```text
slug
sort_order
```

### Portfolio Albums

```text
category_id
slug
status
featured
sort_order
```

### Portfolio Images

```text
album_id
sort_order
```

### Blog Categories

```text
slug
```

### Blog Posts

```text
category_id
author_id
slug
status
published_at
```

### Testimonials

```text
status
sort_order
```

### Bookings

```text
service_id
status
event_date
created_at
```

### Contact Messages

```text
status
created_at
```

---

# 23. Unique Constraints

The following fields should generally be unique:

```text
users.email

services.slug

portfolio_categories.slug

portfolio_albums.slug

blog_categories.slug

blog_posts.slug
```

Other uniqueness rules may be introduced only where the business requirements justify them.

For example, two portfolio projects may legitimately have similar titles, so uniqueness should primarily be enforced through the slug.

---

# 24. Timestamps

All primary application tables should use Laravel timestamps:

```text
created_at
updated_at
```

These provide basic audit information about when records were created and modified.

Where business requirements require more detailed audit history, an audit/logging system can be introduced separately rather than adding numerous timestamp columns to every table.

---

# 25. Homepage and About Page Data

The initial database design does **not** require a generic CMS table for every section of the homepage or About page.

Static or presentation-focused content can initially live in the React application.

Dynamic business content should come from the database, including:

* Services
* Portfolio
* Blog
* Testimonials
* Bookings
* Contact messages

If the business later requires administrators to edit homepage sections, About page sections, contact details, social links, FAQs or other site-wide settings, a dedicated content/settings architecture can be introduced.

This avoids creating a generic CMS before it is actually required.

---

# 26. No Direct Frontend Database Access

The React application must never contain:

* MySQL credentials
* Database connection strings
* Database passwords
* Direct SQL queries
* Eloquent code
* Private server credentials

The flow must always be:

```text
React
   ↓
Laravel API
   ↓
Eloquent
   ↓
MySQL
```

For example:

```text
React requests:

GET /api/services

        ↓

Laravel route

        ↓

Controller

        ↓

Service/query logic

        ↓

Eloquent

        ↓

MySQL

        ↓

JSON response

        ↓

React
```

---

# 27. Database Migrations

All schema changes must be made through Laravel migrations.

Example migration sequence:

```text
create_users_table
create_media_table
create_services_table
create_portfolio_categories_table
create_portfolio_albums_table
create_portfolio_images_table
create_blog_categories_table
create_blog_posts_table
create_testimonials_table
create_bookings_table
create_contact_messages_table
```

The exact migration filenames will be generated by Laravel.

Migrations must be committed to version control.

A developer setting up the project on another machine should be able to create the database schema using Laravel's migration commands without manually creating tables.

---

# 28. Database Seeders

Seeders should provide development/demo data for local development.

Possible seed data:

* One development administrator
* Several services
* Several portfolio categories
* Several portfolio albums
* Sample portfolio images or media records
* Several blog categories
* Sample blog posts
* Sample testimonials
* Sample bookings
* Sample contact messages

Production credentials and real client information must never be included in development seeders.

---

# 29. Development Database

The local environment will use MySQL through Laragon.

Expected database configuration will be provided through Laravel's `.env` file.

Example:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=merit_media
DB_USERNAME=root
DB_PASSWORD=
```

The actual credentials depend on the local Laragon configuration.

`.env` must not be committed to version control.

A `.env.example` file should document the required variables without containing real secrets.

---

# 30. Production Considerations

Production database configuration must be separated from local development.

Production should use:

* A dedicated database
* Strong database credentials
* Restricted database access
* Encrypted connections where supported
* Automated backups
* Monitoring
* Appropriate indexes
* Migration-based schema deployment

Production database credentials must never be stored in the React frontend.

---

# 31. Data Integrity Rules

The application should enforce the following principles:

### Bookings

A booking may reference a service, but the service relationship is optional.

### Portfolio

A portfolio image must belong to a valid portfolio album.

### Blog

A blog post may have an optional category and author relationship.

### Media

Removing a media record must not accidentally remove unrelated content that references the same physical file.

### Content status

Only records with an appropriate published status should appear on public-facing pages.

### Draft content

Draft content must remain inaccessible through public content endpoints unless an authenticated administrative preview mechanism is explicitly introduced.

---

# 32. Public vs Administrative Data Access

Not every database field should be returned by the public API.

For example, a booking record may contain:

```text
internal_notes
status
```

These are administrative fields and must never be exposed through public booking endpoints.

Similarly, user records must never expose:

```text
password
remember_token
```

Public API responses should use Laravel API Resources or equivalent response transformations to control exactly which fields are exposed.

---

# 33. Initial Database Scope

The initial database scope is intentionally limited to the core website requirements:

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

The following are intentionally **not** part of the initial schema:

```text
payments
orders
client_accounts
subscriptions
newsletter_subscribers
ecommerce_products
shopping_carts
mobile_app_data
advanced analytics
generic CMS pages
```

These can be introduced later if the requirements change.

---

# 34. Future Expansion

The database architecture leaves room for future features such as:

* Multiple administrator roles
* Advanced media libraries
* Service pricing packages
* Availability calendars
* Client accounts
* Online payments
* Newsletter management
* Email campaign integration
* FAQs
* Site settings
* Social media management
* SEO redirects
* Audit logs
* Advanced reporting
* Multiple languages

Future functionality should be added through deliberate schema changes rather than prematurely complicating the initial database.

---

# 35. Database Design Summary

The initial Merit Media database follows a straightforward relational structure:

```text
                         ┌─────────────┐
                         │    Users    │
                         └──────┬──────┘
                                │
                                ▼
                         ┌─────────────┐
                         │    Media    │
                         └──────┬──────┘
                                │
              ┌─────────────────┼─────────────────┐
              │                 │                 │
              ▼                 ▼                 ▼
        ┌──────────┐     ┌────────────┐    ┌──────────────┐
        │ Services │     │ Blog Posts │    │ Testimonials │
        └────┬─────┘     └────────────┘    └──────────────┘
             │
             ▼
        ┌──────────┐
        │ Bookings │
        └──────────┘


┌──────────────────────┐
│ Portfolio Categories │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  Portfolio Albums    │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  Portfolio Images    │
└──────────┬───────────┘
           │
           ▼
        ┌───────┐
        │ Media │
        └───────┘


┌──────────────────┐
│ Blog Categories  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│   Blog Posts     │
└──────────────────┘


┌────────────────────┐
│ Contact Messages   │
└────────────────────┘
```

The detailed visual ERD will be maintained separately in:

```text
database/ERD.md
```

That ERD should reflect the actual Laravel migrations once implementation begins.
