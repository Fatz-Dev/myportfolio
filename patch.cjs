const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const metaTags = `    <meta property="og:title" content="FatzDev | Software Engineer" />
    <meta property="og:description" content="Portfolio of FatzDev, specialized in building scalable architectures and functional user interfaces." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://fatzdev.com" />
    <meta property="og:image" content="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="FatzDev | Software Engineer" />
    <meta name="twitter:description" content="Portfolio of FatzDev, specialized in building scalable architectures and functional user interfaces." />
    <meta name="twitter:image" content="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop" />
    <meta name="description" content="Portfolio of FatzDev, specialized in building scalable architectures and functional user interfaces." />`;

html = html.replace('<title>Portfolio | Software Engineer</title>', `<title>FatzDev | Software Engineer</title>\n${metaTags}`);

const loaderHtml = `    <!-- Preloader -->
    <div id="page-loader" class="fixed inset-0 bg-sand z-[999] flex flex-col items-center justify-center transition-all duration-700">
        <svg class="w-16 h-16 text-terra animate-[spin_3s_linear_infinite] mb-6" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round">
            <path d="M50 15 C 75 15, 85 35, 85 50 C 85 75, 65 85, 50 85 C 35 85, 15 75, 15 50 C 15 35, 25 15, 50 15" stroke-dasharray="150" stroke-dashoffset="30" />
            <path d="M50 15 C 52 13, 48 17, 50 15" stroke-width="2" />
        </svg>
        <span class="font-mono text-ink text-sm italic">Crafting experience...</span>
    </div>
`;

html = html.replace('<body class="bg-sand text-ink font-sans antialiased selection:bg-terra selection:text-sand">', '<body class="bg-sand text-ink font-sans antialiased selection:bg-terra selection:text-sand">\n' + loaderHtml);

html = html.replace('Alex.', 'FatzDev.');
html = html.replace("I'm Alex,", "I'm FatzDev,");
html = html.replace('2026 Alex.', '2026 FatzDev.');

fs.writeFileSync('index.html', html);
