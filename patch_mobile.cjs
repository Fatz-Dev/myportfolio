const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const mobileBgOrig = `<div id="mobile-menu-bg" class="absolute inset-0 bg-sand translate-y-full rounded-t-[100%] transition-all duration-700 ease-in-out"></div>`;
const mobileBgNew = `<div id="mobile-menu-bg" class="absolute inset-0 bg-sand translate-y-full rounded-t-[100%] transition-all duration-700 ease-in-out bg-[url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cpath d=\\'M54.627 0l.83.83v58.34h-58.34l-.83-.83v-58.34h58.34zm-5.074 5.074H5.074v49.852h44.479V5.074z\\' fill=\\'%232c3639\\' fill-opacity=\\'0.03\\' fill-rule=\\'evenodd\\'/%3E%3C/svg%3E')] bg-repeat"></div>`;

html = html.replace(mobileBgOrig, mobileBgNew);
fs.writeFileSync('index.html', html);
