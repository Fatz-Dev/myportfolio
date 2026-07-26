# Panduan Konversi Portfolio menjadi Dinamis (Laravel & Blade SSR)

Tentu sangat bisa! Jika Anda ingin menggunakan **Laravel Blade** secara langsung (Server-Side Rendering / SSR) tanpa memisahkannya menjadi REST API, itu adalah pendekatan yang sangat baik, cepat, dan SEO-friendly.

Dengan pendekatan Laravel Blade, data dari database akan langsung di-inject (disuntikkan) ke dalam file HTML saat halaman dirender di server.

## 1. Arsitektur Sistem yang Disarankan
- **Framework Backend & Frontend:** Laravel (PHP)
- **View Engine:** Blade Templating (`.blade.php`)
- **Database:** MySQL atau PostgreSQL. Rekomendasi: MySQL untuk setup yang lebih mudah di hosting konvensional.
- **Admin Panel:** Bisa menggunakan Laravel Nova, Filament PHP, atau membuat CRUD manual dengan Laravel Breeze/Jetstream.

---

## 2. Struktur Database (Migration & Tabel)

Berikut adalah struktur database lengkap dan relasinya. Ini akan di-generate menggunakan sistem Migration di Laravel.

### A. Tabel `projects`
Menyimpan data utama untuk bagian "Selected Works".
- `id` (Primary Key, BigInt, Auto Increment)
- `title` (String) - Nama project (misal: "E-Commerce System")
- `category` (String) - Kategori project (misal: "Architecture")
- `description` (Text) - Deskripsi lengkap project
- `image_url` (String) - Path atau URL gambar (bisa menggunakan `Storage` Laravel)
- `live_link` (String, Nullable) - Link untuk tombol "Live Demo"
- `github_link` (String, Nullable) - Link ke repository GitHub
- `is_published` (Boolean, Default: true) - Untuk menyembunyikan project jika belum siap
- `created_at` & `updated_at` (Timestamps)

### B. Tabel `tech_stacks`
Tabel referensi master untuk semua teknologi yang dikuasai.
- `id` (Primary Key, BigInt)
- `name` (String) - Nama teknologi (misal: "Laravel", "Vue.js")
- `icon_svg` (Text, Nullable) - Menyimpan raw kode SVG untuk icon
- `created_at` & `updated_at` (Timestamps)

### C. Tabel Pivot `project_tech_stack`
*(Sesuai konvensi Laravel, nama pivot table digabung sesuai urutan abjad singular)*
Untuk relasi Many-to-Many antara `projects` dan `tech_stacks`.
- `id` (Primary Key, BigInt)
- `project_id` (Foreign Key -> `projects.id`)
- `tech_stack_id` (Foreign Key -> `tech_stacks.id`)
- `role` (String, Nullable) - Peran tech stack dalam project (misal: "Server-side rendering")

### D. Tabel `experiences`
Menyimpan riwayat pekerjaan untuk bagian "My Journey".
- `id` (Primary Key, BigInt)
- `role` (String) - Posisi pekerjaan (misal: "Senior Backend Developer")
- `company` (String) - Nama perusahaan
- `period` (String) - Durasi kerja (misal: "2024 - Present")
- `description` (Text) - Penjelasan pekerjaan
- `order_index` (Integer, Default: 0) - Untuk mengurutkan tampilan timeline secara kustom (semakin besar semakin di atas/bawah)
- `created_at` & `updated_at` (Timestamps)

### E. Tabel `skills` (Untuk Skill Cloud)
Menyimpan list skill yang mengambang. Bisa juga mengambil data dari tabel `tech_stacks`, namun dipisah lebih baik jika ingin skill cloud memiliki list tersendiri.
- `id` (Primary Key, BigInt)
- `name` (String) - Nama skill (misal: "React", "TypeScript")
- `level` (String, Nullable) - Kategori / tingkat kemahiran (misal: "Frontend UI", "Core Language")
- `desc` (String, Nullable) - Deskripsi singkat / konteks penggunaan untuk tooltip hover (misal: "Component-driven reactive interfaces")
- `icon_svg` (Text, Nullable) - Kode SVG untuk icon skill
- `is_active` (Boolean, Default: true)
- `created_at` & `updated_at` (Timestamps)


### G. Tabel `certificates`
Menyimpan sertifikasi dan penghargaan.
- `id` (Primary Key, BigInt)
- `title` (String) - Nama sertifikat (misal: "AWS Certified Solutions Architect")
- `issuer` (String) - Penerbit sertifikat (misal: "Amazon Web Services")
- `date` (String) - Tahun atau tanggal perolehan (misal: "2025")
- `image_url` (String) - Path atau URL gambar sertifikat
- `link` (String, Nullable) - Link validasi sertifikat
- `created_at` & `updated_at` (Timestamps)

### F. Tabel `messages` (Untuk Form Kontak)
Menyimpan data dari form kontak agar tidak perlu selalu mengecek email.
- `id` (Primary Key, BigInt)
- `name` (String)
- `email` (String)
- `message` (Text)
- `is_read` (Boolean, Default: false) - Status apakah pesan sudah dibaca admin
- `created_at` & `updated_at` (Timestamps)

---

## 3. Arahan Implementasi di Laravel Blade

Berbeda dengan sistem API + Vanilla JS di mana JavaScript bertugas membangun UI (DOM Manipulation), pada Laravel Blade, HTML dibangun langsung di server.

### Langkah 1: Controller (`PortfolioController.php`)
Controller bertugas mengambil data dari database menggunakan Eloquent ORM dan mengirimkannya ke Blade view.

```php
public function index() {
    // Ambil project berserta tech stack-nya (Eager Loading untuk performa)
    $projects = Project::with('techStacks')->where('is_published', true)->latest()->get();
    
    // Ambil experience urut berdasarkan order_index
    $experiences = Experience::orderBy('order_index', 'asc')->get();
    
    // Ambil skills untuk skill cloud
    $skills = Skill::where('is_active', true)->get();

    
    // Ambil certificates
    $certificates = Certificate::latest()->get();

    return view('portfolio.index', compact('projects', 'experiences', 'skills', 'certificates'));

}
```

### Langkah 2: Merender Projects di Blade (`index.blade.php`)
Alih-alih merender menggunakan JavaScript (menghapus `data.js` dan fungsi `renderProjects()` di `main.js`), Anda akan menggunakan *foreach* loop dari Blade.

Contoh Blade untuk Project Card:
```html
<div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
    @foreach($projects as $index => $project)
        @php $isEven = $index % 2 === 0; @endphp
        <div class="project-card flex flex-col reveal {{ $isEven ? 'md:mt-12' : '' }}">
            <a href="#" data-title="{{ $project->title }}" class="project-modal-trigger group block relative mb-6">
                <!-- Gambar Project -->
                <img src="{{ asset('storage/' . $project->image_url) }}" alt="{{ $project->title }}" class="..." />
            </a>
            
            <h3 class="font-mono text-2xl font-bold mb-3 text-ink">{{ $project->title }}</h3>
            
            <div class="flex flex-wrap gap-2">
                @foreach($project->techStacks as $tech)
                    <span class="tech-tag bg-ink/5 px-3 py-1 text-sm border-drawn cursor-none relative inline-block">
                        {{ $tech->name }}
                        <!-- Tooltip mengambil dari pivot role -->
                        <span class="tech-tooltip absolute ...">{{ $tech->pivot->role ?? 'Core Tech' }}</span>
                    </span>
                @endforeach
            </div>
        </div>
    @endforeach
</div>
```

### Langkah 3: Mengirim Data ke JavaScript (Untuk Fitur Interaktif)
Fitur seperti **Modal Detail Project** dan **Skill Cloud Physics** masih membutuhkan JavaScript. Karena data kini ada di PHP, Anda bisa meng-*inject* data tersebut sebagai JSON variabel ke dalam window object di file Blade, sehingga JavaScript di `main.js` bisa membacanya.

Tambahkan di paling bawah `index.blade.php`:
```html
<script>
    // Melempar data PHP (Collection) menjadi format JSON agar bisa dibaca main.js

    window.PROJECTS = @json($projects);
    window.SKILLS = @json($skills);
    window.CERTIFICATES = @json($certificates);

</script>
<script src="{{ asset('js/main.js') }}"></script>
```

Kemudian di dalam `main.js`, Anda tinggal menghapus `import { PROJECTS } from './data.js';` dan langsung menggunakan `window.PROJECTS` untuk memanipulasi DOM saat modal dibuka.

## Kesimpulan Kelebihan Menggunakan Laravel Blade
1. **SEO Jauh Lebih Baik:** Karena file HTML (title, description, daftar project) ter-render penuh di server sebelum dikirim ke browser. Google Bot bisa langsung membacanya.
2. **Tidak Ada Loading State Awal:** Tidak seperti API yang membuat layar kosong sepersekian detik saat fetch data.
3. **Pengelolaan Asset Mudah:** Laravel Mix / Vite bawaan sangat cocok dengan TailwindCSS.
4. **Keamanan Ekstra:** Form "Let's Talk" bisa langsung divalidasi dan di-handle oleh Laravel secara backend, melindungi dari CSRF dan bot spam dengan mudah.

## Catatan Tambahan Terkait UI

**Skeleton Loading:**
Saat ini versi statis HTML (sebelum Laravel diimplementasikan) menggunakan **Skeleton Loading** (animasi *pulse*) pada bagian Experience dan Certificates menggunakan simulasi `setTimeout` di `main.js`.
Ketika Anda mengonversi ke Laravel Blade SSR, **Anda dapat menghapus HTML skeleton dan `setTimeout` dari `main.js`**, karena data dari database di-`fetch` di server sebelum halaman dikirim ke pengguna. Dengan SSR, *layout shift* tidak akan terjadi dan data akan langsung muncul seketika saat halaman dimuat. 

**Skill Cloud (Drag-to-Rotate & Tooltip Hover):**
Fitur ini sepenuhnya berada di sisi *client-side* (JavaScript). Anda hanya perlu *inject* daftar `SKILLS` (termasuk kolom `name`, `level`, `desc`, dan `icon_svg`) lewat variabel JS `window.SKILLS` di Blade, lalu biarkan `main.js` menangani simulasi fisika rotasi drag dan menampilkan detail popup saat tag di-hover.

**Mobile Menu Overlay Pattern:**
Latar belakang mobile menu menggunakan pola SVG *hand-drawn* grid yang terintegrasi secara dinamis via utility class CSS. Saat dikonversi ke Blade, elemen `#mobile-menu-bg` ini tetap dipertahankan sesuai struktur pada `index.html`.

**Hero Typing Animation & Scroll-Spy:**
Fitur animasi ketik nama peran di bagian Hero (`initTypingAnimation`) dan scroll-spy untuk active navigation link (`initActiveNav`) berjalan sepenuhnya di *client-side* JavaScript. Saat konversi ke Blade, elemen `#typing-role` dan link navigasi (`.nav-link`) tetap dipertahankan pada `index.blade.php`.

**Custom Cursor Text & Staggered Scroll Animations:**
Cursor kustom dilengkapi dengan pembaca status kontekstual (`getCursorText`) yang menampilkan teks interaktif seperti 'View', 'Drag', 'Open', 'Read', 'Click', dan 'Type'. Animasi entri pada komponen 'Experience' dan 'Certificates' menggunakan delay stagger terstruktur (`transition-delay: ${index * 150}ms`) dan kelas `.reveal` agar bertahap muncul saat di-scroll.
