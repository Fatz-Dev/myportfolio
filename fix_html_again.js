const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The project filters shouldn't have any skeletons. 
// It should just have <!-- Injected via JS --> or be empty. Wait, the project filters didn't have <!-- Injected via JS --> in the original code, it was injected by me? No, wait! I had `html = html.replace('<!-- Injected via JS -->', expSkeleton); // Replaces first one (Experience)` but the first one was in projects-container??
// Let's replace the whole section from `<div id="project-filters"` up to the start of `id="projects-container"`
const startFilters = html.indexOf('<div id="project-filters"');
const endFilters = html.indexOf('</div>\\n            </div>\\n            <div class="grid', startFilters);

if (startFilters > -1 && endFilters > -1) {
    const origFiltersSection = html.substring(startFilters, endFilters);
    console.log("Found filters section");
    html = html.replace(origFiltersSection, '<div id="project-filters" class="flex flex-wrap justify-center gap-3 reveal">\\n                    <!-- Injected via JS -->\\n                </div>');
}

const startProjects = html.indexOf('<div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 transition-opacity duration-300" id="projects-container">');
const endProjects = html.indexOf('</div>\\n        </section>\\n\\n        <!-- Skill Cloud Section -->', startProjects);

if (startProjects > -1 && endProjects > -1) {
    const origProjectsSection = html.substring(startProjects, endProjects);
    console.log("Found projects section");
    html = html.replace(origProjectsSection, '<div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 transition-opacity duration-300" id="projects-container">\\n                <!-- Injected via JS -->\\n            </div>');
}

fs.writeFileSync('index.html', html);
