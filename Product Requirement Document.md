# **Product Requirement Document (PRD)**

**Proyek:** Platform E-Commerce & Kustomisasi Kertas Lipat

**Status:** Siap untuk Pengembangan (Development Ready)

**Versi:** 1.4 (Hero Carousel Update with Audience Targeting)

**Penulis:** Product Manager (Kertas Lipat)

## **Atribut Dokumen**

| **Atribut** | **Detail** |

| **Nama Proyek** | Kertas Lipat E-Commerce & Customization Platform |

| **Target Pengguna** | Mahasiswa, Organisasi Kampus, UMKM, Sekolah, dan Korporasi |

| **Karakteristik Utama** | Order fleksibel (satuan & grosir), upload desain custom, UI/UX interaktif & kreatif, konsultasi branding langsung |

| **Platform** | Web Responsif (Fokus Mobile-First & Desktop Utility) |

## **1\. Ringkasan Eksekutif & Latar Belakang**

**Kertas Lipat** adalah usaha kreatif yang bergerak di bidang percetakan, branding, *custom merchandise*, serta kebutuhan promosi. Target pasarnya sangat dinamis, mulai dari mahasiswa dengan kebutuhan acara kampus, pemilik UMKM yang membutuhkan kemasan dan label produk, sekolah untuk kebutuhan buku tahunan/kelulusan, hingga perusahaan besar untuk kebutuhan identitas korporat (*company kit*).

Berbeda dari kompetitor percetakan konvensional yang kaku dan menerapkan batas minimum order yang tinggi, Kertas Lipat hadir dengan keunggulan:

1. **Layanan Fleksibel:** Mengakomodasi pesanan satuan (*micro-production*) maupun partai besar secara efisien.  
2. **Berorientasi Desain & Branding:** Menawarkan solusi kreatif terintegrasi dari tahap konsultasi estetika hingga proses cetak fisik, bukan sekadar menerima file siap cetak biasa.  
3. **Penyajian Paket Praktis:** Menyediakan paket *bundling* siap pakai (seperti Paket Branding UMKM dan Paket Kelulusan) untuk mempermudah proses pengambilan keputusan konsumen.

Platform digital Kertas Lipat dirancang untuk menjadi gerbang pemesanan *self-service* yang intuitif, transparan dalam harga, dan memudahkan kolaborasi desain antara pelanggan dan tim produksi Kertas Lipat.

## **2\. Tujuan & Matriks Keberhasilan (KPI)**

### **Tujuan Utama Proyek**

Membangun platform e-commerce interaktif yang mampu menyajikan kalkulasi harga akurat secara *real-time* untuk variasi spesifikasi cetak pada halaman produk, mempermudah pengiriman aset desain, menyediakan form kontak konsultasi yang terintegrasi, serta menyajikan katalog produk (satuan dan paket) dengan navigasi yang mudah dipahami.

### **Key Performance Indicators (KPI) Teknis & UX**

* **Kecepatan Muat Halaman (Page Load Time):** Di bawah ![][image1] pada jaringan mobile 4G menggunakan format aset modern (SVG, WebP) untuk portofolio dan gambar produk.  
* **Keberhasilan Mobile Responsiveness:** ![][image2] transaksi diproyeksikan berasal dari perangkat mobile (khususnya mahasiswa dan pelaku UMKM yang mengelola bisnis lewat smartphone).  
* **Efisiensi Flow Desain:** Mengurangi hambatan pengiriman file dengan sistem integrasi drag-and-drop file mentah/desain (PDF, AI, ZIP, PNG) langsung pada halaman detail produk atau tautan instan ke formulir WhatsApp.  
* **Konversi Form Kontak:** ![][image3] pengunjung dari segmen sekolah/korporasi melakukan kontak pertama melalui form konsultasi kustom yang disediakan di beranda.

## **3\. Profil Pengguna (User Persona)**

### **Persona 1: Rian (20 tahun) \- Ketua Pelaksana Event Kampus (Mahasiswa)**

* **Kebutuhan:** Membutuhkan kaos panitia, ID card, banner promosi, dan kipas tangan custom untuk acara festival seni kampusnya.  
* **Kendala:** Anggaran dana kampus sangat terbatas dan sering berubah-ubah di menit terakhir. Sangat sensitif terhadap minimal order karena anggota panitia hanya berjumlah 25 orang.  
* **Gaya Belanja:** Mencari opsi cetak satuan atau paket kecil dengan waktu pengerjaan kilat karena persiapan acara yang mepet.

### **Persona 2: Ibu Endang (38 tahun) \- Pemilik UMKM "Sambal Bu Endang"**

* **Kebutuhan:** Membutuhkan stiker label botol sambal yang tahan air, banner kecil untuk dipajang di depan ruko, serta kartu nama usaha.  
* **Kendala:** Tidak memiliki latar belakang desain grafis dan bingung memilih bahan stiker yang cocok untuk botol yang disimpan di lemari es (butuh konsultasi bahan).  
* **Gaya Belanja:** Lebih menyukai paket praktis siap pakai (seperti Paket Branding UMKM) agar tidak perlu memikirkan satu per satu jenis cetakan.

### **Persona 3: Pak Budi (45 tahun) \- Wakil Kepala Sekolah Bidang Kesiswaan**

* **Kebutuhan:** Mengurus pengadaan Buku Tahunan Sekolah (Yearbook) dan suvenir kelulusan untuk 150 siswa angkatan baru.  
* **Kendala:** Birokrasi sekolah membutuhkan transparansi penawaran harga (*custom quote* formal), opsi *finishing* premium (seperti *Spot UV* dan *Hard Cover*), serta contoh/portfolio fisik yang terpercaya.  
* **Gaya Belanja:** Membutuhkan konsultasi khusus, kontrak kerja sama resmi, dan sistem pembayaran termin.

## **4\. Spesifikasi Struktur Halaman Beranda (Homepage) — 9 Section**

Struktur halaman beranda disusun ulang berdasarkan pola perilaku psikologi konsumen (*User Experience Funnel*):

1. **Awareness & Trust (Section 1 & 2):** Siapa kami dan apa jaminan kualitasnya.  
2. **Interest & Intent Filtering (Section 3 & 4):** Memilih jalur order dan melihat katalog yang relevan.  
3. **Friction Reduction (Section 5, 6 & 7):** Cara memesan yang mudah, visualisasi kualitas asli, dan contoh hasil jadi di dunia nyata.  
4. **Decision & Action (Section 8 & 9):** Membaca ulasan pembeli lain lalu melakukan pembelian atau mengirim formulir konsultasi.

\+-------------------------------------------------------+  
|  Section 1: Hero Section (3-Slide Carousel)            |  
\+-------------------------------------------------------+  
|  Section 2: Value Proposition Bar (Mengapa Kami?)     |  
\+-------------------------------------------------------+  
|  Section 3: Pilihan Skema Order (Satuan / Bundling)   |  
\+-------------------------------------------------------+  
|  Section 4: Produk Populer & Paket Terlaris           |  
\+-------------------------------------------------------+  
|  Section 5: Cara Kerja Pemesanan (How It Works)       |  
\+-------------------------------------------------------+  
|  Section 6: Video Unboxing & Bukti Kualitas Produksi  |  
\+-------------------------------------------------------+  
|  Section 7: Showcase Portfolio & Galeri Mockup        |  
\+-------------------------------------------------------+  
|  Section 8: Testimoni & Validasi Sosial               |  
\+-------------------------------------------------------+  
|  Section 9: Form Kontak & Konsultasi Kreatif          |  
\+-------------------------------------------------------+

### **4.1. Section 1: Hero Section (The Creative Spark)**

* **Tujuan:** Menampilkan identitas visual yang kreatif, segar, serta menargetkan segmen pelanggan yang berbeda melalui pesan yang relevan secara dinamis.  
* **Spesifikasi Teknis:**  
  * Carousel otomatis (*auto-play*) dengan navigasi manual panah (kiri/kanan) serta indikator titik (*dot indicators*) di bagian bawah.  
  * Transisi slide halus (*fade transition*) setiap 5-7 detik.  
* **Tata Letak & Gaya Visual (Berlaku untuk Semua Slide):**  
  * **Latar Belakang (Full Viewport):** Menggunakan satu gambar latar belakang beresolusi tinggi dengan rasio aspek ![][image4] yang membentang penuh memenuhi seluruh tinggi area pandang layar pengguna (*full-viewport background image*).  
  * **Fokus Komposisi Objek (Kanan):** Elemen visual utama dikelompokkan dan ditonjolkan secara estetis di area sebelah kanan layar.  
  * **Sisi Kiri (Negative Space):** Sisi kiri gambar sengaja dibuat bersih dari detail objek ramai (*negative space*) untuk memberikan kontras keterbacaan teks yang maksimal.  
  * **Teks Overlay (Kiri):** Ditumpuk secara responsif di atas gambar latar belakang sisi kiri dengan implementasi gradasi gelap halus (*scrim gradient overlay*) di belakang teks untuk menjamin kenyamanan mata pembaca.

* #### **Konfigurasi Konten Slide:**   **Slide 1: Fokus UMKM & General Branding (Default Slide)**

  * **Teks Utama (H1):** "Cetak Ide Kreatifmu, Hidupkan Brand-mu."  
  * **Sub-Teks:** "Solusi cetak, merchandise custom, dan kebutuhan branding terlengkap. Tanpa batas minimal order kaku, pengerjaan cepat, dan jaminan kualitas premium untuk UMKM, kampus, hingga korporasi."  
  * **Visual Objek (Sisi Kanan):** Kolase mockup produk premium Kertas Lipat: kaos sablon DTF elastis, gelas mug HD, tumbler dengan ukiran logo presisi, serta box kemasan estetik.  
  * **Call to Action (CTA) Sisi Kiri:**  
    * *Tombol Utama:* "Jelajahi Produk" (Tombol solid, mengarah ke Katalog).  
    * *Tombol Sekunder:* "Konsultasi Desain & Bahan" (Tombol outline, mengarah ke WA).

  Slide 2: Fokus Mahasiswa & Event Kampus

  * #### **Teks Utama (H1): "Sukseskan Event Kampusmu Tanpa Beban Minimum Order."**

  * **Sub-Teks:** "Bikin kaos panitia, ID card, banner promosi, kipas tangan, hingga pin custom dengan fleksibilitas order satuan. Hemat anggaran, pengerjaan cepat, hasil dijamin memuaskan\!"  
  * **Visual Objek (Sisi Kanan):** Dokumentasi estetik panitia festival kampus menggunakan atribut panitia terintegrasi (kaos custom, ID Card tergantung rapi, serta tumpukan kipas tangan promosi cetakan Kertas Lipat).  
  * **Call to Action (CTA) Sisi Kiri:**  
    * *Tombol Utama:* "Lihat Produk Kampus" (Mengarah ke Katalog dengan filter "Bisa Satuan").  
    * *Tombol Sekunder:* "Minta Diskon Anggota" (Mengarah ke chat WA admin).

  Slide 3: Fokus Sekolah, Korporasi & Paket Premium

  * #### **Teks Utama (H1): "Abadikan Momen Kelulusan & Tingkatkan Citra Profesional."**

  * **Sub-Teks:** "Penyedia satu atap untuk Buku Tahunan Sekolah premium, souvenir kelulusan, dan seminar kit eksklusif perusahaan. Dilengkapi bantuan desain profesional dan contoh fisik nyata."  
  * **Visual Objek (Sisi Kanan):** Tumpukan buku tahunan bersampul mewah (*Hard Cover* dengan finishing *Spot UV/Emboss*), tumpukan notebook spiral premium, pulpen berlogo, dan *goodie bag* tertata rapi.  
  * **Call to Action (CTA) Sisi Kiri:**  
    * *Tombol Utama:* "Lihat Paket Kelulusan" (Mengarah ke Katalog filter "School Yearbook").  
    * *Tombol Sekunder:* "Hubungi Sales Formal" (Mengarah ke Form Kontak / Section 9).

### **4.2. Section 2: Value Proposition Bar (Unique Selling Points)**

* **Tujuan:** Menepis keraguan umum seputar jasa percetakan online (misalnya: harus pesan banyak, proses lama, atau hasil buram).  
* **Format:** Bar horizontal minimalis dengan 4 ikon ilustrasi bergaya garis modern:  
  * **Tanpa Minimum Order:** "Bisa pesan satuan untuk produk tertentu, ideal untuk uji coba."  
  * **Pengerjaan Kilat & Presisi:** "Dilengkapi mesin produksi modern untuk akurasi warna tinggi."  
  * **Solusi Desain Kreatif:** "Bantu buat desain siap cetak yang estetik dan sesuai kebutuhan brand."  
  * **Kirim Seluruh Nusantara:** "Packing aman terproteksi ke kota Anda dengan asuransi pengiriman."

### **4.3. Section 3: Pilihan Skema Order (Order Schemes)**

* **Tujuan:** Membantu pengguna langsung memahami fleksibilitas jalur pemesanan di Kertas Lipat berdasarkan volume kebutuhan mereka.  
* **Format:** Layout komparasi 2 kolom interaktif yang membedakan skema transaksi sesuai rujukan dokumen Data\_Product.md:  
  1. **Order Satuan (Micro Products):**  
     * **Deskripsi:** Solusi cetak tanpa beban minimum order. Pelanggan bisa membeli produk eceran/individual (seperti Kaos DTF, Tumbler Custom, Banner, atau ID Card) untuk kebutuhan personal, kepanitiaan kecil, atau contoh (*sample*) sebelum cetak massal.  
     * **CTA:** "Lihat Produk Satuan" (Membuka Katalog dengan filter "Produk Satuan" aktif).  
  2. **Paket Bundling (Bundle Packages):**  
     * **Deskripsi:** Solusi praktis dan hemat satu atap. Penggabungan produk-produk terlaris dalam satu paket siap pakai (seperti Paket Branding UMKM atau Paket Buku Tahunan & Kelulusan Sekolah) dengan harga paket yang jauh lebih ekonomis.  
     * **CTA:** "Lihat Paket Hemat" (Membuka Katalog dengan filter "Paket Bundling" aktif).

### **4.4. Section 4: Produk Populer & Paket Terlaris (Featured Carousel)**

* **Tujuan:** Menyoroti produk-produk dengan volume penjualan tertinggi untuk mempercepat keputusan pembelian.  
* **Komponen:** Slider responsif yang menampilkan 4 produk satuan (*Micro Products*) dan paket bundling terlaris.  
* **Detail Card:**  
  * Foto produk dengan efek *hover zoom-in* yang memperlihatkan tekstur bahan cetak.  
  * Badge dinamis: "Best Seller", "Bisa Satuan", atau "Hemat Paket".  
  * Rating bintang ulasan pembeli (misal: ![][image5]).  
  * Harga dasar produk dan tombol cepat "Konfigurasi Cetak".

### **4.5. Section 5: Cara Kerja Pemesanan (How It Works)**

* **Tujuan:** Menghilangkan kebingungan (*cognitive friction*) pengguna baru tentang bagaimana cara memesan produk cetak kustom secara mandiri dan online.  
* **Format:** Layout grid horizontal 4 langkah interaktif (*Step-by-Step Tracker*):  
  1. **Pilih & Konfigurasi:** "Pilih produk satuan atau paket bundling favoritmu, tentukan varian bahan, ukuran, serta kuantitas."  
  2. **Kirim/Unggah Desain:** "Seret & lepas file desainmu (PDF, PNG, AI) di halaman produk. Jika belum punya desain, centang opsi *Butuh Bantuan Desain*."  
  3. **Verifikasi & Bayar:** "Tim kami akan memeriksa kelayakan resolusi file desainmu secara cepat sebelum kamu melakukan pembayaran aman."  
  4. **Produksi & Kirim:** "Pesanan diproduksi dengan presisi tinggi dan dikirim langsung ke alamatmu dengan kemasan terproteksi."

### **4.6. Section 6: Video Unboxing & Bukti Kualitas Produksi**

* **Tujuan:** Membangun kredibilitas instan atas kualitas fisik cetakan Kertas Lipat setelah pengguna memahami cara kerjanya.  
* **Format:** Video *background* autoplay (muted, loop, rasio ![][image4]) yang menampilkan proses produksi presisi: ketajaman sablon kaos DTF yang ditarik (elastisitas), efek mengkilap *Spot UV* pada cover buku tahunan, dan ketahanan stiker vinyl saat diguyur air.  
* **Overlay Teks:** "Bukan Sekadar Cetak Generik. Kami Menghidupkan Detail Desain Anda."

### **4.7. Section 7: Showcase Portfolio & Galeri Mockup (Shop the Look)**

* **Tujuan:** Memberikan inspirasi pengaplikasian *branding* di dunia nyata sekaligus meningkatkan rata-rata nilai pesanan (*Average Order Value*).  
* **Format:** Foto tata letak datar (*flatlay*) bertema estetik. Contoh: Meja kafe yang didekorasi lengkap dengan menu laminasi anti-air, stiker label pada cup kopi, celemek berlogo, dan kartu nama kasir.  
* **Interaksi:** Terdapat titik *hotspot* (pulse indicator) di setiap produk dalam foto. Ketika disentuh/di-hover, muncul pop-up tooltip yang menunjukkan nama produk (misal: "Stiker Vinyl Label") beserta harga dasarnya dan tombol langsung "Pesan Sekarang".

### **4.8. Section 8: Testimoni & Validasi Sosial (Social Proof)**

* **Tujuan:** Mengeliminasi kekhawatiran terakhir terhadap reputasi pengiriman online dan hasil cetak massal tepat sebelum mereka mencapai titik konversi akhir.  
* **Format:** Kompilasi ulasan nyata bertipe masonry yang menampilkan foto kiriman pelanggan di media sosial (misal: kepuasan panitia wisuda memamerkan buku tahunan mereka, atau pelaku kuliner memajang produk barunya).

### **4.9. Section 9: Form Kontak & Konsultasi Kreatif (Contact Form)**

* **Tujuan:** Menyediakan saluran bagi pelanggan skala besar (seperti sekolah untuk buku tahunan, korporasi untuk seminar kit, atau UMKM yang membutuhkan *custom quote* khusus) agar dapat berkonsultasi langsung mengenai spesifikasi bahan, budget, dan desain.  
* **Tampilan UI:** Box form yang bersih dan modern dengan visual ilustrasi tim desainer Kertas Lipat di sisi sampingnya.  
* **Elemen Formulir:**  
  * **Nama Lengkap / Nama Kontak:** Input teks (Wajib).  
  * **Nama Organisasi / Perusahaan / Sekolah:** Input teks (Opsional).  
  * **Nomor WhatsApp (Aktif):** Input nomor dengan validasi instan untuk kemudahan follow-up (Wajib).  
  * **Kategori Kebutuhan:** Dropdown pilihan:  
    * *Cetak Buku Tahunan Sekolah (Yearbook)*  
    * *Paket Branding UMKM*  
    * *Merchandise / Seminar Kit Korporat*  
    * *Cetak Custom Lainnya (Spesifikasi Khusus)*  
  * **Estimasi Jumlah Pesanan & Budget:** Input teks / angka kisaran.  
  * **Deskripsi Kebutuhan Anda:** Textarea untuk menulis detail brief desain atau pertanyaan seputar bahan cetakan.  
  * **Upload File Referensi/Brief:** Input file (maksimal ![][image6], mendukung PDF, ZIP, PNG, JPG).  
* **CTA:** Tombol "Kirim Permintaan Konsultasi" (Menampilkan notifikasi sukses, mengirim salinan draf ke email sales, serta menyediakan opsi integrasi teruskan langsung ke WhatsApp Admin).

## **5\. Alur Pengguna Utama (Main User Flows)**

### **5.1. Alur Pemesanan Produk Satuan dengan Upload Desain (Self-Service Flow)**

\[Beranda/Katalog\] ──\> Pilih Produk (e.g., Kaos DTF) ──\> \[Halaman Detail Produk (PDP)\]  
                                                                  │  
  \+---------------------------------------------------------------+  
  │  
  ├──\> Konfigurasi Varian (Warna, Ukuran, Bahan)  
  ├──\> Input Jumlah Pesanan (Sistem hitung tier discount secara real-time di PDP)  
  ├──\> Upload File Desain (Opsi: Drag & Drop file .pdf, .ai, .zip, .png)  
  │    \*Jika belum ada desain, centang opsi: "Butuh Bantuan Desain Kertas Lipat"\*  
  │  
  └──\> Klik "Tambah ke Keranjang" ──\> \[Checkout & Pembayaran\]

### **5.2. Alur Permintaan Penawaran Harga Kustom & Konsultasi (Custom Quote Flow)**

\[Beranda: Section 9 Form Kontak\] ──\> Isi Formulir Konsultasi Kustom & Upload Brief (opsional)  
                                                       │  
                                                       ├──\> Klik "Kirim Permintaan Konsultasi"  
                                                       │  
                                                       └──\> Sistem otomatis:  
                                                            1\. Kirim notifikasi real-time ke sales admin  
                                                            2\. Sediakan tombol instan "Hubungi Sales via WA"  
                                                            3\. Sales admin memproses draf penawaran formal

## **6\. Spesifikasi Sistem Katalog & Filtrasi (Katalog Halaman)**

Untuk menyederhanakan pencarian di antara kategori produk yang sangat bervariasi, halaman katalog dilengkapi sidebar filter yang intuitif.

### **Opsi Filter Utama**

1. **Filter Skema Pembelian (OR Condition):**  
   * **Produk Satuan (Micro Products):** Untuk pembelian satuan atau ritel.  
   * **Paket Bundling (Bundle Packages):** Untuk kebutuhan paket hemat instan.  
2. **Filter Kategori (OR Condition):**  
   * *Printing*  
   * *Promotion*  
   * *Stationery & Identity*  
   * *Stickers & Labels*  
   * *Custom Merchandise & Apparel*  
   * *Paket Branding UMKM*  
   * *School Yearbook & Graduation Kits*  
3. **Filter Batas Minimum Order:**  
   * Tanpa Minimal Order (Bisa Satuan)  
   * Minimum Order ![][image7]  
   * Minimum Order ![][image8] (Grosir)

### **Sistem Pengurutan (Sorting)**

* Terpopuler / Paling Banyak Dipesan  
* Harga Terendah ke Tertinggi  
* Harga Tertinggi ke Terendah  
* Produk Terbaru

## **7\. Halaman Detail Produk (Product Detail Page \- PDP)**

Halaman ini berfungsi sebagai konfigurator produk interaktif dengan fitur-fitur sebagai berikut:

### **1\. Galeri Visual Multi-Perspektif & Mockup Interaktif**

Menyediakan fitur *pinch-to-zoom* pada perangkat mobile untuk melihat kerapatan cetak produk dan tekstur material cetakan secara detail.

### **2\. Panel Konfigurator Dinamis (Dynamic Pricing Configurator)**

Sistem ini menggunakan formula otomatis untuk menghitung harga akhir berdasarkan kuantitas pesanan dan pilihan bahan tambahan (*add-on*).

#### **Formula Penghitungan Harga**

Harga satuan produk ditentukan oleh rentang kuantitas pesanan (semakin banyak kuantitas, harga dasar per unit semakin murah/mengikuti diskon volume):

![][image9]![][image10]*Keterangan:*

* Jika pengguna mencentang opsi "Butuh Jasa Desain Kertas Lipat", sistem akan secara otomatis menambahkan biaya tetap jasa desain (misal: ![][image11] untuk produk satuan) ke dalam komponen perhitungan harga akhir sebelum checkout.

### **3\. Struktur Tab Informasi Produk (Accordion)**

* **Deskripsi Produk:** Penjelasan detail kegunaan produk.  
* **Spesifikasi Bahan & Ukuran:** Informasi ukuran dalam satuan centimeter (![][image12]) atau milimeter (![][image13]), ketebalan kertas dalam gramatur (![][image14]), jenis tinta cetak, dan teknik pengerjaan.  
* **Panduan File & Cetak:** Petunjuk resolusi minimal file (disarankan minimal ![][image15] dengan format warna CMYK agar warna hasil cetak tidak pecah/berubah).

## **8\. Rujukan Basis Data Produk (Product Database Reference)**

Untuk detail spesifikasi, varian harga, dimensi, dan daftar lengkap dari seluruh produk (terdiri dari 35 Produk Satuan/Micro Products dan 8 Paket Bundling, dengan total akumulasi **43 produk** terkurasi), silakan rujuk dokumen tunggal berikut:

**Dokumen Referensi Utama:** Data\_Product.md

*Dokumen eksternal ini berfungsi sebagai Single Source of Truth (SSoT) bagi tim pengembang untuk melakukan import data ke dalam sistem database (seperti MongoDB/PostgreSQL) dan sinkronisasi SKU produk.*

## **9\. Persyaratan Teknis & Arsitektur API (Developer Friendly)**

### **9.1. Skema Data Produk Fleksibel (Mongoose / MongoDB Schema)**

Skema database dirancang untuk menampung karakteristik unik dari produk cetak yang memiliki rentang diskon volume (*tier pricing*) serta opsi upload file eksternal dari pelanggan.

const ProductKertasLipatSchema \= new mongoose.Schema({  
  sku: { type: String, required: true, unique: true },  
  name: { type: String, required: true },  
  scheme: {   
    type: String,   
    enum: \['Produk Satuan', 'Paket Bundling'\],   
    required: true   
  },  
  category: {   
    type: String,   
    enum: \[  
      'Printing',   
      'Promotion',   
      'Stationery & Identity',   
      'Stickers & Labels',   
      'Custom Merchandise & Apparel',   
      'Paket Branding UMKM',   
      'School Yearbook & Graduation Kits'  
    \],   
    required: true   
  },  
  pricingType: {   
    type: String,   
    enum: \['Per Lembar', 'Per Unit Ukuran', 'Per Pcs', 'Per Set', 'Per Buku', 'Custom/Paket'\],   
    required: true   
  },  
  basePrice: { type: Number, required: true }, // Harga dasar untuk pesanan minimum  
  unit: { type: String, required: true }, // e.g., 'm2', 'lembar', 'pcs', 'buku'  
  minOrder: { type: Number, default: 1 },  
  tierPricing: \[{  
    minQuantity: Number,  
    maxQuantity: Number,  
    discountPercentage: Number // e.g., 0.10 untuk diskon 10% jika membeli di rentang ini  
  }\],  
  variants: \[{  
    variantName: String, // e.g., 'Laminasi Doff', 'Hard Cover', 'Art Carton 10cm'  
    additionalPrice: Number  
  }\],  
  features: \[String\],  
  description: { type: String, required: true },  
  requiresDesignFileUpload: { type: Boolean, default: false }  
});

### **9.2. Struktur Endpoints REST API Utama**

Untuk mendukung kelancaran operasional transaksi, form kontak, dan integrasi ke backend, tim developer disarankan mengimplementasikan struktur endpoint API berikut:

| HTTP Method | Endpoint | Deskripsi | Query / Body Parameters |
| :---- | :---- | :---- | :---- |
| **GET** | /api/kertaslipat/products | Mengambil seluruh katalog produk | Query: scheme, category, min\_order, sort, page |
| **GET** | /api/kertaslipat/products/:sku | Mengambil detail spesifikasi satu produk | N/A |
| **POST** | /api/kertaslipat/cart/calculate | Menghitung harga pesanan dinamis berdasarkan volume & varian terpilih di PDP | Body: { sku, quantity, chosenVariant, includeDesignService } |
| **POST** | /api/kertaslipat/order/upload-design | Mengunggah file desain sementara dari pelanggan ke cloud storage | Multipart Form Data: file\_design (Max ![][image16]) |
| **POST** | /api/kertaslipat/consultation/submit | Mengirim data dari Form Kontak & Konsultasi Kreatif di Beranda | Body: { name, company, whatsapp, category, budget, message, brief\_file\_url } |

## **10\. Alur Pasca-Pembelian & Manajemen Pesanan (Admin & Produksi)**

Setelah pelanggan menyelesaikan pembayaran di platform Kertas Lipat atau mengirimkan form penawaran kustom, sistem secara otomatis:

1. **Verifikasi File & Penawaran:** Menandai pesanan e-commerce sebagai "Menunggu Verifikasi File" jika pelanggan mengunggah file mandiri. Untuk jalur *Form Kontak*, status ditandai "Menunggu Tindakan Sales" di dasbor admin.  
2. **Koneksi WhatsApp Bot:** Mengirimkan salinan konfirmasi pesanan (atau konfirmasi terima form konsultasi) beserta link preview status pengerjaan langsung ke nomor WhatsApp pelanggan.  
3. **Pemberitahuan Tim Produksi:** Meneruskan lembar instruksi kerja cetak beserta link unduhan file resolusi tinggi langsung ke dasbor ruang produksi untuk segera diproses sesuai estimasi waktu pengerjaan.
