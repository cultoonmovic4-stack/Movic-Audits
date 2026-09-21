# Database Architecture & Schema

## 1. Purpose

The Merit Media application uses MySQL as its primary relational database.

The database stores the dynamic content, administrative data, enquiries, bookings, media metadata, and relationships required by the website.

Laravel and Eloquent are the only application-layer components that should communicate directly with the database.

The React frontend must never connect directly to MySQL.

---

# 2. Database Goals

The database design should provide:

* Clear relationships between entities
* Strong data integrity
* Appropriate indexes
* Predictable foreign-key behavior
* Efficient queries
* Support for administrative CRUD operations
* Support for public content retrieval
* Secure separation of public and internal data
* Future scalability without unnecessary complexity
* Easy migration and deployment through Laravel migrations

The initial schema should remain focused on the actual requirements of the website.

---

# 3. Database Technology

| Component         | Technology                     |
| ----------------- | ------------------------------ |
| Database          | MySQL                          |
| ORM               | Laravel Eloquent               |
| Schema management | Laravel Migrations             |
| Test data         | Laravel Factories              |
| Seed data         | Laravel Seeders                |
| Database design   | Relational                     |
| Primary keys      | BIGINT/standard Laravel IDs    |
| Timestamps        | `created_at`, `updated_at`     |
| Character set     | UTF-8 compatible configuration |
| Collation         | UTF-8 compatible collation     |

The exact MySQL version should be selected according to the supported Laravel version and production hosting environment.

---

# 4. Core Entities

The initial database contains the following primary entities:

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

Conceptually:

```text
Users
  │
  ├── Media uploads
  └── Blog posts

Services
  └── Bookings

Portfolio Categories
  └── Portfolio Albums
        └── Portfolio Images
              └── Media

Blog Categories
  └── Blog Posts
        └── Media

Testimonials
  └── Media

Media
  └── uploaded by User
```

---

# 5. Users Table

The `users` table stores authenticated application users.

Initially, the application requires administrator users.

### Suggested fields

| Field          | Type         | Notes                          |
| -------------- | ------------ | ------------------------------ |
| id             | BIGINT       | Primary key                    |
| name           | VARCHAR      | Administrator name             |
| email          | VARCHAR      | Unique                         |
| password       | VARCHAR      | Hashed password                |
| role           | VARCHAR/ENUM | Initial role: `admin`          |
| remember_token | VARCHAR      | Laravel authentication support |
| created_at     | TIMESTAMP    | Creation timestamp             |
| updated_at     | TIMESTAMP    | Update timestamp               |

The password must always be stored using a secure password hashing mechanism.

Passwords must never be stored as plaintext.

---

# 6. Media Table

The `media` table stores metadata about uploaded files.

The actual file should be stored using the configured filesystem rather than as binary data inside MySQL.

### Suggested fields

| Field         | Type         | Notes                      |
| ------------- | ------------ | -------------------------- |
| id            | BIGINT       | Primary key                |
| disk          | VARCHAR      | Storage disk               |
| path          | VARCHAR      | File path                  |
| original_name | VARCHAR      | Original uploaded filename |
| mime_type     | VARCHAR      | MIME type                  |
| size          | BIGINT       | File size in bytes         |
| alt_text      | VARCHAR/TEXT | Accessibility/SEO text     |
| uploaded_by   | BIGINT       | FK → users.id              |
| created_at    | TIMESTAMP    | Creation timestamp         |
| updated_at    | TIMESTAMP    | Update timestamp           |

Potential future fields may include:

* width
* height
* caption
* title
* optimized variants
* thumbnail path

These should only be added when required.

---

# 7. Services Table

The `services` table stores services displayed on the website.

### Suggested fields

| Field             | Type      | Notes                            |
| ----------------- | --------- | -------------------------------- |
| id                | BIGINT    | Primary key                      |
| title             | VARCHAR   | Service name                     |
| slug              | VARCHAR   | Unique public URL identifier     |
| short_description | TEXT      | Short summary                    |
| description       | LONGTEXT  | Full service description         |
| media_id          | BIGINT    | Optional FK → media.id           |
| status            | VARCHAR   | `draft`, `published`, `archived` |
| sort_order        | INT       | Display ordering                 |
| created_at        | TIMESTAMP | Creation timestamp               |
| updated_at        | TIMESTAMP | Update timestamp                 |

### Relationships

```text
Service
   └── belongsTo Media
```

A service may optionally have a primary image.

---

# 8. Portfolio Categories Table

Portfolio categories group related portfolio work.

Examples may eventually include categories such as:

* Photography
* Videography
* Events
* Corporate
* Commercial

The actual categories should be managed through the administrator interface.

### Suggested fields

| Field       | Type      | Notes                |
| ----------- | --------- | -------------------- |
| id          | BIGINT    | Primary key          |
| name        | VARCHAR   | Category name        |
| slug        | VARCHAR   | Unique slug          |
| description | TEXT      | Optional description |
| sort_order  | INT       | Display ordering     |
| created_at  | TIMESTAMP | Creation timestamp   |
| updated_at  | TIMESTAMP | Update timestamp     |

---

# 9. Portfolio Albums Table

A portfolio album represents a project, collection, or body of work.

### Suggested fields

| Field          | Type          | Notes                            |
| -------------- | ------------- | -------------------------------- |
| id             | BIGINT        | Primary key                      |
| category_id    | BIGINT        | FK → portfolio_categories.id     |
| title          | VARCHAR       | Album/project title              |
| slug           | VARCHAR       | Unique public slug               |
| description    | TEXT/LONGTEXT | Project description              |
| cover_media_id | BIGINT        | Optional FK → media.id           |
| status         | VARCHAR       | `draft`, `published`, `archived` |
| featured       | BOOLEAN       | Featured portfolio flag          |
| sort_order     | INT           | Display ordering                 |
| created_at     | TIMESTAMP     | Creation timestamp               |
| updated_at     | TIMESTAMP     | Update timestamp                 |

### Relationships

```text
PortfolioCategory
        │
        └── hasMany PortfolioAlbums

PortfolioAlbum
        ├── belongsTo PortfolioCategory
        └── belongsTo Media (cover)
```

---

# 10. Portfolio Images Table

The `portfolio_images` table associates media files with portfolio albums.

This allows one album to contain multiple images without duplicating media metadata.

### Suggested fields

| Field      | Type         | Notes                    |
| ---------- | ------------ | ------------------------ |
| id         | BIGINT       | Primary key              |
| album_id   | BIGINT       | FK → portfolio_albums.id |
| media_id   | BIGINT       | FK → media.id            |
| caption    | TEXT         | Optional caption         |
| alt_text   | VARCHAR/TEXT | Image-specific alt text  |
| sort_order | INT          | Gallery ordering         |
| created_at | TIMESTAMP    | Creation timestamp       |
| updated_at | TIMESTAMP    | Update timestamp         |

### Relationships

```text
PortfolioAlbum
        │
        └── hasMany PortfolioImages

PortfolioImage
        ├── belongsTo PortfolioAlbum
        └── belongsTo Media
```

---

# 11. Blog Categories Table

Blog categories organize posts.

### Suggested fields

| Field       | Type      | Notes                |
| ----------- | --------- | -------------------- |
| id          | BIGINT    | Primary key          |
| name        | VARCHAR   | Category name        |
| slug        | VARCHAR   | Unique slug          |
| description | TEXT      | Optional description |
| created_at  | TIMESTAMP | Creation timestamp   |
| updated_at  | TIMESTAMP | Update timestamp     |

---

# 12. Blog Posts Table

The `blog_posts` table stores published and unpublished articles.

### Suggested fields

| Field             | Type      | Notes                            |
| ----------------- | --------- | -------------------------------- |
| id                | BIGINT    | Primary key                      |
| category_id       | BIGINT    | Optional FK → blog_categories.id |
| author_id         | BIGINT    | FK → users.id                    |
| featured_media_id | BIGINT    | Optional FK → media.id           |
| title             | VARCHAR   | Post title                       |
| slug              | VARCHAR   | Unique public slug               |
| excerpt           | TEXT      | Short summary                    |
| content           | LONGTEXT  | Full article content             |
| status            | VARCHAR   | `draft`, `published`, `archived` |
| published_at      | TIMESTAMP | Nullable publication date        |
| seo_title         | VARCHAR   | Optional SEO title               |
| seo_description   | TEXT      | Optional SEO description         |
| created_at        | TIMESTAMP | Creation timestamp               |
| updated_at        | TIMESTAMP | Update timestamp                 |

### Relationships

```text
BlogCategory
      │
      └── hasMany BlogPosts

BlogPost
      ├── belongsTo BlogCategory
      ├── belongsTo User
      └── belongsTo Media
```

A post should only appear in the public API when its publication rules allow it.

---

# 13. Testimonials Table

Testimonials contain customer/client feedback displayed throughout the public website.

### Suggested fields

| Field                 | Type          | Notes                            |
| --------------------- | ------------- | -------------------------------- |
| id                    | BIGINT        | Primary key                      |
| client_name           | VARCHAR       | Display name                     |
| content               | TEXT/LONGTEXT | Testimonial text                 |
| client_image_media_id | BIGINT        | Optional FK → media.id           |
| status                | VARCHAR       | `draft`, `published`, `archived` |
| sort_order            | INT           | Display ordering                 |
| created_at            | TIMESTAMP     | Creation timestamp               |
| updated_at            | TIMESTAMP     | Update timestamp                 |

### Relationships

```text
Testimonial
      └── belongsTo Media
```

Testimonials are intended primarily as reusable content sections rather than a required standalone public page.

---

# 14. Bookings Table

The `bookings` table stores enquiries submitted through the booking form.

The initial booking system is an enquiry/workflow system rather than an online payment system.

### Suggested fields

| Field          | Type          | Notes                     |
| -------------- | ------------- | ------------------------- |
| id             | BIGINT        | Primary key               |
| name           | VARCHAR       | Customer name             |
| email          | VARCHAR       | Customer email            |
| phone          | VARCHAR       | Customer phone            |
| service_id     | BIGINT        | Nullable FK → services.id |
| event_date     | DATE          | Nullable                  |
| event_location | VARCHAR/TEXT  | Nullable                  |
| message        | TEXT/LONGTEXT | Customer enquiry          |
| status         | VARCHAR       | Workflow status           |
| internal_notes | TEXT/LONGTEXT | Admin-only notes          |
| created_at     | TIMESTAMP     | Submission timestamp      |
| updated_at     | TIMESTAMP     | Update timestamp          |

### Initial status values

```text
new
contacted
in_progress
confirmed
completed
cancelled
```

The status workflow should be enforced by the backend.

---

# 15. Contact Messages Table

The `contact_messages` table stores general enquiries submitted through the contact form.

### Suggested fields

| Field      | Type          | Notes                |
| ---------- | ------------- | -------------------- |
| id         | BIGINT        | Primary key          |
| name       | VARCHAR       | Sender name          |
| email      | VARCHAR       | Sender email         |
| phone      | VARCHAR       | Optional phone       |
| subject    | VARCHAR       | Message subject      |
| message    | TEXT/LONGTEXT | Message content      |
| status     | VARCHAR       | Message status       |
| created_at | TIMESTAMP     | Submission timestamp |
| updated_at | TIMESTAMP     | Update timestamp     |

### Initial status values

```text
new
read
replied
archived
```

The exact workflow can be adjusted during admin implementation.

---

# 16. Foreign-Key Relationships

The main relationships are:

```text
users
  │
  ├──────────────< media
  │
  └──────────────< blog_posts


services
  │
  └──────────────< bookings


portfolio_categories
  │
  └──────────────< portfolio_albums
                         │
                         └──────────────< portfolio_images
                                                │
                                                └──── media


blog_categories
  │
  └──────────────< blog_posts
                         │
                         └──── media


testimonials
  │
  └──── media
```

---

# 17. Foreign-Key Delete Behavior

Foreign-key behavior should be selected deliberately.

General rules:

### Categories

A category should generally not be deleted if active content still depends on it unless the application explicitly handles reassignment or cascading.

### Services

Services referenced by historical bookings should not be physically removed in a way that destroys booking history.

Archiving is preferred where historical references matter.

### Portfolio albums

Deleting an album should not automatically delete the underlying media file unless the media is no longer referenced anywhere and the deletion behavior explicitly supports this.

### Blog posts

Deleting a post should not automatically delete its featured media.

### Media

Media deletion requires reference checking before the underlying file is removed.

### Users

Users associated with historical blog posts or uploaded media should be handled carefully.

The exact foreign-key actions will be defined in the migrations after implementation requirements are confirmed.

---

# 18. Soft Deletes

Soft deletes may be used for entities where preserving historical records is useful.

Potential candidates include:

* Services
* Portfolio albums
* Blog posts
* Testimonials

However, soft deletes should not automatically be added to every table.

The project should distinguish between:

* Content that should be archived
* Records that should be permanently deleted
* Historical records that must remain available

For workflow-driven records such as bookings and contact messages, archiving/status management is generally preferable to deleting the underlying record.

---

# 19. Indexing Strategy

Indexes should support the application's most common queries.

Likely indexes include:

### Services

```text
slug
status
sort_order
```

### Portfolio categories

```text
slug
sort_order
```

### Portfolio albums

```text
category_id
slug
status
featured
sort_order
```

### Portfolio images

```text
album_id
media_id
sort_order
```

### Blog categories

```text
slug
```

### Blog posts

```text
category_id
author_id
slug
status
published_at
```

### Bookings

```text
service_id
status
event_date
created_at
```

### Contact messages

```text
status
created_at
```

Indexes should be added based on actual query patterns rather than indiscriminately indexing every column.

---

# 20. Unique Constraints

Fields representing public identifiers should generally be unique.

Examples:

```text
services.slug
portfolio_categories.slug
portfolio_albums.slug
blog_categories.slug
blog_posts.slug
```

Email addresses for users should also be unique.

Database-level uniqueness is important because application-level checks alone do not fully protect against race conditions.

---

# 21. Timestamps

Most application tables should use:

```text
created_at
updated_at
```

Laravel's standard timestamp handling should be used.

Dates representing business events should be stored separately.

For example:

```text
created_at
```

represents when a booking was submitted.

```text
event_date
```

represents the customer's requested event date.

These fields must not be treated as interchangeable.

---

# 22. Status Fields

Status values should be consistent across the application.

The implementation may use strings with centralized validation rather than database enums if that provides better future flexibility.

For example:

```text
status = "published"
```

The backend should validate allowed values.

Status transitions should also be controlled where workflow rules apply.

---

# 23. Slug Strategy

Public content should use slugs rather than exposing database IDs in human-readable URLs where appropriate.

Example:

```text
/services/event-photography
```

instead of:

```text
/services/17
```

The database should enforce uniqueness within the relevant table.

Slug generation should occur through backend logic so that it remains consistent regardless of which frontend or API client creates the content.

---

# 24. Media Architecture

Media metadata is centralized in the `media` table.

This prevents each content type from having to duplicate:

```text
filename
mime type
file size
storage path
upload information
```

For example:

```text
Service
   ↓
media_id
   ↓
Media
   ↓
storage path
```

and:

```text
PortfolioImage
   ↓
media_id
   ↓
Media
```

This architecture makes future media management easier.

---

# 25. Public vs Internal Data

Some database fields are intended only for administrators.

For example:

```text
bookings.internal_notes
```

must never be exposed through the public booking API.

Similarly, authentication-related fields must never be returned to public clients.

The backend API Resource layer defines what data is exposed.

The database itself may contain more information than the public API returns.

---

# 26. Homepage & About Content

The initial architecture does not require a generic CMS `pages` table.

The homepage and About page can initially use structured/static content in the React application where appropriate, while dynamic content such as:

* Services
* Portfolio
* Blog
* Testimonials

comes from the API.

A generic page-builder/CMS system should only be introduced if actual requirements justify it.

This avoids unnecessary database complexity.

---

# 27. Search Considerations

The initial application does not require a full-text search engine.

Basic database-backed searching may be sufficient for:

* Blog posts
* Portfolio items
* Services
* Administrative records

If search requirements become significantly more advanced, a dedicated search solution can be evaluated later.

The initial architecture should not introduce search infrastructure prematurely.

---

# 28. Database Transactions

Transactions should be used for multi-step operations where partial completion would leave inconsistent data.

Example:

```text
Create portfolio album
       ↓
Create portfolio image records
       ↓
Commit transaction
```

If a critical step fails:

```text
Rollback
```

This ensures the database remains consistent.

---

# 29. Data Integrity Rules

The database should enforce integrity wherever practical.

Examples:

* Required relationships use foreign keys
* Slugs use unique constraints
* Required fields are non-null
* Numeric ordering fields have sensible defaults
* Status fields are validated
* Referential relationships are explicit
* Duplicate identifiers are prevented
* Invalid orphan records are minimized

Application logic and database constraints should work together.

---

# 30. Database Naming Conventions

Use Laravel's standard naming conventions.

### Tables

Plural snake_case:

```text
portfolio_categories
blog_posts
contact_messages
```

### Foreign keys

Singular model name followed by `_id`:

```text
category_id
author_id
media_id
service_id
album_id
```

### Boolean fields

Use clear names:

```text
featured
```

rather than ambiguous names such as:

```text
flag
type
value
```

### Timestamps

Use Laravel-standard:

```text
created_at
updated_at
```

---

# 31. Development Database

During local development, the database will be hosted through Laragon's MySQL environment.

Example:

```text
Database:
merit_media

Host:
127.0.0.1

Port:
3306
```

The actual credentials must be stored in the backend `.env` file.

---

# 32. Database Environment Configuration

Example Laravel configuration:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=merit_media
DB_USERNAME=root
DB_PASSWORD=
```

Production credentials must never be committed to Git.

---

# 33. Migration Strategy

Migrations should be created in dependency order.

A logical sequence is:

```text
1. users
2. media
3. services
4. portfolio_categories
5. portfolio_albums
6. portfolio_images
7. blog_categories
8. blog_posts
9. testimonials
10. bookings
11. contact_messages
```

This order allows referenced tables to exist before dependent foreign keys are created.

Laravel migration timestamps determine the actual execution order.

---

# 34. Factory Strategy

Factories should be created for entities that need repeatable test data.

Likely factories include:

```text
UserFactory
MediaFactory
ServiceFactory
PortfolioCategoryFactory
PortfolioAlbumFactory
PortfolioImageFactory
BlogCategoryFactory
BlogPostFactory
TestimonialFactory
BookingFactory
ContactMessageFactory
```

Factories should produce realistic but clearly synthetic development/test data.

---

# 35. Seeder Strategy

The main database seeder should be able to create a usable development environment.

A development seed may create:

```text
1 administrator
several services
several portfolio categories
several portfolio albums
sample portfolio images/media
blog categories
sample blog posts
sample testimonials
sample bookings
sample contact messages
```

Production seed behavior must be handled carefully.

Real client/customer data must never be embedded into development seeders.

---

# 36. Backup Considerations

Production database backups should be part of deployment and operations planning.

Backups should account for:

* Database data
* Uploaded media
* Configuration required to restore the application

Database backups alone are insufficient if uploaded media is stored separately.

Backup and recovery procedures should be documented as part of deployment operations.

---

# 37. Scalability

The initial database should comfortably support the expected website workload without premature optimization.

Future scaling may include:

* Additional indexes
* Query optimization
* Caching
* Read replicas
* Dedicated object storage
* Search infrastructure
* Background processing

These should only be introduced when actual requirements justify them.

---

# 38. Database Security

Database security requirements include:

* Strong production credentials
* Restricted database access
* No public database exposure
* Environment-based credentials
* Least-privilege database users where practical
* Regular backups
* Secure hosting
* Parameterized queries through Laravel/Eloquent
* No raw SQL built from unsanitized user input
* Protection of sensitive application data

The database must never be directly exposed to the public frontend.

---

# 39. Data Retention

The application should retain useful business records such as:

* Bookings
* Contact messages
* Published content
* Historical administrative records

Deletion policies should be defined deliberately.

The project should avoid automatically deleting business records simply because they are old unless a documented retention policy requires it.

---

# 40. Database Checklist

Before considering the database foundation complete:

* [ ] MySQL database created
* [ ] Laravel database connection working
* [ ] Users migration created
* [ ] Media migration created
* [ ] Services migration created
* [ ] Portfolio migrations created
* [ ] Blog migrations created
* [ ] Testimonials migration created
* [ ] Bookings migration created
* [ ] Contact messages migration created
* [ ] Foreign keys defined
* [ ] Required indexes defined
* [ ] Unique constraints defined
* [ ] Model relationships implemented
* [ ] Factories created
* [ ] Development seeders created
* [ ] Test database configured
* [ ] Database transactions implemented where necessary
* [ ] Data exposure reviewed through API Resources
* [ ] Backup strategy documented

---

# 41. Final Database Model

The intended initial relationship structure is:

```text
                         ┌──────────────┐
                         │    Users     │
                         └──────┬───────┘
                                │
                    ┌───────────┴───────────┐
                    ▼                       ▼
               ┌─────────┐            ┌───────────┐
               │  Media  │            │ BlogPosts │
               └────┬────┘            └─────┬─────┘
                    │                        │
       ┌────────────┼────────────┐           │
       │            │            │           ▼
       ▼            ▼            ▼     ┌──────────────┐
   Services     Portfolio     Testimonials│ BlogCategories│
       │         Albums            │     └──────────────┘
       │            │              │
       ▼            ▼              │
   Bookings    PortfolioImages ────┘
                    │
                    ▼
                  Media


PortfolioCategories
        │
        ▼
PortfolioAlbums
        │
        ▼
PortfolioImages
        │
        ▼
      Media
```

The database is intentionally structured around the application's actual content and workflow requirements rather than attempting to implement a generic CMS.

The Laravel migrations, Eloquent models, API Resources, and ERD should all follow this database specification.
