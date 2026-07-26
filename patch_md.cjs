const fs = require('fs');
let md = fs.readFileSync('web-convert-to-data-dinamis.md', 'utf8');

const tableG = `
### G. Tabel \`certificates\`
Menyimpan sertifikasi dan penghargaan.
- \`id\` (Primary Key, BigInt)
- \`title\` (String) - Nama sertifikat (misal: "AWS Certified Solutions Architect")
- \`issuer\` (String) - Penerbit sertifikat (misal: "Amazon Web Services")
- \`date\` (String) - Tahun atau tanggal perolehan (misal: "2025")
- \`image_url\` (String) - Path atau URL gambar sertifikat
- \`link\` (String, Nullable) - Link validasi sertifikat
- \`created_at\` & \`updated_at\` (Timestamps)
`;

md = md.replace('### F. Tabel `messages` (Untuk Form Kontak)', tableG + '\n### F. Tabel `messages` (Untuk Form Kontak)');

const controllerLogic = `
    // Ambil certificates
    $certificates = Certificate::latest()->get();

    return view('portfolio.index', compact('projects', 'experiences', 'skills', 'certificates'));
`;

md = md.replace("return view('portfolio.index', compact('projects', 'experiences', 'skills'));", controllerLogic);

const jsExportLogic = `
    window.PROJECTS = @json($projects);
    window.SKILLS = @json($skills);
    window.CERTIFICATES = @json($certificates);
`;

md = md.replace("    window.PROJECTS = @json($projects);\n    window.SKILLS = @json($skills);", jsExportLogic);

fs.writeFileSync('web-convert-to-data-dinamis.md', md);
