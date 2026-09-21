# Merit Media — Frontend Architecture

## 1. Purpose

This document defines the frontend architecture for the Merit Media website.

The frontend is a single React/Vite application containing:

* Public website
* Administrator login
* Protected administration interface

The frontend communicates with the Laravel backend through the REST API.

The frontend does not directly access MySQL.

---

# 2. Frontend Technology

| Area                    | Technology           |
| ----------------------- | -------------------- |
| UI framework            | React                |
| Build tool              | Vite                 |
| Styling                 | Tailwind CSS         |
| Routing                 | React Router         |
| API communication       | HTTP/JSON            |
| Language                | JavaScript initially |
| Package manager         | npm                  |
| Development environment | Laragon              |
| Browser target          | Modern browsers      |

TypeScript may be introduced later if the project requirements justify it, but the initial architecture assumes React with JavaScript.

---

# 3. Frontend Responsibilities

The React application is responsible for:

* Rendering public pages
* Rendering the admin interface
* Client-side routing
* Responsive layouts
* User interaction
* Form presentation
* Client-side validation
* Loading states
* Error states
* API communication
* Authentication state
* Protected routes
* Content presentation
* Accessibility
* SEO-related page metadata
* UI state

The React application is **not** responsible for:

* Direct MySQL access
* Database queries
* Server-side authorization
* Server-side validation
* Storing private backend secrets
* Business rules that must be enforced securely
* Permanent file storage

Those responsibilities belong to Laravel/backend infrastructure.

---

# 4. Application Structure

The frontend lives in:

```text id="1f4w75"
merit-media/
└── frontend/
```

Recommended structure:

```text id="a1g4m8"
frontend/
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── hooks/
│   ├── context/
│   ├── utils/
│   ├── types/
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── .env
```

The exact structure can evolve as the application grows.

---

# 5. Public and Admin Areas

The application contains two major frontend areas:

```text id="z1e2na"
React Application
│
├── Public Website
│
└── Admin Application
```

They share:

* React
* Vite
* Tailwind
* Components
* API services
* Authentication utilities where appropriate
* Build system

They use different layouts.

---

# 6. Public Routes

The initial public routes are:

```text id="w6ak20"
/                  Home
/about             About
/services          Services
/portfolio         Portfolio
/blog              Blog
/contact           Contact
/booking           Booking
```

Dynamic routes may include:

```text id="z5fl4u"
/services/:slug
/portfolio/:slug
/blog/:slug
```

The exact URL structure should remain consistent with the API and SEO strategy.

---

# 7. Admin Routes

The admin interface uses protected routes:

```text id="1w6j55"
/admin/login

/admin/dashboard

/admin/services
/admin/services/new
/admin/services/:id/edit

/admin/portfolio
/admin/portfolio/new
/admin/portfolio/:id/edit

/admin/blog
/admin/blog/new
/admin/blog/:id/edit

/admin/testimonials

/admin/bookings
/admin/bookings/:id

/admin/messages
/admin/messages/:id

/admin/media
```

Additional nested routes can be introduced where useful.

---

# 8. Route Architecture

React Router should control frontend navigation.

Conceptually:

```jsx id="7otb7q"
<Routes>

    <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetails />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:slug" element={<PortfolioDetails />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
    </Route>

    <Route path="/admin/login" element={<AdminLogin />} />

    <Route element={<ProtectedAdminRoute />}>
        <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/services" element={<AdminServices />} />
            <Route path="/admin/portfolio" element={<AdminPortfolio />} />
            <Route path="/admin/blog" element={<AdminBlog />} />
            <Route path="/admin/testimonials" element={<AdminTestimonials />} />
            <Route path="/admin/bookings" element={<AdminBookings />} />
            <Route path="/admin/messages" element={<AdminMessages />} />
            <Route path="/admin/media" element={<AdminMedia />} />
        </Route>
    </Route>

</Routes>
```

This is an architectural example; the final implementation may organize the route definitions differently.

---

# 9. Public Layout

The public website should use a shared layout.

Conceptually:

```text id="3e2b5s"
PublicLayout
├── Header
├── Navbar
├── Main Content
└── Footer
```

The layout should provide consistent:

* Navigation
* Branding
* Footer
* Global spacing
* Responsive behavior
* Accessibility controls
* Page metadata integration

Individual pages should not duplicate the global header or footer.

---

# 10. Admin Layout

The admin interface should use a separate layout.

Conceptually:

```text id="ng8wqi"
AdminLayout
├── Admin Sidebar
├── Admin Header
├── Breadcrumb / Page Heading
└── Main Content
```

The admin layout should provide:

* Navigation
* Current administrator information
* Logout
* Page title
* Responsive sidebar/navigation
* Consistent content area
* Notification area where required

The admin layout must be visually distinct from the public website while remaining part of the same React application.

---

# 11. Page Structure

Public pages should generally follow:

```text id="h8n2an"
Page
├── SEO Metadata
├── Hero / Page Header
├── Main Content Sections
├── Supporting Content
└── CTA / Footer Content
```

The exact structure will differ by page.

For example:

```text id="76j1j6"
Home
├── Hero
├── Introduction
├── Services Preview
├── Portfolio Preview
├── Testimonials
├── Blog Preview
└── Contact/Booking CTA
```

---

# 12. Component Architecture

Components should be designed around reusable responsibilities.

Suggested structure:

```text id="8m7j8m"
components/
├── common/
├── layout/
├── forms/
├── services/
├── portfolio/
├── blog/
├── testimonials/
├── booking/
└── admin/
```

The exact folder structure may be simplified if individual component counts remain small.

---

# 13. Common Components

Reusable UI components may include:

```text id="gk1p9w"
Button
Input
Textarea
Select
Checkbox
Modal
Card
Badge
SectionHeading
Container
LoadingSpinner
EmptyState
ErrorMessage
Pagination
Image
```

These components should have consistent behavior and styling.

---

# 14. Layout Components

Suggested layout components:

```text id="rj3qq4"
Header
Navbar
Footer
MobileMenu
PublicLayout
AdminLayout
AdminSidebar
AdminHeader
Breadcrumbs
```

Global layout components should not contain domain-specific business logic unless necessary.

---

# 15. Domain Components

## Services

```text id="8w7w9n"
ServiceCard
ServiceGrid
ServicePreview
ServiceDetails
```

## Portfolio

```text id="g9ozw0"
PortfolioCard
PortfolioGrid
PortfolioFilter
PortfolioGallery
PortfolioImage
```

## Blog

```text id="9tb3cg"
BlogCard
BlogGrid
BlogCategoryFilter
BlogPostPreview
```

## Testimonials

```text id="9syvsl"
TestimonialCard
TestimonialList
TestimonialSlider
```

## Booking

```text id="4qz0j6"
BookingForm
BookingSummary
BookingSuccess
```

## Contact

```text id="9p7ifd"
ContactForm
ContactSuccess
```

Components should be reused wherever the same presentation pattern appears.

---

# 16. Admin Components

The admin area may use:

```text id="5e5e5r"
DataTable
AdminForm
AdminPageHeader
StatusBadge
ConfirmDialog
SearchInput
FilterBar
Pagination
EmptyState
MediaPicker
ImageUploader
RichTextEditor
```

The admin components should be designed for efficient content management rather than public marketing presentation.

---

# 17. Component Responsibilities

Each component should have a clear responsibility.

For example:

### Button

Responsible for:

* Rendering button UI
* Variants
* Disabled/loading state
* Click behavior

Not responsible for:

* API calls
* Database operations
* Navigation rules unrelated to the button

### ServiceCard

Responsible for:

* Displaying service information
* Service image
* Title
* Short description
* Link to service details

It should not directly fetch unrelated content.

---

# 18. Data Fetching

API calls should be centralized in the frontend service layer.

Example:

```text id="1qplx5"
src/services/
├── api.js
├── authService.js
├── serviceService.js
├── portfolioService.js
├── blogService.js
├── testimonialService.js
├── bookingService.js
├── contactService.js
└── mediaService.js
```

A component should ideally call a service or hook rather than constructing API URLs manually.

Example:

```jsx id="0c72a4"
const services = await serviceService.getServices();
```

rather than:

```jsx id="5n9b0t"
fetch("http://localhost/...")
```

inside every component.

---

# 19. API Client

A shared API client should handle common HTTP behavior.

Conceptually:

```text id="w1qlb9"
apiClient
├── base URL
├── headers
├── authentication handling
├── JSON parsing
├── error normalization
└── request methods
```

Example methods:

```text id="h0y1p5"
get()
post()
put()
patch()
delete()
```

The API client should be the central place for common HTTP configuration.

---

# 20. Authentication State

Authentication state should be centralized.

Possible architecture:

```text id="i3l4qf"
AuthContext
    │
    ├── user
    ├── authenticated
    ├── loading
    ├── login()
    ├── logout()
    └── refreshUser()
```

The exact authentication storage mechanism will depend on the Laravel authentication approach selected during backend implementation.

Security should take priority over convenience.

---

# 21. Protected Routes

Admin routes must use a protected route mechanism.

Conceptually:

```jsx id="a0e4j8"
<ProtectedAdminRoute>
    <AdminLayout />
</ProtectedAdminRoute>
```

The protected route should:

1. Determine authentication state.
2. Show an appropriate loading state while checking authentication.
3. Allow authenticated administrators through.
4. Redirect unauthenticated users to `/admin/login`.

The backend must independently enforce authentication.

Frontend route protection is a user-interface boundary, not a security boundary.

---

# 22. Authentication Loading State

The application should avoid briefly displaying protected admin content while authentication is being checked.

Recommended flow:

```text id="o7zq0g"
Open /admin/dashboard
        │
        ▼
Check authentication
        │
        ├── Loading
        │
        ├── Authenticated → Dashboard
        │
        └── Not authenticated → /admin/login
```

---

# 23. Form Architecture

Forms should use reusable form components where practical.

Public forms:

```text id="q4cyx2"
BookingForm
ContactForm
```

Admin forms:

```text id="k6s5as"
ServiceForm
PortfolioCategoryForm
PortfolioAlbumForm
BlogCategoryForm
BlogPostForm
TestimonialForm
```

Forms should support:

* Field labels
* Required indicators
* Validation messages
* Disabled state
* Submission state
* Server validation errors
* Success state
* Accessible inputs

---

# 24. Client-Side Validation

Client-side validation improves user experience.

Examples:

```text id="w39tya"
Required fields
Email format
Minimum/maximum lengths
Date format
Allowed file types
File size
```

However:

```text id="1y9n1g"
Client validation
      ≠
Server validation
```

Laravel must always validate incoming data independently.

---

# 25. Server Validation Errors

The frontend should map Laravel validation responses to form fields.

Example API response:

```json id="l0wq9p"
{
  "success": false,
  "message": "The provided data is invalid.",
  "errors": {
    "email": [
      "The email field must be a valid email address."
    ]
  }
}
```

The form should display the message beside the appropriate field.

---

# 26. Loading States

Every asynchronous operation should have an appropriate loading state.

Examples:

```text id="e3a2cd"
Page loading
List loading
Form submitting
Button loading
Image uploading
Deleting
Authentication checking
```

The UI should avoid appearing frozen while an API request is running.

---

# 27. Error States

The frontend should handle:

* Network failures
* API errors
* Validation errors
* Authentication expiration
* Missing resources
* Empty data
* Server errors

Example:

```text id="q39jgi"
Unable to load services.
Please try again.
```

Error messages should be useful to users without exposing backend implementation details.

---

# 28. Empty States

Empty data should have an intentional UI.

Examples:

```text id="4hkvap"
No portfolio projects available.

No blog posts found.

No testimonials available.

No booking enquiries found.

No messages found.
```

Admin empty states may include an action:

```text id="7osr0s"
No services have been created yet.

[Create Service]
```

---

# 29. Notifications

The admin interface should provide clear feedback for actions such as:

* Created successfully
* Updated successfully
* Deleted/archived successfully
* Upload completed
* Login successful
* Login failed
* Booking updated
* Message status changed

A reusable notification/toast system may be introduced.

Notifications should not replace important inline validation messages.

---

# 30. State Management

The application should avoid introducing a large global state library unless the requirements justify it.

Initial state can be divided into:

### Local component state

For:

* Modal state
* Form values
* Dropdowns
* UI toggles
* Temporary interaction state

### Context

For cross-application state such as:

* Authentication
* Potential global UI settings

### Server/API state

For:

* Services
* Portfolio
* Blog
* Testimonials
* Bookings
* Messages

The project should avoid duplicating server state unnecessarily across unrelated components.

---

# 31. Custom Hooks

Reusable behavior should be extracted into custom hooks where appropriate.

Examples:

```text id="20ov30"
useAuth()
useFetch()
useServices()
usePortfolio()
useBlog()
useTestimonials()
useBooking()
useContactForm()
useDebounce()
usePagination()
```

Hooks should remain focused and should not become large containers for unrelated business logic.

---

# 32. Responsive Design

The website must work across:

* Mobile phones
* Tablets
* Laptops
* Desktop monitors
* Large desktop screens

Tailwind responsive utilities should be used consistently.

The design should prioritize mobile usability rather than simply shrinking the desktop layout.

---

# 33. Breakpoint Strategy

Tailwind's responsive system can be used as the initial breakpoint foundation.

Conceptually:

```text id="wyv7jq"
Mobile
    ↓
Small
    ↓
Medium
    ↓
Large
    ↓
Extra Large
```

The design should not depend on arbitrary device-specific breakpoints unless a real layout requirement exists.

---

# 34. Responsive Navigation

Public navigation should support:

### Desktop

* Full navigation
* Primary CTA
* Branding

### Mobile

* Compact header
* Menu trigger
* Expandable navigation
* Touch-friendly controls

The mobile menu must remain keyboard accessible.

---

# 35. Accessibility

Accessibility is a core frontend requirement.

The interface should follow WCAG-oriented practices.

Requirements include:

* Semantic HTML
* Correct heading hierarchy
* Accessible labels
* Keyboard navigation
* Visible focus states
* Sufficient color contrast
* Alternative text for meaningful images
* Decorative images marked appropriately
* Accessible form errors
* Accessible buttons
* Accessible dialogs/modals
* Avoiding interaction dependent solely on hover

---

# 36. Image Handling

Images are an important part of the Merit Media website.

The frontend should:

* Use appropriate image dimensions
* Avoid unnecessarily large images
* Provide meaningful `alt` text
* Use lazy loading where appropriate
* Reserve layout space when possible
* Use responsive image sizing
* Avoid layout shifts

Portfolio galleries should not load every full-resolution image immediately when a smaller preview is sufficient.

---

# 37. Image Components

A reusable image component may centralize behavior:

```text id="evn5lr"
Image
├── src
├── alt
├── width
├── height
├── loading
├── fallback
└── className
```

Portfolio-specific image presentation can build on top of this component.

---

# 38. SEO

The frontend must support SEO requirements for public pages.

Relevant metadata may include:

* Page title
* Meta description
* Canonical URL
* Open Graph title
* Open Graph description
* Open Graph image
* Appropriate structured data where required

Dynamic pages such as blog posts and services should be able to generate page-specific metadata from API data.

SEO implementation details are documented separately in:

```text id="t1r1z8"
docs/SEO.md
```

---

# 39. URL and Navigation Rules

Public URLs should be:

* Human-readable
* Stable
* SEO-friendly
* Based on slugs where appropriate

Examples:

```text id="0x4g0f"
/services/wedding-photography
/portfolio/wedding-project
/blog/how-to-prepare-for-your-event
```

Avoid URLs containing unnecessary database details such as:

```text id="d15h4n"
/service?id=17
```

unless there is a genuine technical reason.

---

# 40. Admin URL Rules

Administrative URLs should be descriptive and consistent.

Examples:

```text id="d9b8xl"
/admin/services
/admin/services/new
/admin/services/12/edit

/admin/blog
/admin/blog/new
/admin/blog/7/edit
```

The admin URL structure should correspond to the mental model of the administrator.

---

# 41. Tables and Lists

Administrative list pages should use consistent patterns.

Example:

```text id="t8l5u5"
Page Header
├── Title
└── Primary Action

Filters
├── Search
├── Status
└── Category

Data Table
├── Rows
├── Status
└── Actions

Pagination
```

Tables should be responsive.

On smaller screens, information may need to transform into cards or horizontally scrollable tables depending on the data.

---

# 42. Admin CRUD Pattern

Most administrative content should follow:

```text id="p4fn93"
List
  ↓
Create
  ↓
Edit
  ↓
View/Preview
  ↓
Archive/Delete
```

Example:

```text id="v0j14g"
Services
├── Service List
├── Create Service
├── Edit Service
└── Archive Service
```

The same pattern should be reused for:

* Portfolio
* Blog
* Testimonials

---

# 43. Confirmation Dialogs

Destructive actions should require confirmation where appropriate.

Examples:

```text id="0a2gxu"
Delete/Archive service
Delete/Archive portfolio album
Delete blog post
Remove portfolio image
Delete media
```

Confirmation should clearly identify what will be affected.

For example:

```text
Are you sure you want to archive this service?
```

The interface should distinguish destructive actions from ordinary actions.

---

# 44. Media Upload UX

Media uploads should provide:

* File selection
* File type validation
* File size validation
* Upload progress where practical
* Preview
* Alt text
* Success state
* Error state

For portfolio management, administrators should be able to associate uploaded images with a portfolio album.

---

# 45. Rich Text Content

Blog posts require structured article content.

A rich text editor may be introduced for administrators.

The selected editor must produce content that can be safely rendered by the frontend.

HTML content from the API must never be blindly injected into the DOM.

Any HTML rendering must go through an appropriate sanitization strategy.

---

# 46. Security in the Frontend

The frontend must not be considered a trusted environment.

Never place secrets in:

```text id="qj2jtk"
React components
Vite environment variables intended for public builds
local source files
browser storage
HTML
```

Anything included in a Vite client build should be considered potentially visible to users.

Frontend security responsibilities include:

* Safe rendering
* Avoiding unsafe HTML
* Secure authentication integration
* Handling expired sessions
* Avoiding sensitive data in logs
* Avoiding secret exposure

---

# 47. Authentication Data

The frontend should store only the minimum authentication information required for the chosen Laravel authentication system.

Do not persist unnecessary administrator information.

The authentication implementation should follow the security model selected for the backend.

---

# 48. API Error Handling

The API service layer should normalize common errors.

Conceptually:

```text id="3nhh1m"
API Response
      │
      ▼
API Client
      │
      ├── Validation error
      ├── Authentication error
      ├── Authorization error
      ├── Not found
      ├── Rate limit
      └── Server/network error
              │
              ▼
          UI handling
```

Components should not each implement their own interpretation of HTTP status codes.

---

# 49. Performance

The frontend should prioritize:

* Small JavaScript bundles
* Lazy loading where useful
* Image optimization
* Code splitting
* Efficient rendering
* Avoiding unnecessary API calls
* Pagination for large admin datasets
* Reusing cached data where appropriate
* Avoiding duplicate requests

Admin-only code should not unnecessarily increase the public site's initial JavaScript payload where route-based code splitting can prevent it.

---

# 50. Route-Based Code Splitting

Where practical, pages can be lazy-loaded.

Conceptually:

```jsx id="v8e7tp"
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Blog = lazy(() => import("./pages/Blog"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
```

The public application should not have to load every admin screen immediately.

---

# 51. Error Boundaries

React error boundaries should be considered for major application areas.

Potential boundaries:

```text id="7v1s0j"
Application
├── Public Application
└── Admin Application
```

An unexpected rendering error should display a controlled fallback instead of leaving the entire interface unusable.

---

# 52. Environment Variables

Frontend environment variables use Vite's convention:

```env id="e6c1d3"
VITE_API_URL=
```

Only variables intended to be public should use the `VITE_` prefix.

Do not put backend secrets into frontend environment variables.

---

# 53. Development Scripts

The frontend should provide standard npm scripts.

Example:

```json id="qu8at7"
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

Additional scripts may be introduced for:

* Linting
* Formatting
* Testing
* Type checking if TypeScript is later introduced

---

# 54. Code Organization Rules

Frontend code should follow these principles:

### Keep components focused

Avoid components that handle:

* Layout
* API requests
* Authentication
* Form state
* Multiple unrelated business rules

all in one file.

### Reuse common patterns

Repeated UI behavior should become reusable components or hooks.

### Keep API logic outside presentation components

API services belong in the service layer.

### Avoid unnecessary abstraction

Do not create components or utilities solely to reduce a few lines of code.

### Prefer clear code over clever code

The project should remain understandable to future developers.

---

# 55. Naming Conventions

## Components

Use PascalCase:

```text id="z1flop"
ServiceCard.jsx
PortfolioGrid.jsx
AdminSidebar.jsx
BookingForm.jsx
```

## Hooks

Use camelCase with `use` prefix:

```text id="kzj2pj"
useAuth.js
useServices.js
usePagination.js
```

## Services

Use descriptive camelCase names:

```text id="5w8ec9"
authService.js
serviceService.js
portfolioService.js
```

## Utilities

Use camelCase:

```text id="7s99yb"
formatDate.js
slugify.js
validation.js
```

---

# 56. Frontend Folder Convention

A more detailed target structure is:

```text id="0x1y1e"
frontend/
├── public/
│   ├── favicon.*
│   └── static assets
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── forms/
│   │   ├── services/
│   │   ├── portfolio/
│   │   ├── blog/
│   │   ├── testimonials/
│   │   ├── booking/
│   │   └── admin/
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── hooks/
│   │
│   ├── layouts/
│   │   ├── PublicLayout.jsx
│   │   └── AdminLayout.jsx
│   │
│   ├── pages/
│   │   ├── public/
│   │   └── admin/
│   │
│   ├── routes/
│   │   ├── AppRoutes.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── services/
│   │
│   ├── types/
│   │
│   ├── utils/
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .env
├── .env.example
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

This structure is a starting convention rather than an inflexible requirement.

---

# 57. Public Page Component Structure

A public page may follow this pattern:

```text id="r2n9pk"
Home
├── HeroSection
├── IntroSection
├── ServicesPreview
│   └── ServiceCard
├── PortfolioPreview
│   └── PortfolioCard
├── TestimonialsSection
│   └── TestimonialCard
├── BlogPreview
│   └── BlogCard
└── CTASection
```

This allows individual sections to remain reusable.

---

# 58. Admin Page Component Structure

An admin page may follow:

```text id="6phv0t"
AdminServices
├── AdminPageHeader
├── ServiceFilters
├── ServiceTable
│   └── ServiceRow
├── Pagination
└── ServiceForm / Modal
```

The final UI should favor clarity and efficient administration over unnecessary visual complexity.

---

# 59. Frontend Data Flow

For a public services page:

```text id="4u3s3s"
Services Page
      │
      ▼
useServices()
      │
      ▼
serviceService.getServices()
      │
      ▼
API Client
      │
      ▼
Laravel API
      │
      ▼
JSON
      │
      ▼
Hook/Page State
      │
      ▼
ServiceGrid
      │
      ▼
ServiceCard
```

For an admin page:

```text id="1am8su"
Admin Services
      │
      ▼
Authentication
      │
      ▼
Admin API
      │
      ▼
Laravel Authorization
      │
      ▼
Service Data
      │
      ▼
DataTable
```

---

# 60. Frontend Security Boundary

The frontend is considered an untrusted client.

The backend must assume that:

* Users can modify requests
* Users can bypass React routes
* Users can inspect JavaScript
* Users can call API endpoints directly
* Users can manipulate browser state

Therefore:

```text id="tw4c4s"
Frontend protection
       +
Backend protection
       =
Actual application security
```

Backend authorization is mandatory.

---

# 61. Initial Frontend Scope

The initial React application should implement:

### Public

```text id="f9v7q3"
Home
About
Services
Service Details
Portfolio
Portfolio Details
Blog
Blog Post
Contact
Booking
```

### Admin

```text id="3o9w6b"
Login
Dashboard
Services
Portfolio
Blog
Testimonials
Bookings
Messages
Media
```

---

# 62. Frontend Features Explicitly Not Required Initially

The initial frontend does not require:

* Client accounts
* Shopping cart
* Online checkout
* Client galleries requiring authentication
* Newsletter subscription management
* Multi-language interface
* Mobile application
* Advanced analytics dashboard
* Complex drag-and-drop page builder

These can be introduced later if requirements change.

---

# 63. Frontend Quality Checklist

Before considering a public page complete, verify:

### Functionality

* Route works
* API data loads
* Links work
* Forms submit correctly
* Errors are handled

### Responsive behavior

* Mobile
* Tablet
* Desktop

### Accessibility

* Keyboard navigation
* Labels
* Focus states
* Alt text
* Semantic headings

### Performance

* Images optimized
* No unnecessary requests
* Lazy loading where appropriate
* No major layout shifts

### SEO

* Page title
* Meta description
* Canonical URL where required
* Open Graph metadata where required

### Visual consistency

* Typography
* Spacing
* Buttons
* Cards
* Forms
* Navigation

---

# 64. Frontend Architecture Summary

The final frontend architecture is:

```text id="z1bq76"
                    React + Vite
                         │
          ┌──────────────┴──────────────┐
          │                             │
          ▼                             ▼
   Public Website                Admin Interface
          │                             │
   PublicLayout                    AdminLayout
          │                             │
   Public Pages                   Admin Pages
          │                             │
          └──────────────┬──────────────┘
                         │
                  Shared Components
                         │
                  Shared API Client
                         │
                         ▼
                  Laravel REST API
```

The key architectural rule is that the public website and admin interface are **two areas of one React application**, not two separate frontend applications.

This keeps the project simpler while maintaining a clear separation between public and administrative experiences.
