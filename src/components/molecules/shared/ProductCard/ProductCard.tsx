import React from 'react';
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

  return (
    <div className={styles.card}>
      {/* Decorative top section with abstract origami shape background */}
      <div className={`${styles.cardHeader} ${styles[scheme === 'Paket Bundling' ? 'bundleBg' : 'singleBg']}`}>
        <span className={styles.sku}>{sku}</span>
        <Badge variant={scheme === 'Paket Bundling' ? 'secondary' : 'teal'}>
          {scheme}
        </Badge>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.meta}>
          <Badge variant={getBadgeVariant(category)}>{category}</Badge>
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
        <Button variant="outline" size="sm" className={styles.actionBtn}>
          Pesan Custom
        </Button>
      </div>
    </div>
  );
}
