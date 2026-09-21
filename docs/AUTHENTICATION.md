# Authentication & Authorization Architecture

## 1. Purpose

This document defines authentication and authorization for the Merit Media application.

The authentication system protects the administrative area and administrative API endpoints while allowing public visitors to access public website content without an account.

The architecture consists of:

* React authentication state
* Laravel authentication endpoints
* Protected API routes
* Protected React admin routes
* Administrator authorization
* Secure password handling
* Login and logout flows
* Session/token protection
* Authentication error handling

The exact Laravel authentication package/mechanism should be selected during implementation based on the final deployment architecture. The surrounding application contracts described here should remain stable.

---

# 2. Authentication Goals

The authentication system must:

* Allow authorized administrators to log in
* Prevent unauthorized access to admin functionality
* Protect administrative API endpoints
* Maintain authenticated state appropriately
* Support secure logout
* Prevent exposure of passwords or authentication secrets
* Provide clear authentication failures
* Support future role expansion
* Work consistently between React and Laravel
* Remain compatible with local development and production deployment

---

# 3. User Types

The initial application has two conceptual user types.

## Visitor

A visitor:

* Can browse public pages
* Can view published services
* Can view published portfolio content
* Can read published blog posts
* Can view published testimonials
* Can submit contact messages
* Can submit booking enquiries

A visitor does not need an account.

## Administrator

An administrator:

* Can log into the admin area
* Can manage services
* Can manage portfolio content
* Can manage blog content
* Can manage testimonials
* Can manage bookings
* Can manage contact messages
* Can manage media
* Can access the dashboard

---

# 4. Authentication Boundary

The security boundary is:

```text id="j5t1p8"
┌──────────────────────────────────────────┐
│               Public Web                 │
│                                          │
│  React Public Pages                      │
│  Published Content                       │
│  Contact Form                            │
│  Booking Form                            │
└──────────────────┬───────────────────────┘
                   │
                   │ Public API
                   ▼
┌──────────────────────────────────────────┐
│              Laravel API                 │
│                                          │
│ Public endpoints                         │
│ Protected endpoints                      │
│ Validation                               │
│ Authorization                            │
│ Database access                          │
└──────────────────┬───────────────────────┘
                   │
                   │ Authenticated
                   ▼
┌──────────────────────────────────────────┐
│              Admin Area                  │
│                                          │
│ React /admin/* routes                    │
│ Protected API requests                   │
└──────────────────────────────────────────┘
```

The React application's route protection is a user-interface security measure.

The Laravel API remains the authoritative security boundary.

---

# 5. Authentication Principle

The most important rule is:

> Hiding an admin route in React is not sufficient security.

A malicious user can bypass the React interface and send HTTP requests directly to the API.

Therefore:

```text id="6kg8or"
React ProtectedRoute
        +
Laravel Authentication Middleware
        +
Laravel Authorization
```

are all required.

---

# 6. Admin Authentication Routes

The authentication API should expose:

```text id="k4pr1f"
POST /api/v1/auth/login
GET  /api/v1/auth/me
POST /api/v1/auth/logout
```

### Login

```text id="b8d13u"
POST /api/v1/auth/login
```

Authenticates an administrator.

### Current user

```text id="2u2w3a"
GET /api/v1/auth/me
```

Returns the authenticated administrator's safe public/admin profile information.

### Logout

```text id="3k4wby"
POST /api/v1/auth/logout
```

Terminates the authenticated session/token state.

---

# 7. Login Request

The login request should accept only the required credentials.

Example:

```json id="x93y6c"
{
  "email": "admin@example.com",
  "password": "********"
}
```

The backend validates:

* Email format
* Required password
* Account existence
* Account status, if account status is introduced
* Password correctness
* Authentication rate limits

The password must never be logged.

---

# 8. Login Response

A successful login should return:

```json id="lqkm5f"
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

The exact response may include authentication state according to the selected Laravel authentication mechanism.

Sensitive information must never be included.

---

# 9. Password Security

Administrator passwords must be securely hashed.

The application must never:

* Store plaintext passwords
* Return passwords through the API
* Log passwords
* Store passwords in browser local storage
* Include passwords in error messages
* Include passwords in seed data committed to the repository

Laravel's supported password hashing facilities should be used.

---

# 10. Password Policy

The administrator password should meet a reasonable security standard.

The implementation should enforce:

* Minimum length
* Confirmation when setting/changing a password
* Secure hashing
* Protection against repeated login attempts

A stronger password policy may be introduced later if operational requirements justify it.

---

# 11. Authentication Mechanism

The final authentication mechanism must be selected during backend initialization.

The architecture should prefer a Laravel-supported authentication approach that works well with a separate React frontend.

The selected mechanism must provide:

* Secure authenticated requests
* Logout/revocation behavior
* Appropriate browser security
* Protection against credential theft
* Compatibility with the deployment environment

The implementation should avoid building a custom authentication protocol.

---

# 12. Session/Token Handling

Authentication state must be handled securely.

The selected mechanism determines whether the browser receives:

* Secure session cookies
* Authentication tokens
* Or another Laravel-supported credential mechanism

Regardless of mechanism:

* Credentials must be transmitted over HTTPS in production
* Authentication secrets must not be exposed in page source
* Authentication data must not be unnecessarily persisted
* Expired authentication must be handled gracefully
* Logout must invalidate authentication state

---

# 13. Browser Storage Rules

Authentication secrets should not be placed into browser storage unnecessarily.

In particular, the application should avoid storing sensitive long-lived authentication credentials in:

```text id="e6a2k5"
localStorage
sessionStorage
```

unless the selected authentication architecture specifically requires it and the security implications have been evaluated.

Prefer secure browser mechanisms provided by the chosen Laravel authentication architecture.

---

# 14. React Authentication State

The React application should maintain authentication state through a dedicated authentication context or equivalent state layer.

The existing frontend architecture includes:

```text id="2g3i6j"
frontend/src/context/AuthContext.jsx
```

The context should provide concepts such as:

```text id="6r1rko"
user
isAuthenticated
isLoading
login()
logout()
refreshUser()
```

The exact implementation may vary.

---

# 15. Initial Authentication Check

When the React application loads an admin route, it should determine whether the administrator is authenticated.

Conceptually:

```text id="grk9m2"
Admin application loads
        ↓
Check authentication state
        ↓
GET /api/v1/auth/me
        ↓
Authenticated?
     /       \
   Yes        No
    ↓          ↓
Admin UI    Login page
```

While authentication is being checked, the application should display an appropriate loading state rather than briefly rendering protected content.

---

# 16. Protected React Routes

The frontend should use a protected route mechanism.

Example:

```text id="jqz4t2"
/admin/dashboard
/admin/services
/admin/portfolio
/admin/blog
/admin/testimonials
/admin/bookings
/admin/messages
/admin/media
```

These routes should be wrapped by:

```text id="2qmg7v"
ProtectedRoute
```

The protected route should:

1. Check authentication state
2. Show loading state while checking
3. Render the admin route if authenticated
4. Redirect unauthenticated visitors to `/admin/login`

---

# 17. Protected API Routes

React route protection is not sufficient.

Laravel must independently protect administrative API routes.

Conceptually:

```text id="q9a5bb"
Route::middleware(['auth', 'admin'])
    ->prefix('admin')
    ->group(function () {
        // Admin API routes
    });
```

The exact middleware names depend on the selected authentication implementation.

---

# 18. Authorization

Authentication determines whether a user is logged in.

Authorization determines whether that authenticated user can perform a particular action.

Initial authorization:

```text id="s1ojg3"
role = admin
```

Administrative endpoints require administrator authorization.

For example:

```text id="a6lh41"
GET    /api/v1/admin/services
POST   /api/v1/admin/services
PUT    /api/v1/admin/services/{id}
DELETE /api/v1/admin/services/{id}
```

all require appropriate authorization.

---

# 19. Future Roles

The first version should use a simple administrator role.

The architecture should not prevent future roles such as:

```text id="4i2t9p"
admin
editor
content_manager
```

from being introduced later.

However, roles should not be created speculatively.

Only implement roles that correspond to actual application requirements.

---

# 20. Authorization Policies

Laravel Policies may be introduced when resource-level permissions become necessary.

For example:

```text id="u4w9lz"
ServicePolicy
BlogPostPolicy
PortfolioPolicy
TestimonialPolicy
BookingPolicy
MediaPolicy
```

Initially, if all authenticated administrators have the same permissions, simple administrator middleware may be sufficient.

Policies become more valuable when different administrator roles are introduced.

---

# 21. Login Flow

The intended login flow is:

```text id="a7fj2r"
Visitor opens /admin/login
        ↓
Enters email + password
        ↓
React validates basic input
        ↓
POST /api/v1/auth/login
        ↓
Laravel validates request
        ↓
Laravel authenticates credentials
        ↓
Authentication state established
        ↓
React receives successful response
        ↓
AuthContext updates
        ↓
Redirect to /admin/dashboard
```

---

# 22. Failed Login Flow

If authentication fails:

```text id="2l7x2y"
Login request
      ↓
Laravel authentication
      ↓
Credentials invalid
      ↓
401 response
      ↓
React displays generic error
```

The response should not reveal whether:

* The email exists
* The password was correct
* The account exists but has another problem

A generic authentication error reduces unnecessary information disclosure.

---

# 23. Login Rate Limiting

Login attempts must be rate-limited.

This protects against automated credential guessing.

The rate limit should consider:

* IP address
* Login identity where appropriate
* Repeated failures
* Reasonable legitimate login behavior

The user should receive a controlled rate-limit response rather than an internal exception.

---

# 24. Logout Flow

The logout process is:

```text id="9o3b3e"
Admin clicks Logout
        ↓
React calls POST /api/v1/auth/logout
        ↓
Laravel invalidates authentication state
        ↓
React clears authentication state
        ↓
Redirect to /admin/login
```

Logout should be idempotent where practical.

The application should not leave the administrator in a state where the UI appears logged out while the backend credential remains active unnecessarily.

---

# 25. Expired Authentication

Authentication may expire or become invalid.

For example:

```text id="pyv3zj"
Admin using dashboard
        ↓
API request
        ↓
401 Unauthorized
        ↓
React detects authentication failure
        ↓
Refresh/check authentication if appropriate
        ↓
Redirect to login if no longer authenticated
```

The application should not repeatedly retry an unauthorized request indefinitely.

---

# 26. Unauthorized vs Forbidden

The frontend should distinguish:

### 401 Unauthorized

The user is not authenticated.

Example:

```text id="h9t7w2"
Session/token expired
No authentication
Invalid authentication
```

### 403 Forbidden

The user is authenticated but does not have permission.

Example:

```text id="g9x9o4"
Authenticated editor attempting an admin-only operation
```

The distinction should be preserved in API responses.

---

# 27. CSRF Protection

The selected authentication architecture must account for CSRF protection where browser cookies/session authentication are used.

The implementation should use Laravel's established security mechanisms rather than creating custom CSRF handling.

If the chosen architecture uses credentials that are not automatically exposed to CSRF-style attacks, the corresponding security model must still be documented and configured correctly.

---

# 28. CORS

Because React and Laravel are separate applications during development, CORS configuration may be required.

Example development origins may include:

```text id="x2c8nn"
http://localhost:5173
```

The backend should allow only the required frontend origins.

Production configuration should use the real frontend domain.

CORS must not be configured as unrestricted access simply to make development easier.

Avoid:

```text id="fz2i9j"
Access-Control-Allow-Origin: *
```

for protected credentialed API access.

---

# 29. HTTPS

Production authentication must operate over HTTPS.

HTTPS protects:

* Login credentials
* Authentication cookies
* API requests
* Administrative data
* Contact and booking information

HTTP may be acceptable for local development but must not be the production security model.

---

# 30. Secure Cookies

If cookie-based authentication is selected, production cookies should use appropriate security attributes, including where applicable:

```text id="m9j0c1"
Secure
HttpOnly
SameSite
```

The exact values depend on the frontend/backend domain architecture and authentication mechanism.

Sensitive authentication cookies should not be accessible to ordinary JavaScript when HttpOnly protection is appropriate.

---

# 31. Authentication API Resources

The authenticated user response should expose only safe fields.

Example:

```json id="2n4p6y"
{
  "id": 1,
  "name": "Administrator",
  "email": "admin@example.com",
  "role": "admin"
}
```

Never expose:

```text id="d9m6ki"
password
password_hash
authentication_secret
private tokens
internal security metadata
```

---

# 32. Admin Login Page

The React login page should be:

```text id="2l6qzr"
/admin/login
```

It should contain:

* Email field
* Password field
* Submit button
* Validation messages
* Authentication error message
* Loading state

It should not expose the main administrative navigation to unauthenticated visitors.

---

# 33. Login UX States

The login interface should support:

### Idle

```text
Ready for credentials
```

### Submitting

```text
Authenticating...
```

The button should prevent accidental repeated submissions.

### Success

Redirect to:

```text
/admin/dashboard
```

### Invalid credentials

Display a generic authentication error.

### Validation error

Display field-level errors where appropriate.

### Rate limited

Display a controlled message asking the administrator to wait before trying again.

---

# 34. Admin Layout Protection

The admin layout should only render after authentication has been established.

Conceptually:

```text id="c5q6se"
AdminLayout
    │
    ├── Auth check
    │
    ├── Admin Header
    ├── Admin Sidebar
    └── Admin Content
```

Unauthenticated users should never receive normal administrative navigation.

---

# 35. API Client Authentication

The React API service layer should centralize authentication behavior.

For example:

```text id="4b8y6u"
frontend/src/services/
    api.js
    authService.js
    serviceService.js
    portfolioService.js
    blogService.js
    bookingService.js
    contactService.js
    mediaService.js
```

Authentication headers/cookies should be handled centrally rather than manually duplicated across every component.

---

# 36. Handling 401 Responses

The API client should have a consistent strategy for `401 Unauthorized`.

Conceptually:

```text id="d1f6jj"
API request
    ↓
401?
    ↓
Clear stale auth state
    ↓
Redirect to /admin/login
```

The exact implementation must prevent redirect loops.

Public API requests should not be unnecessarily redirected to the admin login page.

---

# 37. Authentication and Public API

Public endpoints do not require administrator authentication.

Examples:

```text id="3ql7f1"
GET /api/v1/services
GET /api/v1/services/{slug}
GET /api/v1/portfolio
GET /api/v1/blog
GET /api/v1/testimonials
POST /api/v1/contact
POST /api/v1/bookings
```

Public write endpoints still require:

* Validation
* Rate limiting
* Spam/abuse protection where necessary

Public does not mean unprotected.

---

# 38. Administrative API Separation

Administrative endpoints should have a clearly identifiable route namespace.

Example:

```text id="d6fy5r"
/api/v1/admin/services
/api/v1/admin/portfolio
/api/v1/admin/blog
/api/v1/admin/testimonials
/api/v1/admin/bookings
/api/v1/admin/messages
/api/v1/admin/media
```

This makes the API easier to reason about and audit.

---

# 39. Booking Security

Visitors can submit bookings without authentication.

However, they must not be able to:

* Change booking status
* Add internal notes
* View other bookings
* Edit another visitor's booking
* Delete bookings
* Access administrator booking lists

Only authorized administrators can perform those actions.

---

# 40. Contact Message Security

Visitors can submit contact messages.

They must not be able to:

* View other messages
* Mark messages as read
* Reply through the administrative interface
* Delete messages
* Access administrative message lists

Those operations belong to the protected admin API.

---

# 41. Media Security

Only authorized administrators should be able to upload or manage media.

Public visitors may retrieve media that has been intentionally published.

The backend should validate:

* Authentication
* Authorization
* File type
* File size
* Storage destination
* File name/path safety

---

# 42. Authentication Logging

The system may log security-relevant events such as:

* Successful administrator login
* Failed administrator login
* Logout
* Authorization failures
* Repeated authentication failures

Logs must not contain passwords or authentication secrets.

---

# 43. Session/Token Revocation

The selected authentication architecture must provide a practical way to invalidate authentication.

At minimum:

```text id="zn4wqs"
Logout
    ↓
Authentication no longer accepted
```

If multiple active sessions/tokens are supported later, the system may provide administrator session management or global revocation.

This is not required for the first version unless operational requirements justify it.

---

# 44. Password Changes

A future administrator password-change feature should:

1. Require authentication
2. Require the current password where appropriate
3. Validate the new password
4. Securely hash the new password
5. Invalidate/review existing authentication sessions if required
6. Never expose the password through the API

This feature is not required for the initial public website but should remain compatible with the authentication architecture.

---

# 45. Password Reset

Password recovery may be added if administrator account recovery is required.

If implemented, it should use Laravel's established password-reset mechanisms.

The application should not build a custom password-reset process.

Password-reset links should:

* Expire
* Be single-use where appropriate
* Be transmitted securely
* Not reveal whether an email address is registered unnecessarily

---

# 46. Account Status

The initial schema does not require a complex account-status system.

If multiple administrator accounts are introduced later, an account status such as:

```text id="o8kgxy"
active
disabled
```

may be added.

Disabled accounts must not be allowed to authenticate.

---

# 47. Authentication Testing

Authentication must be covered by automated tests.

Required scenarios include:

### Login

* Valid administrator can log in
* Invalid password is rejected
* Invalid email is rejected
* Missing credentials are rejected
* Excessive login attempts are limited

### Protected routes

* Unauthenticated request receives `401`
* Authenticated administrator can access protected endpoint
* Unauthorized role receives `403` where roles exist

### Logout

* Authenticated administrator can log out
* Logged-out authentication is no longer accepted

### Current user

* Authenticated administrator can retrieve `/auth/me`
* Unauthenticated request is rejected

### Frontend

* Unauthenticated user cannot access admin routes
* Authenticated user can access admin routes
* Expired authentication returns user to login

---

# 48. Authentication Security Checklist

Before authentication is considered complete:

* [ ] Administrator login implemented
* [ ] Secure password hashing enabled
* [ ] Authentication middleware configured
* [ ] Admin authorization configured
* [ ] Protected API routes configured
* [ ] Protected React routes configured
* [ ] `/auth/me` implemented
* [ ] Logout implemented
* [ ] Authentication failure handling implemented
* [ ] Login rate limiting configured
* [ ] CORS configured correctly
* [ ] HTTPS planned for production
* [ ] Secure cookie configuration reviewed if cookies are used
* [ ] Passwords excluded from logs
* [ ] Sensitive authentication data excluded from API responses
* [ ] Authentication tests created
* [ ] Authorization tests created

---

# 49. Authentication Flow Summary

## Login

```text id="sgw0d5"
Admin
  ↓
/admin/login
  ↓
POST /api/v1/auth/login
  ↓
Laravel validates credentials
  ↓
Authentication established
  ↓
React updates AuthContext
  ↓
/admin/dashboard
```

## Protected request

```text id="p8d2y8"
React Admin
  ↓
Authenticated API request
  ↓
Laravel Authentication Middleware
  ↓
Authorization
  ↓
Controller
  ↓
Database
  ↓
Response
```

## Logout

```text id="u5cqvz"
Admin
  ↓
Logout
  ↓
POST /api/v1/auth/logout
  ↓
Laravel invalidates authentication
  ↓
React clears auth state
  ↓
/admin/login
```

## Expired authentication

```text id="y8jv7c"
Admin request
  ↓
401 Unauthorized
  ↓
React clears stale auth state
  ↓
Redirect to /admin/login
```

---

# 50. Final Authentication Architecture

```text id="j4x4j6"
                     ┌─────────────────────┐
                     │     Public Site     │
                     │      React UI       │
                     └──────────┬──────────┘
                                │
                           Public API
                                │
                                ▼
                     ┌─────────────────────┐
                     │    Laravel API      │
                     │                     │
                     │  Public Endpoints  │
                     └──────────┬──────────┘
                                │
                                │
                  ┌─────────────┴──────────────┐
                  │                            │
                  ▼                            ▼
        ┌──────────────────┐         ┌──────────────────┐
        │ Authentication   │         │ Public Requests  │
        │ /auth/login      │         │ Contact/Booking  │
        │ /auth/logout     │         │ Content          │
        │ /auth/me         │         └──────────────────┘
        └────────┬─────────┘
                 │
                 ▼
        ┌──────────────────┐
        │ Authorization    │
        │ Administrator    │
        └────────┬─────────┘
                 │
                 ▼
        ┌──────────────────┐
        │ Protected Admin  │
        │ API              │
        └────────┬─────────┘
                 │
                 ▼
        ┌──────────────────┐
        │ MySQL / Eloquent │
        └──────────────────┘


        React Admin
             │
             ▼
      /admin/* routes
             │
             ▼
       ProtectedRoute
             │
             ▼
        AuthContext
```

The authentication architecture keeps the public website open to visitors while placing all administrative functionality behind Laravel-enforced authentication and authorization.

The backend remains the authoritative security boundary, while React provides the appropriate administrative user experience.
