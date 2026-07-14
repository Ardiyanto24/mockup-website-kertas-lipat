/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/atoms/Badge/Badge';
import { useHomepageContent, QualityTab } from '@/hooks/useHomepageContent';
import styles from './HomeQualitySection.module.css';

const STATIC_TABS: QualityTab[] = [
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
];

export function HomeQualitySection() {
  const { content, isLoaded } = useHomepageContent();
  const [activeHeader, setActiveHeader] = useState({
    badge: 'Bukti Kualitas',
    title: 'Bukan Sekadar Cetak Generik. Kami Hidupkan Detail Desain Anda.',
    subtitle: 'Kami memahami bahwa cetakan adalah representasi brand Anda. Kertas Lipat berinvestasi pada mesin cetak mutakhir dan bahan premium untuk hasil fisik cetak terbaik.',
  });
  const [activeTabs, setActiveTabs] = useState<QualityTab[]>(STATIC_TABS);
  const [activeTabId, setActiveTabId] = useState(1);

  useEffect(() => {
    if (isLoaded && content?.quality?.tabs) {
      setActiveHeader({
        badge: content.quality.badge,
        title: content.quality.title,
        subtitle: content.quality.subtitle,
      });
      setActiveTabs(content.quality.tabs);
    }
  }, [isLoaded, content]);

  const activeDetail = activeTabs.find((d) => d.id === activeTabId) || activeTabs[0] || STATIC_TABS[0];

  return (
    <section className={styles.section}>
      <div className={`${styles.container} container`}>
        <div className={styles.grid}>
          {/* Visual Column */}
          <div className={styles.visualCol}>
            <div className={styles.imageWrapper}>
              <Image
                src={activeDetail.image}
                alt={activeDetail.title}
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
            <Badge variant="secondary" className={styles.badge}>{activeHeader.badge}</Badge>
            <h2 className={styles.title}>{activeHeader.title}</h2>
            <p className={styles.subtitle}>{activeHeader.subtitle}</p>

            {/* Quality Details Switcher Tabs */}
            <div className={styles.tabsContainer}>
              {activeTabs.map((detail) => (
                <button
                  key={detail.id}
                  className={`${styles.tabBtn} ${activeTabId === detail.id ? styles.tabBtnActive : ''}`}
                  onClick={() => setActiveTabId(detail.id)}
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
