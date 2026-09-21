# MOVIC AUDITS — ARCHITECTURE DECISION RECORD (ADR)

**Document Version:** 1.2.0 (Amended from v1.1.1 for Project Rebrand)  
**Status:** APPROVED  
**Project:** Movic Audits Web Application  
**Canonical Project Path:** `C:\laragon\www\movic-audits`  
**Primary Stack:** React (Vite, Tailwind CSS, React Router, JavaScript) + PHP / Laravel + Eloquent ORM + MySQL  

> [!NOTE]
> **Amendment v1.2.0 Note:** The project identity and local infrastructure have been updated from "Merit Media" to "Movic Audits" (Database: `movic_audits`, Path: `C:\laragon\www\movic-audits`). All underlying technical decisions—application architecture, database schema, API contracts, authentication, deletion policies, and media handling—remain authoritative and functionally unchanged.

---

## 1. Decision Summary Table

| # | Architecture Decision | Final Choice | Primary Rationale | Affected Areas | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **01** | **Authentication Mechanism** | Laravel Sanctum Stateful SPA Session (Secure HTTP-Only Cookies) | Prevents direct client-side script access to session credentials; native SPA session handling within same origin/subdomain. | Backend Auth, Middleware, Frontend `AuthContext`, API Client | **CLOSED** |
| **02** | **Database Deletion & Archival** | Hybrid: Status Archival + Selective Soft Deletes + Protected Foreign Keys | Protects historical business records (bookings, enquiries, post authors) while allowing clean operational maintenance. | Database Schema, Migrations, Eloquent Models, Admin Controllers | **CLOSED** |
| **03** | **Rich-Text & Content Format** | Sanitized HTML via Server-Side Sanitizer (Package selected in Phase 2) | Intuitive editorial authoring experience for media admins; authoritative backend sanitization ensures XSS defense. | Blog, Services, Admin Editor, React Rendering, Form Requests | **CLOSED** |
| **04** | **Media Storage Architecture** | Centralized `media` Table + Laravel Filesystem Abstraction (Public Disk Model) | Decouples binary assets from DB; maintains driver-agnostic portability for future cloud/local storage targets. | Database, API Resources, Admin Media Module, File Upload Services | **CLOSED** |
| **05** | **Admin Route Naming Convention** | Resource-Oriented (`/admin/.../create` & `/admin/.../:id/edit`) | Adheres to standard REST conventions and eliminates ambiguity with `/new`. | Frontend React Router, Admin Navigation, Admin Layout | **CLOSED** |
| **06** | **Portfolio Admin Route Structure** | Explicit Hierarchical Sub-Resources (`categories`, `albums`, `albums/:id/images`) | Reflects relational hierarchy; prevents overcrowded monolithic edit interfaces. | Admin Routes, Frontend Views, Admin API Endpoints | **CLOSED** |
| **07** | **Media Foreign Key Naming** | Exact DB Column Names (`media_id`, `cover_media_id`, etc.) in API Payloads | Eliminates artificial translation layers between frontend payloads, validation rules, and DB schema. | Database, Form Requests, API Documentation, React Services | **CLOSED** |
| **08** | **Authoritative Project Path** | `C:\laragon\www\movic-audits` | Establishes uniform directory structure; points to Movic Audits canonical environment. | Local Environment, Laragon VHost, Git Root | **CLOSED** |
| **09** | **API Routing & Versioning** | Base `/api/v1` with Dedicated Sub-Namespaces (`/auth`, `public`, `/admin`) | Future-proof version boundary; explicit separation between public and privileged endpoints. | Laravel Routes, Route Service Provider, React API Client | **CLOSED** |
| **10** | **Content Lifecycle & Statuses** | Strictly Enforced State Machine per Entity Type | Distinguishes editorial drafts from archived records; preserves submission histories. | Database Enums/Strings, Validation Rules, Admin UI Filters | **CLOSED** |
| **11** | **Slug Strategy & Reuse Rules** | Auto-Generated; Global Uniqueness across Active, Soft-Deleted, & Archived Records | Predictable URLs for SEO; prevents broken external backlinks; enforces collision suffixing. | Migrations, Eloquent Observers/Services, Frontend Routes | **CLOSED** |
| **12** | **Standard API Response Contract** | Standardized JSON Envelope (`success`, `message`, `data`, `meta`, `errors`) | Predictable parsing in React; standardized HTTP status mapping across public and admin APIs. | API Resources, Exception Handler, Base Controller, React Client | **CLOSED** |
| **13** | **Frontend State Architecture** | Lightweight: Local State + Custom Hooks + `AuthContext` + Central API Client | Prevents over-engineering; zero global Redux/Zustand overhead for a content/admin platform. | React Architecture, Services, Contexts, Components | **CLOSED** |
| **14** | **Form Validation Boundary** | Authoritative Laravel Form Requests; Client-Side UX Validation | Client validation only aids UX; server-side validation is the non-negotiable security boundary. | React Forms, Laravel Form Requests, Error Display Components | **CLOSED** |
| **15** | **File Upload Security Policy** | Strict Server-Side MIME/Extension Check (JPEG, PNG, WebP Only), Random Hash Filename | Prevents remote code execution (RCE), path traversal, and file-clobbering attacks; eliminates SVG attack surface. | Laravel Media Controller, Upload Service, Storage Config | **CLOSED** |
| **16** | **SEO & SPA Routing Integration** | Client-Side Route Metadata + Web Server Fallback + SSR-Compatible Architecture | Provides dynamic metadata and deep-linking in SPA mode while leaving architecture ready for future SSR/prerender. | `index.html`, React Head helpers, Apache `.htaccess`, `robots.txt` | **CLOSED** |
| **17** | **Environment Configuration** | Isolated Server Secrets (`.env`) vs. Whitelisted Public Frontend Config (`VITE_*`) | Guarantees zero credential leakage into client JavaScript bundles or version control. | Vite Config, Laravel `.env`, `.env.example` Templates | **CLOSED** |
| **18** | **Git Repository Baseline** | Monorepo with Explicit Ignore Rules for Build/Vendor/Storage Artifacts | Clean version history; repository stores only authoritative code, docs, and configurations. | `.gitignore`, Repository Root | **CLOSED** |
| **19** | **Testing Architecture** | Backend-Focused Feature/API Tests + Frontend ESLint, Build, & Integration Checks | High-confidence testing of critical auth, validation, and CRUD operations without test bloat. | PHPUnit/Pest, ESLint, Vitest/RTL (targeted), Build Scripts | **CLOSED** |
| **20** | **Guidelines Document Boundaries**| `DEVELOPMENT_GUIDELINES.md` = Code/Workflow; `FRONTEND_GUIDELINES.md` = Visual Authority | Eliminates conflicting guidance; preserves clear division between visual and technical rules. | Project Documentation | **CLOSED** |
| **21** | **Root README Policy** | Strictly Evidence-Based; Authored Post-Initialization | Prevents fictional commands or speculative deployment instructions. | Project Root `README.md` | **CLOSED** |
| **22** | **WordPress Decoupling** | Complete Clean-Slate Build (No Theme, Plugin, or Schema Replication) | Modern, clean architecture unencumbered by legacy technical debt. | Whole Application | **CLOSED** |
| **23** | **Anti-AI Design Directive** | Absolute Ban on AI Visual Tropes, Copy, and SaaS Aesthetics | Preserves authentic, premium, human-crafted brand identity for a high-end media house. | Frontend Components, Admin UI, Copy, Styling | **CLOSED** |
