# PROJECT MASTER DOCUMENTATION 📚

Dokumen ini menggabungkan **Technical Walkthrough**, **Implementation Log**, dan **Task Checklist** untuk Proyek Portofolio (SRP). Tujuannya memberikan gambaran jelas tentang cara kerja sistem, mulai dari kode hingga fitur yang ada.

---

# PART 1: TECHNICAL DEEP DIVE & WALKTHROUGH 🧠

_(Sumber: walkthrough.md - Dokumen ini menjelaskan cara kerja sistem)_

## 1. Architecture & Tech Stack

Proyek ini dibangun menggunakan teknologi modern yang fokus pada performa dan kemudahan pengembangan.

### Core Framework & Runtime (Fondasi Utama)

- **Next.js 16.1.6 (App Router)**: Framework modern untuk membuat website yang cepat dan mudah ditemukan di mesin pencari (SEO).
- **React 19 RC**: Library untuk membuat tampilan website yang interaktif dan responsif.
- **TypeScript 5**: Bahasa pemrograman yang membantu mencegah error saat penulisan kode, sehingga aplikasi lebih stabil.

### CMS & Data Layer (Manajemen Konten)

- **Sanity.io v3**: Sistem manajemen konten (CMS) yang memudahkan pengeditan teks dan gambar tanpa perlu mengubah kode.
- **Content Lake**: Penyimpanan data berbasis cloud yang cepat dan aman.

### Styling & Animation System (Tampilan & Animasi)

- **Tailwind CSS v4**: Alat untuk mengatur desain dan tata letak website dengan efisien.
- **Framer Motion 12.33**: Library untuk membuat animasi yang halus pada elemen website.
- **Lucide React**: Kumpulan ikon yang ringan dan rapi.

### Performance & Infrastructure (Infrastruktur)

- **Lenis v1**: Fitur untuk membuat gerakan _scroll_ halaman terasa lebih halus.
- **Resend**: Layanan untuk memastikan email dari formulir kontak terkirim dengan baik.
- **Vercel / Railway**: (Deployment Target) Platform hosting yang menjamin website dapat diakses dengan cepat dan stabil.

## 2. Feature Implementation Details

### 2.1 Advanced Hero Section & Interactions 🎭

Bagian ini menampilkan profil utama dengan kombinasi data dinamis dan animasi interaktif.

- **Hybrid Architecture (Arsitektur Hibrida)**:
  - Menggunakan _Server Component_ (`Hero.tsx`) untuk mengambil data profil, dan _Client Component_ (`HeroClient.tsx`) untuk menjalankan animasi. Ini memastikan loading cepat dan interaksi lancar.

- **Visual Effects (Efek Visual)**:
  - **Ambient Gradient**: Dua lapisan `radial-gradient` CSS-only dengan animasi `@keyframes aurora` (transform translate + scale). Menggantikan komponen `AuroraEffect.tsx` yang berat untuk optimasi performa Lighthouse.
  - **Particle Field**: Komponen `ParticleField.tsx` merender butiran cahaya yang bergerak secara prosedural.

- **Organic Interactions (Interaksi)**:
  - **3D Parallax**: Gambar profil dan elemen dekorasi akan bergerak mengikuti posisi mouse.
  - **Magnetic Buttons**: Tombol akan sedikit bergeser mengikuti arah kursor saat didekati.

- **Entrance Sequence (Urutan Masuk)**:
  - **Typewriter Reveal**: Komponen `TypewriterText` memunculkan nama huruf demi huruf dengan delay terkontrol.
  - **Smart Image Loading**: Menggunakan `next/image` dengan _custom loader_ untuk optimasi gambar otomatis.

- **Business Impact (Dampak)**:
  - Memberikan tampilan profesional dan modern tanpa memperlambat performa website.

### 2.2 Global Scroll Reveal System 📜

Sistem ini mengatur urutan animasi saat website pertama kali dibuka, memastikan pengalaman yang teratur dan halus.

- **Orchestration Logic (Logika Pengaturan)**:
  - Menggunakan `ScrollRevealContext.tsx` sebagai pusat kontrol _state_. Konteks ini membagikan status `isRevealed` (sudah terbuka) dan `isScrolling` (sedang bergerak) ke seluruh komponen website.

- **The Landing Sequence (Urutan Mendarat)**:
  - **Initial State**: Posisi _scroll_ dipaksa ke paling bawah (halaman footer) saat website dimuat, disembunyikan di balik layar _loading_.
  - **Auto Scroll**: Setelah _preloader_ selesai, fungsi `window.scrollTo` dipanggil dengan opsi `behavior: 'smooth'` untuk menggulir otomatis ke atas.
  - **Timing**: Durasi _scroll_ diatur tepat 1.8 detik menggunakan fungsi _easing_ khusus (`easeOutQuart`) agar gerakannya berbeda dari _scroll_ biasa.

- **Animation Guards (Pengunci Animasi)**:
  - **Threshold**: Animasi utama (Hero, Navbar) baru diizinkan aktif setelah _scroll_ mencapai posisi 70% dari total tinggi halaman.
  - **Protection**: Komponen lain membungkus logikanya dengan pengecekan `if (!isRevealed) return;` untuk mencegah animasi berjalan di latar belakang sebelum waktunya.

### 2.3 High-Performance Contact System 📧

Sistem formulir kontak yang dirancang untuk keandalan pengiriman pesan dan keamanan data.

- **Frontend Logic (Logika Antarmuka)**:
  - **State Management**: Menggunakan React `useState` untuk menangani input form dan status pengiriman (`idle`, `loading`, `success`, `error`).
  - **WhatsApp Integration**: Tombol WhatsApp menghasilkan _deep link_ (`wa.me`) dengan pesan pembuka yang sudah diformat otomatis (_URL encoded_).

- **Backend Architecture (Arsitektur Backend)**:
  - **Serverless Function**: Endpoint `/api/contact` berjalan di lingkungan serverless Next.js, memastikan kode backend tidak terekspos ke browser.
  - **Data Persistence**: Pesan masuk disimpan permanen ke CMS Sanity menggunakan `client.create()`, lengkap dengan penanda waktu (timestamp) WIB.

- **Email Delivery (Pengiriman Email)**:
  - **Resend SDK**: Menggunakan layanan `Resend` untuk mengirim notifikasi email format HTML. Ini menjamin pesan tidak masuk folder spam.
  - **Security**: Alamat email penerima diambil secara dinamis dari database Sanity di sisi server, sehingga tidak pernah terlihat di _source code_ halaman depan.

### 2.4 Custom Studio Tool (CMS Extension) 🎛️

Alat tambahan yang ditanamkan langsung ke dalam dashboard Sanity Studio untuk manajemen data.

- **Component Architecture**:
  - Menggunakan **Sanity UI** (`@sanity/ui`) agar tampilan alat menyatu dengan desain bawaan Studio.
  - Mengakses data menggunakan _hook_ `useClient` dengan versi API `2024-01-01`.

- **Operational Logic (Logika Operasi)**:
  - **Batch Deletion**: Fitur untuk menghapus semua data pesan (misalnya data testing) sekaligus.
  - **Transaction API**: Penghapusan dilakukan menggunakan `client.transaction()` yang membungkus semua perintah _delete_ dalam satu proses. Jika satu gagal, semua dibatalkan (aman).

- **Safety Mechanisms (Mekanisme Pengaman)**:
  - **Confirmation Dialog**: Menggunakan `confirm()` native browser sebelum eksekusi.
  - **Visual Feedback**: Menampilkan _Toast Notification_ (sukses/gagal) dan status _loading_ pada tombol saat proses berjalan.

### 2.5 Mobile-First Responsiveness Strategy 📱

Pendekatan desain yang memprioritaskan pengalaman pengguna di perangkat seluler (HP) sebelum layar besar (Desktop).

- **Grid Architecture (Arsitektur Grid)**:
  - **Fluid Layout**: Menggunakan sistem _grid_ responsif standar Tailwind (`grid-cols-1` -> `md:grid-cols-2` -> `lg:grid-cols-3`). Konten menumpuk vertikal di HP dan menyebar horizontal di layar lebar.
  - **Breakpoint Logic**: Titik perubahan tampilan diatur pada `md` (768px) untuk tablet dan `lg` (1024px) untuk laptop, memastikan transisi yang mulus.

- **Touch & Ergonomics (Ergonomi Sentuh)**:
  - **Hit Area**: Semua elemen interaktif (tombol, link) memiliki area tekan minimal 44x44 pixel sesuai standar aksesibilitas mobile.
  - **Safe Zones**: Margin kiri-kanan (`px-4` atau `px-6`) memastikan konten tidak terpotong di layar HP yang memiliki _notch_ atau sudut melengkung.

- **Adaptive Typography (Tipografi Adaptif)**:
  - Menggunakan skala font dinamis (`text-3xl md:text-5xl`) agar judul terbaca jelas di HP tanpa memakan seluruh layar, namun tetap megah di Desktop.

**Verification Proof (iPhone 12 Viewport):**

```carousel
![Mobile Hero Section](file:///C:/Users/Syifa%20Raditya%20P/.gemini/antigravity/brain/bf12630b-b479-45ab-a216-02f523233a97/mobile_hero_section_1770473178425.png)
<!-- slide -->
![Mobile Tech Stack](file:///C:/Users/Syifa%20Raditya%20P/.gemini/antigravity/brain/bf12630b-b479-45ab-a216-02f523233a97/mobile_bento_grid_1770473180978.png)
<!-- slide -->
![Mobile Contact Form](file:///C:/Users/Syifa%20Raditya%20P/.gemini/antigravity/brain/bf12630b-b479-45ab-a216-02f523233a97/mobile_contact_form_1770473169093.png)
```

### 2.6 Performance Optimization ⚡

Strategi teknis untuk menjaga performa website tetap tinggi meski banyak animasi.

- **Inertia Scroll (Scroll Inersia)**:
  - Menggunakan library **Lenis** untuk mengambil alih _scroll_ default browser.
  - Dikonfigurasi dengan `duration: 1.2` dan kurva eksponensial untuk memberikan sensasi _scroll_ yang berbobot namun responsif.

- **Code Splitting (Pemecahan Kode)**:
  - **Dynamic Imports**: Komponen berat seperti `ParticleField.tsx` diimpor secara dinamis (`next/dynamic`) dengan opsi `ssr: false`. Artinya, komponen ini hanya dimuat di browser pengguna, mengurangi beban server.
  - **Tree Shaking**: Memastikan hanya kode yang terpakai dari library (seperti `lucide-react`) yang ikut terkirim ke pengguna.

- **Resource Loading (Pemuatan Aset)**:
  - **Font Optimization**: Menggunakan `next/font` untuk _self-hosting_ file font, menghilangkan pergeseran tata letak (_layout shift_) saat loading.

- **Loading Architecture (Arsitektur Loading)**:
  - **Preloader Logic**: Menampilkan logo brand `icon.svg` selama 1.5 detik (luxury intro). Menggunakan `framer-motion` dengan mode `wait` untuk transisi keluar yang mulus.
  - **Exit Physics**: Efek "tirai naik" (_curtain reveal_) menggunakan kurva `[0.76, 0, 0.24, 1]` selama 0.6 detik.
  - **Skeleton UI**: Komponen `Skeleton.tsx` menggunakan animasi _shimmer_ (`bg-zinc-800/80`) untuk memberikan persepsi _loading_ instan saat navigasi halaman.
  - **Branded Loading**: Sinkronisasi logo `icon.svg` pada `loading.tsx` global dan portfolio untuk konsistensi identitas brand.

### 2.7 Organic Interaction Design (Experience Section) 🧬

Transformasi dari tampilan kartu statis menjadi daftar riwayat interaktif (Accordion).

- **Accordion Logic (Logika Akordeon)**:
  - **State Isolation**: Menggunakan state lokal `expandedId` untuk memastikan hanya satu item yang terbuka (_exclusive accordion_).
  - **Preserve Layout**: Tinggi kontainer dianimasikan dari `0` ke `auto` menggunakan framer-motion untuk mencegah lonjakan layout (_layout shift_) yang kasar.

- **Motion Physics (Fisika Gerak)**:
  - **Custom Bezier**: Transisi buka-tutup menggunakan kurva `[0.22, 1, 0.36, 1]` dengan durasi 0.5 detik, memberikan rasa "berat" namun responsif.
  - **Staggered Content**: Teks deskripsi muncul sedikit terlambat (`delay: 0.1s`) setelah kartu terbuka penuh, menciptakan efek _cascade_ yang elegan.

- **Visual Cues (Penanda Visual)**:
  - **Active State**: Saat dibuka, indikator timeline berdenyut (_pulse animation_) dan border berubah menjadi biru.
  - **Focus Mode**: Garis pemisah antar item disembunyikan (`border-transparent`) pada item aktif untuk memfokuskan perhatian pembaca.

### 2.8 Section-Level Animation Completeness 🎞️

Penerapan animasi pada section yang sebelumnya masih statis, memastikan konsistensi visual di seluruh halaman.

- **About Section (Scroll-Reveal Architecture)**:
  - **Hybrid Split**: Server Component (`About.tsx`) tetap menangani _data fetching_. Seluruh logika animasi dipindahkan ke Client Component baru (`AboutClient.tsx`).
  - **Staggered Bio**: Setiap paragraf dari Sanity Portable Text dibungkus `motion.p` individual dengan `staggerChildren: 0.12`, menciptakan efek _cascade_ saat elemen masuk viewport.
  - **Animated Decorative Elements**: Dots gradien bawah section diberi _pulse animation_ dan heading memiliki entrance `fade-up` via `whileInView`.
  - **Custom Easing**: Menggunakan kurva Bézier `[0.22, 1, 0.36, 1]` konsisten dengan section lain (Experience, Hero).

- **404 Not Found (Client Component Conversion)**:
  - Dikonversi dari Server ke Client Component untuk mengaktifkan `framer-motion`.
  - **Staggered Entrance**: Error code → heading → deskripsi → tombol muncul berurutan (`staggerChildren: 0.12, delayChildren: 0.2`).
  - **Watermark Breathing**: Angka "404" di latar belakang memiliki animasi _scale_ (1 → 1.02) dan _opacity_ (0.03 → 0.06) yang berulang.

- **Error Page (Entrance Enhancement)**:
  - **Icon Scale-In**: Ikon `Construction` muncul dengan animasi `scale: 0.5 → 1` dan `rotate: -15 → 0` menggunakan kurva kustom.
  - **Content Stagger**: Heading, deskripsi, dan tombol-tombol muncul berurutan (`staggerChildren: 0.1`).
  - **Spring Hover**: Tombol memiliki efek `whileHover` dengan fisika `spring` (`stiffness: 400, damping: 15`).

- **SkillCard (Individual Animation)**:
  - **Per-Card Entrance**: Setiap kartu memiliki `whileInView` sendiri dengan delay berbasis `index * 0.04`, memberikan efek _wave_ saat grid muncul.
  - **Hover Physics**: Menggunakan `spring` transition untuk efek angkat (`scale: 1.08, y: -4`) dengan bayangan _glow_ biru.
  - **Icon Wiggle**: Ikon skill berputar halus (`rotate: 8°`) saat kartu di-hover.

- **TypeScript Compatibility**:
  - Semua array `ease` dideklarasikan sebagai `const customEase: [number, number, number, number]` dan di-cast sebagai `Transition` untuk kompatibilitas dengan tipe `Variants` dari framer-motion.
  - Perbaikan bonus: `Contact.tsx` — `whileInView={false}` diubah ke `undefined` untuk menyelesaikan error TypeScript pre-existing.

### 2.9 Tech Stack Marquee & Bento Grid System 🧩

Sistem tampilan skill yang menggabungkan _infinite scroll marquee_ untuk tampilan semua skill dan _bento grid_ untuk tampilan per kategori.

- **Marquee Architecture (Arsitektur Marquee)**:
  - **Infinite Scroll**: Menggunakan `framer-motion` dengan animasi `x: "0%" → "-50%"` yang berulang sempurna (_seamless loop_).
  - **8x Duplication**: Item diduplikasi 8 kali untuk memastikan konten selalu lebih lebar dari 2x viewport, mencegah celah kosong.
  - **Alternating Direction**: Baris ganjil bergerak ke kiri, baris genap ke kanan, menciptakan dinamika visual yang menarik.
  - **Margin Technique**: Menggunakan `margin-right` sebagai pengganti `flex gap` untuk menjamin _pixel-perfect_ looping pada posisi `-50%`.

- **Bento Grid Architecture**:
  - **Dynamic Layout**: Grid berubah berdasarkan kategori aktif dengan jumlah kolom yang dinamis (`grid-cols-2 sm:grid-cols-3 lg:grid-cols-4`).
  - **Featured Card**: Item pertama mendapat `col-span-2 row-span-2` untuk visual dominan.
  - **Category Colors**: Setiap kategori memiliki skema warna unik (biru, hijau, oranye, ungu) yang diterapkan melalui `CATEGORY_COLORS` map.
  - **Floating Animation**: Setiap kartu memiliki durasi _float_ acak berbasis `Math.random()` untuk efek organik.

- **Business Impact**:
  - Memberikan presentasi skill yang dinamis dan profesional, meningkatkan _engagement_ pengunjung pada bagian teknikal portofolio.

### 2.10 Smart Logo Resolution System 🎯

Sistem resolusi logo otomatis untuk skill/teknologi yang meniru logika preview Sanity Studio, memastikan konsistensi visual antara CMS dan _frontend_.

- **Fallback Chain (Rantai Fallback)**:
  - **Stage 1 — Custom Upload**: Logo yang di-upload manual di Sanity Studio (`iconUrl`) selalu diprioritaskan.
  - **Stage 2 — SimpleIcons CDN**: Mengambil SVG dari `cdn.simpleicons.org/{slug}` berdasarkan nama skill yang dinormalisasi.
  - **Stage 3 — Google Favicon API**: Jika SimpleIcons mengembalikan 404 (misalnya VS Code), sistem otomatis mencoba `google.com/s2/favicons?domain={hostname}` dari `websiteUrl` skill tersebut.
  - **Stage 4 — Letter Fallback**: Huruf pertama nama skill ditampilkan sebagai _fallback_ terakhir.

- **State Machine Architecture**:
  - React `useState` mengelola tiga state: `'primary'` → `'favicon'` → `'letter'`.
  - Handler `onError` pada `<Image>` mentransisikan ke state berikutnya setiap kali gambar gagal dimuat.
  - Prop `websiteUrl` di-_thread_ melalui tiga komponen: `SkillsClient` → `SkillCard` → `BrandIcon`.

- **Slug Normalization** (`utils.ts`):
  - Map `SLUG_OVERRIDES` menangani kasus khusus: `'next.js'` → `'nextdotjs'`, `'c++'` → `'cplusplus'`, dll.
  - Normalisasi default: `name.toLowerCase().trim().replace(/[.\s]+/g, "")`.

### 2.11 Responsive Layout Strategy (Mobile & Tablet) 📐

Penyesuaian layout khusus untuk memastikan pengalaman optimal di setiap ukuran layar.

- **Mobile Optimizations**:
  - **Scroll Indicator**: Posisi dan ukuran disesuaikan per breakpoint untuk mencegah overlap dengan tombol CTA.
  - **Project Tags**: Pemusatan otomatis dengan `justify-center` dan _wrapping_ untuk tag yang panjang.

- **Tablet Optimizations**:
  - **Hero Bio Centering**: Menggunakan `flex flex-col items-center lg:items-start` untuk memastikan konten terpusat di tablet namun rata kiri di desktop.
  - **Breakpoint-Specific Spacing**: Scroll indicator menggunakan `md:bottom-2` khusus untuk tablet, terpisah dari breakpoint mobile dan desktop.

## 3. Technical Architecture & Deployment 🏗️

### 3.1 Technical SEO & Metadata 🔍

Strategi optimasi mesin pencari dan struktur teknis untuk visibilitas maksimal.

- **Dynamic Metadata 🏷️**:
  - **Implementation**: Menggunakan API `generateMetadata()` di `layout.tsx` dan `page.tsx` untuk menyuntikkan _meta tags_ (Title, Description, OpenGraph) secara otomatis berdasarkan konten halaman.
  - **Base URL**: Dikonfigurasi dengan `metadataBase: new URL("https://radityaportofolio.is-a.dev")` untuk memastikan semua link aset sosial media valid saat dibagikan.
  - **Dynamic Social Proof**: Sistem metadata Open Graph sekarang secara dinamis mengambil **foto Hero Section** dari Sanity sebagai gambar preview saat link dibagikan.
  - **Locale & Verification**: Sinkronisasi locale ke `id_ID` dan penambahan `google-site-verification` untuk integritas Search Console.

- **Automated Sitemap (Sitemap Otomatis) 🗺️**:
  - **Function**: File `sitemap.ts` secara dinamis mengambil seluruh _slug_ proyek dari Sanity CMS dan membuat file XML yang valid untuk Google Search Console.
  - **Updates**: Sitemap akan otomatis diperbarui setiap kali ada proyek baru yang dipublikasikan di CMS.

- **Crawl Control (Kontrol Robot) 🤖**:
  - **Robots.txt**: Mengizinkan pengindeksan penuh (`Allow: /`) untuk halaman publik, namun memblokir jalur `/studio/` agar halaman admin CMS tidak muncul di hasil pencarian.

- **Core Web Vitals Strategy ⚡**:
  - **Font Optimization**: Menggunakan `next/font/google` (Geist Sans/Mono) dengan strategi _variable font_ untuk performa loading nolkli kedip (_zero layout shift_).
  - **Scroll Restoration**: Komponen khusus `ScrollToTop` menangani masalah _state_ posisi scroll pada navigasi klien Next.js (SPA).

- **Business Impact (Dampak Bisnis) 📈**:
  - **Automated SEO & UX**: Automasi metadata dan sitemap memastikan setiap halaman proyek baru langsung terindeks mesin pencari tanpa intervensi manual, meningkatkan jangkauan organik.
  - **Visual Stability**: Eliminasi pergeseran tata letak (_CLS_) melalui optimasi font dan gambar meningkatkan skor _Core Web Vitals_, faktor kunci dalam peringkat Google dan retensi pengunjung.

- **3.2 Sanity CMS Data Architecture 📦**:
  - **Profile Schema (Singleton Concept)**:
    - **Availability Toggle**: Field boolean `isAvailable` mengontrol status "Open for Work" di halaman depan secara _real-time_ tanpa deploy ulang.
    - **Global Context**: Menyimpan data biografi, tautan sosial media, dan CV yang disuntikkan ke seluruh aplikasi via `layout.tsx`.

  - **Project Schema (Case Study)**:
    - **Rich Text**: Menggunakan `array` of `block` (Portable Text) untuk menulis studi kasus yang fleksibel, mendukung penyisipan gambar di antara paragraf.
    - **Tech Stack Reference**: Field `techStack` menggunakan tipe `reference` ke dokumen `skills`, memungkinkan relasi data yang terstruktur.

  - **Experience Schema (Timeline Logic)**:
    - **Date Validation**: Field `endDate` memiliki logika kondisional (`hidden`) jika `isCurrentJob` bernilai _true_, mencegah input data yang tidak valid.
    - **Ordering**: Data di-fetch dengan _groq sorting_ `order(startDate desc)` untuk memastikan pengalaman terbaru selalu di atas.

- **3.3 Deployment Pipeline (CI/CD) 🚀**:
  - **Vercel Integration (Frontend)**:
    - **Zero Config**: Terhubung langsung dengan repositori GitHub. Setiap _push_ ke branch `main` memicu _build_ otomatis.
    - **Environment Variables**: Kunci rahasia API (seperti `NEXT_PUBLIC_SANITY_PROJECT_ID`) disimpan aman di dashboard Vercel, tidak di-_hardcode_.

  - **Sanity Hook (Content Updates)**:
    - **On-Demand Revalidation**: Webhook dikonfigurasi agar saat konten di CMS di-_publish_, Vercel otomatis membersihkan _cache_ halaman terkait (ISR - Incremental Static Regeneration) tanpa perlu _rebuild_ penuh.

  - **Security Headers**:
    - **Implementation**: Menggunakan `next.config.ts` untuk mengatur header keamanan HTTP seperti `X-Frame-Options` dan `Content-Security-Policy` guna mencegah serangan XSS/Clickjacking.

  - **Production Build (Optimasi Gambar & Aset)**:
    - **Image Optimization**: Mengaktifkan format generasi baru (`AVIF`, `WebP`) dengan kualitas adaptif. Mengonfigurasi `remotePatterns` untuk mengizinkan aset eksternal dari Sanity CDN (`cdn.sanity.io`) dan Google.
    - **PostCSS Pipeline**: Menggunakan `@tailwindcss/postcss` untuk _compile_ CSS Tailwind v4 yang sangat ringan saat _build time_.

## 4. Localization Strategy (Bahasa Indonesia) 🇮🇩

Pendekatan bahasa "Accessible Executive" untuk audiens profesional Indonesia.

- **Tone & Voice**:
  - **Profesional tapi Santai**: Menghindari bahasa baku kaku (seperti "Perangkat Lunak" -> "Software") namun tetap sopan untuk konteks bisnis.
  - **Mixed Language**: Mempertahankan istilah teknis industri dalam Bahasa Inggris (_Tech Stack_, _Deployment_, _Zero Config_) untuk akurasi, dibalut penjelasan konteks Bahasa Indonesia.

- **Implementation**:
  - **UI Strings**: Menu navigasi, tombol, dan instruksi antarmuka menggunakan Bahasa Inggris universal (_Contact Me_, _View Project_).
  - **Content (CMS)**: Isi studi kasus dan biografi ditulis dalam Bahasa Inggris profesional untuk portofolio global.
  - **Documentation**: Dokumentasi teknis ini menggunakan Bahasa Indonesia campur (_code-switching_) agar mudah dipahami oleh _developer_ lokal maupun manajer proyek.

---

# PART 2: MASTER DETAILED IMPLEMENTATION LOG 🛠️

_(Source: implementation_plan.md)_

## 🏗️ Phase 1: Infrastructure & Core Setup

- [x] **Initialization**: Next.js 15, TypeScript, Tailwind CSS v4.
- [x] **Sanity CMS**:
  - Installed `next-sanity`, `sanity-plugin-vision`.
  - Configured `sanity.config.ts` and CORS access.
  - **Fix**: Allowed Sanity image hostname in `next.config.ts`.
- [x] **UI Foundation**:
  - Setup `lucide-react` icons and `framer-motion` animations.
  - Verified strict TypeScript mode in `tsconfig.json`.

## 🎨 Phase 2: Core Components & Data

- [x] **Hero Section**:
  - Created dynamic `Hero.tsx` fetching Profile data.
  - **Fix**: Resolved syntax errors in import placement.
  - **Fix**: Fixed Profile Image rendering issues.
- [x] **Bento Grid System**:
  - Implemented `BentoGrid` and `ProjectCard`.
  - Added `category` field to Project schema.
  - **Fix**: Resolved empty image src error in Tech Stack.
- [x] **Footer**:
  - Initial "Agency Layout" -> Refactored to "Minimalist".
  - **Fix**: Removed unused imports.
  - **Feat**: Added dynamic Social Links (LinkedIn, GitHub).

## ⚡ Phase 3: Advanced UX & Interactivity

- [x] **Smooth Scrolling**: Implemented `lenis` and custom `scrollTo` utility.
  - **Impact**: Improved perceived smoothness and reduced navigation bounce.
- [x] **Cinematic Preloader**: Added `Preloader.tsx` with entry animations.
  - **Impact**: Masks initial data fetching latency for a polished first impression.
- [x] **Page Transitions**: Created `template.tsx` for route transitions.
- [x] **Custom Cursor**: Implemented `CustomCursor.tsx` (Liquid Point effect).
- [x] **Visual Effects**: Added `NoiseOverlay.tsx` to `layout.tsx`.

## 📧 Phase 4: High-Performance Contact System

- [x] **Backend**: Created `/api/contact` enabling Resend SMTP.
- [x] **Security**: Dynamic recipient fetching from Sanity Profile.
- [x] **Frontend Redesign**:
  - Split layout (Socials vs Form).
  - Added **WhatsApp** integration (Swapped from Instagram).
  - **Studio Tool**: Built "Cleaner" tool for bulk message deletion.
  - **UX**: Email intent dropdown (Gmail/Default/Copy).

## 🛠️ Phase 5: Advanced Optimization & Fixes

- [x] **Lighthouse / Performance**:
  - **LCP**: Prioritized Hero image loading.
  - **Fonts**: Configured `Geist` with `swap` strategy.
  - **Fix**: Resolved Font Preload warnings.
- [x] **Accessibility (A11y)**:
  - **Navbar**: Added `aria-label` and toggle states.
  - **Contrast**: Adjusted `zinc-500` to `zinc-400` for better readability.
  - **Footer**: Verified social link labels.

## 📡 Phase 6: SEO & Metadata

- [x] **Integration**: Implemented `generateMetadata` in `page.tsx`.
- [x] **Social Sharing**: Configured OpenGraph & Twitter Cards.
- [x] **Indexing**: Created `robots.ts` and `sitemap.ts`.

## 📱 Phase 7: Final Polish & Audit

- [x] **Mobile Responsiveness**: Validated Layouts (Hero, Grid, Form) on iPhone 12.
- [x] **Refactoring**:
  - Isolated `/studio` route from main layout.
  - Cleaned up console logs (`console.warn` suppression for WebSocket).
  - Final code cleanup (imports, types).

## Phase 8: Premium UI Refinement (2026 Update)

- [x] **Loading Overhaul**:
  - Upgraded `Preloader.tsx` to branded premium version.
  - Implemented branded `loading.tsx` and Skeleton loaders.
- [x] **Mobile UX Fixes**: Fixed Navbar backdrop closing interaction.
- [x] **Navigation Fixes**: Implemented `ScrollToTop.tsx` for project routes.
- [x] **Experience Redesign**:
  - Swapped cards for **Organic Accordion Timeline**.
  - Engineered breathing pulse animations with custom easing.

## Phase 9: Hero Cinematic Overhaul & Scroll Reveal 🎬

- [x] **Hero Dynamics**:
  - Implemented `AuroraEffect` ( северное сияние) based on morphing mesh gradients.
  - Added `ParticleField` with dynamic star and shooting star logic.
  - Integrated 3D parallax tilt physics for profile image and decorative rings.
  - Added `TypewriterText` with blur-in entrance for the name.
- [x] **Scroll Reveal Architecture**:
  - Created `ScrollRevealContext` to globally track init state.
  - Page starts at footer, performs smooth scroll to top (1.8s, `easeOutQuart`).
  - Synced Hero and Navbar animations to trigger at 70% scroll progress.
  - Implemented `isRevealed` guards on all sections to prevent premature animations.

## Phase 10: Section-Level Animation Completeness 🎞️

- [x] **About Section**:
  - Created `AboutClient.tsx` — Client Component dengan scroll-reveal, stagger paragraf, animated decorative dots.
  - Refactored `About.tsx` menjadi data-fetching only (delegasi ke `AboutClient`).
- [x] **404 Not Found Page**:
  - Converted ke Client Component + `framer-motion`.
  - Added staggered entrance (error code → heading → desc → button).
  - Added watermark "404" breathing animation (scale + opacity pulse).
- [x] **Error Page**:
  - Added `Construction` icon scale-in + rotation entrance.
  - Staggered content reveal + spring hover pada tombol.
- [x] **SkillCard Component**:
  - Individual `whileInView` entrance per card dengan delay berbasis `index`.
  - Spring hover (scale + lift) + icon wiggle + glow shadow.
  - Updated `SkillsClient.tsx` untuk pass `index` prop.
- [x] **TypeScript Fixes**:
  - Fixed `ease` array tuple typing (`customEase` + `as Transition`) di semua file.
  - Fixed pre-existing `Contact.tsx` error (`whileInView={false}` → `undefined`).

## Status: 100% COMPLETE ✅

---

# PART 3: DETAILED HISTORICAL TASK CHECKLIST 📋

_(Source: Preserved Project History)_

## 🏗️ Core Infrastructure & CMS Setup

- [x] Initialize Next.js project with TypeScript, Tailwind CSS, and strict mode
- [x] Verify project structure (components, styles, hooks folders)
- [x] Verify strict TypeScript mode in tsconfig.json
- [ ] Phase 1: Infrastructure & CMS Setup
  - [x] Install dependencies (`next-sanity`, `framer-motion`, etc.)
  - [x] Setup Sanity configuration (`sanity.config.ts`, client, env)
  - [x] Create Sanity Schemas (`project.ts`, `profile.ts`)
  - [x] Create Navbar (Floating glass effect)
  - [x] Create Hero Component (Dynamic data support)
  - [x] Create ProjectCard & BentoGrid (Glassmorphism, Grid)
- [ ] Phase 3: Data Integration
  - [x] Implement Home Page with GROQ fetching
- [ ] Phase 4: Data & Polish
  - [x] Verify Build and UI
  - [x] Verify Build and UI
  - [x] Improve Hero Buttons (Resume & Contact)
  - [x] Implement Dynamic Footer
  - [x] Improve Contact UX (Gmail intent & Footer visibility)
  - [x] Create Smart Contact Button

## 🔧 Micro-Fixes & Refinements

- [x] Allow Sanity image hostname in next.config.ts
- [x] Add category field to project schema
- [x] Fix Hero.tsx syntax errors (import placement)
- [x] Refactor Footer to fetch email dynamically
- [x] Redesign Footer (Agency Layout)
- [x] Remove unused imports in Footer.tsx
- [x] Add Social Links (LinkedIn, GitHub) to Footer
- [x] Implement Dynamic Name in Hero Section
- [x] Implement Skills and Tech Stack Section
  - [x] Sanity Schema & Clearbit Integration
  - [x] Auto-fetch Logos (Google & SimpleIcons)
  - [x] Responsive Grid & Hover Effects
  - [x] Performance Optimization (Sizes Prop)

## 💼 Work Experience

- [x] Create Experience Schema (`experience.ts`)
- [x] Register Schema in `index.ts`
- [x] Create Experience Component (`Experience.tsx`)
- [x] Integrate into Homepage (`page.tsx`)
- [x] Fix Case Study content images (Portable Text)

## 📂 Project Detail Pages

- [x] Update Project Schema with `content` and `techStack`
- [x] Implement Dynamic Route `src/app/projects/[slug]/page.tsx`
- [x] Update `ProjectCard.tsx` with links
- [x] Verify UI and portable text rendering

## ✨ Global UI Polish

- [x] Implement Mobile Menu in `Navbar.tsx`
- [x] Refine `Footer.tsx` (Removed God-Tier, added animations & highlights)
- [x] Rename "Skills" to "Tech" in Navbar
- [x] Fix Skills/Tech anchor link brokenness
- [x] Isolate `/studio` from Navbar/Footer (Route Groups)

## 🛠️ Technical Polish

- [x] Optimize Images (Sizes Prop)
- [x] Enable Sanity CDN
- [x] Font Optimization (Display Swap & Tailwind v4)
- [x] Clean Console Logs

## 📡 Phase 8: SEO & Metadata Optimization

- [x] Update Global Metadata in `layout.tsx`
- [x] Configure OpenGraph & Twitter Cards
- [x] Create `robots.ts` for search indexing
- [x] Configure `metadataBase` for social sharing

## ⚡ Phase 9: Lighthouse & Accessibility Optimization

- [x] Fix Navbar Accessibility (aria-label, aria-expanded & tap targets)
- [x] Fix Global Text Contrast (`zinc-500` -> `zinc-400`)
- [x] Optimize Hero Image (LCP Priority & Sizes)
- [x] Fix Footer Social Accessibility (aria-labels)

## � Phase 10: Final Performance & Design Polish

- [x] Redesign Footer for minimalism
- [x] Tighten Footer spacing & visibility (White email, py-12)
- [x] Configure Next.js Image Qualities ([75, 85, 90])
- [x] Verify Global contrast compliance (`text-zinc-500` -> `text-zinc-400`)
- [x] Finalize Navbar Accessibility Labels (Toggle & Close)
- [x] Enhance Mobile Tech Icons (Full color + Subtle pulse)
- [x] Fix Font Preload Warning (Explicit body binding)
- [x] Optimize project LCP (Priority loading for first project)

## 🌊 Phase 11-16: Advanced UX & Interaction

- [x] Phase 11: Advanced UX & Smooth Scroll
  - [x] Implement `smoothScrollTo` utility (utils.ts)
  - [x] Integrate custom slow scroll in `Navbar.tsx` (1200ms)
  - [x] Create `Skeleton` component (src/components/ui/Skeleton.tsx)
  - [x] Implement Cinematic `loading.tsx`
  - [x] Implement `error.tsx` global boundary
  - [x] Create custom `not-found.tsx`
- [x] Phase 12: Premium Preloader
  - [x] Create `Preloader.tsx` component
  - [x] Integrate into `layout.tsx`
  - [x] Cleanup artificial fetch delays
- [x] Phase 13: System Error & 404 Pages
  - [x] Update `not-found.tsx` (Digital Void)
  - [x] Update `error.tsx` (System Failure)
- [x] Phase 14: Interactive UX Elements
  - [x] Install dependencies (lenis)
  - [x] Create `SmoothScroll.tsx` (Physics Engine)
  - [x] Create `CustomCursor.tsx` (Liquid Point)
  - [x] Create `template.tsx` (Page Transitions)
  - [x] Add `noise-overlay` to `globals.css`
  - [x] Assemble in `layout.tsx`
- [x] Phase 15: High-Performance Contact System
  - [x] Install dependencies (resend)
  - [x] Create `contact/route.ts` API
  - [x] Create `Contact.tsx` component
  - [x] Integrate into `page.tsx`
  - [x] Update `.env.local` requirements
- [x] Phase 16: Studio Route Exclusion
  - [x] Update `SmoothScroll.tsx`
  - [x] Update `CustomCursor.tsx`
  - [x] Create `NoiseOverlay.tsx`
  - [x] Update `template.tsx`
  - [x] Update `layout.tsx` assembly

## 🔄 Phase 18-20: Modern Refactors & Integration

- [x] Phase 18: WhatsApp Integration & Instagram Removal
  - [x] Update `profile.ts` schema (swap IG for WA)
  - [x] Update `page.tsx` data fetching
  - [x] Update `Contact.tsx` component
  - [x] Update `FooterClient.tsx` component
- [x] Phase 19: Modern Executive Redesign (Contact)
  - [x] Refactor `Contact.tsx` visuals & copy
  - [x] Clean up redundant animations
  - [x] Final UI Polish
- [x] Phase 20: Advanced Contact & Footer Refactor
  - [x] Update `page.tsx` data fetching (GitHub/LinkedIn)
  - [x] Overhaul `Contact.tsx` (Split Layout & Socials)
- [x] Create minimal `Footer.tsx` (Copyright only)
- [x] Implement Footer Redesign (SRP Brand, Back to Top, Built With)
- [x] Footer UI Polish (Typography, animations, micro-interactions)
- [x] Contact section email dropdown implementation
- [x] Contact form input styling polish
- [x] Verify `Navbar.tsx` smooth scroll

### Debugging & Features

- [x] Implement Bulk Delete for Contact Messages (Studio Tool)
- [x] Fix Profile Image rendering in Hero.tsx
- [x] Fix empty image src error in Tech Stack display

## 🎬 Phase 21: Hero Section Premium Animations & Scroll Reveal

- [x] **Scroll Reveal System**:
  - Created `ScrollRevealContext.tsx` for timing coordination
  - Page loads at footer, scrolls to top after Preloader (1.8s, easeOutQuart)
  - `isRevealed` triggers at 70% scroll progress for seamless transition
  - Integrated provider in `layout.tsx`
- [x] **Hero Premium Effects**:
  - `AuroraEffect.tsx` - Morphing northern lights background
  - `ParticleField.tsx` - Floating stars + shooting stars (40 particles)
  - `TypewriterText.tsx` - Letter-by-letter name reveal with blur
  - Enhanced entrance animations (scale, blur-in, stagger)
- [x] **Animation Timing Sync**:
  - `HeroClient.tsx` uses `isRevealed` for entrance animations
  - `Navbar.tsx` synced with scroll reveal timing
  - `Contact.tsx`, `Footer.tsx`, `ExperienceAccordion.tsx` - Added `isRevealed` guards
  - Prevents whileInView triggering during scroll-to-top reveal
- [x] **Components Created**:
  - `src/context/ScrollRevealContext.tsx` - Context + Provider + Hook
  - `src/components/AuroraEffect.tsx` - Northern lights effect
  - `src/components/ParticleField.tsx` - Dynamic star field
  - `src/components/TypewriterText.tsx` - Typewriter animation

## 🎞️ Phase 22: Section-Level Animation Completeness

- [x] About Section — `AboutClient.tsx` (scroll-reveal, stagger bio, animated dots)
- [x] About Server Component — Refactored `About.tsx` (data-fetching only)
- [x] 404 Not Found — Converted to Client Component + framer-motion entrance
- [x] 404 Watermark — Breathing animation (scale + opacity pulse)
- [x] Error Page — Icon scale-in, staggered content, spring hover buttons
- [x] SkillCard — Per-card `whileInView` entrance, spring hover, icon wiggle
- [x] SkillsClient — Pass `index` prop to SkillCard
- [x] TypeScript Fixes — `ease` tuple typing, `Contact.tsx` `whileInView` fix
- [x] Build Verification — `tsc --noEmit` exit code 0

## Phase 11: Dynamic Branding & Professional SEO (Feb 2026) 🚀

- [x] **SVG Branding**:
  - Migrasi dari PNG/ICO ke `icon.svg` untuk favicon yang tajam di semua resolusi tinggi.
  - Pembersihan aset lama (`icon.png`, `favicon.ico`) untuk menjaga kebersihan arsitektur folder `public`.
- [x] **Social Strategy**:
  - Implementasi logic gambar dinamis pada `generateMetadata`.
  - Preview sharing (WA/Telegram/FB) sekarang otomatis menampilkan foto asli dari Hero Section (Sanity).
- [x] **Domain Connectivity**:
  - Migrasi domain utama ke `radityaportofolio.is-a.dev`.
  - Konfigurasi DNS CNAME ke Vercel via PR di repository `is-a-dev/register`.

## Verification Status

- [x] Desktop Visual Audit
- [x] Core Functionality (Contact/CMS)
- [x] Final Mobile Responsive Sync
- [x] Section Animation Build Verification (`tsc --noEmit` — 0 errors)

## 🎨 Phase 23: Custom Cursor Enhancement & Interaction Polish

- [x] **Custom Cursor Refinement**:
  - Menambahkan efek warna dan _glow_ pada kursor kustom menggunakan CSS `box-shadow` dan `background` gradien.
  - Implementasi animasi _fluid ghost_ cursor dengan transisi halus saat berpindah elemen.
  - Pengujian interaksi kursor pada area kosong, tombol, dan elemen interaktif.

- [x] **Navbar & Footer Micro-Interactions**:
  - _Staggered entrance_ untuk link navigasi di Navbar.
  - Animasi _hover_ interaktif untuk link Navbar dan logo.
  - _Floating label_ animasi untuk input form di halaman kontak.
  - Efek "plane" animasi pada tombol submit kontak.
  - Hover interaktif untuk _social links_ di Footer.
  - _Entrance animation_ untuk teks copyright di Footer.

## ⚡ Phase 24: Tech Stack Section Overhaul (Marquee & Bento Grid)

- [x] **Marquee "All" View**:
  - Implementasi _infinite scroll_ marquee menggunakan `framer-motion` dengan 8x duplikasi item untuk memastikan kontinuitas visual.
  - Baris ganjil scroll ke kiri, baris genap scroll ke kanan, menciptakan efek _ticker_ dinamis.
  - Penggunaan `margin-right` (bukan `gap`) untuk looping `-50%` yang presisi.
  - **Fix**: Perbaikan _row hover_ menggunakan teknik CSS `pointer-events` untuk interaksi item individual.
  - **Fix**: Perbaikan _grid pulse_ animation timing untuk konsistensi visual.

- [x] **Bento Grid Category View**:
  - Sistem _dynamic grid_ yang berubah layout berdasarkan kategori yang dipilih (`frontend`, `backend`, `database`, `tools`).
  - _Featured card_ (item pertama) mendapat ukuran 2x lebih besar di desktop.
  - Gradient _border glow_ unik per kategori saat hover (biru untuk frontend, hijau untuk backend, oranye untuk database, ungu untuk tools).
  - _Floating animation_ (`translateY`) dengan durasi bervariasi per kartu untuk efek organik.

- [x] **SkillCard Component Rework** (`SkillCard.tsx`):
  - Dua varian: `circle` (untuk marquee) dan `square` (untuk bento grid).
  - Efek spring hover (`scale: 1.2, rotate: 8°`) pada varian circle.
  - Gradient border + glow shadow per kategori pada varian square.
  - Icon _wiggle_ animation (`rotate: [-8, 8, -4, 0]`) saat hover.

- [x] **Sanity Skills Schema** (`skills.tsx`):
  - Penambahan field `websiteUrl` dan custom icon pada schema.
  - `prepare()` function untuk preview dengan favicon fallback di Studio.
  - **Fix**: Penanganan error `URL()` parsing untuk skill tanpa website yang valid.

## 🛠️ Phase 25: Responsive Layout Fixes & Logo Fallback System

- [x] **Mobile Layout Fixes** (`HeroClient.tsx`, `ProjectCard.tsx`):
  - Scroll indicator: Posisi disesuaikan per breakpoint (`bottom-2` mobile, `bottom-4` sm, `bottom-2` tablet, `bottom-4` desktop).
  - Ukuran teks scroll dikecilkan (`text-[10px] sm:text-xs`) untuk mencegah _overlap_ dengan tombol CTA.
  - _Project category tags_: Diubah ke `flex flex-wrap justify-center lg:justify-start` untuk pemusatan otomatis di mobile.

- [x] **Tablet Layout Fixes** (`HeroClient.tsx`):
  - Bio section di-center menggunakan `flex flex-col items-center lg:items-start`.
  - Scroll indicator posisi khusus tablet via `md:bottom-2`.

- [x] **SimpleIcons Slug Mapping** (`utils.ts`):
  - Implementasi `SLUG_OVERRIDES` map untuk menangani perbedaan nama skill dan slug SimpleIcons.
  - Contoh mapping: `'next.js'` → `'nextdotjs'`, `'node.js'` → `'nodedotjs'`, `'c++'` → `'cplusplus'`.
  - Normalisasi otomatis: `name.toLowerCase().trim().replace(/[.\s]+/g, "")`.

- [x] **Two-Stage Logo Fallback System** (`BrandIcon.tsx`):
  - **Masalah**: Logo seperti VS Code tidak tersedia di SimpleIcons, menghasilkan ikon huruf pertama saja ("V").
  - **Solusi**: Sistem fallback tiga tahap yang sama dengan logika di Sanity Studio:
    1. **Stage 1** — Icon kustom (`iconUrl` dari upload Sanity) → prioritas tertinggi.
    2. **Stage 2** — SimpleIcons CDN (`cdn.simpleicons.org/{slug}`) → otomatis dari nama skill.
    3. **Stage 3** — Google Favicon API (`google.com/s2/favicons?domain={hostname}`) → fallback jika SimpleIcons 404.
    4. **Stage 4** — Huruf pertama nama skill → fallback terakhir.
  - Menggunakan React `useState` dengan state machine (`'primary'` → `'favicon'` → `'letter'`).
  - Prop `websiteUrl` di-_thread_ dari `SkillsClient.tsx` → `SkillCard.tsx` → `BrandIcon.tsx`.
  - **Dampak**: Semua skill yang memiliki `websiteUrl` di Sanity kini otomatis menampilkan logo yang benar, tanpa perlu upload manual.

- [x] **File yang Dimodifikasi**:
  - `src/components/BrandIcon.tsx` — Fallback chain + `websiteUrl` prop.
  - `src/components/SkillCard.tsx` — Pass-through `websiteUrl`.
  - `src/components/SkillsClient.tsx` — Pass `skill.websiteUrl` ke `SkillCard`.
  - `src/lib/utils.ts` — `SLUG_OVERRIDES` map + `getLogoUrl()` normalisasi.
  - `src/components/HeroClient.tsx` — Responsive scroll indicator + tablet centering.
  - `src/components/ProjectCard.tsx` — Category tags centering.

## 🚀 Phase 26: Performance Optimization — Aurora Replacement

- [x] **Penghapusan `AuroraEffect.tsx`**:
  - Komponen lama menggunakan 4 layer `motion.div` dari Framer Motion dengan `blur(40-50px)` filter yang berjalan terus-menerus (_infinite loop_).
  - Menyumbang ~3-5 detik main-thread work dan rendering cost tinggi karena continuous repaint + GPU blur compositing.

- [x] **Pengganti: CSS-Only Ambient Gradient** (`HeroClient.tsx`):
  - Dua `div` dengan `radial-gradient` (biru/cyan dan ungu) yang di-animasikan via `@keyframes aurora` di `globals.css`.
  - Animasi hanya menggunakan `transform: translate() scale()` — properti yang di-handle langsung oleh GPU tanpa memicu _layout_ atau _paint_.
  - **Biaya JS: 0ms** (murni CSS, tidak ada Framer Motion yang dieksekusi).

- [x] **Estimasi Impact Performa**:
  - Style & Layout: ~8.9s → ~5-6s (-30%)
  - Rendering: ~5.5s → ~3-4s (-30%)
  - Total main-thread: ~42s → ~33-36s
  - Lighthouse Score (Vercel): ~65-75 → **~75-85**

- [x] **File yang Dimodifikasi**:
  - `src/components/HeroClient.tsx` — Hapus dynamic import `AuroraEffect`, ganti dengan inline CSS gradient.
  - `src/app/globals.css` — Tambah `@keyframes aurora` (translate + scale, GPU-composited).

## 🏆 Phase 27: Dynamic Social SEO & Premium Branding (Feb 2026)

- [x] **Dynamic Metadata**: Integrasi foto Hero Section dari Sanity ke dalam Open Graph image.
- [x] **Icon Modernization**: Implementasi `icon.svg` sebagai sumber tunggal untuk favicon dan brand assets.
- [x] **Domain Setup**: Pendaftaran dan penghubungan domain `radityaportofolio.is-a.dev` ke infrastruktur Vercel.
- [x] **Metadata Cleanup**: Penghapusan keyword "Magang" dan sinkronisasi total antara `layout.tsx` dan `page.tsx`.

## Status: 100% COMPLETE ✅ (Updated: 23 Februari 2026 - Phase 12 Finishes)
