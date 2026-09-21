# Backend Architecture & Development Guide

## 1. Purpose

The backend is the server-side application responsible for providing the business logic, API, authentication, validation, database access, media handling, and administrative operations required by the Merit Media website.

The backend is built with:

* PHP
* Laravel
* Eloquent ORM
* MySQL
* RESTful JSON APIs

The React frontend communicates with the backend exclusively through HTTP/JSON APIs.

The backend is responsible for enforcing application rules and protecting data. The frontend must never connect directly to MySQL.

---

## 2. Backend Responsibilities

The Laravel backend is responsible for:

* Providing REST API endpoints
* Authenticating administrators
* Authorizing protected administrative operations
* Validating incoming requests
* Managing services
* Managing portfolio content
* Managing portfolio categories and albums
* Managing blog categories and posts
* Managing testimonials
* Managing bookings/enquiries
* Managing contact messages
* Managing uploaded media
* Reading and writing database records
* Enforcing relationships and business rules
* Returning consistent JSON responses
* Handling application errors
* Applying rate limits where appropriate
* Logging important application events and errors
* Supporting pagination, filtering, searching, and sorting
* Maintaining database integrity
* Supporting automated testing

---

## 3. Backend Boundaries

The backend must not be responsible for:

* Rendering the main public website UI
* Rendering the React admin interface
* Direct browser access to MySQL
* Storing database credentials in frontend code
* Implementing presentation-only styling
* Performing client-side form interactions
* Exposing private database fields unnecessarily
* Allowing unauthenticated users to access administrative endpoints

The React application handles presentation and client-side interaction.

Laravel handles application rules, data, security, and persistence.

---

## 4. Technology Stack

| Technology            | Purpose                          |
| --------------------- | -------------------------------- |
| PHP                   | Server-side programming language |
| Laravel               | Backend application framework    |
| Eloquent              | ORM/database interaction         |
| MySQL                 | Relational database              |
| Laravel Migrations    | Database schema management       |
| Laravel Seeders       | Development/test data            |
| Laravel Form Requests | Request validation               |
| Laravel API Resources | API response transformation      |
| Laravel Middleware    | Request filtering/security       |
| PHPUnit/Pest          | Automated testing                |
| Composer              | PHP dependency management        |

The exact Laravel version should be the current stable version selected during project initialization, provided it is compatible with the deployment environment.

---

# 5. Target Backend Structure

The backend should follow Laravel conventions while keeping application-specific responsibilities clearly organized.

```text
backend/
├── app/
│   ├── Console/
│   ├── Exceptions/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Api/
│   │   │   │   ├── Auth/
│   │   │   │   ├── Public/
│   │   │   │   └── Admin/
│   │   ├── Middleware/
│   │   ├── Requests/
│   │   │   ├── Auth/
│   │   │   ├── Services/
│   │   │   ├── Portfolio/
│   │   │   ├── Blog/
│   │   │   ├── Testimonials/
│   │   │   ├── Bookings/
│   │   │   ├── Contact/
│   │   │   └── Media/
│   │   └── Resources/
│   │       ├── ServiceResource.php
│   │       ├── PortfolioResource.php
│   │       ├── BlogPostResource.php
│   │       ├── TestimonialResource.php
│   │       ├── BookingResource.php
│   │       ├── ContactMessageResource.php
│   │       └── MediaResource.php
│   ├── Models/
│   ├── Policies/
│   ├── Services/
│   └── Providers/
│
├── bootstrap/
├── config/
├── database/
│   ├── factories/
│   ├── migrations/
│   └── seeders/
├── public/
├── resources/
├── routes/
│   ├── api.php
│   └── web.php
├── storage/
├── tests/
│   ├── Feature/
│   └── Unit/
├── .env
├── .env.example
├── artisan
├── composer.json
└── phpunit.xml
```

The exact structure may evolve as implementation progresses, but new code should follow the established organization rather than introducing arbitrary directories.

---

# 6. API Routing

API routes should be organized by responsibility.

The primary API namespace is:

```text
/api/v1
```

Example:

```text
GET /api/v1/services
GET /api/v1/services/{slug}
POST /api/v1/bookings
POST /api/v1/contact
```

Administrative routes should be grouped separately:

```text
/api/v1/admin/...
```

Examples:

```text
GET    /api/v1/admin/services
POST   /api/v1/admin/services
PUT    /api/v1/admin/services/{id}
DELETE /api/v1/admin/services/{id}
```

Authentication routes should be grouped under:

```text
/api/v1/auth
```

Example:

```text
POST /api/v1/auth/login
GET  /api/v1/auth/me
POST /api/v1/auth/logout
```

API versioning is intended to protect the frontend from breaking changes when the backend evolves.

---

# 7. Route Organization

The API route file should remain readable and logically grouped.

Conceptually:

```php
Route::prefix('v1')->group(function () {

    // Authentication

    // Public content

    // Public submissions

    // Protected administrator routes
});
```

Protected routes should be placed behind the appropriate authentication middleware.

Administrative routes should additionally enforce authorization rules.

---

# 8. Controllers

Controllers are responsible for handling HTTP requests and coordinating application operations.

Controllers should remain relatively thin.

A controller should generally:

1. Receive the request
2. Validate the request through a Form Request where appropriate
3. Call the appropriate application/service logic
4. Return a Resource or standardized JSON response

Controllers should not contain large amounts of business logic.

### Example responsibility

A service controller may:

```text
GET request
    ↓
Validate route parameters
    ↓
Query service
    ↓
Return ServiceResource
```

A complex administrative operation may:

```text
Request
    ↓
Form Request
    ↓
Controller
    ↓
Service class
    ↓
Model/database
    ↓
Resource
    ↓
JSON response
```

---

# 9. Form Requests & Validation

Incoming data must be validated on the server.

Laravel Form Requests should be used for complex or reusable validation rules.

Examples:

```text
StoreServiceRequest
UpdateServiceRequest
StoreBookingRequest
StoreContactMessageRequest
StoreBlogPostRequest
UpdateBlogPostRequest
StorePortfolioRequest
```

Validation should cover:

* Required fields
* Data types
* String lengths
* Email formats
* Dates
* Allowed status values
* Foreign key relationships
* File types
* File sizes
* Unique slugs
* Nullable fields

Client-side validation in React improves user experience but does not replace backend validation.

The backend must always treat incoming data as untrusted.

---

# 10. Models & Eloquent

Eloquent models represent the application's persistent data.

Expected core models include:

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

Models should define:

* Fillable attributes
* Casts
* Relationships
* Scopes where useful
* Attribute transformations where appropriate
* Soft-delete behavior where required

Examples of relationships:

```text
Service
    └── Media

PortfolioCategory
    └── PortfolioAlbums

PortfolioAlbum
    ├── PortfolioCategory
    └── PortfolioImages

PortfolioImage
    ├── PortfolioAlbum
    └── Media

BlogCategory
    └── BlogPosts

BlogPost
    ├── BlogCategory
    ├── User
    └── Media

Booking
    └── Service

Testimonial
    └── Media
```

Detailed database structure will be defined separately in:

```text
docs/DATABASE.md
database/ERD.md
```

---

# 11. Service Layer

A service layer should be used where business logic becomes sufficiently complex that keeping it inside controllers would make the code difficult to maintain.

Possible service classes include:

```text
AuthService
MediaService
ServiceManagementService
PortfolioService
BlogService
BookingService
ContactService
```

Not every CRUD operation requires a service class.

Simple operations can remain in controllers when doing so keeps the implementation clear.

The purpose of the service layer is not to create unnecessary abstraction. It exists to keep complex application logic organized and reusable.

---

# 12. API Resources

Laravel API Resources should control the data exposed to React.

Resources prevent database models from being returned blindly.

Example:

```text
ServiceResource
```

may expose:

```json
{
  "id": 1,
  "title": "Event Photography",
  "slug": "event-photography",
  "short_description": "...",
  "description": "...",
  "image": {},
  "status": "published"
}
```

The API should not expose:

* Internal database fields unnecessarily
* Authentication credentials
* Password hashes
* Internal-only notes
* Sensitive administrative information
* Unnecessary timestamps or implementation details

Public and administrative resources may expose different fields where necessary.

---

# 13. Authentication

The backend must provide secure authentication for administrators.

The authentication system must support:

* Login
* Logout
* Authenticated session/token state
* Current administrator information
* Protected API endpoints
* Authentication failure handling
* Authorization checks

The exact authentication mechanism will be selected during implementation based on the Laravel architecture and deployment requirements.

Authentication details are documented separately in:

```text
docs/AUTHENTICATION.md
```

---

# 14. Authorization

Authentication answers:

> Who is this user?

Authorization answers:

> What is this user allowed to do?

The initial application requires an administrator role.

Administrative operations must require authenticated and authorized access.

Examples:

```text
Create service       → Administrator
Edit service         → Administrator
Delete service       → Administrator
Create blog post     → Administrator
View bookings        → Administrator
View contact messages → Administrator
Upload media         → Administrator
```

Public visitors must not have access to administrative operations.

The authorization architecture should allow additional roles to be introduced later without requiring a complete rewrite.

---

# 15. Middleware

Middleware should be used to enforce cross-cutting request rules.

Potential middleware responsibilities include:

* Authentication
* Authorization
* API throttling
* Request logging where appropriate
* CORS configuration
* Security-related request handling

Middleware should remain focused on request-level concerns.

Business logic should remain in controllers/services/models.

---

# 16. Database & Migrations

All database structure must be managed through Laravel migrations.

Developers should not manually modify the production database schema without corresponding migration changes.

Migrations should define:

* Tables
* Columns
* Foreign keys
* Indexes
* Unique constraints
* Nullable fields
* Default values
* Required relationships

Example:

```text
create_services_table
create_portfolio_categories_table
create_portfolio_albums_table
create_portfolio_images_table
create_blog_categories_table
create_blog_posts_table
create_testimonials_table
create_bookings_table
create_contact_messages_table
create_media_table
```

Migration names should clearly describe the schema change.

---

# 17. Seeders & Development Data

Seeders should provide predictable development data.

Useful seed data may include:

* Administrator account
* Sample services
* Sample portfolio categories
* Sample portfolio albums
* Sample blog categories
* Sample blog posts
* Sample testimonials
* Sample bookings
* Sample contact messages

Seed data must never contain real production credentials or private customer information.

Production administrator credentials must be configured securely.

---

# 18. Transactions

Database transactions should be used when an operation modifies multiple related records and those changes must succeed or fail together.

Example:

```text
Create portfolio album
    ↓
Create associated image records
    ↓
Update album metadata
```

If one critical operation fails, the transaction should roll back the related changes.

Transactions should be used deliberately rather than around every database query.

---

# 19. CRUD Conventions

Administrative CRUD operations should follow consistent patterns.

### Create

```text
POST /resource
```

### Read collection

```text
GET /resource
```

### Read single item

```text
GET /resource/{id}
```

or for public slug-based resources:

```text
GET /resource/{slug}
```

### Update

```text
PUT /resource/{id}
```

or:

```text
PATCH /resource/{id}
```

### Delete

```text
DELETE /resource/{id}
```

The selected update convention should remain consistent throughout the API.

---

# 20. Slugs

Public-facing content that has human-readable URLs should use unique slugs.

Examples:

```text
event-photography
corporate-video-production
wedding-photography
behind-the-scenes-of-a-production
```

Slugs should:

* Be URL-safe
* Be unique within their resource
* Remain stable where practical
* Be validated server-side
* Be generated or updated consistently

Changing a published slug should be treated carefully because existing links may depend on it.

---

# 21. Status Management

Content requiring publication or workflow state should use controlled status values.

Examples:

```text
Services:
draft
published
archived
```

```text
Blog posts:
draft
published
archived
```

```text
Bookings:
new
contacted
in_progress
confirmed
completed
cancelled
```

```text
Contact messages:
new
read
replied
archived
```

The final status values must be centralized and consistently validated.

---

# 22. Pagination, Filtering & Searching

Collection endpoints should support pagination where appropriate.

Example:

```text
GET /api/v1/blog?page=1&per_page=10
```

Administrative listing endpoints may support:

* Search
* Status filtering
* Category filtering
* Sorting
* Date filtering
* Pagination

Example:

```text
GET /api/v1/admin/bookings?status=new&page=1
```

The backend should perform filtering and pagination at the database/query level rather than retrieving unnecessary records and filtering them in PHP.

---

# 23. Database Performance

The backend should avoid unnecessary database queries.

Particular attention must be given to:

* N+1 queries
* Missing indexes
* Excessive relationship loading
* Large unpaginated collections
* Repeated identical queries
* Inefficient search queries
* Unnecessary columns

Eloquent relationships should be eager-loaded when appropriate.

Example concept:

```php
Service::with('media')->get();
```

rather than triggering separate queries for each service's media record.

Database indexes should be added to fields frequently used for:

* Lookups
* Foreign keys
* Slugs
* Status filtering
* Sorting
* Search-related operations where appropriate

---

# 24. API Responses

API responses should use a consistent structure.

### Successful response

```json
{
  "success": true,
  "message": "Services retrieved successfully.",
  "data": []
}
```

### Validation error

```json
{
  "success": false,
  "message": "The given data was invalid.",
  "errors": {
    "email": [
      "The email field must be a valid email address."
    ]
  }
}
```

### Not found

```json
{
  "success": false,
  "message": "The requested resource was not found."
}
```

Response structures should remain predictable for the React service layer.

---

# 25. Exception & Error Handling

Backend exceptions must be handled consistently.

The API should distinguish between:

* Validation errors
* Authentication failures
* Authorization failures
* Missing resources
* Rate-limit violations
* Database failures
* Unexpected application errors

Typical HTTP status codes include:

```text
200 OK
201 Created
204 No Content
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Unprocessable Entity
429 Too Many Requests
500 Internal Server Error
```

Production responses must not expose stack traces, SQL queries, credentials, or internal implementation details.

Detailed errors should be available through secure application logs.

---

# 26. Rate Limiting

Public endpoints that accept user input should be protected against excessive requests.

Particular attention should be given to:

```text
POST /api/v1/contact
POST /api/v1/bookings
POST /api/v1/auth/login
```

Rate limiting helps reduce:

* Spam
* Automated abuse
* Credential-guessing attempts
* Excessive API traffic

Limits should be configured according to actual application usage rather than unnecessarily restricting legitimate visitors.

---

# 27. Logging

Important backend events should be logged appropriately.

Examples include:

* Authentication failures
* Authentication events
* Unexpected application errors
* Important administrative operations
* File upload failures
* Database-related exceptions
* External service failures, if introduced later

Logs must not contain:

* Passwords
* Authentication secrets
* API keys
* Sensitive customer information unnecessarily
* Full payment information, if payment functionality is introduced later

Production logs should be protected from public access.

---

# 28. Media & File Handling

Media management is handled by the backend.

The backend should:

1. Authenticate the upload request
2. Validate the uploaded file
3. Generate a safe storage path/name
4. Store the file using the configured storage system
5. Create a corresponding media database record
6. Return safe media information to the frontend

The database stores metadata and file references rather than binary file contents.

Expected metadata includes:

```text
original_name
disk
path
mime_type
size
alt_text
uploaded_by
```

Detailed media architecture is documented in:

```text
docs/FILE_STORAGE.md
```

---

# 29. File Upload Security

Uploaded files must be treated as untrusted input.

The backend should validate:

* MIME type
* File extension
* File size
* Upload authorization
* Storage destination
* Filename/path safety

The application should not trust a filename or MIME type supplied by the browser without validation.

Executable files must not be accepted as normal media uploads.

---

# 30. Caching

Caching may be introduced for data that is:

* Frequently requested
* Relatively stable
* Expensive to calculate

Potential candidates include:

* Published services
* Published portfolio categories
* Published portfolio content
* Blog categories
* Published blog posts
* Public testimonials

Caching should not be introduced prematurely.

Cache invalidation must be considered whenever administrators modify cached content.

---

# 31. Queues & Background Jobs

Queues should only be introduced when asynchronous processing provides a clear benefit.

Potential future uses include:

* Large media processing
* Image optimization
* Email notifications
* Bulk operations
* Other slow background tasks

Simple operations should remain synchronous.

The initial application should avoid introducing queue infrastructure unless a real requirement exists.

---

# 32. Email/Notification Integration

Email functionality may be required for:

* Booking notifications
* Contact enquiry notifications
* Administrative alerts

Email delivery should be handled by Laravel's mail system and configured through environment variables.

Email credentials and service configuration must never be committed to the repository.

If email notifications are implemented later, failures in email delivery should be logged appropriately without exposing sensitive information to public API clients.

---

# 33. Backend Security

The backend must follow secure development practices.

Required protections include:

* Server-side validation
* Authentication for administrative operations
* Authorization checks
* Password hashing through Laravel-supported mechanisms
* CSRF protection where applicable
* Rate limiting
* Secure file uploads
* Safe database queries through Eloquent/query builder
* Protection against mass assignment
* Secure environment variables
* Production error handling
* HTTPS in production
* Restricted administrative access
* Appropriate CORS configuration
* Dependency updates
* Secure session/token configuration

The frontend must never be trusted as the security boundary.

---

# 34. Mass Assignment Protection

Models must protect against unintended mass assignment.

Only explicitly permitted fields should be assignable through request data.

For example, a booking request should not be able to modify internal fields such as:

```text
status
internal_notes
created_by
```

unless the relevant operation explicitly allows it.

Administrative fields should be controlled separately from public submission fields.

---

# 35. Public Submission Security

Public forms such as bookings and contact messages are potential abuse targets.

The backend should use:

* Strict validation
* Rate limiting
* Length restrictions
* Input normalization where appropriate
* Spam protection where required
* Safe database persistence
* Appropriate logging

The application should never trust hidden form fields as proof of authorization or identity.

---

# 36. Environment Configuration

Environment-specific configuration must use `.env`.

Example:

```env
APP_ENV=local
APP_DEBUG=true
APP_URL=http://movic-audits.test

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=movic_audits
DB_USERNAME=root
DB_PASSWORD=

FRONTEND_URL=http://localhost:5173
```

Production values must be different and securely configured.

The `.env` file must not be committed to version control.

`.env.example` should contain required variable names without real secrets.

---

# 37. Local Development

The backend will run through the Laragon development environment.

Expected repository location:

```text
C:\laragon\www\movic-audits
```

Backend location:

```text
C:\laragon\www\movic-audits\backend
```

Frontend location:

```text
C:\laragon\www\movic-audits\frontend
```

MySQL is managed through the local Laragon environment.

The frontend and backend remain separate applications while sharing the same repository.

---

# 38. Request Lifecycle

A typical API request should follow this flow:

```text
Browser
   ↓
React API service
   ↓
Laravel API route
   ↓
Middleware
   ↓
Authentication/Authorization
   ↓
Form Request validation
   ↓
Controller
   ↓
Service layer where required
   ↓
Eloquent Model
   ↓
MySQL
   ↓
API Resource
   ↓
JSON Response
   ↓
React
```

This separation keeps responsibilities clear and makes the application easier to test and maintain.

---

# 39. Testing Strategy

The backend should have automated tests covering critical functionality.

## Feature tests

Feature tests should verify complete API behavior.

Examples:

```text
Admin can log in
Unauthenticated user cannot access admin endpoints
Admin can create a service
Admin can update a service
Admin can delete/archive a service
Public visitor can view published services
Public visitor cannot view unpublished private content
Visitor can submit a booking
Visitor can submit a contact message
Invalid booking data is rejected
Invalid contact data is rejected
Unauthorized operations are rejected
```

## Unit tests

Unit tests should cover isolated business logic where useful.

Examples:

```text
Slug generation
Status transitions
Booking-related business rules
Media-related processing logic
```

Testing should focus on meaningful application behavior rather than achieving a percentage target for its own sake.

---

# 40. Database Testing

Tests should use an isolated test database or Laravel-supported testing database configuration.

Tests must not modify production or normal development data.

Factories should be used to generate repeatable test records.

Example:

```text
ServiceFactory
BlogPostFactory
BookingFactory
ContactMessageFactory
TestimonialFactory
```

---

# 41. Coding Conventions

Backend code should follow Laravel and PSR conventions.

General rules:

* Use clear class names
* Use descriptive method names
* Keep methods focused
* Avoid unnecessarily large controllers
* Avoid duplicated business logic
* Prefer framework conventions
* Use type declarations where appropriate
* Keep validation close to request definitions
* Keep API formatting inside Resources
* Use meaningful variable names
* Comment complex logic rather than obvious code

Example:

```php
public function show(string $slug)
{
    // ...
}
```

is preferred over vague naming such as:

```php
public function getThing($x)
{
    // ...
}
```

---

# 42. Dependency Management

Composer manages PHP dependencies.

Dependencies should only be added when they provide a clear benefit.

Before introducing a package, consider:

1. Whether Laravel already provides the functionality
2. Whether the package is actively maintained
3. Whether it introduces unnecessary complexity
4. Whether it creates security or licensing concerns
5. Whether the functionality is important enough to justify the dependency

The project should avoid dependency bloat.

---

# 43. Production Considerations

Before production deployment, the backend should be configured for:

* Production environment
* Debug disabled
* Secure application key
* Secure database credentials
* HTTPS
* Appropriate CORS
* Appropriate rate limits
* Secure file storage
* Production database
* Database migrations
* Error logging
* Application monitoring
* Proper filesystem permissions
* Secure scheduled tasks where required
* Backups

Production deployment details are documented separately in:

```text
docs/DEPLOYMENT.md
```

---

# 44. Backend Documentation

Backend-related documentation should be maintained alongside the source code.

Relevant documents include:

```text
docs/ARCHITECTURE.md
docs/API.md
docs/BACKEND.md
docs/DATABASE.md
docs/AUTHENTICATION.md
docs/FILE_STORAGE.md
docs/SECURITY.md
docs/DEPLOYMENT.md
```

When a significant architectural decision changes, the relevant documentation should be updated.

---

# 45. Backend Principles

The backend should follow these principles:

### Security first

All client input is untrusted.

### Thin controllers

Controllers coordinate requests rather than becoming large business-logic containers.

### Explicit validation

Incoming data must be validated before persistence.

### Clear boundaries

Frontend, API, business logic, and persistence responsibilities remain separated.

### Database integrity

Relationships, constraints, indexes, and migrations should protect data consistency.

### Consistency

Similar resources should follow similar API and implementation patterns.

### Reusability

Shared business logic should not be duplicated.

### Simplicity

Do not introduce architectural complexity without a practical reason.

### Maintainability

Code should be understandable to another developer working on the project months later.

### Performance

Queries, relationships, pagination, and caching should be implemented with real application needs in mind.

---

# 46. Backend Development Checklist

Before considering the backend foundation complete:

* [ ] Laravel application initialized
* [ ] Environment configuration created
* [ ] MySQL connection working
* [ ] API versioning established
* [ ] Authentication architecture implemented
* [ ] Authorization implemented
* [ ] Core migrations created
* [ ] Core Eloquent models created
* [ ] Model relationships defined
* [ ] API Resources created
* [ ] Form Requests created for complex validation
* [ ] Public API endpoints implemented
* [ ] Admin API endpoints implemented
* [ ] Booking endpoint implemented
* [ ] Contact endpoint implemented
* [ ] Media architecture implemented
* [ ] Rate limiting configured
* [ ] Error handling standardized
* [ ] Logging configured
* [ ] Feature tests created
* [ ] Database factories/seeders created
* [ ] Security review completed
* [ ] Production configuration documented

---

# 47. Final Backend Architecture

The intended backend architecture is:

```text
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │ Public + Admin UI   │
                    └──────────┬──────────┘
                               │
                         HTTP / JSON
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Laravel API       │
                    │     /api/v1         │
                    └──────────┬──────────┘
                               │
                     ┌─────────┴─────────┐
                     │                   │
                     ▼                   ▼
              Authentication       Validation
                     │                   │
                     └─────────┬─────────┘
                               ▼
                    ┌─────────────────────┐
                    │    Controllers      │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │  Service Layer      │
                    │  where required     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Eloquent Models     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │       MySQL         │
                    └─────────────────────┘
```

The backend provides the secure application boundary between the React application and persistent data.

Its primary objectives are correctness, security, maintainability, predictable APIs, and reliable data management.
