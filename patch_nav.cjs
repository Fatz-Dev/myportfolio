const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const desktopLinksOrig = `<div class="flex items-center gap-6 font-mono text-sm font-medium text-ink/70 px-2">
                    <a href="#profile" class="nav-link hover:text-ink transition-colors cursor-none">Home</a>
                    <a href="#projects" class="nav-link hover:text-ink transition-colors cursor-none">Works</a>
                    <a href="#experience" class="nav-link hover:text-ink transition-colors cursor-none">Journey</a>
                </div>`;

const desktopLinksNew = `<div class="flex items-center gap-6 font-mono text-sm font-medium text-ink/70 px-2">
                    <a href="#profile" class="nav-link hover:text-ink transition-colors cursor-none">Home</a>
                    <a href="#projects" class="nav-link hover:text-ink transition-colors cursor-none">Projects</a>
                    <a href="#skills" class="nav-link hover:text-ink transition-colors cursor-none">Skills</a>
                    <a href="#experience" class="nav-link hover:text-ink transition-colors cursor-none">Experience</a>
                    <a href="#certificates" class="nav-link hover:text-ink transition-colors cursor-none">Certificates</a>
                </div>`;

html = html.replace(desktopLinksOrig, desktopLinksNew);

const mobileLinksOrig = `<div class="flex flex-col items-center gap-8 font-mono text-3xl" id="mobile-menu-content">
            <a href="#profile" class="nav-link-mobile hover:text-terra transition-colors decoration-wavy underline-offset-4 hover:underline">Profile</a>
            <a href="#projects" class="nav-link-mobile hover:text-terra transition-colors decoration-wavy underline-offset-4 hover:underline">Works</a>
            <a href="#experience" class="nav-link-mobile hover:text-terra transition-colors decoration-wavy underline-offset-4 hover:underline">Journey</a>
            <a href="#contact" class="nav-link-mobile hover:text-terra transition-colors decoration-wavy underline-offset-4 hover:underline">Contact</a>
        </div>`;

const mobileLinksNew = `<div class="flex flex-col items-center gap-8 font-mono text-3xl" id="mobile-menu-content">
            <a href="#profile" class="nav-link-mobile hover:text-terra transition-colors decoration-wavy underline-offset-4 hover:underline">Home</a>
            <a href="#projects" class="nav-link-mobile hover:text-terra transition-colors decoration-wavy underline-offset-4 hover:underline">Projects</a>
            <a href="#skills" class="nav-link-mobile hover:text-terra transition-colors decoration-wavy underline-offset-4 hover:underline">Skills</a>
            <a href="#experience" class="nav-link-mobile hover:text-terra transition-colors decoration-wavy underline-offset-4 hover:underline">Experience</a>
            <a href="#certificates" class="nav-link-mobile hover:text-terra transition-colors decoration-wavy underline-offset-4 hover:underline">Certificates</a>
            <a href="#contact" class="nav-link-mobile hover:text-terra transition-colors decoration-wavy underline-offset-4 hover:underline">Contact</a>
        </div>`;

html = html.replace(mobileLinksOrig, mobileLinksNew);

fs.writeFileSync('index.html', html);
