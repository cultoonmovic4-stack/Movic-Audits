# Development Guidelines

## 1. Purpose

This document defines the development standards for the Merit Media web application.

The goal is to keep the project:

* Consistent
* Maintainable
* Secure
* Understandable
* Testable
* Scalable
* Easy to onboard into

These guidelines apply to the React frontend, Laravel backend, database, API, administration interface, and project documentation.

---

# 2. Core Development Principles

Development should follow these principles:

1. Keep responsibilities separated.
2. Prefer simple solutions over unnecessary complexity.
3. Reuse components and logic where appropriate.
4. Validate data at the backend.
5. Keep business rules out of presentation components.
6. Keep API communication centralized.
7. Protect administrative operations.
8. Keep database changes version-controlled.
9. Write code that another developer can understand.
10. Avoid premature abstraction.
11. Avoid unnecessary dependencies.
12. Test important behavior.
13. Keep documentation aligned with implementation.

---

# 3. Project Structure

The repository follows this general structure:

```text id="n6m2q8"
merit-media/
├── frontend/
├── backend/
├── docs/
├── database/
├── README.md
└── ROADMAP.md
```

Frontend and backend remain separate applications within the same repository.

The admin interface remains part of the React frontend rather than becoming a separate frontend application.

---

# 4. Frontend Development

The frontend uses:

* React
* Vite
* Tailwind CSS
* React Router

The frontend is responsible for:

* User interfaces
* Routing
* Client-side state
* Form interaction
* Client-side validation
* API communication
* Loading/error states
* Accessibility
* Responsive presentation

The frontend must not directly access MySQL.

---

# 5. Backend Development

The backend uses:

* PHP
* Laravel
* Eloquent ORM
* MySQL

The backend is responsible for:

* API endpoints
* Authentication
* Authorization
* Validation
* Business rules
* Database access
* Media handling
* Security
* API responses

The backend is the authoritative source for business logic and validation.

---

# 6. React Component Principles

React components should generally have a focused responsibility.

Avoid large components containing:

* Complex API logic
* Extensive business rules
* Multiple unrelated UI concerns
* Large amounts of duplicated markup

Prefer:

```text id="h8m2w6"
Page
 ├── Section
 │    ├── Card
 │    └── Card
 └── Form
```

rather than one extremely large component.

---

# 7. Component Reuse

Reusable components should be created when the same interface behavior appears in multiple places.

Examples:

```text id="p4q8s1"
Button
Input
Textarea
Select
Modal
Card
Pagination
LoadingState
ErrorState
StatusBadge
```

Do not create abstractions merely because two components happen to contain a few similar lines.

Abstraction should improve maintainability rather than obscure simple code.

---

# 8. Component Naming

React components should use PascalCase.

Examples:

```text id="z2x7m5"
Navbar.jsx
Footer.jsx
ServiceCard.jsx
BookingForm.jsx
AdminSidebar.jsx
```

Hooks should use the `use` prefix:

```text id="v4n8q2"
useAuth.js
useServices.js
usePagination.js
```

Utility modules should use clear descriptive names.

---

# 9. File Naming

Frontend component files should normally use PascalCase for React components.

Examples:

```text id="k3r7d1"
ServiceCard.jsx
PortfolioCard.jsx
AdminHeader.jsx
```

General JavaScript utility files may use camelCase:

```text id="m8q2v6"
apiClient.js
formatDate.js
validation.js
```

The project should avoid inconsistent naming conventions.

---

# 10. React State Management

Use the simplest state-management mechanism appropriate for the feature.

Prefer:

1. Local component state
2. Custom hooks
3. Context for genuinely shared application state
4. A dedicated state library only if project complexity eventually requires one

Do not introduce global state for data that belongs to a single component.

---

# 11. API Communication

API communication should be centralized.

Components should generally call service functions rather than directly constructing HTTP requests throughout the UI.

Example:

```text id="r1c7k4"
Component
   ↓
service function
   ↓
apiClient
   ↓
Laravel API
```

This keeps API behavior consistent and easier to change.

---

# 12. API Client

The frontend should have a central API client responsible for common behavior such as:

* Base URL
* Authentication handling
* Headers
* JSON parsing
* Error normalization
* Request configuration

Feature-specific service modules should build on this client.

---

# 13. Frontend Error Handling

Every API-driven feature should account for:

```text id="j5v9n2"
Loading
Success
Empty
Error
```

For example:

```jsx id="f3k8q1"
if (loading) return <LoadingState />;
if (error) return <ErrorState />;
if (!items.length) return <EmptyState />;
return <ItemList items={items} />;
```

The actual implementation may vary, but these states should not be forgotten.

---

# 14. Form Development

Forms should:

* Have clear labels
* Identify required fields
* Validate basic input client-side
* Display field-level errors
* Display server-side validation errors
* Prevent duplicate submissions
* Provide clear success/failure feedback

Backend validation remains authoritative.

---

# 15. Form Submission

A typical form flow is:

```text id="x7q3m9"
User Input
    ↓
Client Validation
    ↓
Submit
    ↓
Disable Submission
    ↓
API Request
    ↓
Server Validation
    ↓
Success / Error
    ↓
Update UI
```

Buttons should provide appropriate feedback while requests are processing.

---

# 16. Tailwind CSS Guidelines

Tailwind CSS should be used consistently for application styling.

Prefer reusable component patterns over copying excessively large class strings throughout the application.

Common design patterns should be extracted into reusable components when repetition becomes meaningful.

Avoid unnecessary custom CSS when Tailwind utilities can express the required styling cleanly.

---

# 17. Responsive Design

Every public and administrative interface should be designed responsively.

Development should consider:

```text id="d5k9x3"
Mobile
Tablet
Desktop
Large Desktop
```

Do not design desktop first and assume mobile will automatically work.

Important areas include:

* Navigation
* Tables
* Forms
* Images
* Cards
* Modals
* Admin sidebar
* Blog content

---

# 18. Accessibility

Accessibility should be considered during implementation rather than added afterward.

Requirements include:

* Semantic HTML
* Labels for form fields
* Keyboard navigation
* Visible focus states
* Accessible buttons
* Meaningful link text
* Alternative text for meaningful images
* Accessible dialogs
* Clear error messages
* Color-independent status communication

---

# 19. Backend Controller Guidelines

Laravel controllers should remain relatively thin.

A controller should generally:

1. Receive the request.
2. Validate the request.
3. Invoke the required application logic.
4. Return an appropriate response.

Avoid putting large business rules directly inside controllers.

---

# 20. Form Requests

Laravel Form Requests should be used for meaningful request validation.

Examples:

```text id="a4m7c2"
StoreServiceRequest
UpdateServiceRequest

StoreBookingRequest
StoreContactMessageRequest

StoreBlogPostRequest
UpdateBlogPostRequest
```

The exact class structure may evolve as the implementation develops.

---

# 21. Service Layer

A service class should be introduced when business logic becomes sufficiently complex that it does not belong naturally in a controller or model.

Good candidates may include:

* Complex portfolio operations
* Media processing
* Booking workflows
* Multi-step content operations

Do not create service classes for every simple CRUD operation purely for architectural ceremony.

---

# 22. Eloquent Models

Models should represent database entities and their relationships.

Models should define appropriate relationships such as:

```php id="u5j8x2"
belongsTo()
hasMany()
hasOne()
```

Models should also protect against inappropriate mass assignment.

---

# 23. Database Queries

Prefer Eloquent or Laravel's query builder for normal database operations.

Avoid unnecessary raw SQL.

When raw SQL is genuinely required, it must use safe parameterization.

---

# 24. Avoiding N+1 Queries

When displaying related data, use appropriate eager loading.

Example concept:

```php id="r7k2m9"
PortfolioAlbum::with(['category', 'coverMedia'])
```

Database performance should be considered when designing API resources and administrative tables.

---

# 25. API Resources

Laravel API Resources should control how database models are exposed through the API.

Resources should:

* Expose only necessary fields
* Hide internal data
* Provide consistent structures
* Handle relationships intentionally

Do not automatically serialize complete database models when a smaller public representation is sufficient.

---

# 26. API Response Consistency

API responses should follow the conventions defined in `API.md`.

Successful responses should provide a predictable structure.

Errors should provide:

* Appropriate HTTP status
* General message
* Validation details where applicable

Frontend code should not need separate response-parsing logic for every endpoint.

---

# 27. Naming Database Tables

Database tables should use plural snake_case names.

Examples:

```text id="f6c2m8"
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

---

# 28. Database Column Naming

Columns should use snake_case.

Examples:

```text id="w3q8k1"
created_at
updated_at
published_at
event_date
sort_order
featured_media_id
```

Foreign keys should normally follow:

```text id="p9v4s6"
{entity}_id
```

Example:

```text id="b5n2x7"
service_id
category_id
author_id
media_id
```

---

# 29. Migrations

Every schema change should be represented by a Laravel migration.

Do not make undocumented production schema changes manually when a migration can represent the change.

Migrations should be:

* Focused
* Understandable
* Tested
* Safe to execute in the intended deployment sequence

---

# 30. Seeders and Factories

Factories should support development and testing.

Seeders may provide:

* Development data
* Test data
* Required system data

Production seeders should be carefully controlled.

Development sample data should never accidentally become production content.

---

# 31. Slug Development

Slugs should be generated consistently.

Typical workflow:

```text id="n7c2v5"
Title
  ↓
Slug Generation
  ↓
Unique Slug
  ↓
Database
```

The backend should ultimately enforce uniqueness.

Frontend slug generation should not be treated as sufficient protection.

---

# 32. Status Handling

Statuses should use controlled values.

Examples:

```text id="j8m4q1"
draft
published
archived
```

Booking statuses:

```text id="x5v7c2"
new
contacted
in_progress
confirmed
completed
cancelled
```

Message statuses:

```text id="g3p8m6"
new
read
replied
archived
```

Status values should not be duplicated as arbitrary strings throughout the codebase without a consistent convention.

---

# 33. Dates and Times

Dates should be handled consistently between frontend, backend, and database.

Important considerations include:

* Database storage format
* API serialization
* Browser timezone
* Event dates
* Publication dates
* Display formatting

The application should distinguish between dates that represent a calendar date and timestamps that represent an exact moment.

---

# 34. Authentication Development

Authentication changes should be treated as security-sensitive.

Changes should consider:

* Login
* Logout
* Session/token handling
* Protected routes
* API middleware
* Authorization
* CORS
* CSRF where applicable
* Error handling

Authentication architecture is documented in `AUTHENTICATION.md`.

---

# 35. Security Development

Security requirements are defined in `SECURITY.md`.

Developers should review those requirements when implementing:

* Public forms
* Admin endpoints
* Authentication
* File uploads
* Rich text
* Database queries
* API resources
* Environment configuration

Security should be implemented alongside features rather than postponed until launch.

---

# 36. Media Development

Media functionality should use the centralized media architecture.

The system should avoid creating separate unrelated upload mechanisms for every feature.

Where appropriate:

```text id="s2q8m5"
Media Library
      ↓
Media Record
      ↓
Content Relationship
```

Uploaded files should be validated and safely stored by Laravel.

---

# 37. Rich Text Development

If a rich-text editor is used for blog content:

* Sanitize HTML
* Restrict unsupported elements
* Validate links
* Prevent script injection
* Test rendered output

Do not assume administrator input is automatically safe.

---

# 38. Logging

Logging should be useful rather than excessive.

Good candidates include:

* Authentication failures
* Important application errors
* Unexpected backend failures
* Significant administrative events

Do not log:

* Passwords
* Authentication secrets
* Database passwords
* API keys
* Unnecessary sensitive information

---

# 39. Comments

Code comments should explain **why**, not merely repeat **what** the code does.

Avoid:

```js id="m8x2v7"
// Set loading to true
setLoading(true);
```

Prefer comments that explain a non-obvious decision:

```js id="q4j7n1"
// Keep the previous results visible while the next page loads
// to avoid unnecessary layout shifts.
```

Comments should remain accurate as the code evolves.

---

# 40. Documentation

Documentation should be updated when implementation changes significantly.

Important documentation includes:

```text id="p2v6k9"
PROJECT_OVERVIEW.md
REQUIREMENTS.md
ARCHITECTURE.md
DATABASE.md
API.md
FRONTEND.md
BACKEND.md
ADMIN.md
AUTHENTICATION.md
SECURITY.md
SEO.md
DEPLOYMENT.md
DEVELOPMENT_GUIDELINES.md
ROADMAP.md
README.md
```

Documentation should describe the actual architecture rather than hypothetical features.

---

# 41. Git Branching

A simple Git workflow should be used initially.

Example:

```text id="d8m3q5"
main
 │
 ├── feature/services
 ├── feature/blog
 ├── feature/admin
 ├── fix/contact-form
 └── fix/authentication
```

Feature branches should be reasonably focused.

Avoid very large branches containing unrelated functionality.

---

# 42. Commit Messages

Commit messages should clearly communicate what changed.

Examples:

```text id="v5k2n8"
feat: add services API
feat: add admin service management
fix: validate booking email
fix: correct portfolio pagination
refactor: simplify API client
docs: update deployment guide
test: add booking validation tests
```

Avoid vague commits such as:

```text id="x1m7q4"
changes
updates
stuff
fixed things
```

---

# 43. Pull Requests

Where pull requests are used, they should explain:

* What changed
* Why it changed
* What was tested
* Any database changes
* Any deployment considerations

Large changes should be divided when practical.

---

# 44. Code Review

Code review should focus on:

* Correctness
* Security
* Maintainability
* Simplicity
* Performance
* Accessibility
* Testing
* API consistency
* Database integrity

Reviewers should distinguish between required corrections and optional stylistic preferences.

---

# 45. Testing Strategy

The project should use multiple levels of testing.

### Backend

* Unit tests
* Feature/API tests
* Validation tests
* Authentication tests
* Authorization tests

### Frontend

* Component tests where useful
* Form behavior tests
* Route behavior tests
* Critical interaction tests

### Integration

Test important flows across frontend and backend.

---

# 46. Critical Flows to Test

Important application flows include:

```text id="q7m3x9"
Admin Login
Admin Logout

Create Service
Edit Service
Publish Service

Create Portfolio Album
Upload Portfolio Image

Create Blog Post
Publish Blog Post

Submit Booking
Submit Contact Message

Update Booking Status
Mark Message as Read

Upload Media
Delete/Archive Content
```

Not every simple UI element requires an individual test.

Testing effort should prioritize meaningful application behavior.

---

# 47. Testing Before Commit

Before committing significant changes, developers should run appropriate checks.

Frontend may include:

```bash id="f2x7n4"
npm run lint
npm run build
```

Backend may include:

```bash id="k8m3q1"
php artisan test
```

The exact commands depend on the tooling configured during implementation.

---

# 48. Local Development Workflow

A typical workflow is:

```text id="r6q1v8"
1. Pull latest code
       ↓
2. Create/update feature branch
       ↓
3. Start frontend
       ↓
4. Start Laravel backend
       ↓
5. Verify database
       ↓
6. Implement feature
       ↓
7. Test feature
       ↓
8. Review changed files
       ↓
9. Commit
       ↓
10. Merge/deploy when approved
```

---

# 49. Dependency Management

New dependencies should be added only when justified.

Before adding a package, consider:

* Is the functionality genuinely required?
* Can the existing stack handle it?
* Is the package maintained?
* Does it introduce unnecessary complexity?
* Does it create security or licensing concerns?
* Does it significantly increase bundle size?

Avoid dependency accumulation.

---

# 50. Frontend Performance Guidelines

Developers should avoid:

* Loading unnecessary JavaScript
* Huge component bundles
* Duplicate API requests
* Unoptimized images
* Rendering very large lists without pagination
* Unnecessary global state
* Excessive third-party packages

Use:

* Lazy loading
* Code splitting
* Pagination
* Optimized images
* Memoization where actually beneficial
* Efficient API calls

Optimization should be based on actual needs.

---

# 51. Backend Performance Guidelines

Developers should consider:

* N+1 queries
* Unnecessary database queries
* Missing indexes
* Large API responses
* Unbounded lists
* Expensive repeated calculations

Use:

* Eager loading
* Pagination
* Appropriate indexes
* API resources
* Caching where justified

---

# 52. API Development Checklist

Before adding an API endpoint:

* [ ] Define the purpose
* [ ] Determine whether it is public or protected
* [ ] Define request structure
* [ ] Define validation
* [ ] Define authorization
* [ ] Define response structure
* [ ] Define error responses
* [ ] Consider pagination
* [ ] Consider rate limiting
* [ ] Add tests
* [ ] Update `API.md`

---

# 53. Database Change Checklist

Before changing the database:

* [ ] Confirm the requirement
* [ ] Check existing relationships
* [ ] Check indexes
* [ ] Create a migration
* [ ] Update models
* [ ] Update API resources
* [ ] Update validation
* [ ] Update tests
* [ ] Update `DATABASE.md`
* [ ] Update `database/ERD.md` if relationships changed

---

# 54. Feature Development Checklist

For a typical feature:

```text id="w4m7p2"
Requirement
    ↓
Database
    ↓
Backend API
    ↓
Validation
    ↓
Frontend service
    ↓
Frontend UI
    ↓
Admin UI where applicable
    ↓
Testing
    ↓
Documentation
```

The order may vary for individual tasks, but all relevant layers should be considered.

---

# 55. Avoiding Overengineering

The initial application should remain intentionally straightforward.

Do not introduce:

* Microservices
* Multiple frontend applications
* Complex state-management systems
* Kubernetes
* Event-driven architecture everywhere
* Complex caching infrastructure
* Multiple databases
* Unnecessary abstraction layers

unless actual project requirements justify them.

The architecture should grow with the application.

---

# 56. Definition of Done

A feature should generally be considered complete when:

* [ ] Requirements are satisfied
* [ ] Frontend implementation is complete
* [ ] Backend implementation is complete
* [ ] Database changes are complete where required
* [ ] Validation works
* [ ] Security requirements are addressed
* [ ] Responsive behavior works
* [ ] Accessibility has been considered
* [ ] Loading/error/empty states work
* [ ] Tests are appropriate
* [ ] Documentation is updated

---

# 57. Final Development Principles

The project should consistently prioritize:

```text id="j9k3v6"
Simple
     ↓
Clear
     ↓
Secure
     ↓
Reusable
     ↓
Testable
     ↓
Maintainable
```

The goal is not to build the most complicated architecture possible.

The goal is to build a reliable application that can evolve as Merit Media's actual requirements grow.
