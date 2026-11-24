# Merit Media — API Documentation

## 1. Purpose

This document defines the REST API contract for the Merit Media website.

The API is provided by the Laravel backend and consumed by the React/Vite frontend.

The API is responsible for:

* Public content delivery
* Contact form submissions
* Booking/enquiry submissions
* Administrator authentication
* Administrative content management
* Media management
* Validation
* Authorization
* Consistent JSON responses

The frontend must not communicate directly with MySQL.

The communication flow is:

```text
React/Vite
    │
    │ HTTP/HTTPS + JSON
    ▼
Laravel REST API
    │
    ▼
Eloquent ORM
    │
    ▼
MySQL
```

---

# 2. API Base URL

During local development, the backend will run as a separate Laravel application.

The frontend should use an environment variable for the API URL.

Example:

```env
VITE_API_BASE_URL=http://localhost:8000
```

The exact local URL will depend on the XAMPP configuration (for example, `http://localhost:8000` with `php artisan serve` or `http://localhost/AdvancedPHP/Audits/backend/public` via XAMPP Apache).

Production will use the production API domain.

Example conceptual structure:

```text
https://api.example-domain.com/api/v1
```

The actual production domain will be determined during deployment.

---

# 3. API Versioning

The initial API should use:

```text
/api/v1
```

Example:

```text
GET /api/v1/services
```

Versioning provides a clear boundary for future breaking API changes.

If a future API requires incompatible changes, a new version can be introduced:

```text
/api/v2
```

The frontend should centralize the base API URL so the version does not need to be repeated throughout individual components.

---

# 4. Content Types

Requests containing JSON data should use:

```http
Content-Type: application/json
Accept: application/json
```

File uploads should use:

```http
Content-Type: multipart/form-data
```

Responses should normally use:

```http
Content-Type: application/json
```

---

# 5. Authentication

Administrative API endpoints require authentication.

Public endpoints do not require administrator authentication.

Conceptually:

```text
Public API
    │
    ├── GET services
    ├── GET portfolio
    ├── GET blog
    ├── GET testimonials
    ├── POST contact
    └── POST booking

Admin API
    │
    ├── Authentication
    ├── Dashboard
    ├── Services management
    ├── Portfolio management
    ├── Blog management
    ├── Testimonials management
    ├── Bookings management
    ├── Messages management
    └── Media management
```

The exact Laravel authentication mechanism will be finalized during backend setup.

The selected authentication system must support:

* Secure login
* Session/token management
* Logout
* Protected API requests
* Expiration/revocation where applicable
* CSRF protection where applicable
* Authorization middleware

---

# 6. Public API

## 6.1 Services

### Get published services

```http
GET /api/v1/services
```

Returns services that are publicly available.

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Service Name",
      "slug": "service-name",
      "short_description": "Short description",
      "description": "Full description",
      "image": {
        "id": 10,
        "url": "/storage/media/example.jpg",
        "alt_text": "Example service image"
      }
    }
  ]
}
```

Draft services must not be returned by the public endpoint.

---

## 6.2 Single Service

```http
GET /api/v1/services/{slug}
```

Example:

```text
GET /api/v1/services/wedding-photography
```

Returns one published service.

### Possible responses

```text
200 OK
404 Not Found
```

---

# 7. Portfolio API

## 7.1 Get Portfolio

```http
GET /api/v1/portfolio
```

Returns published portfolio albums.

### Optional query parameters

```text
?page=1
&per_page=12
&category=category-slug
&featured=1
```

Example:

```text
GET /api/v1/portfolio?page=1&per_page=12
```

---

## 7.2 Single Portfolio Album

```http
GET /api/v1/portfolio/{slug}
```

Example:

```text
GET /api/v1/portfolio/wedding-project
```

The response should include:

* Album information
* Category
* Cover image
* Portfolio images
* Image captions
* Ordering information where needed

Draft albums must not be publicly accessible.

---

## 7.3 Portfolio Categories

```http
GET /api/v1/portfolio/categories
```

Returns available published portfolio categories.

Example response:

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Weddings",
      "slug": "weddings"
    }
  ]
}
```

---

# 8. Blog API

## 8.1 Get Blog Posts

```http
GET /api/v1/blog
```

### Optional parameters

```text
?page=1
&per_page=10
&category=category-slug
```

Example:

```text
GET /api/v1/blog?page=1&per_page=10
```

Only published posts should be returned.

---

## 8.2 Single Blog Post

```http
GET /api/v1/blog/{slug}
```

Example:

```text
GET /api/v1/blog/how-to-prepare-for-your-event
```

The response may include:

* Title
* Slug
* Excerpt
* Content
* Featured image
* Category
* Author display name
* Published date
* SEO metadata where appropriate

Private administrative information must not be exposed.

---

## 8.3 Blog Categories

```http
GET /api/v1/blog/categories
```

Returns blog categories.

---

# 9. Testimonials API

## Get Testimonials

```http
GET /api/v1/testimonials
```

Returns published testimonials.

Example:

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "client_name": "Client Name",
      "content": "Testimonial content",
      "client_image": {
        "url": "/storage/media/client.jpg",
        "alt_text": "Client Name"
      }
    }
  ]
}
```

Testimonials may be displayed on:

* Homepage
* About page
* Services pages
* Other appropriate sections

They do not require a dedicated public page.

---

# 10. Contact API

## Submit Contact Message

```http
POST /api/v1/contact
```

### Request

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+256700000000",
  "subject": "General enquiry",
  "message": "I would like to know more about your services."
}
```

### Required fields

```text
name
email
message
```

### Optional fields

```text
phone
subject
```

### Validation

The backend must validate:

* Required fields
* Valid email format
* Reasonable field lengths
* Message length
* Any applicable anti-spam controls

### Successful response

```json
{
  "success": true,
  "message": "Your message has been received.",
  "data": null
}
```

### Status

```text
201 Created
```

---

# 11. Booking API

## Submit Booking/Enquiry

```http
POST /api/v1/bookings
```

### Request

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+256700000000",
  "service_id": 2,
  "event_date": "2026-12-15",
  "event_location": "Kampala",
  "message": "I would like to enquire about availability."
}
```

### Required fields

Initially:

```text
name
email
phone
```

### Optional fields

```text
service_id
event_date
event_location
message
```

The exact required/optional field configuration should be confirmed when the final booking form is implemented.

### Successful response

```json
{
  "success": true,
  "message": "Your booking enquiry has been received.",
  "data": null
}
```

### Status

```text
201 Created
```

A booking submission does not automatically mean that the booking is confirmed.

---

# 12. Public API Security

Public form endpoints must not be treated as trusted input.

Laravel must validate and sanitize incoming data appropriately.

Protection should include:

* Request validation
* Rate limiting
* CSRF protection where applicable
* Spam protection
* Input length restrictions
* Email validation
* Server-side validation
* Safe database operations

Client-side validation in React is useful for user experience but is never a replacement for Laravel validation.

---

# 13. Authentication API

## Login

```http
POST /api/v1/auth/login
```

### Request

```json
{
  "email": "admin@example.com",
  "password": "password"
}
```

### Successful response

The exact response depends on the authentication mechanism selected during implementation.

Conceptually:

```json
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "user": {
      "id": 1,
      "name": "Administrator",
      "email": "admin@example.com",
      "role": "admin"
    }
  }
}
```

Authentication credentials or tokens must be handled securely.

---

# 14. Current Administrator

```http
GET /api/v1/auth/me
```

Returns the authenticated administrator's profile.

Example:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Administrator",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

---

# 15. Logout

```http
POST /api/v1/auth/logout
```

Ends the current administrator authentication session/token.

### Response

```json
{
  "success": true,
  "message": "Logged out successfully.",
  "data": null
}
```

---

# 16. Admin Dashboard API

## Dashboard Summary

```http
GET /api/v1/admin/dashboard
```

Requires authentication.

The response may contain summary counts:

```json
{
  "success": true,
  "data": {
    "services": 6,
    "portfolio_albums": 24,
    "blog_posts": 12,
    "testimonials": 8,
    "new_bookings": 5,
    "new_messages": 11
  }
}
```

Dashboard statistics should be optimized so the admin interface does not make unnecessary requests.

---

# 17. Admin Services API

All endpoints in this section require administrator authentication.

## List services

```http
GET /api/v1/admin/services
```

Optional:

```text
?page=1
&per_page=20
&status=published
&search=photography
```

---

## Create service

```http
POST /api/v1/admin/services
```

Example:

```json
{
  "title": "Wedding Photography",
  "slug": "wedding-photography",
  "short_description": "Professional wedding photography.",
  "description": "Full service description.",
  "image_id": 10,
  "status": "published",
  "sort_order": 1
}
```

---

## Get service

```http
GET /api/v1/admin/services/{id}
```

---

## Update service

```http
PUT /api/v1/admin/services/{id}
```

---

## Delete/archive service

```http
DELETE /api/v1/admin/services/{id}
```

Deletion behavior should respect the database's soft-delete and historical-data rules.

---

# 18. Admin Portfolio API

## List categories

```http
GET /api/v1/admin/portfolio/categories
```

## Create category

```http
POST /api/v1/admin/portfolio/categories
```

## Update category

```http
PUT /api/v1/admin/portfolio/categories/{id}
```

## Delete category

```http
DELETE /api/v1/admin/portfolio/categories/{id}
```

---

## List albums

```http
GET /api/v1/admin/portfolio/albums
```

Optional:

```text
?page=1
&per_page=20
&category_id=2
&status=published
&featured=1
&search=wedding
```

---

## Create album

```http
POST /api/v1/admin/portfolio/albums
```

Example:

```json
{
  "category_id": 1,
  "title": "Wedding Project",
  "slug": "wedding-project",
  "description": "Project description.",
  "cover_image_id": 15,
  "status": "published",
  "featured": true,
  "sort_order": 1
}
```

---

## Get album

```http
GET /api/v1/admin/portfolio/albums/{id}
```

---

## Update album

```http
PUT /api/v1/admin/portfolio/albums/{id}
```

---

## Delete/archive album

```http
DELETE /api/v1/admin/portfolio/albums/{id}
```

---

# 19. Admin Portfolio Images API

## List album images

```http
GET /api/v1/admin/portfolio/albums/{album_id}/images
```

## Add image

```http
POST /api/v1/admin/portfolio/albums/{album_id}/images
```

## Update image metadata

```http
PUT /api/v1/admin/portfolio/images/{id}
```

## Remove image from album

```http
DELETE /api/v1/admin/portfolio/images/{id}
```

Removing an image relationship must not automatically delete a media file that may still be used elsewhere.

---

# 20. Admin Blog API

## List posts

```http
GET /api/v1/admin/blog/posts
```

Optional:

```text
?page=1
&per_page=20
&status=draft
&category_id=1
&search=event
```

---

## Create post

```http
POST /api/v1/admin/blog/posts
```

Example:

```json
{
  "category_id": 1,
  "featured_image_id": 20,
  "title": "How to Prepare for Your Event",
  "slug": "how-to-prepare-for-your-event",
  "excerpt": "A short article summary.",
  "content": "Full article content.",
  "status": "draft",
  "published_at": null,
  "seo_title": "How to Prepare for Your Event",
  "seo_description": "Helpful event preparation advice."
}
```

The authenticated administrator may be assigned as the author by the backend.

---

## Get post

```http
GET /api/v1/admin/blog/posts/{id}
```

## Update post

```http
PUT /api/v1/admin/blog/posts/{id}
```

## Delete/archive post

```http
DELETE /api/v1/admin/blog/posts/{id}
```

---

# 21. Admin Blog Categories API

```text id="l0fb4p"
GET    /api/v1/admin/blog/categories
POST   /api/v1/admin/blog/categories
GET    /api/v1/admin/blog/categories/{id}
PUT    /api/v1/admin/blog/categories/{id}
DELETE /api/v1/admin/blog/categories/{id}
```

All require administrator authentication.

---

# 22. Admin Testimonials API

## List

```http
GET /api/v1/admin/testimonials
```

## Create

```http
POST /api/v1/admin/testimonials
```

## Get

```http
GET /api/v1/admin/testimonials/{id}
```

## Update

```http
PUT /api/v1/admin/testimonials/{id}
```

## Delete/archive

```http
DELETE /api/v1/admin/testimonials/{id}
```

Example payload:

```json
{
  "client_name": "Client Name",
  "content": "Excellent service and a great experience.",
  "client_image_id": 25,
  "status": "published",
  "sort_order": 1
}
```

---

# 23. Admin Bookings API

## List bookings

```http
GET /api/v1/admin/bookings
```

Optional:

```text
?page=1
&per_page=20
&status=new
&service_id=2
&date_from=2026-01-01
&date_to=2026-12-31
```

---

## Get booking

```http
GET /api/v1/admin/bookings/{id}
```

The response may include administrative information such as:

```text
internal_notes
status
```

These fields must never be returned by the public booking API.

---

## Update booking

```http
PUT /api/v1/admin/bookings/{id}
```

Example:

```json
{
  "status": "contacted",
  "internal_notes": "Client contacted by phone."
}
```

---

## Delete/archive booking

```http
DELETE /api/v1/admin/bookings/{id}
```

Historical booking data should be protected according to the database policy.

---

# 24. Admin Contact Messages API

## List messages

```http
GET /api/v1/admin/messages
```

Optional:

```text
?page=1
&per_page=20
&status=new
&search=john
```

---

## Get message

```http
GET /api/v1/admin/messages/{id}
```

---

## Update message

```http
PUT /api/v1/admin/messages/{id}
```

Example:

```json
{
  "status": "read"
}
```

---

## Delete/archive message

```http
DELETE /api/v1/admin/messages/{id}
```

---

# 25. Media API

Media management requires administrator authentication.

## List media

```http
GET /api/v1/admin/media
```

Optional:

```text
?page=1
&per_page=30
&type=image
&search=wedding
```

---

## Upload media

```http
POST /api/v1/admin/media
```

Content type:

```http
multipart/form-data
```

Example form fields:

```text
file
alt_text
```

The backend must validate:

* File type
* MIME type
* File size
* Image dimensions where applicable
* Filename handling
* Storage destination

---

## Get media

```http
GET /api/v1/admin/media/{id}
```

---

## Update media metadata

```http
PUT /api/v1/admin/media/{id}
```

Example:

```json
{
  "alt_text": "Wedding ceremony photography"
}
```

---

## Delete media

```http
DELETE /api/v1/admin/media/{id}
```

The backend should verify whether the media is still referenced before deleting the physical file.

---

# 26. Pagination

Collection endpoints should support pagination.

Example:

```http
GET /api/v1/admin/services?page=2&per_page=20
```

Recommended response:

```json
{
  "success": true,
  "data": [
    {}
  ],
  "meta": {
    "current_page": 2,
    "per_page": 20,
    "total": 57,
    "last_page": 3
  },
  "links": {
    "first": "...",
    "last": "...",
    "prev": "...",
    "next": "..."
  }
}
```

The exact pagination format should remain consistent across all collection endpoints.

---

# 27. Filtering

Filtering should use query parameters.

Example:

```text
GET /api/v1/admin/bookings?status=new
```

Multiple filters may be combined:

```text
GET /api/v1/admin/bookings?status=new&service_id=2
```

Filters must be explicitly supported by each endpoint.

The API must not dynamically expose arbitrary database columns for filtering.

---

# 28. Searching

Administrative list endpoints may support simple server-side search.

Example:

```text
GET /api/v1/admin/services?search=photography
```

Search fields should be explicitly defined by the endpoint.

For example, booking search may include:

```text
name
email
phone
```

Blog search may include:

```text
title
excerpt
```

---

# 29. Sorting

Administrative endpoints may support controlled sorting.

Example:

```text
GET /api/v1/admin/services?sort=sort_order&direction=asc
```

The backend must whitelist allowed sort fields.

Clients must not be allowed to inject arbitrary SQL column names into query parameters.

---

# 30. Standard Success Response

The preferred general response format is:

```json
{
  "success": true,
  "message": "Operation completed successfully.",
  "data": {}
}
```

For collection endpoints:

```json
{
  "success": true,
  "data": [],
  "meta": {}
}
```

Not every successful response needs a message.

The API should remain consistent rather than adding unnecessary fields to every response.

---

# 31. Validation Error Response

Laravel validation failures should return:

```http
422 Unprocessable Entity
```

Example:

```json
{
  "success": false,
  "message": "The provided data is invalid.",
  "errors": {
    "email": [
      "The email field must be a valid email address."
    ],
    "name": [
      "The name field is required."
    ]
  }
}
```

The React frontend should use the `errors` object to display field-level validation messages.

---

# 32. Authentication Error

Unauthenticated requests to protected endpoints should return:

```http
401 Unauthorized
```

Example:

```json
{
  "success": false,
  "message": "Authentication required.",
  "data": null
}
```

---

# 33. Authorization Error

An authenticated user without permission should receive:

```http
403 Forbidden
```

Example:

```json
{
  "success": false,
  "message": "You are not authorized to perform this action.",
  "data": null
}
```

---

# 34. Not Found Response

When a requested resource does not exist:

```http
404 Not Found
```

Example:

```json
{
  "success": false,
  "message": "Resource not found.",
  "data": null
}
```

The API should avoid leaking internal database information.

---

# 35. Rate Limit Response

When an endpoint exceeds its configured rate limit:

```http
429 Too Many Requests
```

Example:

```json
{
  "success": false,
  "message": "Too many requests. Please try again later.",
  "data": null
}
```

Public form endpoints should have appropriate rate limiting.

---

# 36. Server Error Response

Unexpected server errors should return:

```http
500 Internal Server Error
```

Example:

```json
{
  "success": false,
  "message": "An unexpected error occurred.",
  "data": null
}
```

Production responses must not expose:

* Stack traces
* SQL queries
* File paths
* Environment variables
* Database credentials
* Internal implementation details

Detailed errors should be logged server-side.

---

# 37. HTTP Status Code Reference

| Status | Meaning               | Typical Use                           |
| ------ | --------------------- | ------------------------------------- |
| `200`  | OK                    | Successful GET/update                 |
| `201`  | Created               | Successful POST creating data         |
| `204`  | No Content            | Successful deletion where appropriate |
| `400`  | Bad Request           | Malformed request                     |
| `401`  | Unauthorized          | Authentication required               |
| `403`  | Forbidden             | Authenticated but not authorized      |
| `404`  | Not Found             | Resource does not exist               |
| `409`  | Conflict              | Duplicate/conflicting resource        |
| `422`  | Unprocessable Entity  | Validation failure                    |
| `429`  | Too Many Requests     | Rate limit exceeded                   |
| `500`  | Internal Server Error | Unexpected server failure             |
| `503`  | Service Unavailable   | Temporary service failure             |

---

# 38. API Resource Transformation

Laravel API Resources should be used where appropriate to control the structure of public responses.

For example:

```text
ServiceResource
PortfolioAlbumResource
PortfolioImageResource
BlogPostResource
TestimonialResource
BookingResource
ContactMessageResource
MediaResource
UserResource
```

Public resources and administrative resources may expose different fields.

For example:

```text
Public Booking
    ↓
Submission confirmation only

Admin Booking
    ↓
Client details
Service
Event information
Status
Internal notes
Timestamps
```

---

# 39. Relationship Loading

Laravel should use controlled eager loading when related resources are required.

Example:

```text
Portfolio Album
    ├── Category
    ├── Cover Image
    └── Images
```

The API should avoid N+1 database queries.

At the same time, unrelated relationships should not be loaded unnecessarily.

---

# 40. API Validation

Every write endpoint must have server-side validation.

Laravel Form Request classes should be used where appropriate.

Examples:

```text
StoreServiceRequest
UpdateServiceRequest

StorePortfolioCategoryRequest
UpdatePortfolioCategoryRequest

StorePortfolioAlbumRequest
UpdatePortfolioAlbumRequest

StoreBlogCategoryRequest
UpdateBlogCategoryRequest

StoreBlogPostRequest
UpdateBlogPostRequest

StoreTestimonialRequest
UpdateTestimonialRequest

StoreBookingRequest

StoreContactMessageRequest

UpdateBookingRequest
UpdateContactMessageRequest

UploadMediaRequest
UpdateMediaRequest
```

Exact class names may be adjusted during implementation.

---

# 41. API Authorization

Public endpoints:

```text
GET published content
POST contact
POST booking
```

Administrative endpoints:

```text
/api/v1/admin/*
```

must require authentication.

The backend must never rely solely on the React frontend to hide administrative functionality.

For example, hiding:

```text
/admin/services
```

from the React router does not provide security by itself.

The Laravel API must independently reject unauthorized requests.

---

# 42. API Route Organization

Laravel routes should be organized logically.

Conceptually:

```php
Route::prefix('v1')->group(function () {

    // Public
    Route::get('/services', ...);
    Route::get('/services/{slug}', ...);

    Route::get('/portfolio', ...);
    Route::get('/portfolio/{slug}', ...);

    Route::get('/blog', ...);
    Route::get('/blog/{slug}', ...);

    Route::get('/testimonials', ...);

    Route::post('/contact', ...);
    Route::post('/bookings', ...);

    // Authentication
    Route::post('/auth/login', ...);

    Route::middleware('auth')->group(function () {

        Route::get('/auth/me', ...);
        Route::post('/auth/logout', ...);

        // Admin routes
        Route::prefix('admin')->group(function () {
            // administrative routes
        });
    });
});
```

The exact Laravel authentication middleware will be determined during implementation.

---

# 43. Public Endpoint Summary

```text id="x5ypn4"
GET  /api/v1/services
GET  /api/v1/services/{slug}

GET  /api/v1/portfolio
GET  /api/v1/portfolio/{slug}
GET  /api/v1/portfolio/categories

GET  /api/v1/blog
GET  /api/v1/blog/{slug}
GET  /api/v1/blog/categories

GET  /api/v1/testimonials

POST /api/v1/contact
POST /api/v1/bookings
```

---

# 44. Authentication Endpoint Summary

```text id="9j9j9m"
POST /api/v1/auth/login
GET  /api/v1/auth/me
POST /api/v1/auth/logout
```

---

# 45. Administrative Endpoint Summary

```text id="f2r1uo"
GET    /api/v1/admin/dashboard

GET    /api/v1/admin/services
POST   /api/v1/admin/services
GET    /api/v1/admin/services/{id}
PUT    /api/v1/admin/services/{id}
DELETE /api/v1/admin/services/{id}

GET    /api/v1/admin/portfolio/categories
POST   /api/v1/admin/portfolio/categories
GET    /api/v1/admin/portfolio/categories/{id}
PUT    /api/v1/admin/portfolio/categories/{id}
DELETE /api/v1/admin/portfolio/categories/{id}

GET    /api/v1/admin/portfolio/albums
POST   /api/v1/admin/portfolio/albums
GET    /api/v1/admin/portfolio/albums/{id}
PUT    /api/v1/admin/portfolio/albums/{id}
DELETE /api/v1/admin/portfolio/albums/{id}

GET    /api/v1/admin/portfolio/albums/{album_id}/images
POST   /api/v1/admin/portfolio/albums/{album_id}/images
PUT    /api/v1/admin/portfolio/images/{id}
DELETE /api/v1/admin/portfolio/images/{id}

GET    /api/v1/admin/blog/categories
POST   /api/v1/admin/blog/categories
GET    /api/v1/admin/blog/categories/{id}
PUT    /api/v1/admin/blog/categories/{id}
DELETE /api/v1/admin/blog/categories/{id}

GET    /api/v1/admin/blog/posts
POST   /api/v1/admin/blog/posts
GET    /api/v1/admin/blog/posts/{id}
PUT    /api/v1/admin/blog/posts/{id}
DELETE /api/v1/admin/blog/posts/{id}

GET    /api/v1/admin/testimonials
POST   /api/v1/admin/testimonials
GET    /api/v1/admin/testimonials/{id}
PUT    /api/v1/admin/testimonials/{id}
DELETE /api/v1/admin/testimonials/{id}

GET    /api/v1/admin/bookings
GET    /api/v1/admin/bookings/{id}
PUT    /api/v1/admin/bookings/{id}
DELETE /api/v1/admin/bookings/{id}

GET    /api/v1/admin/messages
GET    /api/v1/admin/messages/{id}
PUT    /api/v1/admin/messages/{id}
DELETE /api/v1/admin/messages/{id}

GET    /api/v1/admin/media
POST   /api/v1/admin/media
GET    /api/v1/admin/media/{id}
PUT    /api/v1/admin/media/{id}
DELETE /api/v1/admin/media/{id}
```

---

# 46. API Design Principles

The API should follow these principles:

### 1. Consistency

Similar resources should use similar endpoint structures.

### 2. Explicit authorization

Protected endpoints must be protected by Laravel, not just React.

### 3. Server-side validation

All client input must be validated on the backend.

### 4. Minimal public exposure

Only information required by the public website should be returned publicly.

### 5. Predictable responses

Success and error responses should follow a consistent structure.

### 6. Controlled querying

Filtering, sorting and pagination must use whitelisted parameters.

### 7. Resource-oriented URLs

URLs should represent resources rather than frontend screens.

### 8. Versioning

Breaking API changes should use a new API version.

### 9. Secure errors

Internal implementation details must not be exposed to clients.

### 10. Performance

Queries should avoid unnecessary database calls and N+1 relationships.

---

# 47. Frontend API Service Layer

React components should not make raw API requests throughout the application.

Instead, API communication should be centralized.

Suggested structure:

```text
frontend/src/services/
├── api.js
├── authService.js
├── serviceService.js
├── portfolioService.js
├── blogService.js
├── testimonialService.js
├── bookingService.js
├── contactService.js
├── mediaService.js
└── adminService.js
```

The exact organization can be simplified if the implementation remains small.

The important principle is that components should not contain duplicated HTTP logic.

---

# 48. API Environment Configuration

The frontend should use an environment variable:

```env
VITE_API_URL=
```

The backend should use Laravel environment configuration:

```env
APP_URL=
DB_CONNECTION=
DB_HOST=
DB_PORT=
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
```

Secrets must remain server-side.

The frontend environment must never contain:

```text
DB_PASSWORD
database credentials
private API secrets
Laravel application secrets
```

---

# 49. API Testing

The API should be tested independently of the React interface.

Testing should cover:

### Public

* Published services are returned
* Draft services are hidden
* Published portfolio is returned
* Draft portfolio is hidden
* Published blog posts are returned
* Draft blog posts are hidden
* Testimonials are returned correctly
* Contact submission validation
* Booking submission validation

### Authentication

* Valid login
* Invalid login
* Logout
* Authenticated user retrieval
* Unauthorized access rejection

### Administration

* CRUD operations
* Validation
* Authorization
* Pagination
* Filtering
* Status changes
* Media upload
* Media deletion/reference protection

### Errors

* 401
* 403
* 404
* 409
* 422
* 429
* 500 handling

---

# 50. API Documentation Maintenance

Whenever an API endpoint changes, the following should be reviewed:

```text
API.md
Laravel routes
Controller
Form Request
API Resource
Eloquent model
Tests
Frontend service
Frontend types
```

API documentation must describe the implemented API rather than becoming a separate theoretical specification.

---

# 51. Initial API Contract

The initial API is intentionally focused on the actual Merit Media requirements:

```text
Public Content
    Services
    Portfolio
    Blog
    Testimonials

Public Communication
    Contact
    Booking

Administration
    Authentication
    Dashboard
    Services
    Portfolio
    Blog
    Testimonials
    Bookings
    Messages
    Media
```

The API should not introduce unnecessary endpoints for features that are outside the initial project scope.

---

# 52. Future API Expansion

Future functionality may introduce endpoints for:

* Site settings
* FAQs
* Advanced media collections
* Availability calendars
* Client accounts
* Payments
* Newsletter subscribers
* Email campaigns
* Analytics
* Audit logs
* SEO redirects
* Multiple languages

These should be introduced only when the corresponding product requirements are approved.

---

# 53. Final API Architecture

The final communication model is:

```text
┌──────────────────────────────┐
│        React + Vite          │
│                              │
│  Public UI   │   Admin UI    │
└──────────────┬───────────────┘
               │
               │ HTTP/HTTPS
               │ JSON
               ▼
┌──────────────────────────────┐
│       Laravel REST API       │
│                              │
│ Routes                       │
│ Middleware                   │
│ Authentication               │
│ Validation                   │
│ Controllers                  │
│ Services                     │
│ API Resources                │
│ Eloquent Models              │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│           MySQL              │
│                              │
│ Users                        │
│ Media                        │
│ Services                     │
│ Portfolio                    │
│ Blog                         │
│ Testimonials                 │
│ Bookings                     │
│ Contact Messages             │
└──────────────────────────────┘
```

This API architecture establishes a clear boundary between the React application, Laravel application, and MySQL database while supporting both the public website and protected administration system.
