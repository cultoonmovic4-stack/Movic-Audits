# Merit Media Website

## 1. Project Overview

The Merit Media Website is a modern web application designed for Merit Media, a photography and media business.

The application will provide a professional public-facing website where visitors can learn about the company, explore its services and portfolio, read published content, view testimonials, and submit booking or general enquiries.

The system will also include a secure administration area that allows authorized administrators to manage the website's dynamic content.

The application will be developed using a separated frontend and backend architecture.

---

## 2. Project Goals

The main goals of the project are to:

* Provide a modern and professional website for Merit Media.
* Provide a responsive experience across desktop, tablet, and mobile devices.
* Present Merit Media's services and portfolio effectively.
* Allow visitors to submit booking and general enquiries.
* Provide a blog for publishing articles and other content.
* Display client testimonials.
* Provide a content management system for administrators.
* Store dynamic website content in a structured MySQL database.
* Provide a secure Laravel backend API.
* Create a maintainable and scalable application architecture.
* Follow good practices for security, performance, accessibility, and SEO.

---

## 3. Technology Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React Router

### Backend

* PHP
* Laravel
* Laravel REST API
* Eloquent ORM

### Database

* MySQL

### Local Development Environment

* Laragon

### Version Control

* Git

---

## 4. System Architecture

The application will use a separated frontend and backend architecture.

```text
                    ┌─────────────────────┐
                    │       Visitor       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React + Vite      │
                    │    Tailwind CSS     │
                    │                     │
                    │  Public Website     │
                    │  Admin Interface    │
                    └──────────┬──────────┘
                               │
                           REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Laravel        │
                    │        PHP          │
                    │                     │
                    │ Routes              │
                    │ Controllers         │
                    │ Services            │
                    │ Models              │
                    │ Validation          │
                    │ Authentication      │
                    └──────────┬──────────┘
                               │
                           Eloquent
                               │
                               ▼
                    ┌─────────────────────┐
                    │       MySQL         │
                    └─────────────────────┘
```

The React frontend will communicate with the Laravel backend through REST API endpoints.

The frontend will never communicate directly with the MySQL database.

---

## 5. Public Website

The public website will contain the following primary pages:

### Home

The homepage will provide an introduction to Merit Media and highlight important content.

The homepage may contain sections such as:

* Hero section
* Introduction
* Services overview
* Featured portfolio
* Why choose Merit Media
* Testimonials
* Latest blog posts
* Booking/enquiry call-to-action

### About

The About page will provide information about Merit Media, including its story, values, approach, and other relevant company information.

### Services

The Services section will present the services offered by Merit Media.

Services will be managed dynamically through the administration system.

### Portfolio

The Portfolio section will showcase Merit Media's photography and media work.

Portfolio content will be managed through the administration system.

### Blog

The Blog section will contain published articles and other editorial content.

Administrators will be able to create, edit, publish, and manage blog posts.

### Contact

The Contact page will provide contact information and a form through which visitors can send general enquiries.

### Booking / Enquiry

The Booking / Enquiry page will allow potential clients to submit enquiries regarding Merit Media's services.

Submitted enquiries will be stored in the database and made available to administrators.

---

## 6. Testimonials

Testimonials will be implemented as a reusable content section rather than a primary standalone page.

Testimonials may appear on:

* Homepage
* Services page
* Other relevant sections of the website

Administrators will be able to manage testimonials through the administration system.

Management capabilities will include:

* Create testimonial
* Edit testimonial
* Delete testimonial
* Publish or unpublish testimonial
* Control display order

---

## 7. Administration System

The administration system will be integrated into the same React application as the public website.

The application will therefore contain both public and protected routes.

```text
/
├── Public Website
│
└── /admin
    ├── /login
    ├── /dashboard
    ├── /services
    ├── /portfolio
    ├── /blog
    ├── /testimonials
    ├── /bookings
    └── /messages
```

Administrative routes will require authentication.

Unauthorized users must not be able to access protected administrative functionality.

---

## 8. Administration Features

### Dashboard

The dashboard will provide an overview of important system information.

Possible dashboard information includes:

* Total bookings
* Pending bookings
* Unread contact messages
* Published blog posts
* Services
* Portfolio items
* Testimonials

### Services Management

Administrators will be able to:

* Create services
* Edit services
* Delete services
* Publish or unpublish services
* Manage service descriptions
* Manage service images

### Portfolio Management

Administrators will be able to:

* Create portfolio categories
* Create portfolio albums
* Add portfolio images
* Edit portfolio information
* Delete portfolio items
* Publish or unpublish portfolio content
* Control portfolio ordering

### Blog Management

Administrators will be able to:

* Create blog posts
* Edit blog posts
* Delete blog posts
* Publish or unpublish posts
* Manage blog categories
* Manage featured images

### Testimonials Management

Administrators will be able to:

* Create testimonials
* Edit testimonials
* Delete testimonials
* Publish or unpublish testimonials
* Control testimonial ordering

### Booking Management

Administrators will be able to:

* View booking enquiries
* View enquiry details
* Update booking status
* Add internal notes where required
* Manage booking records

### Contact Messages

Administrators will be able to:

* View contact messages
* Mark messages as read or unread
* Archive messages
* Delete messages where appropriate

---

## 9. User Types

The initial system will support two primary user types.

### Visitor

Visitors will be able to:

* Browse the website
* View services
* View portfolio content
* Read blog posts
* View testimonials
* Submit booking enquiries
* Submit contact messages

Visitors will not need an account.

### Administrator

Administrators will be able to:

* Authenticate securely
* Access the administration dashboard
* Manage services
* Manage portfolio content
* Manage blog posts
* Manage testimonials
* Manage bookings
* Manage contact messages

The authorization system should be designed so that additional roles can be introduced in the future if required.

---

## 10. Dynamic Content

Content that is expected to change should be stored in the database and managed through the administration system.

Examples include:

* Services
* Portfolio categories
* Portfolio albums
* Portfolio images
* Blog posts
* Blog categories
* Testimonials
* Booking enquiries
* Contact messages

Application structure, layouts, reusable components, and business logic will remain within the application source code.

---

## 11. Booking and Enquiry System

The booking/enquiry system will allow visitors to provide information about the service they are interested in and submit an enquiry to Merit Media.

The system will:

1. Display the booking/enquiry form.
2. Validate submitted information.
3. Send the request to the Laravel API.
4. Validate the request on the backend.
5. Store the enquiry in MySQL.
6. Make the enquiry available to administrators.
7. Allow administrators to manage its status.

The exact fields and workflow will be defined in the requirements and database documentation.

---

## 12. Blog System

The blog system will allow Merit Media to publish and manage articles.

A blog post may contain:

* Title
* Slug
* Excerpt
* Content
* Featured image
* Category
* Author
* Publication status
* Publication date
* SEO metadata

The exact structure will be finalized during database and API design.

---

## 13. Portfolio System

The portfolio system will provide a structured way to display Merit Media's work.

The system will support:

* Portfolio categories
* Albums
* Multiple images
* Titles
* Descriptions
* Featured items
* Publication status
* Display ordering

The exact relationships between portfolio entities will be defined in the database architecture.

---

## 14. Responsive Design

The application must provide a responsive user experience across:

* Desktop computers
* Laptops
* Tablets
* Mobile phones

The frontend will use Tailwind CSS for responsive styling and consistent UI development.

---

## 15. Security

Security will be considered throughout the application.

The system will include appropriate measures for:

* Administrator authentication
* Authorization
* Password hashing
* Request validation
* Input sanitization
* API protection
* Secure file uploads
* Database security
* Environment variable protection
* Rate limiting where appropriate
* Protection against common web vulnerabilities

Detailed security requirements will be documented separately.

---

## 16. SEO

The public website will be developed with SEO considerations from the beginning.

The implementation will consider:

* Semantic HTML
* Page titles
* Meta descriptions
* Open Graph metadata
* Descriptive URLs
* Proper heading structure
* Image alt text
* Canonical URLs where required
* Structured data where appropriate
* Sitemap
* Robots configuration
* Page performance

Detailed SEO implementation will be documented separately.

---

## 17. Performance

The application should be designed with performance in mind.

Areas to consider include:

* Optimized images
* Lazy loading
* Efficient API requests
* Pagination
* Caching where appropriate
* Code splitting
* Minified production assets
* Efficient database queries
* Proper database indexing

Performance optimization will be applied progressively throughout development.

---

## 18. Scalability

The system should be structured so that future features can be added without requiring a complete rewrite.

Potential future functionality may include:

* Multiple administrator roles
* Client accounts
* Client galleries
* Online payments
* Email notifications
* SMS notifications
* Newsletter management
* Advanced booking workflows
* Analytics
* Additional content types

Future features are not part of the initial scope unless explicitly approved.

---

## 19. Development Environment

The project will be developed locally using Laragon.

The development environment will provide the services and tools required to run:

* PHP
* Laravel
* MySQL
* Node.js
* Vite

The exact software versions will be documented during project setup.

---

## 20. Project Principles

The project will follow these principles:

### Separation of Concerns

Frontend, backend, database, and business logic should remain appropriately separated.

### Reusability

Reusable React components and Laravel structures should be preferred over unnecessary duplication.

### Maintainability

Code should be organized clearly and written so that future developers can understand and modify it.

### Security

Security should be considered during implementation rather than added only after development.

### Consistency

The project should follow consistent naming, folder structures, API conventions, database conventions, and UI patterns.

### Scalability

The architecture should allow the system to grow without unnecessary architectural changes.

### Documentation

Important architectural, database, API, and development decisions should be documented.
