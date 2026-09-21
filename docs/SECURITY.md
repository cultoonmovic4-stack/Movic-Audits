# Security Documentation

## 1. Purpose

Security is a core requirement of the Merit Media web application.

The application consists of:

* React/Vite frontend
* Laravel/PHP backend
* MySQL database
* Administrative interface
* Public forms
* Media uploads
* API endpoints

Security controls must therefore be implemented across the entire system rather than relying on the frontend alone.

---

# 2. Security Principles

The application should follow these principles:

1. Never trust client-side input.
2. Validate all externally supplied data.
3. Authenticate protected users.
4. Authorize administrative actions.
5. Keep database credentials on the server.
6. Keep private secrets out of frontend code.
7. Minimize exposed data.
8. Use secure defaults.
9. Protect uploaded files.
10. Use HTTPS in production.
11. Keep dependencies updated.
12. Log important security events.
13. Return safe, consistent API errors.
14. Apply least privilege wherever practical.

---

# 3. Security Architecture

The primary security boundary is the Laravel backend.

```text id="w2d8n4"
Browser
   │
   ▼
React Application
   │
   │ HTTPS / API
   ▼
Laravel API
   │
   ├── Authentication
   ├── Authorization
   ├── Validation
   ├── Rate Limiting
   ├── Business Rules
   ├── File Validation
   └── Database Access
          │
          ▼
       MySQL
```

The React application should never be treated as a trusted security boundary.

---

# 4. Frontend Security

The React frontend is responsible for user interaction and presentation.

It must not contain:

* MySQL credentials
* Database passwords
* Private API keys
* Server secrets
* Laravel application secrets
* File-system credentials
* Authentication secrets that should remain server-side

Environment variables exposed to Vite are potentially visible to users.

Only values intended for the browser should use frontend environment variables.

Example:

```text id="f9j4b7"
VITE_API_URL=https://example.com/api/v1
```

Private server configuration must remain in Laravel's environment configuration.

---

# 5. Authentication

Administrative functionality requires authentication.

The authentication architecture is defined in `AUTHENTICATION.md`.

Protected operations include:

* Dashboard access
* Service management
* Portfolio management
* Blog management
* Testimonial management
* Booking management
* Message management
* Media management

The login endpoint must implement appropriate protections against abuse.

---

# 6. Authorization

Authentication answers:

> Who is this user?

Authorization answers:

> What is this user allowed to do?

Every protected Laravel endpoint must enforce authorization independently of the React interface.

For the initial system:

```text id="6b5s3d"
Administrator
    └── Administrative access
```

Future roles can be introduced if the project requires differentiated permissions.

---

# 7. Protected API Endpoints

Public endpoints may be accessed without authentication when their purpose requires public access.

Administrative endpoints must require authentication.

Example:

```text id="j1u5k2"
Public:
GET  /api/v1/services
GET  /api/v1/portfolio
GET  /api/v1/blog
POST /api/v1/contact
POST /api/v1/bookings

Protected:
GET    /api/v1/admin/dashboard
POST   /api/v1/admin/services
PUT    /api/v1/admin/services/{id}
DELETE /api/v1/admin/services/{id}
```

The exact endpoint list is maintained in `API.md`.

---

# 8. Password Security

Administrator passwords must never be stored as plain text.

Laravel's supported secure password hashing mechanism should be used.

Passwords should:

* Be hashed before storage
* Never appear in API responses
* Never be logged
* Never be returned to the frontend
* Never be stored in source control

Password requirements should be appropriate for administrative accounts.

---

# 9. Authentication Abuse Protection

Authentication endpoints should be protected against repeated automated attempts.

Recommended controls include:

* Rate limiting
* Login attempt throttling
* Generic authentication failure messages
* Secure session/token handling
* Logging of significant authentication events

The system should avoid revealing whether a particular administrator account exists through overly specific login errors.

---

# 10. Session and Token Security

The selected Laravel authentication mechanism must use secure session or token practices.

Production authentication should use:

* HTTPS
* Secure cookies where cookies are used
* Appropriate `HttpOnly` settings
* Appropriate `SameSite` settings
* Reasonable session expiration
* Secure logout handling

Authentication details should not be exposed unnecessarily to JavaScript.

The exact mechanism will be finalized during implementation based on the selected Laravel authentication architecture and deployment model.

---

# 11. CSRF Protection

If authentication uses cookie-based sessions, state-changing requests must have appropriate CSRF protection.

This applies particularly to:

```text id="h31qkn"
POST
PUT
PATCH
DELETE
```

The final implementation must follow Laravel's CSRF architecture and the chosen frontend/backend deployment arrangement.

---

# 12. CORS

Cross-Origin Resource Sharing must be explicitly configured.

Development may use a local frontend/backend arrangement such as:

```text id="kz4t9j"
Frontend:
http://localhost:5173

Backend:
http://localhost
```

The production configuration should permit only the required frontend origins.

CORS must not be configured with unnecessarily broad access.

Avoid unrestricted configurations such as allowing arbitrary origins together with credentials.

---

# 13. HTTPS

Production traffic should use HTTPS.

HTTPS protects:

* Login credentials
* Authentication state
* Form submissions
* API requests
* Uploaded content
* Administrative operations

HTTP should not be used for sensitive production communication.

---

# 14. Input Validation

All externally supplied input must be validated on the Laravel backend.

This includes:

* Contact forms
* Booking forms
* Login requests
* Service forms
* Portfolio forms
* Blog forms
* Testimonial forms
* Media uploads
* Search/filter parameters
* Pagination parameters

Frontend validation improves user experience but does not replace backend validation.

---

# 15. SQL Injection Protection

Database queries should use Laravel's Eloquent ORM or parameterized query mechanisms.

User input must never be concatenated directly into raw SQL queries.

Unsafe pattern:

```php
DB::select("SELECT * FROM users WHERE email = '$email'");
```

The implementation should instead use Laravel's parameterized mechanisms or Eloquent.

---

# 16. Mass Assignment Protection

Laravel models must protect against unintended mass assignment.

Models should define appropriate:

```php
$fillable
```

or:

```php
$guarded
```

configuration.

Only fields intentionally accepted from requests should be writable.

---

# 17. XSS Protection

User-controlled content must be handled carefully.

Potential sources include:

* Contact messages
* Booking messages
* Blog content
* Testimonials
* Media metadata
* Search parameters

React provides useful default escaping for rendered text.

However, rich-text or HTML content requires additional sanitization.

---

# 18. Rich Text Security

Blog content may contain formatted HTML.

Rich-text content must be sanitized before being rendered publicly.

The system should:

1. Accept supported formatting.
2. Remove unsafe HTML.
3. Store sanitized content.
4. Render content safely.

Dangerous constructs such as arbitrary scripts, event handlers, unsafe URLs, and other executable content must not be permitted.

---

# 19. File Upload Security

File uploads represent a significant security boundary.

The backend must validate:

* File type
* MIME type
* File extension
* File size
* Upload errors
* Filename handling

The application should not blindly trust the filename or browser-provided MIME type.

Uploaded files should be assigned safe server-side names rather than relying on user-provided filenames as storage paths.

---

# 20. Image Upload Security

For image uploads, the backend should verify that the uploaded file is actually an accepted image format.

Supported formats should be intentionally limited.

For example:

```text id="6k8i4w"
JPEG
PNG
WebP
```

Additional formats should only be enabled when genuinely required.

The implementation should reject executable or unsupported file types.

---

# 21. Uploaded File Storage

Uploaded files should be stored using Laravel's filesystem abstraction.

The database should store metadata and references such as:

```text id="2v6y7c"
disk
path
original_name
mime_type
size
alt_text
uploaded_by
```

Binary file contents should not be stored directly in MySQL.

Storage configuration belongs to the backend and must not expose private filesystem credentials to React.

---

# 22. File Access

Files intended for public website display may be stored in publicly accessible storage.

Private administrative files should not automatically be exposed publicly.

The application should distinguish between:

```text id="n1f4xs"
Public media
Private media
```

If private media is introduced later, access should be controlled through authenticated backend routes or signed/temporary URLs.

---

# 23. File Deletion

Deleting a database media record must not automatically be assumed to mean the physical file has been safely removed.

The implementation should ensure that:

1. References are checked.
2. Associated records are handled safely.
3. The physical file is removed when appropriate.
4. Orphaned files do not accumulate unnecessarily.

Deletion behavior should be clearly defined before implementing permanent media deletion.

---

# 24. Booking Form Security

The public booking form is an unauthenticated endpoint and therefore requires additional protection.

Controls should include:

* Server-side validation
* Rate limiting
* Length restrictions
* Email validation
* Safe handling of text fields
* Spam mitigation where necessary

The booking endpoint must not allow arbitrary fields to be written directly into unrelated database columns.

---

# 25. Contact Form Security

The contact form must use similar protections.

Required controls include:

* Server-side validation
* Rate limiting
* Field length limits
* Email validation
* Safe text handling
* Spam protection where necessary

The contact endpoint should expose only the fields intended for public submission.

---

# 26. Spam Protection

Public forms may eventually attract automated spam.

The initial implementation should provide a structure that allows additional anti-spam controls to be introduced.

Potential future mechanisms include:

* Rate limiting
* Honeypot fields
* Challenge systems
* Behavioral checks
* Email verification where justified

Anti-spam measures should be introduced according to observed need rather than unnecessarily complicating the initial system.

---

# 27. Rate Limiting

Rate limiting should be applied to endpoints that can be abused.

Priority areas include:

* Login
* Contact form
* Booking form
* Authentication endpoints
* Resource-intensive public API queries

Administrative endpoints should also have reasonable request limits.

Laravel's rate-limiting capabilities should be used where appropriate.

---

# 28. API Error Security

API errors should be useful without exposing internal implementation details.

Production responses must not expose:

* Stack traces
* SQL queries
* Database credentials
* Filesystem paths
* Internal server configuration
* Secret keys
* Framework debugging information

Example safe response:

```json
{
  "success": false,
  "message": "Unable to process the request."
}
```

Validation errors may provide field-specific information when appropriate.

---

# 29. Debug Mode

Laravel debug mode must be disabled in production.

Development:

```text id="2w2e9v"
APP_DEBUG=true
```

Production:

```text id="t8y9lq"
APP_DEBUG=false
```

Production errors must be logged securely rather than displayed directly to visitors.

---

# 30. Environment Variables

Sensitive configuration must be stored outside source-controlled application code.

Examples include:

```text id="3r3x4z"
APP_KEY
DB_USERNAME
DB_PASSWORD
MAIL_USERNAME
MAIL_PASSWORD
API credentials
Storage credentials
```

`.env` files containing secrets must not be committed to Git.

A safe `.env.example` should contain only placeholders.

---

# 31. Database Security

The application database should follow least-privilege principles.

The Laravel application should use a database account with only the permissions required by the application.

Database credentials should never be exposed to the browser.

MySQL should not be unnecessarily exposed directly to the public internet.

---

# 32. Database Integrity

Security also includes protecting data integrity.

The database should use:

* Foreign keys
* Appropriate constraints
* Proper indexes
* Valid data types
* Appropriate nullable fields
* Unique constraints where required

Database migrations should be the source of truth for schema changes.

---

# 33. Authorization and Data Exposure

API responses should expose only the fields required by the requesting context.

For example, a public booking response should never expose:

* Internal notes
* Administrative metadata
* Authentication information
* Private internal identifiers unless required

Laravel API Resources should be used to control serialized output.

---

# 34. Logging

Important security events should be logged appropriately.

Potential events include:

* Successful administrator login
* Failed administrator login
* Logout
* Password changes
* Administrative content changes
* Suspicious request patterns
* File-upload failures
* Authentication failures

Logs must not contain passwords, authentication secrets, or unnecessary personal information.

---

# 35. Log Management

Production logs should be:

* Stored securely
* Rotated appropriately
* Protected from public access
* Monitored when practical

Log files must never be placed in publicly accessible website directories.

---

# 36. Dependency Security

Project dependencies should be kept reasonably current.

This includes:

### Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Other npm dependencies

### Backend

* PHP
* Laravel
* Composer packages

Dependency updates should be tested before deployment.

Unused dependencies should be removed.

---

# 37. Dependency Review

Before adding a new package, consider:

* Is it necessary?
* Is it maintained?
* Does it introduce unnecessary security risk?
* Is there already an existing project dependency that provides the required functionality?
* Does the package have a reasonable security history?
* Is the package compatible with the project's versions?

Avoid unnecessary dependencies.

---

# 38. Admin Account Security

Administrator accounts should receive stronger security consideration than ordinary public interactions.

Recommended practices include:

* Strong unique passwords
* Secure authentication
* HTTPS
* Rate limiting
* Session expiration
* Logout functionality
* Minimal administrator accounts
* Regular review of administrator access

Multi-factor authentication may be introduced later if the project requires it.

---

# 39. Production Server Security

Production infrastructure should:

* Use HTTPS
* Keep PHP and server software updated
* Restrict database access
* Protect environment files
* Disable directory listing where inappropriate
* Disable unnecessary services
* Configure appropriate filesystem permissions
* Keep application logs protected
* Use secure server configuration

Server-level security is part of deployment and is documented further in `DEPLOYMENT.md`.

---

# 40. Security Headers

Where appropriate, production responses should include security-related HTTP headers.

Potential headers include:

```text id="jz4d5u"
Content-Security-Policy
X-Content-Type-Options
Referrer-Policy
Strict-Transport-Security
Permissions-Policy
```

Exact configuration should be tested against the application's frontend, API, media, and deployment requirements before enforcement.

---

# 41. Content Security Policy

A Content Security Policy can reduce the impact of certain browser-based attacks.

The policy should be introduced carefully because overly restrictive policies can break:

* React assets
* API requests
* Images
* Fonts
* Analytics
* Third-party integrations

The production policy should be based on the application's actual resource requirements.

---

# 42. Secrets Management

Secrets should never be:

* Committed to Git
* Embedded in React source code
* Included in public API responses
* Written into client-side logs
* Included in screenshots or documentation
* Shared unnecessarily

If a secret is accidentally committed, it should be considered compromised and rotated.

---

# 43. Git Security

The repository should exclude sensitive and generated files.

The root `.gitignore` should include appropriate entries for:

```text id="8u8n7x"
.env
.env.*
vendor/
node_modules/
storage/logs/
storage/framework/
build/
dist/
```

Exceptions should be made for safe example configuration files such as `.env.example`.

---

# 44. Error and Exception Handling

Laravel should centralize application exception handling where practical.

The backend should distinguish between:

* Validation errors
* Authentication errors
* Authorization errors
* Not-found errors
* Rate-limit errors
* Server errors

The frontend should translate these responses into appropriate user-facing messages.

---

# 45. Security Testing

Security-related tests should cover:

### Authentication

* Invalid credentials
* Successful login
* Logout
* Expired authentication
* Unauthorized access

### Authorization

* Non-admin access
* Missing permissions
* Protected endpoints

### Validation

* Invalid input
* Missing fields
* Oversized fields
* Invalid file uploads

### Public forms

* Spam-like repeated requests
* Invalid email addresses
* Excessively long messages
* Unexpected fields

### API

* Invalid IDs
* Invalid filters
* Invalid pagination
* Unauthorized requests

---

# 46. Security Checklist

Before production deployment:

### Authentication

* [ ] Administrator authentication implemented
* [ ] Passwords securely hashed
* [ ] Login rate limiting enabled
* [ ] Logout works correctly
* [ ] Authentication state is protected

### Authorization

* [ ] Admin API routes protected
* [ ] Authorization enforced server-side
* [ ] Public endpoints expose only public data

### Input

* [ ] All API input validated
* [ ] SQL injection protections verified
* [ ] Mass assignment protections verified
* [ ] Rich text sanitized

### Files

* [ ] Upload types restricted
* [ ] Upload sizes restricted
* [ ] Files stored safely
* [ ] Filenames handled safely
* [ ] Private files protected

### Application

* [ ] HTTPS enabled
* [ ] Production debug mode disabled
* [ ] CORS configured correctly
* [ ] Security headers reviewed
* [ ] Error responses sanitized
* [ ] Secrets excluded from Git

### Database

* [ ] Database credentials protected
* [ ] Database access restricted
* [ ] Foreign keys configured
* [ ] Backups configured
* [ ] Sensitive data exposure reviewed

### Dependencies

* [ ] Dependencies reviewed
* [ ] Unused packages removed
* [ ] Production versions tested
* [ ] Known security issues reviewed

### Monitoring

* [ ] Security events logged
* [ ] Logs protected
* [ ] Error monitoring available where appropriate

---

# 47. Security Responsibilities by Layer

| Layer                  | Primary Security Responsibility                 |
| ---------------------- | ----------------------------------------------- |
| Browser / React        | UI validation, safe rendering, protected UX     |
| React Router           | Admin route protection for user experience      |
| Laravel Middleware     | Authentication and request controls             |
| Laravel Authorization  | Permission enforcement                          |
| Form Requests          | Input validation                                |
| Controllers / Services | Business-rule enforcement                       |
| Eloquent               | Safe database interaction                       |
| MySQL                  | Data integrity and access control               |
| Filesystem             | File storage and access control                 |
| Web Server             | HTTPS and server-level protections              |
| Deployment Environment | Secrets, configuration, infrastructure security |

No individual layer should be assumed to provide complete security by itself.

---

# 48. Security Change Policy

Security-sensitive changes should be reviewed carefully before implementation.

Examples include:

* Authentication changes
* Authorization changes
* New public API endpoints
* File upload changes
* Database permission changes
* New third-party integrations
* New frontend packages
* Changes to CORS
* Changes to CSP
* Changes to environment configuration

Security-sensitive functionality should include appropriate tests before deployment.

---

# 49. Final Security Architecture

The application's security model can be summarized as:

```text id="x4s9e1"
                    Internet
                       │
                       ▼
                    HTTPS
                       │
                       ▼
                 React Frontend
                       │
             ┌─────────┴─────────┐
             │                   │
        Public Routes       Admin Routes
             │                   │
             │             Authentication
             │                   │
             │              Authorization
             │                   │
             └─────────┬─────────┘
                       ▼
                  Laravel API
                       │
              ┌────────┼────────┐
              │        │        │
          Validation  Rate    Business
                      Limit    Rules
              │        │        │
              └────────┼────────┘
                       ▼
                    Eloquent
                       │
                       ▼
                     MySQL

              ┌──────────────────┐
              │  Secure Storage  │
              │      Media       │
              └──────────────────┘
```

The fundamental rule is:

> **The frontend provides the interface; the backend enforces security.**

This architecture ensures that administrative access, data validation, database operations, file handling, and authorization remain under server-side control.
