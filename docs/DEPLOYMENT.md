# Deployment Documentation

## 1. Purpose

This document defines the deployment architecture and operational process for the Merit Media web application.

The application consists of:

* React/Vite frontend
* Laravel/PHP backend
* MySQL database
* Media/file storage
* Production web server
* HTTPS
* Environment-specific configuration

The deployment architecture should keep these responsibilities clearly separated while remaining practical to operate.

---

# 2. Deployment Architecture

The production system follows this general structure:

```text id="r8k2v4"
                         Internet
                            │
                            ▼
                         HTTPS
                            │
                    ┌───────┴────────┐
                    │  Web Server /  │
                    │ Reverse Proxy  │
                    └───────┬────────┘
                            │
             ┌──────────────┴──────────────┐
             │                             │
             ▼                             ▼
      React Static Assets             Laravel API
             │                             │
             │                             ▼
             │                          MySQL
             │
             └──────────────┐
                            ▼
                       Media Storage
```

The exact hosting provider and server software may change without changing the application's core architecture.

---

# 3. Deployment Components

## Frontend

The React/Vite application is built into production assets.

Typical process:

```text id="v8c1s2"
npm install
npm run build
```

The resulting build output is deployed to the web server or appropriate static hosting environment.

---

## Backend

Laravel runs as the application's API server.

Typical production requirements include:

* PHP
* Composer
* Laravel
* Required PHP extensions
* Database connectivity
* Writable Laravel storage directories
* Appropriate web-server configuration

---

## Database

MySQL stores persistent application data.

The production database should be separate from the local development database.

---

## Media Storage

Uploaded media should use Laravel's filesystem abstraction.

Depending on the hosting environment, media may be stored:

* On the application server
* On attached persistent storage
* On an object-storage service

The initial deployment can use server-based storage if appropriate.

---

# 4. Environments

The project should distinguish between:

```text id="c5m9x1"
Development
Testing
Production
```

Each environment should have its own configuration.

Development should prioritize convenience.

Production should prioritize:

* Security
* Reliability
* Performance
* Backups
* Monitoring
* Controlled access

---

# 5. Local Development Environment

The local environment uses Laragon.

Project location:

```text id="q2j7k5"
C:\laragon\www\movic-audits
```

The repository contains:

```text id="x1v8n4"
movic-audits/
├── frontend/
├── backend/
├── docs/
├── database/
├── README.md
└── ROADMAP.md
```

Local development services include:

* React/Vite development server
* Laravel development server or Laragon web server
* MySQL through Laragon

---

# 6. Production Domain

The production domain should use HTTPS.

The exact domain configuration should be finalized before deployment.

The application should support a clear production URL structure such as:

```text id="m4q8z6"
https://example.com/
https://example.com/about
https://example.com/services
https://example.com/portfolio
https://example.com/blog
https://example.com/contact
https://example.com/booking
```

The API should be accessible through the production backend architecture without exposing unnecessary infrastructure details.

---

# 7. Frontend Build

Before deployment:

```bash
cd frontend
npm install
npm run build
```

The build should produce optimized production assets.

The deployment process should verify:

* Build completes successfully
* No unresolved imports exist
* No development-only configuration is included
* API URL is correct
* Production assets load correctly

---

# 8. Frontend Environment Configuration

Frontend environment variables should contain only values safe for browser exposure.

Example:

```text id="d6t1w5"
VITE_API_URL=https://example.com/api/v1
```

No private credentials should be placed in Vite environment variables.

Remember that variables exposed to the frontend can potentially be inspected by visitors.

---

# 9. Backend Installation

On the production server:

```bash
cd backend
composer install --no-dev --optimize-autoloader
```

The Laravel application should be configured with production environment settings.

---

# 10. Laravel Environment

Production configuration belongs in the backend `.env` file or appropriate server-side secret configuration.

Typical values include:

```text id="s3k8p1"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://example.com

DB_CONNECTION=mysql
DB_HOST=...
DB_PORT=3306
DB_DATABASE=...
DB_USERNAME=...
DB_PASSWORD=...
```

Additional configuration may include:

* Mail settings
* Filesystem settings
* Queue settings
* Cache settings
* Authentication configuration

Secrets must not be committed to Git.

---

# 11. Laravel Application Key

Laravel requires a secure application key.

Production must have its own valid `APP_KEY`.

The production application key should:

* Be kept secret
* Never be committed to Git
* Not be copied into public documentation
* Not be reused casually across unrelated environments

Changing the key can invalidate encrypted application data, so it should be handled carefully.

---

# 12. Database Setup

The production database must be created before the application is fully operational.

After configuring the Laravel environment:

```bash
php artisan migrate --force
```

Production migrations should be reviewed before execution.

Database changes must be delivered through Laravel migrations rather than manual schema edits whenever practical.

---

# 13. Database Seeding

Production seeding must be deliberate.

Development seeders may create:

* Sample services
* Sample portfolio items
* Sample blog posts
* Sample testimonials
* Test users

These should not automatically be inserted into production.

If an initial administrator account or required system data is needed, production-safe seeders or controlled setup procedures should be used.

---

# 14. Laravel Storage

Laravel's storage configuration should be initialized appropriately.

For public media, the application may use Laravel's public storage mechanism.

Typical setup:

```bash
php artisan storage:link
```

The exact storage configuration depends on the chosen production filesystem.

---

# 15. File Permissions

The Laravel application must have appropriate write access to directories that require it.

Typical writable areas include:

```text id="n4s7w2"
storage/
bootstrap/cache/
```

The application should not make the entire project directory writable by the web server.

Permissions should follow the principle of least privilege.

---

# 16. Web Server

The production server must route requests appropriately.

The Laravel application should expose its `public/` directory as the web root.

The web server should not expose:

```text id="h2m8v5"
.env
app/
config/
database/
resources/
routes/
storage/private files
vendor/
```

The web root should point to:

```text id="j7x3c9"
backend/public
```

for the Laravel API application where the deployment architecture requires direct Laravel serving.

---

# 17. Frontend and Backend Hosting

The frontend and backend can be deployed using several valid arrangements.

### Option A — Same domain

```text id="e3q8k1"
example.com/
    React frontend

example.com/api/v1/
    Laravel API
```

This provides a straightforward public architecture.

### Option B — Separate subdomain

```text id="z5n2v7"
example.com/
    React frontend

api.example.com/
    Laravel API
```

Either approach is valid.

The final choice should consider:

* Hosting capabilities
* CORS requirements
* Cookie authentication requirements
* SSL configuration
* Operational simplicity

---

# 18. API CORS Configuration

If frontend and backend use different origins, Laravel CORS configuration must explicitly allow the production frontend origin.

For example:

```text id="v6q1m8"
Frontend:
https://example.com

API:
https://api.example.com
```

Only the required origin should be allowed.

Development origins should not remain enabled unnecessarily in production.

---

# 19. HTTPS

HTTPS must be enabled for production.

The deployment should include:

* Valid TLS certificate
* HTTPS redirect
* Secure cookies where applicable
* Correct application URL
* Secure API communication

HTTP should redirect to HTTPS rather than serving the application normally.

---

# 20. Production Caching

Laravel production deployments may use framework caching where appropriate.

Potential commands include:

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

These should only be run after confirming that the application's configuration and routes are production-ready.

When configuration changes, cached configuration must be refreshed appropriately.

---

# 21. Frontend Caching

Static frontend assets should be cacheable by browsers and CDNs where appropriate.

Build systems generally generate versioned assets that allow long-lived caching without serving stale files after a new deployment.

HTML should generally have more conservative caching than immutable hashed assets.

---

# 22. Database Backups

Production database backups are required.

Backups should be:

* Automated
* Stored separately from the production database
* Protected from unauthorized access
* Tested periodically
* Retained according to operational requirements

A backup that has never been restored successfully should not be assumed to be reliable.

---

# 23. Media Backups

Database backups alone are insufficient if uploaded media is stored separately.

Media storage should also be backed up when the storage system does not already provide appropriate durability.

The backup strategy should account for:

```text id="f7p2m5"
Database
+
Uploaded Media
```

Both are required to restore the complete website state.

---

# 24. Deployment Order

A typical production deployment should follow:

```text id="b8x4k1"
1. Pull approved code
        ↓
2. Install/update dependencies
        ↓
3. Build frontend
        ↓
4. Review environment configuration
        ↓
5. Run database migrations
        ↓
6. Update storage/configuration
        ↓
7. Clear/rebuild appropriate caches
        ↓
8. Switch/reload application
        ↓
9. Run smoke tests
        ↓
10. Monitor for errors
```

The exact commands depend on the chosen hosting environment.

---

# 25. Zero-Downtime Considerations

The initial project does not require a complex zero-downtime deployment system.

However, deployments should minimize interruption.

As the application grows, deployment may introduce:

* Release directories
* Atomic symlink switching
* Process managers
* Queue workers
* Health checks
* Automated deployment pipelines

These should only be introduced when operational requirements justify them.

---

# 26. Deployment Validation

After deployment, verify:

### Public website

* [ ] Homepage loads
* [ ] Navigation works
* [ ] Services load
* [ ] Portfolio loads
* [ ] Blog loads
* [ ] Contact form works
* [ ] Booking form works
* [ ] Images load

### Admin

* [ ] Admin login works
* [ ] Dashboard loads
* [ ] CRUD operations work
* [ ] Media uploads work
* [ ] Logout works

### API

* [ ] Public endpoints respond
* [ ] Protected endpoints reject unauthenticated requests
* [ ] Validation works
* [ ] Error responses are safe

### Infrastructure

* [ ] HTTPS works
* [ ] HTTP redirects correctly
* [ ] Database connection works
* [ ] Storage works
* [ ] Logs are accessible securely
* [ ] Backups are operating

---

# 27. Smoke Testing

A minimal post-deployment smoke test should verify the critical application path:

```text id="u2j5c8"
Homepage
   ↓
Services
   ↓
Portfolio
   ↓
Blog
   ↓
Contact
   ↓
Booking
   ↓
Admin Login
   ↓
Admin Dashboard
```

Critical failures should be resolved before considering the deployment successful.

---

# 28. Rollback

A deployment should have a rollback strategy.

If a release causes a serious problem, the team should be able to return to the previous application version.

Rollback considerations include:

* Previous frontend build
* Previous backend release
* Database migrations
* Media changes
* Environment configuration

Database migrations require particular care because not every schema change can be safely reversed after new data has been written.

---

# 29. Database Migration Safety

Before running a significant production migration:

1. Back up the database.
2. Review the migration.
3. Test it against a production-like database.
4. Confirm application compatibility.
5. Execute during an appropriate maintenance window if necessary.
6. Verify the application afterward.

Destructive migrations should receive additional review.

---

# 30. Application Monitoring

The initial deployment should at minimum provide access to:

* Laravel application logs
* Web-server logs
* Database error information
* Deployment logs

As the application grows, external monitoring may be added for:

* Availability
* Error rates
* Performance
* Failed requests
* Resource usage

---

# 31. Queue Workers

The initial application does not require a queue system unless background tasks are introduced.

Queues may become useful for:

* Email sending
* Image processing
* Large media operations
* Scheduled tasks
* Other slow operations

If queues are introduced, production must run the appropriate worker process and monitoring.

---

# 32. Scheduled Tasks

Scheduled tasks should only be introduced when required.

Potential future scheduled operations include:

* Cleanup tasks
* Maintenance
* Automated reports
* Content operations
* Backup-related tasks

Laravel's scheduler can be used where appropriate.

---

# 33. Email Configuration

Email functionality may eventually be used for:

* Booking notifications
* Contact notifications
* Administrative alerts

Production email credentials must remain server-side.

Email configuration should be tested independently before enabling important notifications.

---

# 34. Environment Separation

Development data should not automatically be copied into production.

The environments should remain logically separate:

```text id="q6s2m9"
Development
    ├── Local database
    ├── Local media
    └── Development configuration

Production
    ├── Production database
    ├── Production media
    └── Production configuration
```

Production credentials should never be used casually in local development.

---

# 35. Git-Based Deployment

The project may use Git as the source of truth for application code.

Typical workflow:

```text id="r1x5k8"
Local Development
       ↓
Git Commit
       ↓
Code Review / Verification
       ↓
Approved Branch
       ↓
Production Deployment
```

Generated files, secrets, local databases, and temporary files should not be committed.

---

# 36. CI/CD

Automated deployment is not mandatory for the first version.

A future CI/CD pipeline may perform:

```text id="d7m3q1"
Install dependencies
        ↓
Lint
        ↓
Run tests
        ↓
Build frontend
        ↓
Validate backend
        ↓
Deploy
        ↓
Run smoke tests
```

Automation should be introduced once the project has a stable deployment process.

---

# 37. Production Configuration Checklist

Before launch:

### Application

* [ ] Production environment configured
* [ ] Debug disabled
* [ ] Application key configured
* [ ] Correct application URL configured

### Frontend

* [ ] Production build generated
* [ ] Correct API URL configured
* [ ] No private secrets exposed

### Backend

* [ ] Dependencies installed
* [ ] Laravel storage configured
* [ ] Appropriate caches built
* [ ] Writable directories configured

### Database

* [ ] Production database created
* [ ] Credentials configured
* [ ] Migrations executed
* [ ] Backup configured

### Security

* [ ] HTTPS enabled
* [ ] CORS reviewed
* [ ] Admin authentication tested
* [ ] Public forms protected
* [ ] Production errors sanitized

### Media

* [ ] Storage configured
* [ ] Uploads tested
* [ ] Media URLs verified
* [ ] Media backup strategy established

---

# 38. Deployment Documentation Maintenance

Deployment documentation must be updated when significant infrastructure changes occur.

Examples:

* Hosting provider changes
* Domain changes
* Database architecture changes
* Storage provider changes
* Authentication changes
* Deployment automation
* Queue infrastructure
* CDN introduction

The documentation should describe the actual production architecture rather than an outdated theoretical setup.

---

# 39. Final Deployment Architecture

The target production architecture is:

```text id="p5c8w2"
                         USERS
                           │
                           ▼
                        HTTPS
                           │
                           ▼
                  ┌─────────────────┐
                  │   Web Server    │
                  └────────┬────────┘
                           │
               ┌───────────┴───────────┐
               │                       │
               ▼                       ▼
        React/Vite Build          Laravel API
               │                       │
               │                 ┌─────┴─────┐
               │                 │           │
               │                 ▼           ▼
               │              MySQL       Storage
               │
               └───────────────────────────┐
                                           │
                                           ▼
                                     Public Website
```

The deployment should remain as simple as practical while preserving the project's security, maintainability, and scalability requirements.

The initial production architecture does not require Kubernetes, microservices, complex orchestration, or other infrastructure that is not justified by the project's size.

The priority is a **secure, reliable, maintainable deployment of the React + Laravel + MySQL application**.
