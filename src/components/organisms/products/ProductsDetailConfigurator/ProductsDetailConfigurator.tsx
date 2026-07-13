'use client';

import React, { useState, useMemo } from 'react';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/atoms/Badge/Badge';
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
}: ProductsDetailConfiguratorProps) {
  const { addToCart } = useCart();

  // Configurator states
  const [quantity, setQuantity] = useState(minOrder);
  const [selectedVariant, setSelectedVariant] = useState('STANDARD');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Varian configuration mapping based on category/SKU
  const variantOptions = useMemo(() => {
    if (sku.startsWith('KL-STI-04')) {
      // Notebook custom series
      return [
        { id: 'STANDARD', name: 'Jilid Steples Tengah (Hemat)', addPrice: 0 },
        { id: 'LEM', name: 'Jilid Lem (Rapi)', addPrice: 1200 },
        { id: 'SPIRAL', name: 'Jilid Spiral (Bisa Buka Rata)', addPrice: 1900 },
      ];
    } else if (sku.startsWith('KL-MRC-07')) {
      // Kipas Tangan series
      return [
        { id: 'STANDARD', name: 'Bahan Art Carton (Ringan)', addPrice: 0 },
        { id: 'PVC', name: 'Bahan PVC Premium (Kokoh)', addPrice: 850 },
      ];
    } else if (category.includes('Yearbook')) {
      // Yearbook series
      return [
        { id: 'STANDARD', name: 'Laminasi Doff (Sleek)', addPrice: 0 },
        { id: 'GLOSSY', name: 'Laminasi Glossy (Mengkilap)', addPrice: 2000 },
        { id: 'SPOT_UV', name: 'Cover Hard + Spot UV (Mewah)', addPrice: 10000 },
      ];
    } else {
      // General fallbacks
      return [
        { id: 'STANDARD', name: 'Varian Standar', addPrice: 0 },
        { id: 'PREMIUM', name: 'Varian Premium / Laminasi', addPrice: 10000 },
      ];
    }
  }, [sku, category]);

  const activeVariantObj = variantOptions.find((v) => v.id === selectedVariant) || variantOptions[0];

  // Dynamic pricing calculation logic (excluding design fee from PDP)
  const pricingCalculation = useMemo(() => {
    // 1. Calculate base unit price with variant addon
    const unitPriceWithVariant = basePrice + activeVariantObj.addPrice;

    // 2. Volume Discount Tiers
    let discountPct = 0;
    if (scheme === 'Produk Satuan') {
      if (quantity >= 10 && quantity < 50) {
        discountPct = 0.10; // 10% discount
      } else if (quantity >= 50) {
        discountPct = 0.20; // 20% discount (Grosir)
      }
    } else {
      // Bundles have smaller volume tiers or bulk discounts
      if (quantity >= 10) {
        discountPct = 0.10;
      }
    }

    const discountedUnitPrice = Math.max(0, Math.round(unitPriceWithVariant * (1 - discountPct)));
    const itemsTotal = discountedUnitPrice * quantity;

    return {
      baseUnitPrice: basePrice,
      variantAddon: activeVariantObj.addPrice,
      rawUnitPrice: unitPriceWithVariant,
      discountPercentage: Math.round(discountPct * 100),
      unitPriceFinal: discountedUnitPrice,
      itemsTotal: itemsTotal,
    };
  }, [basePrice, activeVariantObj, quantity, scheme]);

  // Formatter helper
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
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
    });

    // Show temporary success banner
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 3000);
  };

  return (
    <div className={styles.configurator}>
      {/* Desktop Meta header info */}
      <div className={styles.desktopMeta}>
        <div className={styles.badgesRow}>
          <Badge variant="primary">{category}</Badge>
          <Badge variant={scheme === 'Paket Bundling' ? 'secondary' : 'teal'}>{scheme}</Badge>
        </div>
        <h1 className={styles.title}>{name}</h1>
        <span className={styles.sku}>SKU: {sku}</span>
      </div>

      <div className={styles.contentDivider}></div>

      {/* Varian Option Selector */}
      <div className={styles.configGroup}>
        <h3 className={styles.groupTitle}>Pilih Varian & Finishing</h3>
        <div className={styles.variantGrid}>
          {variantOptions.map((v) => (
            <button
              key={v.id}
              className={`${styles.variantOption} ${selectedVariant === v.id ? styles.variantSelected : ''}`}
              onClick={() => setSelectedVariant(v.id)}
            >
              <span className={styles.variantName}>{v.name}</span>
              {v.addPrice > 0 && (
                <span className={styles.variantAddPrice}>+{formatPrice(v.addPrice)}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity Selector */}
      <div className={styles.configGroup}>
        <h3 className={styles.groupTitle}>Tentukan Kuantitas ({unit})</h3>
        <div className={styles.qtyRow}>
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
          <span className={styles.qtyMinLabel}>Minimal order: {minOrder} {unit}</span>
        </div>
      </div>

      {/* Price breakdown and Cart addition */}
      <div className={styles.pricingSummary}>
        <div className={styles.priceRow}>
          <span className={styles.priceLabel}>Harga Varian Unit</span>
          <span className={styles.priceValue}>{formatPrice(pricingCalculation.rawUnitPrice)}</span>
        </div>
        
        {pricingCalculation.discountPercentage > 0 && (
          <div className={styles.priceRow}>
            <span className={`${styles.priceLabel} ${styles.discountColor}`}>Diskon Volume ({pricingCalculation.discountPercentage}%)</span>
            <span className={`${styles.priceValue} ${styles.discountColor}`}>-{formatPrice(pricingCalculation.rawUnitPrice - pricingCalculation.unitPriceFinal)}</span>
          </div>
        )}

        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>Subtotal Barang</span>
          <span className={styles.totalValue}>{formatPrice(pricingCalculation.itemsTotal)}</span>
        </div>

        <Button variant="primary" size="lg" className={styles.checkoutBtn} onClick={handleAddToCart}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.cartBtnIcon}>
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          Tambah ke Keranjang
        </Button>
      </div>

      {/* Success Notification Alert */}
      {showSuccessToast && (
        <div className={styles.toast}>
          <span className={styles.toastIcon}>✓</span>
          <div className={styles.toastText}>
            <strong>Berhasil Ditambahkan!</strong>
            <span>Produk masuk ke keranjang belanja Anda.</span>
          </div>
        </div>
      )}
    </div>
  );
}
