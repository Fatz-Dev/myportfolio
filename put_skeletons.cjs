const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const expSkeleton = `
                    <!-- Skeleton Loader -->
                    <div class="relative pl-6 md:pl-10 border-l-2 border-ink/20 border-dashed animate-pulse mb-12">
                        <div class="absolute left-[-11px] top-1 w-5 h-5 bg-sand border-drawn border-ink rounded-full"></div>
                        <div class="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-4">
                            <div class="h-8 bg-ink/10 rounded w-48 border-drawn-alt"></div>
                            <div class="h-6 bg-ink/10 rounded w-32 border-drawn"></div>
                        </div>
                        <div class="space-y-3">
                            <div class="h-4 bg-ink/10 rounded w-full max-w-2xl border-drawn"></div>
                            <div class="h-4 bg-ink/10 rounded w-5/6 max-w-2xl border-drawn-alt"></div>
                        </div>
                    </div>
                    <div class="relative pl-6 md:pl-10 border-l-2 border-ink/20 border-dashed animate-pulse mb-12">
                        <div class="absolute left-[-11px] top-1 w-5 h-5 bg-sand border-drawn border-ink rounded-full"></div>
                        <div class="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-4">
                            <div class="h-8 bg-ink/10 rounded w-56 border-drawn-alt"></div>
                            <div class="h-6 bg-ink/10 rounded w-40 border-drawn"></div>
                        </div>
                        <div class="space-y-3">
                            <div class="h-4 bg-ink/10 rounded w-full max-w-2xl border-drawn"></div>
                            <div class="h-4 bg-ink/10 rounded w-4/5 max-w-2xl border-drawn-alt"></div>
                        </div>
                    </div>
`;

const certSkeleton = `
                <!-- Skeleton Loader -->
                <div class="border-drawn bg-ink/5 p-6 h-full flex flex-col relative overflow-hidden animate-pulse">
                    <div class="w-full h-40 mb-6 organic-blob bg-ink/10 border-drawn-alt"></div>
                    <div class="h-4 bg-ink/10 w-16 mb-4 border-drawn rounded"></div>
                    <div class="h-6 bg-ink/10 w-3/4 mb-4 border-drawn-alt rounded"></div>
                    <div class="h-4 bg-ink/10 w-1/2 mt-auto border-drawn rounded"></div>
                </div>
                <div class="border-drawn bg-ink/5 p-6 h-full flex flex-col relative overflow-hidden animate-pulse">
                    <div class="w-full h-40 mb-6 organic-blob bg-ink/10 border-drawn"></div>
                    <div class="h-4 bg-ink/10 w-16 mb-4 border-drawn-alt rounded"></div>
                    <div class="h-6 bg-ink/10 w-2/3 mb-4 border-drawn rounded"></div>
                    <div class="h-4 bg-ink/10 w-1/2 mt-auto border-drawn-alt rounded"></div>
                </div>
                <div class="border-drawn bg-ink/5 p-6 h-full flex flex-col relative overflow-hidden animate-pulse">
                    <div class="w-full h-40 mb-6 organic-blob bg-ink/10 border-drawn-alt"></div>
                    <div class="h-4 bg-ink/10 w-16 mb-4 border-drawn rounded"></div>
                    <div class="h-6 bg-ink/10 w-3/4 mb-4 border-drawn-alt rounded"></div>
                    <div class="h-4 bg-ink/10 w-1/2 mt-auto border-drawn rounded"></div>
                </div>
`;

html = html.replace('<div class="space-y-12" id="experience-container">\\n                    <!-- Injected via JS -->\\n                </div>', '<div class="space-y-12" id="experience-container">\\n' + expSkeleton + '\\n                </div>');
html = html.replace('<div id="certificates-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">\\n                <!-- Injected via JS -->\\n            </div>', '<div id="certificates-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">\\n' + certSkeleton + '\\n            </div>');

fs.writeFileSync('index.html', html);
