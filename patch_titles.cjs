const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace('class="font-mono text-4xl md:text-5xl font-bold mb-4 reveal"', 'class="section-title font-mono text-4xl md:text-5xl font-bold mb-4 reveal"');
html = html.replace('class="font-mono text-4xl md:text-5xl font-bold mb-4 text-ink reveal"', 'class="section-title font-mono text-4xl md:text-5xl font-bold mb-4 text-ink reveal"'); // Will match the first one
html = html.replace('class="font-mono text-4xl md:text-5xl font-bold mb-4 text-ink reveal"', 'class="section-title font-mono text-4xl md:text-5xl font-bold mb-4 text-ink reveal"'); // Match the second one
html = html.replace('class="font-mono text-4xl md:text-5xl font-bold mb-4 text-ink reveal"', 'class="section-title font-mono text-4xl md:text-5xl font-bold mb-4 text-ink reveal"'); // Match the third one
html = html.replace('class="font-mono text-5xl md:text-6xl font-bold mb-8 text-terra reveal"', 'class="section-title font-mono text-5xl md:text-6xl font-bold mb-8 text-terra reveal"');

// Mobile menu animation updates
const mobileMenuOrig = `<div id="mobile-menu" class="fixed inset-0 z-[100] bg-sand flex flex-col pointer-events-none opacity-0 transition-opacity duration-300 items-center justify-center">
        <button id="mobile-menu-close" class="absolute top-6 right-6 p-2 text-ink">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        <div class="flex flex-col items-center gap-8 font-mono text-3xl" id="mobile-menu-content">`;

const mobileMenuNew = `<div id="mobile-menu" class="fixed inset-0 z-[100] flex flex-col pointer-events-none items-center justify-center overflow-hidden">
        <div id="mobile-menu-bg" class="absolute inset-0 bg-sand translate-y-full rounded-t-[100%] transition-all duration-700 ease-in-out"></div>
        <button id="mobile-menu-close" class="absolute top-6 right-6 p-2 text-ink opacity-0 transition-opacity duration-300 delay-500 z-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        <div class="flex flex-col items-center gap-10 font-mono text-4xl opacity-0 transition-opacity duration-300 delay-300 z-10" id="mobile-menu-content">`;

html = html.replace(mobileMenuOrig, mobileMenuNew);

fs.writeFileSync('index.html', html);
