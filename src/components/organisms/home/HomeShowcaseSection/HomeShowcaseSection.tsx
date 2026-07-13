'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { Badge } from '@/components/atoms/Badge/Badge';
import styles from './HomeShowcaseSection.module.css';

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  gridClass: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: 'High-Quality Printing',
    description: 'Brosur, kartu nama, dan flayer cetak dengan akurasi warna tinggi.',
    imageUrl: '/images/categories/cat_printing.png',
    gridClass: styles.gridLarge,
  },
  {
    id: 2,
    title: 'Custom Sticker & Label',
    description: 'Stiker die-cut vinyl anti air untuk kemasan produk premium.',
    imageUrl: '/images/categories/cat_stickers.png',
    gridClass: styles.gridSquare,
  },
  {
    id: 3,
    title: 'Exclusive Stationery',
    description: 'Notebook, amplop, kop surat, dan kelengkapan identitas kantor.',
    imageUrl: '/images/categories/cat_stationery.png',
    gridClass: styles.gridTall,
  },
  {
    id: 4,
    title: 'Media Promosi',
    description: 'Roll banner, tripod stand, dan brosur promosi event kilat.',
    imageUrl: '/images/categories/cat_promotion.png',
    gridClass: styles.gridSquare,
  },
  {
    id: 5,
    title: 'UMKM Branding Package',
    description: 'Paket bundling branding hemat dari box, stiker, hingga kartu ucapan.',
    imageUrl: '/images/categories/cat_branding_pack.png',
    gridClass: styles.gridWide,
  },
  {
    id: 6,
    title: 'Custom Merchandise',
    description: 'Mug custom, tumbler stainles steel, gantungan kunci, dan pin.',
    imageUrl: '/images/categories/cat_merchandise.png',
    gridClass: styles.gridSquare,
  },
  {
    id: 7,
    title: 'Buku Tahunan Sekolah',
    description: 'Cetak school yearbook cetak Spot UV hardcover jilid lux.',
    imageUrl: '/images/categories/cat_yearbook.png',
    gridClass: styles.gridSquare,
  },
  {
    id: 8,
    title: 'Flatlay Creative Design',
    description: 'Aplikasi branding terintegrasi untuk bisnis F&B, Cafe, dan korporasi.',
    imageUrl: '/images/showcase_flatlay.png',
    gridClass: styles.gridBanner,
  },
];

export function HomeShowcaseSection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Close lightbox on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => 
          prev === null ? null : prev === galleryItems.length - 1 ? 0 : prev + 1
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => 
          prev === null ? null : prev === 0 ? galleryItems.length - 1 : prev - 1
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const handleNext = () => {
    setLightboxIndex((prev) => 
      prev === null ? null : prev === galleryItems.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setLightboxIndex((prev) => 
      prev === null ? null : prev === 0 ? galleryItems.length - 1 : prev - 1
    );
  };

  const activeItem = lightboxIndex !== null ? galleryItems[lightboxIndex] : null;

  return (
    <section id="showcase" className={styles.section}>
      {/* Decorative glows */}
      <div className={styles.glowLeft}></div>
      <div className={styles.glowRight}></div>

      <div className={`${styles.container} container`}>
        {/* Section Header */}
        <div className={styles.header}>
          <Badge variant="teal" className={styles.sectionBadge}>Shop The Look</Badge>
          <h2 className={styles.title}>Galeri Hasil Cetak Kertas Lipat</h2>
          <p className={styles.subtitle}>
            Inspirasi branding nyata dari ribuan produk yang kami produksi dengan presisi tinggi untuk UMKM, Event, Sekolah, dan Korporasi.
          </p>
        </div>

        {/* Asymmetric Masonry Grid */}
        <div className={styles.grid}>
          {galleryItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`${styles.gridItem} ${item.gridClass}`}
              onClick={() => setLightboxIndex(index)}
              title={`Klik untuk memperbesar ${item.title}`}
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={styles.galleryImage}
              />
              {/* Hover overlay panel */}
              <div className={styles.hoverOverlay}>
                <div className={styles.zoomButton}>
                  <ZoomIn size={20} />
                </div>
                <div className={styles.hoverContent}>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <p className={styles.itemDesc}>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Fullscreen Modal */}
      {lightboxIndex !== null && activeItem && (
        <div className={styles.lightbox} onClick={() => setLightboxIndex(null)}>
          {/* Scrim click block */}
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            
            {/* Close button */}
            <button 
              className={styles.closeBtn} 
              onClick={() => setLightboxIndex(null)}
              aria-label="Tutup Galeri"
            >
              <X size={28} />
            </button>

            {/* Left Nav Arrow */}
            <button 
              className={styles.navArrow} 
              onClick={handlePrev}
              aria-label="Foto sebelumnya"
            >
              <ChevronLeft size={36} />
            </button>

            {/* Image display */}
            <div className={styles.imageDisplayContainer}>
              <div className={styles.lightboxImageWrapper}>
                <Image
                  src={activeItem.imageUrl}
                  alt={activeItem.title}
                  fill
                  className={styles.lightboxImage}
                  priority
                />
              </div>
              
              {/* Bottom Caption panel */}
              <div className={styles.captionPanel}>
                <span className={styles.indexCounter}>
                  {lightboxIndex + 1} / {galleryItems.length}
                </span>
                <h3 className={styles.lightboxTitle}>{activeItem.title}</h3>
                <p className={styles.lightboxDesc}>{activeItem.description}</p>
              </div>
            </div>

            {/* Right Nav Arrow */}
            <button 
              className={styles.navArrow} 
              onClick={handleNext}
              aria-label="Foto berikutnya"
            >
              <ChevronRight size={36} />
            </button>

          </div>
        </div>
      )}
    </section>
  );
}
