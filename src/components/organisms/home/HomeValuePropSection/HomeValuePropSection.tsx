import React from 'react';
import styles from './HomeValuePropSection.module.css';

interface USPItem {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const usps: USPItem[] = [
  {
    id: 1,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: 'Tanpa Minimum Order',
    description: 'Bisa pesan satuan untuk produk tertentu, ideal untuk contoh atau uji coba.',
  },
  {
    id: 2,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      </svg>
    ),
    title: 'Pengerjaan Kilat & Presisi',
    description: 'Dilengkapi mesin produksi modern untuk akurasi warna tinggi & hasil cetak tajam.',
  },
  {
    id: 3,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    ),
    title: 'Solusi Desain Kreatif',
    description: 'Bantu buat desain siap cetak yang estetik dan sesuai dengan karakter brand Anda.',
  },
  {
    id: 4,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'Kirim Seluruh Nusantara',
    description: 'Packing aman terproteksi ke seluruh kota di Indonesia dengan asuransi pengiriman.',
  },
];

export function HomeValuePropSection() {
  return (
    <section className={styles.uspSection}>
      <div className={`${styles.uspContainer} container`}>
        <div className={styles.grid}>
          {usps.map((usp) => (
            <div key={usp.id} className={styles.uspCard}>
              <div className={styles.iconWrapper}>{usp.icon}</div>
              <div className={styles.textWrapper}>
                <h3 className={styles.title}>{usp.title}</h3>
                <p className={styles.description}>{usp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
