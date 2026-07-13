'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/atoms/Badge/Badge';
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
  category,
  sku,
  scheme,
  imageUrl,
}: ProductsDetailHeaderProps) {
  // Mock alternative visual perspectives using category image and abstract gradients
  const galleryItems = [
    { id: 1, type: 'image', url: imageUrl, label: 'Mockup Utama' },
    { id: 2, type: 'gradient', url: 'linear-gradient(135deg, var(--color-primary-light) 0%, #cbd5e1 100%)', label: 'Detail Bahan' },
    { id: 3, type: 'gradient', url: 'linear-gradient(135deg, var(--color-secondary-orange-light) 0%, #ffedd5 100%)', label: 'Kemasan & Box' },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = galleryItems[activeIndex];

  return (
    <div className={styles.galleryContainer}>
      {/* Category Info header for Mobile */}
      <div className={styles.mobileMeta}>
        <div className={styles.badgesRow}>
          <Badge variant="primary">{category}</Badge>
          <Badge variant={scheme === 'Paket Bundling' ? 'secondary' : 'teal'}>{scheme}</Badge>
        </div>
        <h1 className={styles.title}>{name}</h1>
        <span className={styles.sku}>SKU: {sku}</span>
      </div>

      {/* Main Image View */}
      <div className={styles.mainView}>
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

      {/* Thumbnails row */}
      <div className={styles.thumbnails}>
        {galleryItems.map((item, index) => {
          const isSelected = index === activeIndex;
          return (
            <button
              key={item.id}
              className={`${styles.thumbnailBtn} ${isSelected ? styles.thumbnailSelected : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${item.label}`}
            >
              {item.type === 'image' ? (
                <Image
                  src={item.url}
                  alt={`${name} thumbnail ${index + 1}`}
                  fill
                  className={styles.thumbImage}
                />
              ) : (
                <div
                  className={styles.thumbPlaceholder}
                  style={{ background: item.url }}
                >
                  <span className={styles.thumbIcon}>📄</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
