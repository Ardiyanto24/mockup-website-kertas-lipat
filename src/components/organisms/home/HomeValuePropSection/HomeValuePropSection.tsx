/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useState, useEffect } from 'react';
import { Hash, Zap, Paintbrush, Truck } from 'lucide-react';
import { useHomepageContent } from '@/hooks/useHomepageContent';
import styles from './HomeValuePropSection.module.css';

interface USPItem {
  id: number;
  iconName: 'Hash' | 'Zap' | 'Paintbrush' | 'Truck';
  title: string;
  description: string;
  colorClass: 'greenGlow' | 'orangeGlow' | 'purpleGlow' | 'blueGlow';
}

const STATIC_USPS: USPItem[] = [
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
];

const IconMap = {
  Hash,
  Zap,
  Paintbrush,
  Truck,
};

const ColorClassMap = {
  greenGlow: styles.greenGlow,
  orangeGlow: styles.orangeGlow,
  purpleGlow: styles.purpleGlow,
  blueGlow: styles.blueGlow,
};

export function HomeValuePropSection() {
  const { content, isLoaded } = useHomepageContent();
  const [activeUsps, setActiveUsps] = useState<USPItem[]>(STATIC_USPS);

  useEffect(() => {
    if (isLoaded && content?.valueProp?.usps) {
      setActiveUsps(content.valueProp.usps);
    }
  }, [isLoaded, content]);

  return (
    <section className={styles.uspSection}>
      <div className={`${styles.uspContainer} container`}>
        <div className={styles.grid}>
          {activeUsps.map((usp) => {
            const IconComponent = IconMap[usp.iconName] || Hash;
            const glowClass = ColorClassMap[usp.colorClass] || styles.greenGlow;
            
            return (
              <div key={usp.id} className={styles.uspCard}>
                <div className={`${styles.iconWrapper} ${glowClass}`}>
                  <IconComponent size={24} className={styles.icon} />
                </div>
                <div className={styles.textWrapper}>
                  <h3 className={styles.title}>{usp.title}</h3>
                  <p className={styles.description}>{usp.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
