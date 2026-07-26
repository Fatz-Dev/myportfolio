# Portfolio Project

This is a developer portfolio designed with a handmade, organic, and clean aesthetic, emphasizing typography, spacing, and smooth interactions.

## Project Structure

- `index.html`: The main entry point containing the application layout and structure.
- `src/main.js`: Core logic for UI interactions (Lenis scrolling, skill cloud physics, custom cursor, modals, filtering).
- `src/data.js`: Centralized data store for Projects and Experiences.
- `src/index.css`: Tailwind CSS directives and custom animations/styles.
- `public/` (or root): Static assets like `favicon.svg`.

## How to Run

1. Make sure you have [Node.js](https://nodejs.org/) installed.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the provided localhost URL in your browser.

## How to Update Content

All content for **Projects** and **Experience** is stored in `src/data.js`.

### Updating Projects
Open `src/data.js` and modify the `PROJECTS` array. Each project object requires:
- `title` (String): The name of the project.
- `category` (String): High-level categorization (e.g., "Architecture", "Interface").
- `description` (String): Details about the project.
- `techStack` (Array of Objects): E.g., `[{ name: 'React', role: 'UI Components' }]`.
- `image` (String): A URL to the project preview image.
- `link` (String): A URL for the "Live Demo".

### Updating Experience
Modify the `EXPERIENCES` array in `src/data.js`:
- `role` (String): Your job title.
- `company` (String): The organization name.
- `period` (String): The duration of your role (e.g., "2024 - Present").
- `description` (String): A brief summary of your responsibilities.

The UI will automatically reflect any changes saved to this file.
