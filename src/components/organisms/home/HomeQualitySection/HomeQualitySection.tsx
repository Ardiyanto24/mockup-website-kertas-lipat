'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/atoms/Badge/Badge';
import styles from './HomeQualitySection.module.css';

interface QualityDetail {
  id: number;
  label: string;
  title: string;
  description: string;
  icon: string;
}

const qualityDetails: QualityDetail[] = [
  {
    id: 1,
    label: 'Elastisitas Sablon DTF',
    title: 'Sablon DTF Sangat Lentur & Kuat',
    description: 'Sablon DTF kami memiliki kelenturan maksimal. Saat kaos ditarik atau diregangkan, sablon ikut merenggang secara elastis tanpa pecah, retak, atau mengelupas. Tahan cuci mesin cuci berkali-kali.',
    icon: '👕',
  },
  {
    id: 2,
    label: 'Kilau Spot UV Cover',
    title: 'Sentuhan Spot UV & Hard Cover Mewah',
    description: 'Memberikan efek kilap glossy yang presisi hanya pada area teks atau logo tertentu di atas cover buku tahunan sekolah (Yearbook) bersampul tebal (Hard Cover). Timbul, reflektif, dan terasa sangat premium.',
    icon: '✨',
  },
  {
    id: 3,
    label: 'Ketahanan Air Stiker',
    title: 'Stiker Vinyl 100% Anti Air (Waterproof)',
    description: 'Menggunakan material stiker vinyl tahan air yang direkatkan dengan lem rekat kuat. Sangat cocok untuk label kemasan botol sambal frozen, minuman dingin berembun, maupun produk kosmetik higienis.',
    icon: '💧',
  },
];

export function HomeQualitySection() {
  const [activeTab, setActiveTab] = useState(1);
  const activeDetail = qualityDetails.find((d) => d.id === activeTab) || qualityDetails[0];

  return (
    <section className={styles.section}>
      <div className={`${styles.container} container`}>
        <div className={styles.grid}>
          {/* Visual Column */}
          <div className={styles.visualCol}>
            <div className={styles.imageWrapper}>
              <Image
                src="/images/quality_production.png"
                alt="Proses Produksi Percetakan Presisi Kertas Lipat"
                fill
                className={styles.image}
                priority
              />
              {/* Playful card overlap */}
              <div className={styles.visualOverlayCard}>
                <div className={styles.overlayIcon}>{activeDetail.icon}</div>
                <h4 className={styles.overlayTitle}>{activeDetail.title}</h4>
                <p className={styles.overlayDesc}>{activeDetail.description}</p>
              </div>
            </div>
          </div>

          {/* Info Column */}
          <div className={styles.infoCol}>
            <Badge variant="secondary" className={styles.badge}>Bukti Kualitas</Badge>
            <h2 className={styles.title}>Bukan Sekadar Cetak Generik. Kami Hidupkan Detail Desain Anda.</h2>
            <p className={styles.subtitle}>
              Kami memahami bahwa cetakan adalah representasi brand Anda. Kertas Lipat berinvestasi pada mesin cetak mutakhir dan bahan premium untuk hasil fisik cetak terbaik.
            </p>

            {/* Quality Details Switcher Tabs */}
            <div className={styles.tabsContainer}>
              {qualityDetails.map((detail) => (
                <button
                  key={detail.id}
                  className={`${styles.tabBtn} ${activeTab === detail.id ? styles.tabBtnActive : ''}`}
                  onClick={() => setActiveTab(detail.id)}
                >
                  <span className={styles.tabIcon}>{detail.icon}</span>
                  <div className={styles.tabText}>
                    <span className={styles.tabLabel}>{detail.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
