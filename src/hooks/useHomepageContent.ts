/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useEffect } from 'react';

// Interfaces
export interface TitleSegment {
  text: string;
  highlight?: boolean;
  orange?: boolean;
}

export interface HeroSlide {
  id: number;
  title: string; // Plain text with templates: {blue highlight} and [orange text]
  subText: string;
  image: string;
  ctaText: string;
  ctaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
}

export interface USPItem {
  id: number;
  iconName: 'Hash' | 'Zap' | 'Paintbrush' | 'Truck';
  title: string;
  description: string;
  colorClass: 'greenGlow' | 'orangeGlow' | 'purpleGlow' | 'blueGlow';
}

export interface OrderSchemeCard {
  id: number;
  badge: string;
  title: string;
  description: string;
  features: string[];
  btnText: string;
  btnHref: string;
}

export interface OrderSchemeContent {
  badge: string;
  title: string;
  subtitle: string;
  cards: OrderSchemeCard[];
}

export interface HowItWorksStep {
  id: number;
  title: string;
  description: string;
  iconName: 'Sliders' | 'FileUp' | 'ShieldCheck' | 'Package';
}

export interface HowItWorksContent {
  badge: string;
  title: string;
  subtitle: string;
  steps: HowItWorksStep[];
}

export interface QualityTab {
  id: number;
  label: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}

export interface QualityContent {
  badge: string;
  title: string;
  subtitle: string;
  tabs: QualityTab[];
}

export interface FeaturedContent {
  badge: string;
  title: string;
  subtitle: string;
  selectedSkus: string[];
}

export interface ShowcaseHotspot {
  id: number;
  name: string;
  x: number;
  y: number;
  targetSku: string;
}

export interface ShowcaseContent {
  badge: string;
  title: string;
  subtitle: string;
  hotspots: ShowcaseHotspot[];
}

export interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
  segment: 'Mahasiswa' | 'UMKM' | 'Sekolah';
  imageUrl: string;
}

export interface TestimonialsContent {
  badge: string;
  title: string;
  subtitle: string;
  items: TestimonialItem[];
}

export interface ContactFeature {
  id: number;
  icon: string;
  title: string;
  text: string;
}

export interface ContactContent {
  badge: string;
  title: string;
  desc1: string;
  desc2: string;
  features: ContactFeature[];
  formTitle: string;
  btnText: string;
  waBase: string;
}

export interface MapsContent {
  badge: string;
  title: string;
  subtitle: string;
  cardTitle: string;
  hours: string;
  phone: string;
  email: string;
  directionUrl: string;
  address: string;
  iframeSrc: string;
}

export interface HomepageContent {
  hero: {
    slides: HeroSlide[];
  };
  valueProp: {
    usps: USPItem[];
  };
  orderScheme: OrderSchemeContent;
  featured: FeaturedContent;
  howItWorks: HowItWorksContent;
  quality: QualityContent;
  showcase: ShowcaseContent;
  testimonials: TestimonialsContent;
  contact: ContactContent;
  maps: MapsContent;
}

// Default Data Constants
const DEFAULT_CONTENT: HomepageContent = {
  hero: {
    slides: [
      {
        id: 1,
        title: 'Cetak {Ide Kreatifmu}, Hidupkan [Brand-mu.]',
        subText: 'Solusi cetak, merchandise custom, dan kebutuhan branding terlengkap. Tanpa batas minimal order kaku, pengerjaan cepat, dan jaminan kualitas premium untuk UMKM, kampus, hingga korporasi.',
        image: '/images/hero_branding_mockup.png',
        ctaText: 'Jelajahi Produk',
        ctaHref: '#featured-products',
        secondaryCtaText: 'Konsultasi Desain & Bahan',
        secondaryCtaHref: 'https://wa.me/6281234567890',
      },
      {
        id: 2,
        title: 'Sukseskan {Event Kampusmu} Tanpa Beban [Minimum Order.]',
        subText: 'Bikin kaos panitia, ID card, banner promosi, kipas tangan, hingga pin custom dengan fleksibilitas order satuan. Hemat anggaran, pengerjaan cepat, hasil dijamin memuaskan!',
        image: '/images/hero_campus_mockup.png',
        ctaText: 'Lihat Produk Kampus',
        ctaHref: '#featured-products',
        secondaryCtaText: 'Minta Diskon Anggota',
        secondaryCtaHref: 'https://wa.me/6281234567890',
      },
      {
        id: 3,
        title: 'Abadikan {Momen Kelulusan} & Tingkatkan [Citra Profesional.]',
        subText: 'Penyedia satu atap untuk Buku Tahunan Sekolah premium, souvenir kelulusan, dan seminar kit eksklusif perusahaan. Dilengkapi bantuan desain profesional dan contoh fisik nyata.',
        image: '/images/hero_school_mockup.png',
        ctaText: 'Lihat Paket Kelulusan',
        ctaHref: '#featured-products',
        secondaryCtaText: 'Hubungi Sales Formal',
        secondaryCtaHref: '#contact',
      },
    ],
  },
  valueProp: {
    usps: [
      {
        id: 1,
        iconName: 'Hash',
        title: 'Tanpa Minimum Order',
        description: 'Bisa pesan satuan untuk produk tertentu, ideal untuk uji coba.',
        colorClass: 'greenGlow',
      },
      {
        id: 2,
        iconName: 'Zap',
        title: 'Pengerjaan Kilat & Presisi',
        description: 'Mesin modern untuk akurasi warna tinggi & hasil cetak tajam.',
        colorClass: 'orangeGlow',
      },
      {
        id: 3,
        iconName: 'Paintbrush',
        title: 'Solusi Desain Kreatif',
        description: 'Bantu buat desain siap cetak yang estetik sesuai karakter brand.',
        colorClass: 'purpleGlow',
      },
      {
        id: 4,
        iconName: 'Truck',
        title: 'Kirim Nusantara',
        description: 'Packing aman terproteksi ke seluruh kota di Indonesia.',
        colorClass: 'blueGlow',
      },
    ],
  },
  orderScheme: {
    badge: 'Skema Pemesanan',
    title: 'Sesuaikan Pesanan dengan Kebutuhan Anda',
    subtitle: 'Kertas Lipat memberikan fleksibilitas penuh untuk Anda. Pilih dari skema order eceran satuan atau paket bundling hemat siap pakai.',
    cards: [
      {
        id: 1,
        badge: 'Bisa Satuan',
        title: 'Order Satuan (Micro Products)',
        description: 'Solusi cetak tanpa beban minimal order kaku. Sangat cocok untuk cetak contoh produk (sample), kaos panitia skala kecil, tumbler kustom hadiah personal, cetak kartu nama individu, hingga banner promosi insidentil.',
        features: [
          'Minimal order hanya 1 pcs',
          'Banyak pilihan material & varian',
          'Simulasi harga real-time di PDP',
          'Cocok untuk uji coba kualitas bahan',
        ],
        btnText: 'Lihat Produk Satuan',
        btnHref: '#featured-products',
      },
      {
        id: 2,
        badge: 'Hemat Paket',
        title: 'Paket Bundling (Bundle Packages)',
        description: 'Gabungan produk terlaris dalam satu paket siap pakai dengan harga yang jauh lebih hemat. Sempurna untuk Paket Branding UMKM (kartu nama + stiker + banner) atau Paket Buku Tahunan & Souvenir Kelulusan Sekolah.',
        features: [
          'Harga paket jauh lebih hemat s.d 25%',
          'Layanan Satu Vendor (All-in-One)',
          'Sudah termasuk Jasa Desain Gratis',
          'Template standar siap pakai',
        ],
        btnText: 'Lihat Paket Hemat',
        btnHref: '#featured-products',
      },
    ],
  },
  featured: {
    badge: 'Terpopuler',
    title: 'Produk Terlaris & Paket Favorit',
    subtitle: 'Berikut produk satuan dan paket bundling yang paling sering dipesan oleh mahasiswa, UMKM, dan sekolah mitra Kertas Lipat.',
    selectedSkus: ['KL-MRC-06', 'KL-MRC-02', 'KL-BDL-BR-01', 'KL-BDL-YB-02'],
  },
  howItWorks: {
    badge: 'Cara Pemesanan',
    title: 'Alur Pemesanan Simpel & Transparan',
    subtitle: 'Proses pemesanan produk kustom online bebas ribet, dirancang untuk mewujudkan ide kreatif Anda dalam 4 langkah mudah.',
    steps: [
      {
        id: 1,
        title: 'Pilih & Konfigurasi',
        description: 'Pilih produk satuan atau paket bundling favoritmu. Tentukan varian bahan, ukuran, serta kuantitas pesanan.',
        iconName: 'Sliders',
      },
      {
        id: 2,
        title: 'Kirim / Unggah Desain',
        description: 'Unggah file desainmu (PDF, PNG, AI, ZIP) di detail produk. Belum punya desain? Pilih opsi "Butuh Bantuan Desain".',
        iconName: 'FileUp',
      },
      {
        id: 3,
        title: 'Verifikasi & Bayar',
        description: 'Tim desainer kami memeriksa resolusi file desain secara instan sebelum Anda melakukan pembayaran yang aman.',
        iconName: 'ShieldCheck',
      },
      {
        id: 4,
        title: 'Produksi & Kirim',
        description: 'Pesanan diproduksi menggunakan mesin cetak modern berpresisi tinggi dan dikirim aman berasuransi ke alamatmu.',
        iconName: 'Package',
      },
    ],
  },
  quality: {
    badge: 'Bukti Kualitas',
    title: 'Bukan Sekadar Cetak Generik. Kami Hidupkan Detail Desain Anda.',
    subtitle: 'Kami memahami bahwa cetakan adalah representasi brand Anda. Kertas Lipat berinvestasi pada mesin cetak mutakhir dan bahan premium untuk hasil fisik cetak terbaik.',
    tabs: [
      {
        id: 1,
        label: 'Elastisitas Sablon DTF',
        title: 'Sablon DTF Sangat Lentur & Kuat',
        description: 'Sablon DTF kami memiliki kelenturan maksimal. Saat kaos ditarik atau diregangkan, sablon ikut merenggang secara elastis tanpa pecah, retak, atau mengelupas. Tahan cuci mesin cuci berkali-kali.',
        icon: '👕',
        image: '/images/quality_dtf.png',
      },
      {
        id: 2,
        label: 'Kilau Spot UV Cover',
        title: 'Sentuhan Spot UV & Hard Cover Mewah',
        description: 'Memberikan efek kilap glossy yang presisi hanya pada area teks atau logo tertentu di atas cover buku tahunan sekolah (Yearbook) bersampul tebal (Hard Cover). Timbul, reflektif, dan terasa sangat premium.',
        icon: '✨',
        image: '/images/quality_spot_uv.png',
      },
      {
        id: 3,
        label: 'Ketahanan Air Stiker',
        title: 'Stiker Vinyl 100% Anti Air (Waterproof)',
        description: 'Menggunakan material stiker vinyl tahan air yang direkatkan dengan lem rekat kuat. Sangat cocok untuk label kemasan botol sambal frozen, minuman dingin berembun, maupun produk kosmetik higienis.',
        icon: '💧',
        image: '/images/quality_waterproof_sticker.png',
      },
    ],
  },
  showcase: {
    badge: 'Shop The Look',
    title: 'Galeri Hasil Cetak Kertas Lipat',
    subtitle: 'Inspirasi branding nyata dari ribuan produk yang kami produksi dengan presisi tinggi untuk UMKM, Event, Sekolah, dan Korporasi.',
    hotspots: [
      { id: 1, name: 'Stiker Vinyl Label', x: 23, y: 38, targetSku: 'KL-STI-01' },
      { id: 2, name: 'Celemek Custom Logo', x: 50, y: 73, targetSku: 'KL-MRC-09' },
      { id: 3, name: 'Menu Laminasi Anti Air', x: 74, y: 28, targetSku: 'KL-PRM-06' }
    ],
  },
  testimonials: {
    badge: 'Our Testimonials',
    title: 'Customer Say About Our Services',
    subtitle: 'Apa kata mereka yang telah mempercayakan branding, cetakan, dan merchandise kustom mereka kepada Kertas Lipat?',
    items: [
      {
        id: 1,
        name: 'Rian (20 th)',
        role: 'Ketua Panitia Event Kampus',
        avatar: '👨‍🎓',
        quote: 'Cari vendor kaos panitia yang ramah budget & mau terima order 25 pcs itu susah. Untung nemu Kertas Lipat! Sablon DTF nya lentur banget, ga pecah pas ditarik. Kipas promosi dan ID Card nya juga rapi. Event sukses besar!',
        rating: 5,
        segment: 'Mahasiswa',
        imageUrl: '/images/showcase_handover.png',
      },
      {
        id: 2,
        name: 'Ibu Endang (38 th)',
        role: 'Pemilik "Sambal Bu Endang"',
        avatar: '👩‍🍳',
        quote: 'Paket Branding UMKM Starter sangat praktis! Saya dibantu dibuatkan desain stiker botol gratis oleh tim desainer. Bahan stiker vinyl-nya benar-benar tahan air, tidak terkelupas biarpun disimpan di kulkas. Usaha sambal saya jadi keliatan premium!',
        rating: 5,
        segment: 'UMKM',
        imageUrl: '/images/showcase_handover_umkm.png',
      },
      {
        id: 3,
        name: 'Pak Budi (45 th)',
        role: 'Wakil Kepala Sekolah Kesiswaan',
        avatar: '👨‍🏫',
        quote: 'Kami memesan 150 Paket Buku Tahunan Sekolah Standard. Finishing Spot UV pada cover terlihat mewah dan rapi. Pihak sales sangat kooperatif menyusun penawaran harga formal untuk birokrasi sekolah kami. Sangat terpercaya.',
        rating: 5,
        segment: 'Sekolah',
        imageUrl: '/images/showcase_handover_sekolah.png',
      },
    ],
  },
  contact: {
    badge: 'Konsultasi Kreatif',
    title: 'Punya Kebutuhan Cetak Skala Besar atau Spesifikasi Kustom?',
    desc1: 'Apakah Anda merencanakan pengadaan Buku Tahunan Sekolah, Seminar Kit kantor, atau butuh kustomisasi bahan khusus yang tidak ada di katalog?',
    desc2: 'Hubungi Tim Desainer & Sales kami. Kami siap membantu dari tahap konsultasi konsep visual, pemilihan bahan cetak terbaik, hingga penawaran harga formal untuk administrasi Anda.',
    features: [
      { id: 1, icon: '💡', title: 'Bantuan Desain Profesional', text: 'Tim kreatif kami siap merapikan layout file Anda agar siap cetak.' },
      { id: 2, icon: '📝', title: 'Penawaran Harga Formal', text: 'Kami sediakan invoice penawaran resmi untuk sekolah & perusahaan.' }
    ],
    formTitle: 'Formulir Konsultasi Cetak',
    btnText: 'Kirim Permintaan Konsultasi',
    waBase: 'https://wa.me/6281234567890',
  },
  maps: {
    badge: 'Lokasi Workshop',
    title: 'Kunjungi Workshop Fisik Kami',
    subtitle: 'Temui tim kami secara langsung, diskusikan sampel produk/bahan, konsultasikan desain cetak Anda, atau ambil langsung pesanan Anda.',
    cardTitle: 'Workshop Kertas Lipat',
    hours: 'Senin - Sabtu: 09:00 - 18:00 WIB (Minggu Libur)',
    phone: '+62 812-3456-7890',
    email: 'hello@kertaslipat.com',
    directionUrl: 'https://maps.google.com/?q=Kebayoran+Baru+Jakarta+Selatan',
    address: 'Jl. KH. Ahmad Dahlan No. 45, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12130',
    iframeSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3986.420904773845!2d106.797204!3d-6.24156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1165e3170e9%3A0x6b8bc2299b9cf9b!2sKebayoran%20Baru%2C%20South%20Jakarta%20City%2C%20Jakarta!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid',
  },
};

// Title segment parser helper
export function parseTitleSegments(text: string): TitleSegment[] {
  const regex = /(\{[^}]+\}|\[[^\]]+\]|[^{^[\]]+)/g;
  const segments: TitleSegment[] = [];

  let match;
  while ((match = regex.exec(text)) !== null) {
    const segmentText = match[0];
    if (segmentText.startsWith('{') && segmentText.endsWith('}')) {
      segments.push({ text: segmentText.slice(1, -1), highlight: true });
    } else if (segmentText.startsWith('[') && segmentText.endsWith(']')) {
      segments.push({ text: segmentText.slice(1, -1), orange: true });
    } else {
      segments.push({ text: segmentText });
    }
  }

  return segments.length > 0 ? segments : [{ text }];
}

// React hook
export function useHomepageContent() {
  const [content, setContent] = useState<HomepageContent | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('kertas_lipat_homepage_content');
      if (stored) {
        setContent(JSON.parse(stored));
      } else {
        setContent(DEFAULT_CONTENT);
        localStorage.setItem('kertas_lipat_homepage_content', JSON.stringify(DEFAULT_CONTENT));
      }
    } catch (e) {
      console.error('Failed to load homepage content', e);
      setContent(DEFAULT_CONTENT);
    }
    setIsLoaded(true);
  }, []);

  const saveContent = (newContent: HomepageContent) => {
    try {
      setContent(newContent);
      localStorage.setItem('kertas_lipat_homepage_content', JSON.stringify(newContent));
      return true;
    } catch (e) {
      console.error('Failed to save homepage content', e);
      return false;
    }
  };

  return {
    content,
    isLoaded,
    saveContent,
    resetToDefault: () => saveContent(DEFAULT_CONTENT),
  };
}
