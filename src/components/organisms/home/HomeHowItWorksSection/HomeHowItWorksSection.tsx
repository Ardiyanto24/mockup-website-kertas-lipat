import React from 'react';
import { Badge } from '@/components/atoms/Badge/Badge';
import styles from './HomeHowItWorksSection.module.css';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    id: 1,
    title: 'Pilih & Konfigurasi',
    description: 'Pilih produk satuan atau paket bundling favoritmu. Tentukan varian bahan, ukuran, serta kuantitas pesanan.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <path d="M9 17V11" />
        <path d="M12 17V7" />
        <path d="M15 17V13" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Kirim / Unggah Desain',
    description: 'Seret & lepas file desainmu (PDF, PNG, AI, ZIP) di detail produk. Belum punya desain? Centang opsi "Butuh Bantuan Desain".',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Verifikasi & Bayar',
    description: 'Tim desainer kami memeriksa kelayakan resolusi file desainmu secara instan sebelum Anda melakukan pembayaran aman.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" ry="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Produksi & Kirim',
    description: 'Pesanan diproduksi menggunakan mesin cetak modern berpresisi tinggi dan dikirim aman terasuransi ke alamatmu.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
];

export function HomeHowItWorksSection() {
  return (
    <section id="how-it-works" className={styles.section}>
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <Badge variant="teal">Cara Pemesanan</Badge>
          <h2 className={styles.title}>Bagaimana Kertas Lipat Bekerja?</h2>
          <p className={styles.subtitle}>
            Alur pemesanan produk kustom online yang simpel, transparan, dan bebas ribet untuk mewujudkan ide kreatif Anda.
          </p>
        </div>

        <div className={styles.stepsContainer}>
          {/* Connector Line */}
          <div className={styles.connectorLine}></div>

          <div className={styles.grid}>
            {steps.map((step, idx) => (
              <div key={step.id} className={styles.stepCard}>
                <div className={styles.stepNumWrapper}>
                  <div className={styles.stepNum}>{step.id}</div>
                  <div className={styles.iconBox}>{step.icon}</div>
                </div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
