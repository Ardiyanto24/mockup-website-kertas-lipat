AI INSTRUCTION GUIDE: Next.js App Router + Atomic Design Architecture (v3)

Instruksi ini adalah aturan mutlak (source of truth) untuk menyusun struktur repositori, penamaan berkas, dan pembagian komponen pada proyek Next.js (App Router). AI harus mematuhi panduan ini secara ketat tanpa pengecualian.

> **Changelog v2**: Menambahkan aturan wajib "1 Route = 1 Template", subfolder page-scoped di dalam `organisms/` dan `molecules/`, aturan promosi komponen ke `shared/`, dan pola client/server split (islands) agar `page.tsx` tidak menggelembung dan folder `components/` tidak jadi flat saat proyek membesar.
>
> **Changelog v3**: Menambahkan aturan penamaan untuk dynamic route (`[slug]`), aturan lokasi CSS Modules (ikut komponen, bukan ikut route), mengganti aturan "molecules default shared" jadi kebijakan default tunggal + wajib search-before-create, dan namespace `public/` vs `admin/` di dalam `shared/` untuk hindari collision nama.
>
> **Changelog v4**: Menggeneralisasi seluruh guide agar reusable lintas project — mengganti nama file/folder konkret (`HomeTemplate`, `about/`, `blog/`) dengan placeholder (`{route-name}`, `{RouteName}`) di setiap aturan wajib. Nama konkret hanya muncul di subbagian "Contoh Ilustratif" yang ditandai eksplisit sebagai contoh, bukan preskripsi nama halaman.
>
> **Changelog v5**: Menambahkan §9 Version Control & Dokumentasi — inisialisasi repo Git/GitHub di awal project, aturan wajib commit terpisah di setiap level file (Atom/Molecule/Organism/Template/orkestrasi), format Conventional Commits, aturan kapan push, dan kewajiban update `ARCHITECTURE.md` per route baru.
>
> **Changelog v6**: Memisahkan Deployment jadi §10 tersendiri (Vercel via CLI). Memperjelas gating eksplisit: `git init`/commit lokal/`.gitignore` boleh otomatis, tapi pembuatan repo GitHub baru, push pertama ke remote baru, `vercel link`, dan setiap `vercel`/`vercel --prod` WAJIB menunggu instruksi eksplisit user — tidak boleh dianggap sudah diizinkan hanya karena commit/push rutin sudah berjalan.
>
> **Changelog v7**: Menambahkan §3.E — aturan eksplisit wajib setiap file `.tsx` (Atom/Molecule/Organism/Template) punya file `.module.css` pasangan dengan nama identik, tanpa pengecualian implisit. Tabel granularitas commit (§9.B) dan checklist final (§11) diperbarui agar konsisten menagih pasangan `.tsx`/`.module.css` di semua level, bukan cuma Organism.
>
> **Changelog v8**: Memperbaiki §3.E dan §1 — setiap komponen (Atom/Molecule/Organism/Template) sekarang WAJIB punya foldernya sendiri (nama folder = nama komponen) berisi `.tsx` + `.module.css`-nya, bukan sekadar file sejajar di folder level-atas. Semua contoh path/import di seluruh guide (§1, §3, §4, §8, §11) disesuaikan ke pola folder-per-komponen ini.

---

## 1. Arsitektur Folder Utama

### Pola Generik (wajib, berlaku untuk project apa pun)

```
src/
├── app/                            # ROUTING LAYER (Hanya untuk Routing & Data Fetching)
│   ├── (route-group-1)/            # mis. (public), (marketing), (shop) — sesuai kebutuhan project
│   │   ├── layout.tsx
│   │   ├── page.tsx                # HANYA memanggil <RootTemplate /> (nama sesuai halaman ini)
│   │   ├── {route-name}/
│   │   │   └── page.tsx            # HANYA memanggil <{RouteName}Template />
│   │   └── {route-name}/[slug]/
│   │       └── page.tsx            # HANYA memanggil <{RouteName}DetailTemplate />
│   └── (route-group-2)/            # mis. (admin), (dashboard)
│       └── ...
├── components/                     # UI COMPONENT LAYER (Atomic Design)
│   ├── atoms/                      # Global, generik, tidak spesifik ke satu halaman
│   │   └── {ComponentName}/         # SATU FOLDER per komponen (wajib, lihat §3.E)
│   │       ├── {ComponentName}.tsx
│   │       └── {ComponentName}.module.css
│   ├── molecules/
│   │   ├── shared/                  # DEFAULT untuk semua molecule baru (lihat §3.B)
│   │   │   └── {ComponentName}/
│   │   │       ├── {ComponentName}.tsx
│   │   │       └── {ComponentName}.module.css
│   │   └── {route-name}/            # HANYA jika ada alasan eksplisit tidak bisa digeneralisasi
│   │       └── {ComponentName}/
│   │           ├── {ComponentName}.tsx
│   │           └── {ComponentName}.module.css
│   ├── organisms/
│   │   ├── shared/
│   │   │   ├── {route-group-1}/     # komponen lintas-halaman DI DALAM satu route group
│   │   │   │   └── {ComponentName}/
│   │   │   │       ├── {ComponentName}.tsx
│   │   │   │       └── {ComponentName}.module.css
│   │   │   └── {route-group-2}/
│   │   └── {route-name}/            # satu subfolder per route/halaman — nama HARUS sama persis
│   │       │                         # dengan nama folder route-nya di src/app/
│   │       └── {RouteName}{SectionName}/   # lalu satu subfolder LAGI per komponen di dalamnya
│   │           ├── {RouteName}{SectionName}.tsx
│   │           └── {RouteName}{SectionName}.module.css
│   └── templates/
│       └── {RouteName}Template/     # Template juga dapat folder sendiri
│           ├── {RouteName}Template.tsx
│           └── {RouteName}Template.module.css
├── hooks/
├── lib/
├── types/
└── utils/
```

**Aturan penamaan (wajib):** `{route-name}` di `components/` HARUS identik dengan nama folder route yang bersangkutan di `src/app/` (lowercase, sama persis). `{RouteName}` untuk Template pakai PascalCase dari nama route yang sama. Jumlah dan nama subfolder `organisms/{route-name}/`, folder Template mengikuti jumlah dan nama route project yang sedang dikerjakan — TIDAK ditentukan di guide ini, karena beda project beda halaman.

**Prinsip folder `components/organisms/` dan `molecules/`:** nama subfolder route-nya (level pertama) HARUS mengikuti nama route/halaman di `src/app/`. Di dalam subfolder route itu, SETIAP komponen individual mendapat subfolder-nya sendiri lagi (nama sama dengan nama komponennya) — bukan file `.tsx` yang langsung sejajar di folder route. Ini bukan sekadar konvensi kosmetik — ini yang membuat AI (atau manusia) bisa langsung menebak lokasi kode dari nama halaman maupun nama komponennya, tanpa harus scroll folder flat berisi puluhan file.

**Aturan CSS Modules:** file `*.module.css` SELALU berada satu folder dengan file `.tsx` pasangannya (lihat pola folder-per-komponen di atas), tidak pernah diletakkan terpisah atau digabung untuk banyak komponen sekaligus. CSS Module TIDAK BOLEH diletakkan di `src/app/**` mana pun. Kalau AI menemukan `*.module.css` tersisa di dalam `src/app/`, itu adalah sisa struktur lama yang harus dipindahkan ke folder komponen yang sesuai, bukan dipertahankan. Aturan lengkap wajib 1:1 antara file `.tsx` dan `.module.css`, termasuk kewajiban folder-per-komponen, ada di §3.E.

### Contoh Ilustratif (khusus untuk memperjelas pola di atas — SESUAIKAN dengan halaman project Anda sendiri, jangan disalin mentah-mentah)

Kalau sebuah project company profile punya route `(public)/about/` dan `(admin)/articles/[id]/`:

```
src/app/(public)/about/page.tsx          → memanggil <AboutTemplate />
src/app/(admin)/articles/[id]/page.tsx   → memanggil <ArticleEditTemplate />

components/organisms/about/AboutHeroSection/AboutHeroSection.tsx
components/organisms/about/AboutHeroSection/AboutHeroSection.module.css
components/organisms/articles/ArticleEditForm/ArticleEditForm.tsx
components/organisms/articles/ArticleEditForm/ArticleEditForm.module.css
components/templates/AboutTemplate/AboutTemplate.tsx
components/templates/AboutTemplate/AboutTemplate.module.css
components/templates/ArticleEditTemplate/ArticleEditTemplate.tsx
components/templates/ArticleEditTemplate/ArticleEditTemplate.module.css
```

Kalau project lain punya route `(shop)/products/[slug]/`, polanya tetap sama: `components/organisms/products/{ComponentName}/{ComponentName}.tsx`, `components/templates/ProductsDetailTemplate/ProductsDetailTemplate.tsx` — bukan `about/` atau `blog/` seperti contoh di atas.

---

## 2. Aturan Next.js Route Groups (public) vs (admin)

(tidak berubah dari versi sebelumnya)

Folder `src/app/(public)/`: URL publik, layout mengurus navigasi publik.
Folder `src/app/(admin)/`: URL dashboard/CMS, layout memuat Sidebar Admin & Route Guard.

---

## 3. Implementasi Atomic Design di Next.js

### A. Atoms — Komponen Tunggal Terkecil
Tidak boleh mengimpor komponen lain dari `components/`. Sangat reusable, hanya menerima data lewat props. Tidak perlu subfolder per halaman (kalau sebuah atom terasa spesifik ke satu halaman, itu tanda dia sebenarnya molecule atau organism, bukan atom) — TAPI setiap atom tetap WAJIB punya folder sendiri berisi `.tsx` + `.module.css`-nya (lihat pola di §3.E), bukan file lepas langsung di `atoms/`.
Contoh: `atoms/Button/Button.tsx`, `atoms/Badge/Badge.tsx`, `atoms/Avatar/Avatar.tsx`, `atoms/Typography/Typography.tsx`.

### B. Molecules — Gabungan Atoms
**Kebijakan default (wajib, tanpa perlu menimbang-nimbang):** SEMUA molecule baru dibuat langsung di `molecules/shared/`. AI tidak boleh menebak-nebak apakah sebuah molecule "akan reusable atau tidak" — itu keputusan yang tidak bisa diambil AI secara andal di awal. `molecules/{route-name}/` HANYA dipakai kalau molecule itu punya business logic yang secara eksplisit terikat ke satu halaman (bukan sekadar dugaan) — misalnya sebuah komponen input group yang isinya rumus/logic khusus satu fitur tertentu.
Contoh generik yang selalu masuk `molecules/shared/{ComponentName}/`: `FormField`, `SearchBar`, `ProductCard`.

### C. Organisms — Section Halaman & CMS Complex UI

**Aturan wajib:** setiap "section" pada sebuah halaman = 1 komponen Organism, dengan foldernya sendiri di dalam `organisms/{route-name}/{RouteName}{SectionName}/` (nama route sama persis dengan folder route-nya), kecuali dipakai di ≥2 halaman (lihat aturan promosi di §7).

**Pola generik:**
```
components/organisms/{route-name}/
├── {RouteName}HeroSection/
│   ├── {RouteName}HeroSection.tsx
│   └── {RouteName}HeroSection.module.css
├── {RouteName}FeatureSection/
│   ├── {RouteName}FeatureSection.tsx
│   └── {RouteName}FeatureSection.module.css
└── ... (satu folder per section pada halaman tersebut)
```

**Contoh ilustratif** (untuk route `src/app/(public)/about/page.tsx` — sesuaikan nama section dengan halaman project Anda):
```
components/organisms/about/
├── AboutHeroSection/
│   ├── AboutHeroSection.tsx
│   └── AboutHeroSection.module.css
├── TeamSection/
│   ├── TeamSection.tsx
│   └── TeamSection.module.css
└── MilestoneSection/
    ├── MilestoneSection.tsx
    └── MilestoneSection.module.css
```

Komponen yang dipakai lintas halaman (misal navigasi utama, footer, atau section yang muncul di lebih dari satu route) masuk ke `organisms/shared/{route-group}/{ComponentName}/`.

### D. Templates — Tata Letak Halaman

**Aturan wajib: 1 Route = 1 Template.** Setiap `page.tsx` yang merender UI (bukan cuma redirect/API) WAJIB punya persis satu Template pasangannya di `components/templates/{RouteName}Template/{RouteName}Template.tsx`, apa pun nama dan jumlah halamannya.

Template bertugas: menyusun urutan Organism dari folder `organisms/{route-name}/` + `organisms/shared/{route-group}/` yang relevan, dan meneruskan data (props) yang sudah diambil di `page.tsx` (RSC) ke masing-masing Organism. Template TIDAK fetch data sendiri.

**Contoh ilustratif** (untuk route `about`, sesuaikan nama komponen dengan section riil di project Anda):
```tsx
// components/templates/AboutTemplate/AboutTemplate.tsx
import { Navbar } from '@/components/organisms/shared/public/Navbar/Navbar';
import { Footer } from '@/components/organisms/shared/public/Footer/Footer';
import { AboutHeroSection } from '@/components/organisms/about/AboutHeroSection/AboutHeroSection';
import { TeamSection } from '@/components/organisms/about/TeamSection/TeamSection';
import { MilestoneSection } from '@/components/organisms/about/MilestoneSection/MilestoneSection';

export function AboutTemplate({ team, milestones }: AboutTemplateProps) {
  return (
    <>
      <Navbar />
      <AboutHeroSection />
      <TeamSection team={team} />
      <MilestoneSection milestones={milestones} />
      <Footer />
    </>
  );
}
```

### E. Aturan Wajib: Setiap Komponen Punya Folder Sendiri + CSS Module Pasangan

**Wajib, tanpa pengecualian implisit — dua lapis aturan sekaligus:**

1. **Folder-per-komponen**: setiap komponen (Atom, Molecule, Organism, atau Template) mendapat SATU FOLDER sendiri, nama folder identik dengan nama komponennya (PascalCase). Dilarang menaruh file `.tsx` langsung sejajar di folder level atas (`atoms/`, `molecules/shared/`, dst.) tanpa folder pembungkus.
2. **Pasangan `.tsx` + `.module.css`**: di dalam folder komponen tersebut, WAJIB ada file `.module.css` dengan nama identik dengan file `.tsx`-nya (beda ekstensi saja). Berlaku untuk KEEMPAT level Atomic Design, bukan cuma Organism.

Pola penamaan (wajib, tidak boleh disingkat/digabung/diratakan):
```
components/atoms/Button/Button.tsx
components/atoms/Button/Button.module.css

components/molecules/shared/FormField/FormField.tsx
components/molecules/shared/FormField/FormField.module.css

components/organisms/{route-name}/{RouteName}HeroSection/{RouteName}HeroSection.tsx
components/organisms/{route-name}/{RouteName}HeroSection/{RouteName}HeroSection.module.css

components/templates/{RouteName}Template/{RouteName}Template.tsx
components/templates/{RouteName}Template/{RouteName}Template.module.css
```

Cara pakai di dalam komponen (import relatif, karena satu folder):
```tsx
// components/atoms/Button/Button.tsx
import styles from './Button.module.css';

export function Button({ children }: ButtonProps) {
  return <button className={styles.button}>{children}</button>;
}
```

Import dari luar folder komponen tetap lewat path alias, menunjuk ke file `.tsx` di dalam folder komponennya:
```tsx
// BENAR
import { Button } from '@/components/atoms/Button/Button';

// SALAH (folder tanpa nama file di akhir path, atau file .tsx diratakan tanpa folder)
import { Button } from '@/components/atoms/Button';
```

Aturan tambahan:
- Kalau sebuah komponen benar-benar tidak butuh styling sendiri (murni wrapper/logic tanpa markup bervisual — mis. komponen ikon yang cuma merender elemen SVG dari library, sangat jarang di luar itu), boleh TANPA `.module.css`, TAPI folder-per-komponennya tetap wajib ada (`atoms/Icon/Icon.tsx` sendirian di dalam folder `Icon/`). Pengecualian ini hanya untuk aturan #2 (pasangan CSS), bukan untuk aturan #1 (folder sendiri) — folder tetap wajib di semua kasus.
- Dilarang menaruh styling gabungan lintas komponen dalam satu `.module.css` besar (mis. satu `organisms.module.css` untuk banyak Organism). Setiap komponen = satu file CSS Module miliknya sendiri di dalam foldernya sendiri.
- File global (`globals.css`, variabel warna, reset CSS) tetap boleh ada satu di `src/app/globals.css`, tapi itu di luar cakupan aturan ini — aturan ini khusus untuk folder dan styling milik komponen individual.

---

## 4. Aturan Penamaan untuk Dynamic Route (`[slug]`, `[id]`)

Route dinamis TIDAK mendapat folder organism baru terpisah. Mereka tetap masuk ke folder organism induknya, dibedakan lewat **prefix nama file**, dan Template-nya dibedakan lewat **suffix `Detail`**.

**Pola generik:**

| Route | Folder Organism | Nama Template |
|---|---|---|
| `{route-name}/page.tsx` | `organisms/{route-name}/{RouteName}{Section}/{RouteName}{Section}.tsx` | `templates/{RouteName}Template/{RouteName}Template.tsx` |
| `{route-name}/[slug]/page.tsx` | `organisms/{route-name}/{RouteName}Detail{Section}/...` (folder komponen diberi prefix `{RouteName}Detail...`) | `templates/{RouteName}DetailTemplate/{RouteName}DetailTemplate.tsx` |

**Contoh ilustratif** (sesuaikan nama route dengan project Anda):

| Route | Folder Organism | Nama Template |
|---|---|---|
| `blog/page.tsx` | `organisms/blog/BlogListSection/BlogListSection.tsx` | `templates/BlogTemplate/BlogTemplate.tsx` |
| `blog/[slug]/page.tsx` | `organisms/blog/BlogDetailHeader/BlogDetailHeader.tsx` | `templates/BlogDetailTemplate/BlogDetailTemplate.tsx` |
| `(admin)/articles/[id]/page.tsx` | `organisms/articles/ArticleEditForm/ArticleEditForm.tsx` | `templates/ArticleEditTemplate/ArticleEditTemplate.tsx` |

Alasan tidak dipisah folder: konten list dan detail dari domain yang sama biasanya saling berbagi tipe data dan sering saling mereferensikan (kartu di list, link ke detail) — memisah folder cuma menambah lompatan navigasi tanpa manfaat nyata. Yang wajib dipisah adalah **nama file dan nama Template**, bukan foldernya.

---

## 5. Search-Before-Create (Wajib Sebelum Membuat Komponen Baru)

Sebelum AI membuat file Organism atau Molecule baru, AI WAJIB terlebih dahulu:

1. Cek isi `components/organisms/shared/{route-group}/` dan `components/molecules/shared/` — apakah sudah ada komponen dengan fungsi serupa?
2. Kalau sudah ada tapi butuh sedikit variasi → tambahkan props opsional ke komponen yang ada, JANGAN duplikasi dengan nama baru (`HeroSectionV2`, `HeroSection2`, dst. dilarang).
3. Kalau benar-benar belum ada dan memang spesifik ke satu halaman → baru buat di `organisms/{route-name}/` atau `molecules/{route-name}/` (untuk molecule, lihat kebijakan default di §3.B — ini pengecualian yang harus punya alasan jelas).

---

## 6. Alur Kerja Pembuatan Halaman Baru (SOP untuk AI)

```
[Langkah 1: Identifikasi Route]      ➔ Tentukan route group (mis. public/admin), tentukan nama route
[Langkah 2: Siapkan Folder Organism] ➔ Buat components/organisms/{route-name}/ jika belum ada
[Langkah 3: Pecah Komponen]          ➔ Pecah UI jadi Atoms (shared), Molecules (default shared), Organisms ({route-name})
[Langkah 4: Implementasi Bottom-Up]  ➔ Atoms ➔ Molecules ➔ Organisms
[Langkah 5: Buat Template]           ➔ components/templates/{RouteName}Template/{RouteName}Template.tsx — WAJIB, tidak boleh dilewati
[Langkah 6: Orchestrasi]             ➔ src/app/(route-group)/{route-name}/page.tsx HANYA fetch data + memanggil Template
```

**Larangan eksplisit:** `page.tsx` tidak boleh berisi JSX section langsung (mis. `<section>...banyak markup...</section>`). Kalau ditemukan, itu bug arsitektur — pindahkan ke Organism yang sesuai lalu panggil lewat Template.

**Setiap langkah di atas WAJIB diakhiri dengan commit terpisah** sebelum lanjut ke langkah berikutnya. Lihat aturan lengkap format commit di §9.B — jangan menumpuk beberapa langkah jadi satu commit besar di akhir.

---

## 7. Kapan Komponen "Naik Level" ke `shared/`

Gunakan aturan ini agar AI tidak ragu-ragu menaruh file di mana:

- Dipakai di **1 halaman saja** → tetap di `organisms/{route-name}/` (atau `molecules/{route-name}/`).
- Dipakai di **≥2 halaman**, dan strukturnya identik → **pindahkan** ke `organisms/shared/{route-group}/` (atau `molecules/shared/`), lalu update semua import.
- Dipakai di **≥2 halaman**, tapi variasinya signifikan (beda layout/logic, bukan cuma beda props) → JANGAN dipaksa jadi satu shared component. Biarkan masing-masing halaman punya versinya sendiri, atau pecah bagian yang sama persis ke Molecule/Atom shared, sisanya tetap page-scoped.

---

## 8. Standar Penulisan Kode (Coding Standard)

### A. Server Components Secara Default + Pola Client Islands

Semua file di `src/app` adalah RSC secara default. Fetching data dilakukan di `page.tsx` menggunakan `async/await`.

**Hindari** membuat seluruh halaman jadi client component lewat file terpisah seperti `{RouteName}PageClient.tsx`. Kalau hanya sebagian kecil UI yang butuh interaktivitas (`useState`, animasi, dsb.), taruh `'use client'` **sedekat mungkin ke leaf component** — biasanya di level Molecule atau Organism kecil yang memang butuh, bukan di seluruh page. Ini disebut pola "client islands": mayoritas halaman tetap RSC (cepat, SEO-friendly), hanya pulau kecil yang jadi client component.

Kalau memang seluruh Template butuh jadi client component (jarang, tapi kadang perlu, mis. halaman dengan form multi-step interaktif penuh), boleh — tapi filenya tetap `components/templates/{RouteName}Template/{RouteName}Template.tsx` dengan `'use client'` di baris atas, BUKAN file terpisah `*PageClient.tsx` di dalam `src/app/`.

### B. Pola Penulisan Impor (Clean Imports)

Gunakan Path Aliases, mengarah ke file `.tsx` di dalam folder komponennya sendiri (§3.E):
```
// BENAR
import { Button } from '@/components/atoms/Button/Button';
import { HeroSection } from '@/components/organisms/{route-name}/HeroSection/HeroSection';
import { Navbar } from '@/components/organisms/shared/{route-group}/Navbar/Navbar';

// SALAH
import { Button } from '../../components/atoms/Button/Button';
import { Button } from '@/components/atoms/Button';        // hilang nama file, cuma nama folder
```

### C. Pemisahan State dan Logika Bisnis

Jangan menaruh logika bisnis rumit (query database langsung) di Atoms/Molecules. Data diambil di `page.tsx` (RSC), diteruskan sebagai props ke Template, lalu ke Organism.

---

## 9. Version Control & Dokumentasi (Git & GitHub)

### A. Inisialisasi Repository

**Yang boleh dilakukan otomatis (tanpa menunggu instruksi tambahan):**
- `git init` di root project kalau `.git/` belum ada.
- Membuat/melengkapi `.gitignore` sebelum commit pertama — WAJIB exclude minimal: `node_modules/`, `.next/`, `.env`, `.env*.local`, `*.log`, `.DS_Store`, `.vercel`. Jangan pernah commit file `.env` atau kredensial apa pun.
- Commit lokal per level file sesuai §9.B (ini bagian dari alur kerja normal, tidak perlu izin ulang tiap commit).

**WAJIB MENUNGGU INSTRUKSI EKSPLISIT dari user (jangan dilakukan proaktif):**
- Membuat repository baru di GitHub (`gh repo create ...`). Meskipun `gh` CLI sudah terpasang dan sudah login, AI tidak boleh membuat repo remote hanya karena project sudah punya beberapa commit lokal — tunggu sampai user secara eksplisit bilang "buatkan repo di GitHub" atau semacamnya.
- Menghubungkan repo lokal ke remote (`git remote add origin ...`) sebelum repo remote itu benar-benar diminta dibuat.
- Push pertama kali ke remote yang baru dibuat.

Kalau instruksi eksplisit sudah diberikan, gunakan `gh repo create {nama-repo} --private --source=. --remote=origin --push` (default visibility **private** kecuali user minta public secara eksplisit).

Commit lokal pertama (`chore: initial project setup` — scaffold awal, `.gitignore`, struktur folder kosong sesuai §1) boleh dibuat otomatis sebelum ada komponen apa pun ditulis, karena ini masih commit lokal, bukan tindakan yang menyentuh GitHub/remote.

### B. Granularitas Commit — Wajib Commit di Setiap Level File

**Aturan wajib:** setiap unit file yang dibuat/diedit sesuai hierarki Atomic Design (§3) mendapat commit-nya sendiri. Dilarang menumpuk beberapa Atom/Molecule/Organism berbeda dalam satu commit besar "feat: halaman about selesai".

Urutan commit mengikuti urutan SOP di §6:

| Level | Kapan commit | Contoh scope commit |
|---|---|---|
| Atom baru/edit | Setelah 1 Atom selesai (`.tsx` + `.module.css` pasangannya, lihat §3.E) | `feat(atoms): add Button component` |
| Molecule baru/edit | Setelah 1 Molecule selesai (`.tsx` + `.module.css` pasangannya) | `feat(molecules): add FormField component` |
| Organism baru/edit | Setelah 1 Organism selesai (`.tsx` + `.module.css` pasangannya, karena satu unit) | `feat(organisms/{route-name}): add {RouteName}HeroSection` |
| Template | Setelah Template selesai (`.tsx` + `.module.css` pasangannya) | `feat(templates): add {RouteName}Template` |
| Orkestrasi page.tsx | Setelah page.tsx diwire ke Template | `feat(app/{route-name}): wire {RouteName}Template into page` |
| Refactor/promosi ke shared | Setelah pemindahan selesai (lihat §7) | `refactor(shared): promote {ComponentName} to shared` |
| Dokumentasi | Setelah update README/CHANGELOG | `docs: update architecture notes for {route-name}` |

Kalau satu Organism butuh beberapa Molecule/Atom baru sekaligus, tetap commit **satu per satu file bottom-up** (Atom dulu, baru Molecule, baru Organism) — bukan digabung karena "masih dalam satu fitur".

### C. Format Pesan Commit (Conventional Commits)

Format wajib: `type(scope): deskripsi singkat`

Daftar `type` yang dipakai:
- `feat` — penambahan komponen/fitur baru
- `fix` — perbaikan bug
- `refactor` — pemindahan/reorganisasi file tanpa mengubah perilaku (mis. promosi ke shared)
- `style` — perubahan CSS/styling tanpa mengubah logic
- `docs` — perubahan dokumentasi (README, komentar arsitektur, guide ini sendiri)
- `chore` — setup project, config, dependency, `.gitignore`, dll.

`scope` mengikuti path folder yang diubah, contoh: `atoms`, `molecules`, `organisms/{route-name}`, `templates`, `app/{route-name}`.

### D. Kapan Push ke Remote

Commit dilakukan di setiap level file (§9.B), tapi **push tidak harus di setiap commit** — push setelah satu halaman/route selesai penuh (dari Atom sampai orkestrasi page.tsx), supaya history di remote tetap logis per fitur. Ini berlaku untuk remote yang **sudah ada dan sudah eksplisit disetujui user** (lihat §9.A) — bukan izin untuk membuat remote baru. Kalau user secara eksplisit minta push per commit, ikuti instruksi user tersebut.

### E. Dokumentasi Pendamping

Setiap kali membuat route/halaman baru, update satu file `ARCHITECTURE.md` di root project (buat jika belum ada) berisi tabel pemetaan: nama route → nama Template → lokasi folder Organism-nya. Ini membantu AI/manusia lain menavigasi project tanpa perlu membaca ulang seluruh guide ini setiap saat. Update file ini di commit `docs:` terpisah dari commit kode.

---

## 10. Deployment (Vercel via CLI)

**WAJIB MENUNGGU INSTRUKSI EKSPLISIT dari user untuk setiap deploy** — baik preview maupun production. Commit dan push yang rutin (§9.B–§9.D) TIDAK otomatis memicu deploy. Jangan menganggap "halaman sudah selesai dan sudah di-push" sebagai izin implisit untuk deploy.

Kalau user sudah eksplisit minta deploy, langkah standarnya:

1. Pastikan CLI terpasang dan sudah login: `vercel --version`, kalau belum login laporkan ke user untuk `vercel login` (jangan mencoba menebak/memasukkan token).
2. Project yang belum pernah di-link ke Vercel: `vercel link` — ini juga bagian dari "deploy" dan tetap butuh instruksi eksplisit, karena akan membuat/mengaitkan project baru di akun Vercel user.
3. Deploy preview (default, paling aman): `vercel`
4. Deploy production — **hanya jika user secara spesifik minta "production" atau "prod"**, bukan default: `vercel --prod`
5. Environment variables (`.env`) TIDAK BOLEH ditebak atau dibuat isinya oleh AI. Kalau ada env var yang dibutuhkan, minta user menambahkannya sendiri lewat `vercel env add {NAME}` atau dashboard Vercel — AI hanya boleh memberi tahu nama variabel yang dibutuhkan dan tujuannya.
6. Setelah deploy selesai, laporkan URL preview/production yang dikembalikan CLI ke user, jangan buka/klik apa pun secara mandiri di luar terminal.

Ringkasan gating lintas §9 dan §10: **git init, commit lokal, `.gitignore` → otomatis. Buat repo GitHub, push pertama ke remote baru, `vercel link`, dan setiap `vercel`/`vercel --prod` → tunggu instruksi eksplisit.**

---

## 11. Checklist Validasi Sebelum Selesai (untuk AI)

Sebelum menganggap sebuah halaman baru "selesai", pastikan:

- [ ] `page.tsx` tidak berisi JSX section langsung, hanya fetch data + `<{RouteName}Template />`
- [ ] Ada file `components/templates/{RouteName}Template/{RouteName}Template.tsx`
- [ ] Setiap section punya file Organism sendiri di `components/organisms/{route-name}/`
- [ ] Tidak ada file `*PageClient.tsx` baru dibuat kecuali benar-benar tidak bisa dihindari
- [ ] Komponen yang dipakai di ≥2 halaman sudah dipindah ke `shared/`, bukan diduplikasi
- [ ] Tidak ada file `*.module.css` yang tersisa di dalam `src/app/**`
- [ ] Setiap komponen baru punya foldernya sendiri (nama folder = nama komponen), tidak ada file `.tsx` yang diratakan langsung di `atoms/`, `molecules/shared/`, dll. (§3.E)
- [ ] Setiap file `.tsx` baru di dalam folder komponennya punya `.module.css` pasangan dengan nama identik (§3.E) — jalankan pengecekan manual atau `find src/components -name "*.tsx"` dibandingkan dengan `find src/components -name "*.module.css"`, jumlah dan nama harus berpasangan (kecuali pengecualian ikon murni yang dicatat eksplisit)
- [ ] Tidak ada nama file duplikat/varian (`*V2`, `*New`, `*Copy`) — indikasi search-before-create dilewati
- [ ] Route dinamis (`[slug]`, `[id]`) tidak membuat folder organism baru, hanya file baru di folder induk yang sama
- [ ] Setiap Atom/Molecule/Organism/Template yang dibuat sudah punya commit terpisah (§9.B) — bukan ditumpuk jadi satu commit besar
- [ ] Pesan commit mengikuti format `type(scope): deskripsi` (§9.C)
- [ ] Tidak ada `.env` atau file kredensial yang ter-commit
- [ ] `ARCHITECTURE.md` sudah diperbarui untuk route baru ini (§9.E)
- [ ] Tidak ada repo GitHub baru dibuat, `git remote add`, atau `vercel link`/`vercel`/`vercel --prod` dijalankan tanpa instruksi eksplisit user di percakapan ini (§9.A, §10)

Jalankan `tree src/components -L 3` (atau setara) di akhir task dan tempelkan hasilnya sebagai bukti struktur sudah sesuai sebelum melaporkan pekerjaan selesai. Lalu jalankan `git log --oneline` untuk menunjukkan bahwa commit sudah terpisah per level, bukan satu commit tunggal.