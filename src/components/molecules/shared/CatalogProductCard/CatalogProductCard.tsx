'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/data/products';
import { Badge } from '@/components/atoms/Badge/Badge';
import { Button } from '@/components/atoms/Button/Button';
import styles from './CatalogProductCard.module.css';

interface CatalogProductCardProps {
  product: Product;
}

export function CatalogProductCard({ product }: CatalogProductCardProps) {
  // Formatting currency to Rupiah
  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Mock ratings and reviews based on SKU (or category) for display
  const ratings: Record<string, { score: number; reviews: number }> = {
    'KL-MRC-06': { score: 4.9, reviews: 48 },
    'KL-MRC-02': { score: 4.8, reviews: 34 },
    'KL-BDL-BR-01': { score: 4.9, reviews: 52 },
    'KL-BDL-YB-02': { score: 4.8, reviews: 29 },
    'KL-PRT-01': { score: 4.7, reviews: 19 },
    'KL-STK-02': { score: 4.9, reviews: 44 },
  };

  const rating = ratings[product.sku] || { score: 4.6, reviews: 15 };

  // Set badges based on SKU / Category
  const isBestSeller = ['KL-MRC-06', 'KL-MRC-02', 'KL-BDL-BR-01', 'KL-BDL-YB-02'].includes(product.sku);
  const hasFreeShipping = ['KL-PRT-01', 'KL-STI-01', 'KL-STK-02', 'KL-BDL-YB-03'].includes(product.sku);

  // SVG Icons
  const StarIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#F5A623" stroke="#F5A623" className={styles.starIcon}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );

  const FallbackIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={styles.fallbackIcon}>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );

  return (
    <div className={styles.card}>
      {/* Image Area */}
      <div className={styles.imageContainer}>
        <Link href={`/products/${product.sku.toLowerCase()}`}>
          <div className={styles.imageWrapper}>
            <div className={styles.skeletonImage}>
              <FallbackIcon />
            </div>
            {product.imageUrl && (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={styles.image}
                priority={false}
              />
            )}
          </div>
        </Link>

        {/* Badges Overlay */}
        <div className={styles.badgeOverlay}>
          {isBestSeller && <Badge variant="secondary">Best Seller</Badge>}
          {hasFreeShipping && <Badge variant="success">Bebas Ongkir</Badge>}
        </div>
      </div>

      {/* Info Area */}
      <div className={styles.info}>
        <div className={styles.metaRow}>
          <span className={styles.styleTag}>{product.category}</span>
          <div className={styles.rating}>
            <StarIcon />
            <span className={styles.ratingScore}>{rating.score}</span>
            <span className={styles.reviewCount}>({rating.reviews})</span>
          </div>
        </div>

        <Link href={`/products/${product.sku.toLowerCase()}`}>
          <h4 className={styles.title}>{product.name}</h4>
        </Link>

        <p className={styles.capacity}>
          Minimal Order: {product.minOrder} {product.unit}
        </p>

        <div className={styles.footerRow}>
          <div className={styles.priceContainer}>
            <span className={styles.priceLabel}>Mulai dari</span>
            <span className={styles.price}>{formatRupiah(product.basePrice)}</span>
          </div>
          <Link href={`/products/${product.sku.toLowerCase()}`}>
            <Button variant="outline" size="sm" className={styles.detailsBtn}>
              Detail
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
