/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/atoms/Badge/Badge';
import { useHomepageContent } from '@/hooks/useHomepageContent';
import styles from './HomeShowcaseSection.module.css';

interface GalleryItem {
  id: number;
  name: string;
  category: string;
  image: string;
  sku: string;
  sizeClass: 'medium' | 'large' | 'wide' | 'tall';
}

const STATIC_GALLERY: GalleryItem[] = [
  { id: 1, name: 'Stiker Vinyl Custom', category: 'Stiker & Label', image: '/images/gallery/gallery_sticker.png', sku: 'KL-STI-01', sizeClass: 'wide' },
  { id: 2, name: 'Kaos Cotton Combat Sablon', category: 'Pakaian & Merchandise', image: '/images/gallery/gallery_shirt.png', sku: 'KL-MRC-01', sizeClass: 'medium' },
  { id: 3, name: 'Buku Tahunan Sekolah Premium', category: 'Buku & Jilid', image: '/images/gallery/gallery_yearbook.png', sku: 'KL-BDL-YB-01', sizeClass: 'tall' },
  { id: 4, name: 'Tote Bag Kanvas Custom', category: 'Pakaian & Merchandise', image: '/images/gallery/gallery_tote.png', sku: 'KL-MRC-06', sizeClass: 'wide' },
  { id: 5, name: 'Kartu Nama Premium Doff', category: 'Cetak Dokumen', image: '/images/gallery/gallery_card.png', sku: 'KL-PRT-03', sizeClass: 'medium' },
  { id: 6, name: 'Menu Resto Anti Air', category: 'Cetak Dokumen', image: '/images/gallery/gallery_menu.png', sku: 'KL-PRM-06', sizeClass: 'medium' },
  { id: 7, name: 'X-Banner Promosi Toko', category: 'Promosi & Banner', image: '/images/gallery/gallery_banner.png', sku: 'KL-PRT-02', sizeClass: 'medium' },
  { id: 8, name: 'Celemek Barista Custom', category: 'Pakaian & Merchandise', image: '/images/gallery/gallery_apron.png', sku: 'KL-MRC-09', sizeClass: 'wide' },
];

export function HomeShowcaseSection() {
  const router = useRouter();
  const { content, isLoaded } = useHomepageContent();
  const [activeHeader, setActiveHeader] = useState({
    badge: 'Shop The Look',
    title: 'Galeri Hasil Cetak Kertas Lipat',
    subtitle: 'Inspirasi branding nyata dari ribuan produk yang kami produksi dengan presisi tinggi untuk UMKM, Event, Sekolah, dan Korporasi.',
  });

  useEffect(() => {
    if (isLoaded && content?.showcase) {
      setActiveHeader({
        badge: content.showcase.badge || 'Shop The Look',
        title: content.showcase.title || 'Galeri Hasil Cetak Kertas Lipat',
        subtitle: content.showcase.subtitle || 'Inspirasi branding nyata dari ribuan produk yang kami produksi dengan presisi tinggi untuk UMKM, Event, Sekolah, dan Korporasi.',
      });
    }
  }, [isLoaded, content]);

  return (
    <section id="showcase" className={styles.section}>
      {/* Decorative glows */}
      <div className={styles.glowLeft}></div>
      <div className={styles.glowRight}></div>

      <div className={`${styles.container} container`}>
        {/* Section Header */}
        <div className={styles.header}>
          <Badge variant="teal" className={styles.sectionBadge}>{activeHeader.badge}</Badge>
          <h2 className={styles.title}>{activeHeader.title}</h2>
          <p className={styles.subtitle}>{activeHeader.subtitle}</p>
        </div>

        {/* Bento Grid Asymmetric Gallery */}
        <div className={styles.bentoGrid}>
          {STATIC_GALLERY.map((item) => (
            <div
              key={item.id}
              className={`${styles.bentoItem} ${styles[item.sizeClass]}`}
              onClick={() => router.push(`/products/${item.sku.toLowerCase()}`)}
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                className={styles.image}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className={styles.overlay}>
                <span className={styles.category}>{item.category}</span>
                <h3 className={styles.itemName}>{item.name}</h3>
                <span className={styles.actionLink}>Lihat Detail Produk →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
