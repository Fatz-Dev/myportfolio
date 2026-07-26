const fs = require('fs');
let md = fs.readFileSync('web-convert-to-data-dinamis.md', 'utf8');

const note = `
## Catatan Tambahan Terkait UI

**Skeleton Loading:**
Saat ini versi statis HTML (sebelum Laravel diimplementasikan) menggunakan **Skeleton Loading** (animasi *pulse*) pada bagian Experience dan Certificates menggunakan simulasi \`setTimeout\` di \`main.js\`.
Ketika Anda mengonversi ke Laravel Blade SSR, **Anda dapat menghapus HTML skeleton dan \`setTimeout\` dari \`main.js\`**, karena data dari database di-\`fetch\` di server sebelum halaman dikirim ke pengguna. Dengan SSR, *layout shift* tidak akan terjadi dan data akan langsung muncul seketika saat halaman dimuat. 

**Skill Cloud (Drag-to-Rotate):**
Fitur ini sepenuhnya ada di sisi *client-side* (JavaScript). Anda hanya perlu *inject* daftar \`SKILLS\` lewat variabel JS dan biarkan kode \`main.js\` menangani interaksi fisika \`drag-to-rotate\` tersebut, karena tidak berdampak pada struktur database.
`;

md += note;
fs.writeFileSync('web-convert-to-data-dinamis.md', md);

let tasklist = fs.readFileSync('tasklist.md', 'utf8');
const oldTask = `- [ ] 4. Remove \`data.js\` and any \`renderProjects()\`, \`renderExperience()\`, \`renderCertificates()\` logic from \`main.js\` as HTML is now generated server-side.`;
const newTask = `- [ ] 4. Remove \`data.js\` and any \`renderProjects()\`, \`renderExperience()\`, \`renderCertificates()\` logic (including the simulated ` + "`setTimeout`" + ` loading skeletons) from \`main.js\` as HTML is now generated server-side. Skeleton placeholders in \`index.html\` should also be replaced directly by the actual Blade \`@foreach\` data.
- [ ] 4.1 Ensure the 'drag-to-rotate' feature of the Skill Cloud remains fully functional by passing the dynamic skills list from Blade to the existing JS physics loop.`;

tasklist = tasklist.replace(oldTask, newTask);
fs.writeFileSync('tasklist.md', tasklist);
