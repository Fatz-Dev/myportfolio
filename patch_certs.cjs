const fs = require('fs');
let js = fs.readFileSync('src/main.js', 'utf8');

js = js.replace("import { PROJECTS, EXPERIENCES } from './data.js';", "import { PROJECTS, EXPERIENCES, CERTIFICATES } from './data.js';");
js = js.replace("renderExperience();", "renderExperience();\n  renderCertificates();");

const renderCertificatesLogic = `
function renderCertificates() {
  const container = document.getElementById('certificates-grid');
  if (!container) return;
  
  let html = '';
  CERTIFICATES.forEach((cert, index) => {
    html += \`
      <a href="\${cert.link}" target="_blank" class="block group reveal" style="transition-delay: \${index * 100}ms">
        <div class="border-drawn bg-ink/5 p-6 h-full flex flex-col hover:bg-ink/10 transition-colors cursor-none relative overflow-hidden">
            <div class="w-full h-40 mb-6 organic-blob overflow-hidden bg-sand border-drawn-alt">
                <img src="\${cert.image}" alt="\${cert.title}" class="w-full h-full object-cover sepia-[0.3] group-hover:sepia-0 group-hover:scale-105 transition-all duration-700" />
            </div>
            <span class="font-mono text-sm text-sage mb-2">\${cert.date}</span>
            <h3 class="font-mono text-xl font-bold mb-2 text-ink group-hover:text-terra transition-colors">\${cert.title}</h3>
            <p class="text-ink/70 mt-auto">\${cert.issuer}</p>
        </div>
      </a>
    \`;
  });
  
  container.innerHTML = html;
}
`;

js += renderCertificatesLogic;
fs.writeFileSync('src/main.js', js);
