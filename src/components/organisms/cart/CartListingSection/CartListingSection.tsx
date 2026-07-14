'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart, CartItem } from '@/context/CartContext';
import styles from './CartListingSection.module.css';

export function CartListingSection() {
  const { cartItems, updateQty, removeFromCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleQtyChange = (item: CartItem, newQty: number) => {
    if (newQty >= item.minOrder) {
      updateQty(
        item.sku, 
        item.variantId, 
        newQty, 
        item.needDesignService,
        item.addOnLamination,
        item.addOnGiftBox,
        item.addOnExpress
      );
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <div className={styles.emptyIcon}>🛒</div>
        <h2 className={styles.emptyTitle}>Keranjang Belanja Kosong</h2>
        <p className={styles.emptyDesc}>
          Anda belum menambahkan produk cetak kustom apa pun ke keranjang belanja. Silakan jelajahi katalog produk kami.
        </p>
        <Link href="/products" className={styles.shopBtn}>
          Jelajahi Produk Kami
        </Link>
      </div>
    );
  }

  // Calculate item unit price with variant addon and volume discount
  const getItemFinalUnitPrice = (item: CartItem) => {
    const unitPriceWithVariant = item.basePrice + item.variantAddPrice;
    const laminationFee = item.addOnLamination ? (item.addOnLaminationPrice ?? 1500) : 0;
    const giftBoxFee = item.addOnGiftBox ? (item.addOnGiftBoxPrice ?? 5000) : 0;
    
    let discountPct = 0;
    if (item.scheme === 'Produk Satuan') {
      if (item.quantity >= 10 && item.quantity < 50) {
        discountPct = 0.10;
      } else if (item.quantity >= 50) {
        discountPct = 0.20;
      }
    } else {
      if (item.quantity >= 10) {
        discountPct = 0.10;
      }
    }

    const discountedBase = Math.max(0, Math.round(unitPriceWithVariant * (1 - discountPct)));
    return discountedBase + laminationFee + giftBoxFee;
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.title}>Daftar Pesanan ({cartItems.length})</h2>
      
      <div className={styles.list}>
        {cartItems.map((item) => {
          const finalUnitPrice = getItemFinalUnitPrice(item);
          const expressFee = item.addOnExpress ? (item.addOnExpressPrice ?? 25000) : 0;
          const itemTotal = (finalUnitPrice * item.quantity) + expressFee;
          
          const uniqueKey = `${item.sku}-${item.variantId}-${item.needDesignService ? 'design' : 'nodesign'}-${item.addOnLamination ? 'lam' : 'nolam'}-${item.addOnGiftBox ? 'box' : 'nobox'}-${item.addOnExpress ? 'exp' : 'noexp'}`;

          return (
            <div key={uniqueKey} className={styles.itemRow}>
              {/* Product Visual */}
              <div className={styles.visualColumn}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className={styles.image}
                  />
                </div>
              </div>

              {/* Product Details */}
              <div className={styles.detailsColumn}>
                <div className={styles.productHeader}>
                  <Link href={`/products/${item.sku.toLowerCase()}`} className={styles.productName}>
                    {item.name}
                  </Link>
                  <span className={styles.sku}>{item.sku}</span>
                </div>
                <div className={styles.badges}>
                  <span className={styles.badge}>{item.category}</span>
                  <span className={`${styles.badge} ${styles.variantBadge}`}>{item.variantName}</span>
                  {item.needDesignService && (
                    <span className={`${styles.badge} ${styles.designBadge}`}>+ Jasa Desain</span>
                  )}
                  {item.addOnLamination && (
                    <span className={`${styles.badge} ${styles.addOnBadge}`}>+ {item.addOnLaminationName ?? 'Laminasi'}</span>
                  )}
                  {item.addOnGiftBox && (
                    <span className={`${styles.badge} ${styles.addOnBadge}`}>+ {item.addOnGiftBoxName ?? 'Dus Kado'}</span>
                  )}
                  {item.addOnExpress && (
                    <span className={`${styles.badge} ${styles.addOnBadge}`}>+ {item.addOnExpressName ?? 'Kilat'}</span>
                  )}
                </div>
                <div className={styles.unitPriceInfo}>
                  Harga unit: <strong>{formatPrice(finalUnitPrice)}</strong> /{item.unit}
                </div>
              </div>

              {/* Quantity Controls */}
              <div className={styles.qtyColumn}>
                <div className={styles.qtySelector}>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => handleQtyChange(item, item.quantity - 1)}
                    disabled={item.quantity <= item.minOrder}
                  >
                    -
                  </button>
                  <span className={styles.qtyValue}>{item.quantity}</span>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => handleQtyChange(item, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <span className={styles.minOrderLabel}>Min. Order: {item.minOrder}</span>
              </div>

              {/* Subtotal & Actions */}
              <div className={styles.totalColumn}>
                <div className={styles.totalPrice}>{formatPrice(itemTotal)}</div>
                <button
                  className={styles.deleteBtn}
                  onClick={() => removeFromCart(
                    item.sku,
                    item.variantId,
                    item.needDesignService,
                    item.addOnLamination,
                    item.addOnGiftBox,
                    item.addOnExpress
                  )}
                  aria-label="Hapus Item"
                >
                  Hapus 🗑️
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
