# Admin Panel Documentation

## 1. Purpose

The Merit Media admin panel is the protected content-management area of the application.

It allows authorized administrators to manage the content and operational data used by the public website without directly interacting with the database.

The admin panel is part of the same React/Vite frontend application as the public website and communicates with the Laravel backend through authenticated API requests.

### Core objectives

The admin panel should provide:

* Secure administrator authentication
* Centralized content management
* Service management
* Portfolio management
* Blog management
* Testimonial management
* Booking/enquiry management
* Contact-message management
* Media management
* Search, filtering, sorting, and pagination
* Clear validation and error handling
* Responsive administration interfaces
* Consistent and accessible user experience

---

## 2. Admin Architecture

The admin area follows this structure:

```text
Administrator
    ↓
React Admin Interface
    ↓
Protected React Routes
    ↓
Authenticated API Requests
    ↓
Laravel Authentication Middleware
    ↓
Authorization
    ↓
Controllers
    ↓
Validation / Services
    ↓
Eloquent Models
    ↓
MySQL
```

The administrator never accesses MySQL directly.

All administrative operations must pass through the Laravel API.

---

## 3. Admin Route Map

### Authentication

```text
/admin/login
```

### Protected administration routes

```text
/admin
/admin/dashboard

/admin/services
/admin/services/create
/admin/services/:id/edit

/admin/portfolio
/admin/portfolio/categories
/admin/portfolio/albums
/admin/portfolio/albums/create
/admin/portfolio/albums/:id/edit

/admin/blog
/admin/blog/categories
/admin/blog/posts
/admin/blog/posts/create
/admin/blog/posts/:id/edit

/admin/testimonials
/admin/testimonials/create
/admin/testimonials/:id/edit

/admin/bookings
/admin/bookings/:id

/admin/messages
/admin/messages/:id

/admin/media
```

The exact nested URL structure may be adjusted during implementation, but the functional areas should remain consistent.

---

# 4. Admin Layout

The admin application should use a dedicated `AdminLayout`.

```text
AdminLayout
├── Sidebar
├── Header
├── Main Content
└── Notification Area
```

The public website should use a separate `PublicLayout`.

The two layouts share reusable components where appropriate but should not be tightly coupled.

---

## 5. Sidebar Navigation

The sidebar provides access to major administrative areas.

Suggested navigation:

```text
Dashboard

Content
├── Services
├── Portfolio
├── Blog
└── Testimonials

Enquiries
├── Bookings
└── Messages

Media
└── Media Library

Account
├── Profile
└── Logout
```

Navigation items should use:

* Clear labels
* Consistent icons
* Active-route indication
* Accessible keyboard navigation
* Tooltips where necessary on collapsed layouts

---

## 6. Admin Header

The admin header should provide:

* Page title
* Breadcrumbs where useful
* Sidebar toggle on smaller screens
* Administrator/account menu
* Logout action
* Optional notification indicator
* Optional quick-action controls

The header should remain visually consistent throughout the admin interface.

---

# 7. Dashboard

The dashboard provides an overview of the site's current administrative state.

## Suggested dashboard metrics

Initial dashboard cards may include:

```text
Published Services
Portfolio Albums
Published Blog Posts
Testimonials
New Bookings
Unread Messages
```

Additional metrics can be introduced later if they provide meaningful operational value.

## Recent activity

The dashboard may display:

* Recent bookings
* Recent contact messages
* Recently published blog posts
* Recently added portfolio items

The dashboard should prioritize actionable information rather than unnecessary statistics.

---

# 8. Services Management

Administrators can create, view, update, publish, archive, and delete services.

## Service list

The service management table should support:

* Search
* Status filtering
* Sorting
* Pagination
* Create service
* Edit service
* Archive
* Delete
* Publish/unpublish where applicable

Suggested columns:

```text
Title
Status
Sort Order
Updated
Actions
```

## Service form

Suggested fields:

```text
Title
Slug
Short Description
Description
Featured Image
Status
Sort Order
```

The slug may be generated automatically from the title while still allowing controlled editing when necessary.

## Service statuses

```text
Draft
Published
Archived
```

Only published services should appear on the public website.

---

# 9. Portfolio Management

Portfolio management consists of:

* Categories
* Albums/projects
* Portfolio images

## Portfolio categories

Administrators can:

* Create categories
* Edit categories
* Delete categories
* Reorder categories where required

## Portfolio albums

Administrators can:

* Create albums
* Edit albums
* Assign categories
* Set cover images
* Add descriptions
* Mark albums as featured
* Publish/archive albums
* Delete albums

Suggested album fields:

```text
Title
Slug
Category
Description
Cover Image
Status
Featured
Sort Order
```

## Portfolio images

Administrators can:

* Upload images
* Add images to an album
* Reorder images
* Add captions
* Add alternative text
* Remove images

The interface should support visual previews where practical.

---

# 10. Blog Management

The blog administration system manages:

* Blog categories
* Blog posts

## Blog categories

Administrators can:

* Create categories
* Edit categories
* Delete categories
* View associated posts

## Blog posts

Administrators can:

* Create posts
* Edit posts
* Save drafts
* Publish posts
* Archive posts
* Delete posts
* Assign categories
* Set featured images
* Set publication dates
* Manage SEO metadata

Suggested fields:

```text
Title
Slug
Excerpt
Content
Category
Featured Image
Status
Published At
SEO Title
SEO Description
```

## Blog editor

The content editor should support standard formatting such as:

* Headings
* Paragraphs
* Bold
* Italic
* Links
* Lists
* Blockquotes
* Images where required

Rich-text content must be sanitized before being rendered publicly.

---

# 11. Testimonial Management

Administrators can manage customer testimonials.

## Testimonial fields

```text
Client Name
Content
Client Image
Status
Sort Order
```

## Supported operations

* Create
* View
* Edit
* Publish
* Archive
* Delete
* Reorder

Only published testimonials should be displayed publicly.

Testimonials should remain a reusable content section rather than requiring a dedicated public page.

---

# 12. Booking Management

The booking system manages enquiries submitted through the public booking form.

## Booking list

Suggested columns:

```text
Client
Service
Event Date
Status
Submitted
Actions
```

The administrator should be able to:

* View booking details
* Change booking status
* Add internal notes
* Contact the client externally
* Archive records where appropriate

## Booking statuses

```text
New
Contacted
In Progress
Confirmed
Completed
Cancelled
```

Status changes should be explicit and easy to understand.

## Booking details

The detail screen should display:

```text
Client Name
Email
Phone
Requested Service
Event Date
Event Location
Message
Status
Internal Notes
Created At
Updated At
```

Internal notes must never be exposed through public API responses.

---

# 13. Contact Message Management

The messages section manages enquiries submitted through the contact form.

## Message list

Suggested columns:

```text
Name
Email
Subject
Status
Received
Actions
```

## Message statuses

```text
New
Read
Replied
Archived
```

## Message details

The administrator should be able to view:

* Sender name
* Email
* Phone
* Subject
* Message
* Status
* Submission date

The administrator can update the message status after handling the enquiry.

---

# 14. Media Library

The media library provides a centralized interface for uploaded images and other supported media.

## Media capabilities

Administrators can:

* Upload media
* View media
* Search media
* Filter media by type
* Preview images
* View metadata
* Associate media with content
* Remove media where safe

## Media metadata

The interface may display:

```text
Filename
Original Filename
File Type
File Size
Dimensions
Alt Text
Uploaded By
Uploaded At
```

The database should store metadata and file references rather than binary file contents.

---

# 15. Media Upload UX

Image uploads should provide:

* File selection
* Drag-and-drop where practical
* Upload progress
* Preview
* Validation feedback
* File-size validation
* File-type validation
* Alt-text entry
* Success/failure feedback

Before upload, the frontend may perform basic validation.

The backend must always perform authoritative validation.

---

# 16. Forms

Administrative forms should follow a consistent structure.

```text
Page Title

Form Section
├── Field
├── Field
├── Field
└── Field

Actions
├── Cancel
├── Save Draft
└── Save / Publish
```

Forms should clearly distinguish:

* Required fields
* Optional fields
* Validation errors
* Server-side errors
* Unsaved changes

---

# 17. Validation

Validation occurs at two levels.

## Frontend validation

Frontend validation provides immediate feedback for common errors such as:

* Required fields
* Invalid email addresses
* Invalid file types
* Maximum file size
* Invalid date values
* Basic character limits

## Backend validation

Laravel Form Requests provide authoritative validation.

The backend must never trust frontend validation.

Example:

```text
React Form
    ↓
Client Validation
    ↓
API Request
    ↓
Laravel Form Request
    ↓
Database Operation
```

Validation errors should be returned in a consistent API structure so the frontend can display them beside the relevant fields.

---

# 18. Tables

Administrative data tables should support common management operations.

Where appropriate, tables should provide:

* Search
* Filtering
* Sorting
* Pagination
* Status indicators
* Row actions
* Bulk actions where justified
* Empty states
* Loading states

Tables should remain usable on smaller screens.

On mobile devices, complex tables may switch to:

* Stacked cards
* Horizontally scrollable tables
* Responsive detail views

---

# 19. Search

Search should be available where the amount of content makes it useful.

Potential searchable fields include:

### Services

* Title

### Portfolio

* Album title
* Category

### Blog

* Post title
* Category

### Testimonials

* Client name
* Content

### Bookings

* Client name
* Email
* Phone

### Messages

* Name
* Email
* Subject
* Message

Search implementation should be handled by the backend for larger datasets.

---

# 20. Filtering

Common filters include:

```text
Status
Category
Featured
Date
Service
```

Filters should be represented clearly and should be easy to reset.

A reset action should return the list to its default state.

---

# 21. Sorting

Sortable fields should be explicitly indicated.

Examples:

```text
Created Date
Updated Date
Title
Sort Order
Event Date
Published Date
```

The backend should perform sorting for API-driven lists.

---

# 22. Pagination

Administrative lists should use server-side pagination when datasets can grow significantly.

Pagination responses should provide sufficient metadata for the frontend to display:

* Current page
* Total pages
* Total records
* Next page
* Previous page

The frontend should not load unnecessarily large datasets simply to paginate them locally.

---

# 23. Delete and Archive Actions

Destructive operations require deliberate interaction.

For potentially destructive actions, the interface should display a confirmation dialog.

Example:

```text
Delete this portfolio album?

This action may permanently remove associated data.

[Cancel] [Delete]
```

Where appropriate, archive should be preferred over permanent deletion.

Permanent deletion should be limited to records where it is safe and intentional.

---

# 24. Status Badges

Statuses should use consistent visual indicators.

Examples:

```text
Draft
Published
Archived

New
Contacted
In Progress
Confirmed
Completed
Cancelled

Read
Replied
```

Status colors should not be the only means of communicating state.

Each status should also include readable text.

---

# 25. Loading States

Every API-driven administrative screen should handle loading explicitly.

Possible patterns:

* Skeleton loaders
* Spinners
* Disabled form buttons
* Loading overlays
* Table loading states

The interface should prevent accidental duplicate submissions while a request is processing.

---

# 26. Empty States

Empty states should explain what is happening and provide a useful next action.

Example:

```text
No blog posts found.

Create your first blog post to begin publishing content.

[Create Blog Post]
```

Empty states should distinguish between:

* No records exist
* Search returned no results
* Active filters returned no results
* Data failed to load

---

# 27. Error Handling

Administrative errors should be understandable and actionable.

Examples:

```text
Unable to load services.
Please try again.
```

or:

```text
The service could not be saved.

Please correct the highlighted fields and try again.
```

Technical implementation details, database errors, stack traces, and sensitive information must not be exposed to administrators unnecessarily.

---

# 28. Notifications

The admin interface may use temporary notifications for successful actions.

Examples:

```text
Service created successfully.
Portfolio album updated.
Blog post published.
Booking status updated.
Message marked as read.
```

Error notifications should clearly explain whether the administrator should:

* Correct the form
* Retry
* Refresh the page
* Contact support

Notifications should not be the only indication of an important state change.

---

# 29. Authentication Integration

The admin interface relies on the authentication system defined in `AUTHENTICATION.md`.

Typical flow:

```text
/admin/login
    ↓
POST /api/v1/auth/login
    ↓
Laravel authentication
    ↓
Authenticated session/token
    ↓
GET /api/v1/auth/me
    ↓
Admin dashboard
```

The React application should maintain authentication state through `AuthContext` or the selected application-level authentication mechanism.

---

# 30. Protected Routes

All admin routes except the login page must be protected.

Conceptually:

```jsx
<Route path="/admin/login" element={<AdminLogin />} />

<Route element={<ProtectedRoute />}>
    <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/services" element={<Services />} />
        <Route path="/admin/portfolio" element={<Portfolio />} />
        <Route path="/admin/blog" element={<Blog />} />
        <Route path="/admin/testimonials" element={<Testimonials />} />
        <Route path="/admin/bookings" element={<Bookings />} />
        <Route path="/admin/messages" element={<Messages />} />
        <Route path="/admin/media" element={<Media />} />
    </Route>
</Route>
```

Frontend protection improves user experience but is not the security boundary.

Laravel must independently verify authentication and authorization.

---

# 31. Permissions

The initial implementation assumes a single administrator role.

```text
Administrator
    └── Full administrative access
```

The backend should still maintain a clear authorization boundary so additional roles can be introduced later.

Possible future roles could include:

```text
Administrator
Editor
Content Manager
```

These roles should only be implemented when there is a genuine requirement for differentiated access.

---

# 32. Security

The admin panel must follow the application's overall security architecture.

Important requirements include:

* Authentication required for protected API endpoints
* Authorization enforced by Laravel
* Secure password hashing
* HTTPS in production
* Secure session/token handling
* CSRF protection where applicable
* Proper CORS configuration
* Rate limiting for authentication endpoints
* Backend validation
* Mass-assignment protection
* Safe file-upload validation
* Sanitization of rich-text content
* No database credentials in frontend code
* No private API secrets in Vite client variables
* No sensitive information in API responses
* Safe handling of failed authentication

Administrative actions should never rely solely on hidden UI controls for authorization.

---

# 33. Rich Text Safety

If the blog editor supports HTML or rich text, content must be treated as untrusted input.

The implementation should:

1. Validate submitted content.
2. Sanitize unsafe HTML.
3. Store only acceptable content.
4. Safely render content on the public website.

The frontend should never assume that administrator-entered HTML is automatically safe.

---

# 34. Responsive Admin UX

The admin interface should support:

* Desktop
* Laptop
* Tablet
* Mobile

Desktop layouts may use:

```text
Sidebar + Header + Content
```

Smaller screens may use:

```text
Top Header
Collapsible Navigation
Full-width Content
```

Forms should remain usable without excessive horizontal scrolling.

---

# 35. Accessibility

The admin panel should support accessible operation.

Requirements include:

* Keyboard navigation
* Visible focus states
* Proper labels
* Semantic buttons and links
* Accessible form errors
* Sufficient text contrast
* Screen-reader-friendly status messages
* Accessible dialogs
* Meaningful page titles
* No information conveyed by color alone

Interactive elements should have clear accessible names.

---

# 36. Admin Component Architecture

Suggested component organization:

```text
src/components/admin/
├── AdminSidebar.jsx
├── AdminHeader.jsx
├── AdminBreadcrumbs.jsx
├── AdminPageHeader.jsx
├── AdminTable.jsx
├── AdminFilters.jsx
├── AdminPagination.jsx
├── StatusBadge.jsx
├── ConfirmDialog.jsx
├── AdminForm.jsx
├── AdminField.jsx
├── ImageUploader.jsx
├── MediaPicker.jsx
├── RichTextEditor.jsx
├── EmptyState.jsx
├── LoadingState.jsx
└── ErrorState.jsx
```

Domain-specific components should remain near their relevant feature areas when they are not genuinely shared.

---

# 37. Admin Service Layer

The React frontend should communicate with the Laravel API through service modules.

Example:

```text
src/services/
├── apiClient.js
├── authService.js
├── serviceService.js
├── portfolioService.js
├── blogService.js
├── testimonialService.js
├── bookingService.js
├── messageService.js
└── mediaService.js
```

The naming may be refined during implementation.

Components should not contain large amounts of raw HTTP logic.

---

# 38. Admin Data Flow

A typical update operation should follow:

```text
Admin Form
    ↓
Frontend Validation
    ↓
Service Function
    ↓
HTTP Request
    ↓
Laravel Route
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
Eloquent Model
    ↓
MySQL
    ↓
API Resource
    ↓
Frontend State Update
    ↓
Success Notification
```

---

# 39. Dashboard and Content Performance

The dashboard should avoid unnecessarily expensive queries.

Examples:

* Use aggregate queries for counts.
* Limit recent-record queries.
* Paginate large datasets.
* Avoid loading entire media collections.
* Eager-load required relationships.
* Avoid N+1 database queries.
* Cache suitable read-heavy data where justified.

Performance optimization should be based on actual application behavior rather than premature complexity.

---

# 40. Audit and Activity Logging

A full audit-log system is not required for the initial implementation.

However, the architecture should leave room for recording important administrative actions in the future.

Potential audit information:

```text
Administrator
Action
Resource
Resource ID
Timestamp
Relevant Metadata
```

If implemented later, audit logging should be handled by the backend rather than relying on frontend-generated records.

---

# 41. Admin Quality Checklist

Before considering an admin feature complete, verify:

### Functionality

* [ ] Create works
* [ ] Read/list works
* [ ] Update works
* [ ] Delete/archive works where applicable
* [ ] Status changes work
* [ ] Search works
* [ ] Filters work
* [ ] Sorting works
* [ ] Pagination works

### Validation

* [ ] Required fields validated
* [ ] Invalid values rejected
* [ ] Server validation implemented
* [ ] Validation errors displayed clearly

### UX

* [ ] Loading state exists
* [ ] Empty state exists
* [ ] Error state exists
* [ ] Success feedback exists
* [ ] Confirmation exists for destructive actions
* [ ] Forms prevent accidental duplicate submission

### Security

* [ ] Route is protected
* [ ] API endpoint is protected
* [ ] Authorization is enforced
* [ ] Sensitive fields are not exposed
* [ ] File uploads are validated
* [ ] Rich text is safely handled

### Accessibility

* [ ] Keyboard accessible
* [ ] Labels provided
* [ ] Focus states visible
* [ ] Errors accessible
* [ ] Status information is not color-only

### Responsive design

* [ ] Desktop works
* [ ] Tablet works
* [ ] Mobile works

---

# 42. Final Admin Architecture

The final administration architecture is:

```text
                    ┌──────────────────────┐
                    │   Admin Login Page   │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Authentication State │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    Protected Routes  │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │     Admin Layout     │
                    │ Sidebar + Header     │
                    └──────────┬───────────┘
                               │
       ┌───────────────────────┼────────────────────────┐
       │                       │                        │
       ▼                       ▼                        ▼
  Dashboard                Content                 Enquiries
                              │                        │
                ┌─────────────┼─────────────┐      ┌───┴────┐
                ▼             ▼             ▼      ▼        ▼
             Services      Portfolio       Blog  Bookings Messages
                              │
                              ▼
                         Testimonials

                               │
                               ▼
                         Media Library
                               │
                               ▼
                         Laravel API
                               │
                               ▼
                            MySQL
```

The admin panel therefore remains a focused management interface rather than becoming a second application.

Its responsibilities are:

* Present administrative interfaces
* Manage authenticated state
* Validate user input at the client level
* Communicate with the API
* Display backend responses
* Provide useful administrative UX

Laravel remains responsible for:

* Authentication
* Authorization
* Validation
* Business rules
* Database operations
* File management
* Security
* API responses

This separation keeps the system maintainable and ensures that administrative security does not depend on frontend behavior alone.
