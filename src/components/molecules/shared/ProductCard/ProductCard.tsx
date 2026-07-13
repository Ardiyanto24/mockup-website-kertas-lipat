import React from 'react';
import Image from 'next/image';
import { Badge } from '@/components/atoms/Badge/Badge';
import { Button } from '@/components/atoms/Button/Button';
import styles from './ProductCard.module.css';

export interface ProductCardProps {
  sku: string;
  name: string;
  category: string;
  scheme: 'Produk Satuan' | 'Paket Bundling';
  basePrice: number;
  unit: string;
  features: string[];
  description: string;
  imageUrl?: string;
  rating?: number;
  reviewCount?: number;
}

export function ProductCard({
  sku,
  name,
  category,
  scheme,
  basePrice,
  unit,
  features,
  description,
  imageUrl,
  rating = 4.8,
  reviewCount = 12,
}: ProductCardProps) {
  // Format price helper
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Determine category badge variant
  const getBadgeVariant = (cat: string) => {
    switch (cat) {
      case 'Printing':
        return 'primary';
      case 'Promotion':
        return 'secondary';
      case 'Stationery & Identity':
        return 'purple';
      case 'Stickers & Labels':
        return 'teal';
      case 'Custom Merchandise & Apparel':
        return 'success';
      case 'Paket Branding UMKM':
        return 'secondary';
      case 'School Yearbook & Graduation Kits':
        return 'purple';
      default:
        return 'gray';
    }
  };

  // Simplify category name helper for single-line badge presentation
  const getShortCategoryName = (cat: string) => {
    switch (cat) {
      case 'Custom Merchandise & Apparel':
        return 'Merchandise';
      case 'Paket Branding UMKM':
        return 'Branding UMKM';
      case 'School Yearbook & Graduation Kits':
        return 'Buku Tahunan';
      case 'Stationery & Identity':
        return 'Stationery';
      case 'Stickers & Labels':
        return 'Stickers';
      default:
        return cat;
    }
  };

  return (
    <div className={styles.card}>
      {/* Product Image Header with overlays */}
      <div className={styles.cardHeader}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className={styles.cardImage}
          />
        ) : (
          <div className={`${styles.cardImagePlaceholder} ${styles[scheme === 'Paket Bundling' ? 'bundleBg' : 'singleBg']}`}></div>
        )}
        
        {/* Scrim overlay for card header badges contrast */}
        <div className={styles.headerScrim}></div>

        <Badge variant={scheme === 'Paket Bundling' ? 'secondary' : 'teal'} className={styles.schemeBadge}>
          {scheme}
        </Badge>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.meta}>
          <Badge variant={getBadgeVariant(category)}>{getShortCategoryName(category)}</Badge>
          <div className={styles.rating}>
            <span className={styles.star}>★</span>
            <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
            <span className={styles.reviewCount}>({reviewCount})</span>
          </div>
        </div>

        <h3 className={styles.title}>{name}</h3>
        <p className={styles.description}>{description}</p>

        <ul className={styles.featuresList}>
          {features.slice(0, 3).map((feature, index) => (
            <li key={index} className={styles.featureItem}>
              <span className={styles.checkIcon}>✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.priceContainer}>
          <span className={styles.priceLabel}>Mulai dari</span>
          <div className={styles.priceWrapper}>
            <span className={styles.priceValue}>{formatPrice(basePrice)}</span>
            <span className={styles.priceUnit}>/{unit}</span>
          </div>
        </div>
        <Button href={`/products/${sku.toLowerCase()}`} variant="outline" size="md" className={styles.actionBtn}>
          Lihat Detail
        </Button>
      </div>
    </div>
  );
}
