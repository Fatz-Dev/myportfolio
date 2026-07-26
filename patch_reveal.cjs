const fs = require('fs');
let js = fs.readFileSync('src/main.js', 'utf8');

js = js.replace(`    container.innerHTML = html;
  }, 1500);
}`, `    container.innerHTML = html;
    initScrollReveal();
  }, 1500);
}`); // Will apply to both renderExperience and renderCertificates, hopefully!

fs.writeFileSync('src/main.js', js);
