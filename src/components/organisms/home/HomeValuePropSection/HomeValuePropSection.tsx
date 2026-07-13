import React from 'react';
import { Hash, Zap, Paintbrush, Truck } from 'lucide-react';
import styles from './HomeValuePropSection.module.css';

interface USPItem {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  colorClass: string;
}

const usps: USPItem[] = [
  {
    id: 1,
    icon: <Hash size={24} className={styles.icon} />,
    title: 'Tanpa Minimum Order',
    description: 'Bisa pesan satuan untuk produk tertentu, ideal untuk uji coba.',
    colorClass: styles.greenGlow,
  },
  {
    id: 2,
    icon: <Zap size={24} className={styles.icon} />,
    title: 'Pengerjaan Kilat & Presisi',
    description: 'Mesin modern untuk akurasi warna tinggi & hasil cetak tajam.',
    colorClass: styles.orangeGlow,
  },
  {
    id: 3,
    icon: <Paintbrush size={24} className={styles.icon} />,
    title: 'Solusi Desain Kreatif',
    description: 'Bantu buat desain siap cetak yang estetik sesuai karakter brand.',
    colorClass: styles.purpleGlow,
  },
  {
    id: 4,
    icon: <Truck size={24} className={styles.icon} />,
    title: 'Kirim Seluruh Nusantara',
    description: 'Packing aman terproteksi ke seluruh kota di Indonesia.',
    colorClass: styles.blueGlow,
  },
];

export function HomeValuePropSection() {
  return (
    <section className={styles.uspSection}>
      <div className={`${styles.uspContainer} container`}>
        <div className={styles.grid}>
          {usps.map((usp) => (
            <div key={usp.id} className={styles.uspCard}>
              <div className={`${styles.iconWrapper} ${usp.colorClass}`}>{usp.icon}</div>
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
