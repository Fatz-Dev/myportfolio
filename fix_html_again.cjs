const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const badFiltersStr = `                <div id="project-filters" class="flex flex-wrap justify-center gap-3 reveal">
                    
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
                </div>`;
html = html.replace(badFiltersStr, `                <div id="project-filters" class="flex flex-wrap justify-center gap-3 reveal"></div>`);

const badContainerStr = `            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 transition-opacity duration-300" id="projects-container">
                
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
            </div>`;
html = html.replace(badContainerStr, `            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 transition-opacity duration-300" id="projects-container"></div>`);

fs.writeFileSync('index.html', html);
