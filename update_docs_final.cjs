const fs = require('fs');

// 1. Update web-convert-to-data-dinamis.md
let md = fs.readFileSync('web-convert-to-data-dinamis.md', 'utf8');

const oldSkillTable = `### E. Tabel \`skills\` (Untuk Skill Cloud)
Menyimpan list skill yang mengambang. Bisa juga mengambil data dari tabel \`tech_stacks\`, namun dipisah lebih baik jika ingin skill cloud memiliki list tersendiri.
- \`id\` (Primary Key, BigInt)
- \`name\` (String) - Nama skill
- \`icon_svg\` (Text, Nullable) - Kode SVG untuk icon skill
- \`is_active\` (Boolean, Default: true)
- \`created_at\` & \`updated_at\` (Timestamps)`;

const newSkillTable = `### E. Tabel \`skills\` (Untuk Skill Cloud)
Menyimpan list skill yang mengambang. Bisa juga mengambil data dari tabel \`tech_stacks\`, namun dipisah lebih baik jika ingin skill cloud memiliki list tersendiri.
- \`id\` (Primary Key, BigInt)
- \`name\` (String) - Nama skill (misal: "React", "TypeScript")
- \`level\` (String, Nullable) - Kategori / tingkat kemahiran (misal: "Frontend UI", "Core Language")
- \`desc\` (String, Nullable) - Deskripsi singkat / konteks penggunaan untuk tooltip hover (misal: "Component-driven reactive interfaces")
- \`icon_svg\` (Text, Nullable) - Kode SVG untuk icon skill
- \`is_active\` (Boolean, Default: true)
- \`created_at\` & \`updated_at\` (Timestamps)`;

md = md.replace(oldSkillTable, newSkillTable);

const oldNotes = `**Skill Cloud (Drag-to-Rotate):**
Fitur ini sepenuhnya ada di sisi *client-side* (JavaScript). Anda hanya perlu *inject* daftar \`SKILLS\` lewat variabel JS dan biarkan kode \`main.js\` menangani interaksi fisika \`drag-to-rotate\` tersebut, karena tidak berdampak pada struktur database.`;

const newNotes = `**Skill Cloud (Drag-to-Rotate & Tooltip Hover):**
Fitur ini sepenuhnya berada di sisi *client-side* (JavaScript). Anda hanya perlu *inject* daftar \`SKILLS\` (termasuk kolom \`name\`, \`level\`, \`desc\`, dan \`icon_svg\`) lewat variabel JS \`window.SKILLS\` di Blade, lalu biarkan \`main.js\` menangani simulasi fisika rotasi drag dan menampilkan detail popup saat tag di-hover.

**Mobile Menu Overlay Pattern:**
Latar belakang mobile menu menggunakan pola SVG *hand-drawn* grid yang terintegrasi secara dinamis via utility class CSS. Saat dikonversi ke Blade, elemen \`#mobile-menu-bg\` ini tetap dipertahankan sesuai struktur pada \`index.html\`.`;

md = md.replace(oldNotes, newNotes);
fs.writeFileSync('web-convert-to-data-dinamis.md', md);

// 2. Update tasklist.md
let tasklist = fs.readFileSync('tasklist.md', 'utf8');

const oldSkillTask = `- [ ] 4.1 Ensure the 'drag-to-rotate' feature of the Skill Cloud remains fully functional by passing the dynamic skills list from Blade to the existing JS physics loop.`;
const newSkillTask = `- [ ] 4.1 Ensure the 'drag-to-rotate' feature and hover detail tooltips of the Skill Cloud remain fully functional by passing the dynamic skills list (with level & desc) from Blade to the existing JS physics loop.
- [ ] 4.2 Retain the hand-drawn grid background pattern on the mobile menu overlay in the Blade template (\`#mobile-menu-bg\`).`;

tasklist = tasklist.replace(oldSkillTask, newSkillTask);
fs.writeFileSync('tasklist.md', tasklist);

console.log("Documentation updated successfully!");
