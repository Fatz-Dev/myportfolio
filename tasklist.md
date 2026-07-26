# Tasklist: Laravel & Blade SSR Implementation

This document serves as a step-by-step checklist for an AI agent to convert the static HTML/JS portfolio into a fully dynamic Laravel application with Server-Side Rendering (SSR) via Blade and a backend CMS.

## Phase 1: Project Setup & Initialization
- [ ] 1. Create a new Laravel project (e.g., `laravel new portfolio`).
- [ ] 2. Configure the `.env` file with the appropriate database credentials (MySQL/PostgreSQL).
- [ ] 3. Install frontend dependencies (`npm install` or `yarn install`) for Tailwind CSS integration via Vite.
- [ ] 4. Set up Tailwind CSS by generating `tailwind.config.js` and `postcss.config.js`, copying the configuration and colors from the original HTML design.
- [ ] 5. Copy the static assets (`index.css`, `main.js`, `favicon.svg`) to the appropriate `resources/css`, `resources/js`, and `public` folders.

## Phase 2: Database Design & Migrations
- [ ] 1. Generate models and migrations for the following tables:
  - `Project`
  - `TechStack`
  - `ProjectTechStack` (Pivot table)
  - `Experience`
  - `Skill`
  - `Certificate`
  - `Message` (Contact Form)
- [ ] 2. Define the schema for each table as specified in `web-convert-to-data-dinamis.md`.
- [ ] 3. Run migrations to create the database schema (`php artisan migrate`).

## Phase 3: Models & Relationships
- [ ] 1. Set up the `Project` model with a `belongsToMany` relationship to `TechStack`.
- [ ] 2. Set up the `TechStack` model with a `belongsToMany` relationship to `Project`.
- [ ] 3. Ensure mass assignable fields (`$fillable`) are configured for all models to enable easy creation/updating.

## Phase 4: Data Seeding
- [ ] 1. Create seeders for the initial data from `data.js` (Projects, Tech Stacks, Experiences, Skills, Certificates).
- [ ] 2. Run the seeders (`php artisan db:seed`) to populate the database with the initial static content.

## Phase 5: Controllers & Routes
- [ ] 1. Create a `PortfolioController` with an `index` method.
- [ ] 2. Inside the `index` method, fetch all published projects (with eager loaded tech stacks), experiences, active skills, and certificates from the database.
- [ ] 3. Pass these variables to the `portfolio.index` view using `compact()`.
- [ ] 4. Define the web route in `routes/web.php` pointing the root URL (`/`) to the `PortfolioController@index`.
- [ ] 5. Create a `ContactController` to handle POST requests from the "Let's Talk" form and store them in the `Message` model. Define its route.

## Phase 6: Blade Template Integration (Frontend)
- [ ] 1. Convert the static `index.html` into a Laravel Blade template (`resources/views/portfolio/index.blade.php`).
- [ ] 2. Update all static paths for images and CSS/JS to use the Laravel `@vite` or `asset()` helpers.
- [ ] 3. Replace the static `data.js` rendering logic in `main.js` with Blade `@foreach` loops directly in the HTML structure.
  - Implement Blade loops for Projects, Tech Stacks (nested inside Projects), Experience timeline, Skills (if rendering directly), and Certificates.
- [ ] 4. Remove `data.js` and any `renderProjects()`, `renderExperience()`, `renderCertificates()` logic (including the simulated `setTimeout` loading skeletons) from `main.js` as HTML is now generated server-side. Skeleton placeholders in `index.html` should also be replaced directly by the actual Blade `@foreach` data.
- [ ] 4.1 Ensure the 'drag-to-rotate' feature and hover detail tooltips of the Skill Cloud remain fully functional by passing the dynamic skills list (with level & desc) from Blade to the existing JS physics loop.
- [ ] 4.2 Retain the hand-drawn grid background pattern on the mobile menu overlay in the Blade template (`#mobile-menu-bg`).
- [ ] 4.3 Ensure client-side interactive utilities like the Hero Typing Animation (`#typing-role`), Scroll-Spy navigation highlighting (`initActiveNav`), Custom Cursor text feedback, and Staggered Scroll Animations (`.reveal`) remain initialized in `main.js`.
- [ ] 5. Inject necessary interactive data (like `PROJECTS`, `SKILLS`, `CERTIFICATES`) directly into the `window` object in Blade as JSON (using `@json()`) so that client-side interactions (like the Project Modal and Skill Cloud physics) still work.
- [ ] 6. Ensure the Contact form has the `@csrf` token and submits to the correct route.

## Phase 7: Backend Admin Panel (CMS)
- [ ] 1. Install and set up an authentication system (Laravel Breeze, Jetstream, or basic auth).
- [ ] 2. (Optional but recommended) Install an admin panel package like Filament PHP, Laravel Nova, or build custom CRUD views to manage:
  - Projects and their associated Tech Stacks.
  - Experiences timeline.
  - Skills.
  - Certificates.
  - Inbox (Messages from Contact form).
- [ ] 3. Secure the admin routes with the `auth` middleware.

## Phase 8: Testing & Deployment
- [ ] 1. Test all data fetching and Blade rendering on the local environment.
- [ ] 2. Verify that JavaScript interactions (custom cursor, modals, smooth scrolling, skill cloud) function correctly with the injected `@json` variables.
- [ ] 3. Test the contact form submission.
- [ ] 4. Build frontend assets for production (`npm run build`).
- [ ] 5. Deploy the Laravel application to the server (e.g., using Forge, Vapor, or standard VPS).
