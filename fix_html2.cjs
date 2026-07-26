const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regexFilters = /<div id="project-filters"[^>]*>[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?<\/div>/;

// Let's just use simple replaces on exactly the structure we have
// Or better, let's just use string replace on specific known lines using sed or awk
