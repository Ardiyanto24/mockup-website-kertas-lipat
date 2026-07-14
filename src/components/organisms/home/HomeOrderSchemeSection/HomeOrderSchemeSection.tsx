/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/atoms/Button/Button';
import { Badge } from '@/components/atoms/Badge/Badge';
import { useHomepageContent, OrderSchemeCard } from '@/hooks/useHomepageContent';
import styles from './HomeOrderSchemeSection.module.css';

interface OrderSchemeData {
  badge: string;
  title: string;
  subtitle: string;
  cards: OrderSchemeCard[];
}

const STATIC_DATA: OrderSchemeData = {
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
};

export function HomeOrderSchemeSection() {
  const { content, isLoaded } = useHomepageContent();
  const [activeData, setActiveData] = useState<OrderSchemeData>(STATIC_DATA);

  useEffect(() => {
    if (isLoaded && content?.orderScheme?.cards) {
      setActiveData(content.orderScheme);
    }
  }, [isLoaded, content]);

  return (
    <section id="skema-order" className={styles.section}>
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <Badge variant="primary" className={styles.badge}>{activeData.badge}</Badge>
          <h2 className={styles.title}>{activeData.title}</h2>
          <p className={styles.subtitle}>{activeData.subtitle}</p>
        </div>

        <div className={styles.grid}>
          {activeData.cards.map((card, index) => {
            const isFirst = index === 0;
            const cardClass = isFirst ? styles.cardSingle : styles.cardBundle;
            const foldClass = isFirst ? styles.foldSingle : styles.foldBundle;
            const badgeVariant = isFirst ? 'teal' : 'secondary';
            const btnVariant = isFirst ? 'primary' : 'secondary';

            return (
              <div key={card.id} className={`${styles.card} ${cardClass}`}>
                <div className={styles.cardHeader}>
                  <div className={styles.iconBox}>
                    {isFirst ? (
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <line x1="9" y1="9" x2="15" y2="9" />
                        <line x1="9" y1="13" x2="15" y2="13" />
                        <line x1="9" y1="17" x2="13" y2="17" />
                      </svg>
                    ) : (
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                        <line x1="12" y1="22.08" x2="12" y2="12" />
                      </svg>
                    )}
                  </div>
                  <Badge variant={badgeVariant}>{card.badge}</Badge>
                </div>
                
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDesc}>{card.description}</p>
                
                <ul className={styles.cardFeatures}>
                  {card.features.map((feat, fIdx) => (
                    <li key={fIdx}><span className={styles.check}>✓</span> {feat}</li>
                  ))}
                </ul>

                <div className={styles.cardAction}>
                  <Button href={card.btnHref} variant={btnVariant} className={styles.btn}>
                    {card.btnText}
                  </Button>
                </div>
                
                {/* Abstract Fold Line */}
                <div className={foldClass}></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
