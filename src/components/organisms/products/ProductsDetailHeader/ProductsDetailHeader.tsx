'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './ProductsDetailHeader.module.css';

interface ProductsDetailHeaderProps {
  name: string;
  category: string;
  sku: string;
  scheme: 'Produk Satuan' | 'Paket Bundling';
  imageUrl: string;
}

export function ProductsDetailHeader({
  name,
  imageUrl,
}: ProductsDetailHeaderProps) {
  // Generate 8 diverse visual perspectives based on the main category mockup image
  const galleryItems = [
    { id: 1, type: 'image', url: imageUrl, label: 'Mockup Utama' },
    { id: 2, type: 'gradient', url: 'linear-gradient(135deg, var(--color-primary-light) 0%, #cbd5e1 100%)', label: 'Tekstur Bahan' },
    { id: 3, type: 'gradient', url: 'linear-gradient(135deg, var(--color-secondary-orange-light) 0%, #ffedd5 100%)', label: 'Kemasan Box' },
    { id: 4, type: 'gradient', url: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)', label: 'Hasil Cetak' },
    { id: 5, type: 'gradient', url: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', label: 'Dimensi Ukuran' },
    { id: 6, type: 'gradient', url: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)', label: 'Pilihan Warna' },
    { id: 7, type: 'gradient', url: 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)', label: 'Sisi Belakang' },
    { id: 8, type: 'gradient', url: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', label: 'Kualitas QC' },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
  };

  const activeItem = galleryItems[activeIndex];

  return (
    <div className={styles.galleryContainer}>
      {/* Main Image Slider with Left/Right Arrows */}
      <div className={styles.mainView}>
        {/* Left Arrow */}
        <button className={`${styles.sliderArrow} ${styles.leftArrow}`} onClick={handlePrev} aria-label="Previous image">
          ⟨
        </button>

        {/* Display Active Item */}
        <div className={styles.imageWrapper}>
          {activeItem.type === 'image' ? (
            <Image
              src={activeItem.url}
              alt={`${name} - ${activeItem.label}`}
              fill
              className={styles.mainImage}
              priority
            />
          ) : (
            <div
              className={styles.mainImagePlaceholder}
              style={{ background: activeItem.url }}
            >
              <div className={styles.placeholderLabel}>
                <span className={styles.placeholderIcon}>🔍</span>
                {activeItem.label}
              </div>
            </div>
          )}
        </div>

        {/* Right Arrow */}
        <button className={`${styles.sliderArrow} ${styles.rightArrow}`} onClick={handleNext} aria-label="Next image">
          ⟩
        </button>
      </div>

      {/* Grid of 8 Thumbnails */}
      <div className={styles.thumbnailsGrid}>
        {galleryItems.map((item, index) => {
          const isSelected = index === activeIndex;
          return (
            <button
              key={item.id}
              className={`${styles.thumbnailBtn} ${isSelected ? styles.thumbnailSelected : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Lihat ${item.label}`}
            >
              {item.type === 'image' ? (
                <div className={styles.thumbImageWrapper}>
                  <Image
                    src={item.url}
                    alt={`${name} thumbnail ${index + 1}`}
                    fill
                    className={styles.thumbImage}
                  />
                </div>
              ) : (
                <div
                  className={styles.thumbPlaceholder}
                  style={{ background: item.url }}
                >
                  <span className={styles.thumbText}>{item.label.split(' ')[0]}</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
