'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/atoms/Button/Button';
import styles from './ProductsDetailConfigurator.module.css';

interface ProductsDetailConfiguratorProps {
  sku: string;
  name: string;
  category: string;
  scheme: 'Produk Satuan' | 'Paket Bundling';
  basePrice: number;
  unit: string;
  minOrder: number;
  imageUrl?: string;
  description: string;
  features?: string[];
  pricingType?: string;
}

export function ProductsDetailConfigurator({
  sku,
  name,
  category,
  scheme,
  basePrice,
  unit,
  minOrder,
  imageUrl = '/images/categories/cat_printing.png',
  description,
  features = [],
  pricingType = 'Per Unit',
}: ProductsDetailConfiguratorProps) {
  const { addToCart } = useCart();
  const router = useRouter();

  // Configurator states
  const [quantity, setQuantity] = useState(minOrder);
  const [selectedVariant, setSelectedVariant] = useState('STANDARD');
  const [needDesign, setNeedDesign] = useState(false);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [addOnLamination, setAddOnLamination] = useState(false);
  const [addOnGiftBox, setAddOnGiftBox] = useState(false);
  const [addOnExpress, setAddOnExpress] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Ratings
  const ratingScore = 4.8;
  const reviewCount = 245;

  // Varian configuration mapping based on category/SKU
  const variantOptions = useMemo(() => {
    if (sku.startsWith('KL-STI-04')) {
      // Notebook custom series
      return [
        { id: 'STANDARD', name: 'Steples Tengah', addPrice: 0 },
        { id: 'LEM', name: 'Jilid Lem', addPrice: 1200 },
        { id: 'SPIRAL', name: 'Jilid Spiral', addPrice: 1900 },
      ];
    } else if (sku.startsWith('KL-MRC-07')) {
      // Kipas Tangan series
      return [
        { id: 'STANDARD', name: 'Art Carton', addPrice: 0 },
        { id: 'PVC', name: 'PVC Premium', addPrice: 850 },
      ];
    } else if (category.includes('Yearbook')) {
      // Yearbook series
      return [
        { id: 'STANDARD', name: 'Laminasi Doff', addPrice: 0 },
        { id: 'GLOSSY', name: 'Laminasi Glossy', addPrice: 2000 },
        { id: 'SPOT_UV', name: 'Spot UV Cover', addPrice: 10000 },
      ];
    } else {
      // General fallbacks
      return [
        { id: 'STANDARD', name: 'Bahan Standar', addPrice: 0 },
        { id: 'PREMIUM', name: 'Bahan Premium', addPrice: 10000 },
      ];
    }
  }, [sku, category]);

  const activeVariantObj = variantOptions.find((v) => v.id === selectedVariant) || variantOptions[0];

  // Dynamic pricing calculations (regular vs original crossed-out)
  const pricing = useMemo(() => {
    const rawUnitPrice = basePrice + activeVariantObj.addPrice;
    
    // Add-on Unit Fees
    const laminationFee = addOnLamination ? 1500 : 0;
    const giftBoxFee = addOnGiftBox ? 5000 : 0;
    const expressFee = addOnExpress ? 25000 : 0;

    // Original price is mapped to a 25% markup to show discount
    const originalUnitPrice = Math.round((rawUnitPrice + laminationFee + giftBoxFee) * 1.25);

    // Volume Discount Tiers
    let discountPct = 0;
    if (scheme === 'Produk Satuan') {
      if (quantity >= 10 && quantity < 50) {
        discountPct = 0.10;
      } else if (quantity >= 50) {
        discountPct = 0.20;
      }
    } else {
      if (quantity >= 10) {
        discountPct = 0.10;
      }
    }

    const discountedBasePrice = Math.max(0, Math.round(rawUnitPrice * (1 - discountPct)));
    const discountedUnitPriceWithAddons = discountedBasePrice + laminationFee + giftBoxFee;
    const itemsTotal = (discountedUnitPriceWithAddons * quantity) + expressFee;

    return {
      unitPriceOriginal: originalUnitPrice,
      unitPriceFinal: discountedUnitPriceWithAddons,
      itemsTotal: itemsTotal,
      discountPct: Math.round(discountPct * 100),
    };
  }, [basePrice, activeVariantObj, quantity, scheme, addOnLamination, addOnGiftBox, addOnExpress]);

  // Formatter helper
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Quantity handlers
  const handleQtyChange = (val: number) => {
    if (val >= minOrder) {
      setQuantity(val);
    }
  };

  // Add to cart handler
  const handleAddToCart = () => {
    addToCart({
      sku,
      name,
      category,
      scheme,
      basePrice,
      unit,
      minOrder,
      imageUrl,
      quantity,
      variantId: selectedVariant,
      variantName: activeVariantObj.name,
      variantAddPrice: activeVariantObj.addPrice,
      needDesignService: needDesign,
      addOnLamination: addOnLamination,
      addOnGiftBox: addOnGiftBox,
      addOnExpress: addOnExpress,
    });

    // Show temporary success banner
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 3000);
  };

  // Buy Now handler
  const handleBuyNow = () => {
    addToCart({
      sku,
      name,
      category,
      scheme,
      basePrice,
      unit,
      minOrder,
      imageUrl,
      quantity,
      variantId: selectedVariant,
      variantName: activeVariantObj.name,
      variantAddPrice: activeVariantObj.addPrice,
      needDesignService: needDesign,
      addOnLamination: addOnLamination,
      addOnGiftBox: addOnGiftBox,
      addOnExpress: addOnExpress,
    });
    router.push('/cart');
  };


  return (
    <div className={styles.configurator}>
      {/* 1. Category Tag Pill */}
      <span className={styles.categoryLabel}>{category}</span>

      {/* 2. Title & Stock Status Badge */}
      <div className={styles.titleRow}>
        <h1 className={styles.title}>{name}</h1>
        <span className={styles.stockBadge}>In Stock</span>
      </div>

      {/* 3. Ratings score & review count */}
      <div className={styles.ratingRow}>
        <div className={styles.stars}>
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
        </div>
        <span className={styles.ratingScore}>{ratingScore}</span>
        <span className={styles.reviewCount}>({reviewCount} Review)</span>
      </div>

      {/* 4. Crossed-out Original vs Discount Price */}
      <div className={styles.priceRow}>
        <span className={styles.finalPrice}>{formatPrice(pricing.unitPriceFinal)}</span>
        <span className={styles.originalPrice}>{formatPrice(pricing.unitPriceOriginal)}</span>
        {pricing.discountPct > 0 && (
          <span className={styles.discountBadge}>Hemat {pricing.discountPct}%</span>
        )}
      </div>

      {/* 5. Description snippet with View More toggle */}
      <div className={styles.descriptionContainer}>
        <p className={styles.briefDescription}>
          {description.length > 160 
            ? (isDescExpanded ? description : `${description.slice(0, 160)}...`)
            : description
          }
          {description.length > 160 && (
            <button 
              type="button" 
              className={styles.viewMoreBtn} 
              onClick={() => setIsDescExpanded(!isDescExpanded)}
            >
              {isDescExpanded ? 'View Less' : 'View More'}
            </button>
          )}
        </p>
      </div>

      {/* Features Bullet List */}
      {features && features.length > 0 && (
        <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-main)' }}>Fitur Utama:</span>
          <ul style={{ margin: 0, paddingLeft: '20px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {features.map((feat, idx) => (
              <li key={idx} style={{ fontSize: '12px', color: '#475569', lineHeight: '1.5' }}>{feat}</li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.divider}></div>

      {/* 6. Variant Pills side-by-side */}
      <div className={styles.configGroup}>
        <h3 className={styles.groupTitle}>Pilihan Varian</h3>
        <div className={styles.variantPills}>
          {variantOptions.map((v) => (
            <button
              key={v.id}
              className={`${styles.variantPill} ${selectedVariant === v.id ? styles.pillSelected : ''}`}
              onClick={() => setSelectedVariant(v.id)}
            >
              {v.name}
            </button>
          ))}
        </div>
      </div>

      {/* 6c. Layanan Add-on & Jasa Desain Tambahan */}
      <div className={styles.configGroup}>
        <h3 className={styles.groupTitle}>Layanan Add-on Tambahan</h3>
        <div className={styles.addOnList}>

          <label className={styles.designLabel}>
            <input
              type="checkbox"
              className={styles.designCheckbox}
              checked={needDesign}
              onChange={() => setNeedDesign(!needDesign)}
            />
            <div className={styles.designText}>
              <span className={styles.designTitle}>Butuh Jasa Desain Kertas Lipat</span>
              <span className={styles.designDesc}>
                Belum punya file siap cetak? Kami bantu layout desain estetik (+{formatPrice(scheme === 'Paket Bundling' ? 150000 : 50000)} flat).
              </span>
            </div>
          </label>
          
          <label className={styles.addOnLabel}>
            <input
              type="checkbox"
              className={styles.addOnCheckbox}
              checked={addOnLamination}
              onChange={() => setAddOnLamination(!addOnLamination)}
            />
            <div className={styles.addOnText}>
              <span className={styles.addOnTitle}>Laminasi Protektif Premium</span>
              <span className={styles.addOnDesc}>
                Lapisan doff/glossy pelindung anti air (+{formatPrice(1500)} / {unit}).
              </span>
            </div>
          </label>

          <label className={styles.addOnLabel}>
            <input
              type="checkbox"
              className={styles.addOnCheckbox}
              checked={addOnGiftBox}
              onChange={() => setAddOnGiftBox(!addOnGiftBox)}
            />
            <div className={styles.addOnText}>
              <span className={styles.addOnTitle}>Kemasan Dus Kado Eksklusif</span>
              <span className={styles.addOnDesc}>
                Boks kemasan premium tebal & siap saji souvenir (+{formatPrice(5000)} / {unit}).
              </span>
            </div>
          </label>

          <label className={styles.addOnLabel}>
            <input
              type="checkbox"
              className={styles.addOnCheckbox}
              checked={addOnExpress}
              onChange={() => setAddOnExpress(!addOnExpress)}
            />
            <div className={styles.addOnText}>
              <span className={styles.addOnTitle}>Proses Prioritas Kilat (Express)</span>
              <span className={styles.addOnDesc}>
                Prioritas antrean cetak utama, selesai dalam 1-2 hari kerja (+{formatPrice(25000)} flat).
              </span>
            </div>
          </label>

        </div>
      </div>

      {/* 7. Qty selector + Add to Cart + Wishlist side-by-side */}
      <div className={styles.actionRow}>
        {/* Qty Selector */}
        <div className={styles.qtySelector}>
          <button 
            className={styles.qtyBtn} 
            onClick={() => handleQtyChange(quantity - 1)}
            disabled={quantity <= minOrder}
          >
            -
          </button>
          <span className={styles.qtyValue}>{quantity}</span>
          <button className={styles.qtyBtn} onClick={() => handleQtyChange(quantity + 1)}>+</button>
        </div>

        {/* Add to Cart button */}
        <Button variant="primary" size="lg" className={styles.cartBtn} onClick={handleAddToCart}>
          Add to Cart
        </Button>

        {/* Buy Now button */}
        <Button variant="secondary" size="lg" className={styles.buyNowBtn} onClick={handleBuyNow}>
          Buy Now
        </Button>

        {/* Wishlist Heart button */}
        <button
          className={`${styles.wishlistBtn} ${isWishlisted ? styles.wishlisted : ''}`}
          onClick={() => setIsWishlisted(!isWishlisted)}
          aria-label="Add to wishlist"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={isWishlisted ? '#ef4444' : 'none'} stroke={isWishlisted ? '#ef4444' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      <div className={styles.divider}></div>

      {/* 8. SKU & Tags details */}
      <div className={styles.metaDetails}>
        <div className={styles.metaLine}>
          <span className={styles.metaLabel}>SKU:</span>
          <span className={styles.metaValue}>{sku}</span>
        </div>
        <div className={styles.metaLine}>
          <span className={styles.metaLabel}>Skema Harga:</span>
          <span className={styles.metaValue}>{pricingType}</span>
        </div>
        <div className={styles.metaLine}>
          <span className={styles.metaLabel}>Minimal Order:</span>
          <span className={styles.metaValue}>{minOrder} {unit}</span>
        </div>
        <div className={styles.metaLine}>
          <span className={styles.metaLabel}>Tags:</span>
          <span className={styles.metaValue}>{category}, {scheme}</span>
        </div>
      </div>

      {/* Success Toast Notification */}
      {showSuccessToast && (
        <div className={styles.toast}>
          <span className={styles.toastIcon}>✓</span>
          <div className={styles.toastText}>
            <strong>Berhasil!</strong>
            <span>Item ditambahkan ke keranjang belanja.</span>
          </div>
        </div>
      )}
    </div>
  );
}

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#F5A623" stroke="#F5A623">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

