'use client';

import React, { useState, useMemo } from 'react';
import { useCart, CartItem } from '@/context/CartContext';
import { Button } from '@/components/atoms/Button/Button';
import styles from './CartCheckoutPanel.module.css';

export function CartCheckoutPanel() {
  const { cartItems, clearCart } = useCart();

  // File upload states
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string } | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // Formatting currency helper
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Helper: calculate unit price with variant addon and volume discount
  const getItemFinalUnitPrice = (item: CartItem) => {
    const unitPriceWithVariant = item.basePrice + item.variantAddPrice;
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

    return Math.max(0, Math.round(unitPriceWithVariant * (1 - discountPct)));
  };

  // Combined price calculations
  const totals = useMemo(() => {
    // 1. Items subtotal
    const itemsSubtotal = cartItems.reduce((acc, item) => {
      const finalPrice = getItemFinalUnitPrice(item);
      return acc + (finalPrice * item.quantity);
    }, 0);

    // 2. Sum up design fees for each item having needDesignService active
    const designFee = cartItems.reduce((acc, item) => {
      if (item.needDesignService) {
        return acc + (item.scheme === 'Paket Bundling' ? 150000 : 50000);
      }
      return acc;
    }, 0);

    // 3. Final total
    const finalTotal = itemsSubtotal + designFee;

    return {
      itemsSubtotal,
      designFee,
      finalTotal,
    };
  }, [cartItems]);

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setUploadedFile({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      });
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      });
    }
  };

  // Combined WhatsApp Checkout compiler
  const handleWhatsAppCheckout = () => {
    const waBase = 'https://wa.me/6281234567890';
    
    // Compile items list string
    const itemsListBrief = cartItems.map((item, index) => {
      const unitPrice = getItemFinalUnitPrice(item);
      const total = unitPrice * item.quantity;
      return `${index + 1}. *${item.name}* (${item.sku})
   - Kuantitas: ${item.quantity} ${item.unit}
   - Varian: ${item.variantName}
   - Jasa Desain: ${item.needDesignService ? 'Ya' : 'Tidak'}
   - Harga Unit: ${formatPrice(unitPrice)}
   - Subtotal: ${formatPrice(total)}`;
    }).join('\n\n');

    const hasDesignService = cartItems.some((item) => item.needDesignService);
    const designServiceList = cartItems
      .filter((item) => item.needDesignService)
      .map((item) => `   - ${item.name} (${item.variantName})`)
      .join('\n');

    const text = `Halo Kertas Lipat! Saya ingin memesan produk kustom dari keranjang belanja saya:

*Rincian Barang Cetak:*
${itemsListBrief}

*Pilihan Layanan & File:*
- *Jasa Desain:* ${hasDesignService ? `Ya, aktif pada:\n${designServiceList}` : 'Tidak (Sudah Ada File)'}
- *File Desain:* ${uploadedFile ? `${uploadedFile.name} (${uploadedFile.size})` : '-'}

*Kalkulasi Pembayaran:*
- *Total Barang:* ${formatPrice(totals.itemsSubtotal)}
- *Biaya Desain:* ${formatPrice(totals.designFee)}
- *Total Pembayaran:* *${formatPrice(totals.finalTotal)}*

Mohon instruksi selanjutnya untuk pengiriman file final dan konfirmasi pembayaran. Terima kasih.`;

    const encodedText = encodeURIComponent(text);
    
    // Clear cart locally after checkout redirection
    clearCart();
    
    window.open(`${waBase}?text=${encodedText}`, '_blank');
  };

  if (cartItems.length === 0) {
    return null; // Don't show panel if cart is empty
  }

  return (
    <div className={styles.panel}>
      <h3 className={styles.title}>Ringkasan Pembayaran & Aset</h3>
      
      <div className={styles.divider}></div>

      {/* File Uploader drag and drop */}
      <div className={styles.panelGroup}>
        <h4 className={styles.groupTitle}>Kirim Aset / File Desain</h4>
        {!uploadedFile ? (
          <div
            className={`${styles.dropzone} ${dragActive ? styles.dropzoneActive : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="cartFileUpload"
              className={styles.fileInput}
              accept=".pdf,.zip,.png,.jpg,.jpeg,.ai"
              onChange={handleFileInput}
            />
            <label htmlFor="cartFileUpload" className={styles.dropzoneLabel}>
              <span className={styles.uploadIcon}>📁</span>
              <span className={styles.uploadTextPrimary}>Seret & lepas file Anda di sini</span>
              <span className={styles.uploadTextSecondary}>ZIP, PDF, PNG, JPG (maks 20MB)</span>
            </label>
          </div>
        ) : (
          <div className={styles.uploadedFileCard}>
            <span className={styles.fileIcon}>📄</span>
            <div className={styles.fileMeta}>
              <span className={styles.fileName}>{uploadedFile.name}</span>
              <span className={styles.fileSize}>{uploadedFile.size}</span>
            </div>
            <button className={styles.removeFileBtn} onClick={() => setUploadedFile(null)}>
              ✕
            </button>
          </div>
        )}
      </div>

      <div className={styles.divider}></div>

      {/* Dynamic price summary */}
      <div className={styles.summaryBox}>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Total Harga Barang</span>
          <span className={styles.summaryValue}>{formatPrice(totals.itemsSubtotal)}</span>
        </div>
        
        {totals.designFee > 0 && (
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Biaya Layanan Desain</span>
            <span className={styles.summaryValue}>{formatPrice(totals.designFee)}</span>
          </div>
        )}

        <div className={`${styles.summaryRow} ${styles.finalTotalRow}`}>
          <span className={styles.finalTotalLabel}>Total Pembayaran</span>
          <span className={styles.finalTotalValue}>{formatPrice(totals.finalTotal)}</span>
        </div>

        <Button variant="secondary" size="lg" className={styles.checkoutBtn} onClick={handleWhatsAppCheckout}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={styles.waIcon}>
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.733-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.381 9.805-9.768.002-2.607-1.012-5.059-2.859-6.908-1.847-1.848-4.301-2.865-6.913-2.867-5.407 0-9.809 4.385-9.811 9.773-.001 1.57.425 3.102 1.232 4.478l-.992 3.626 3.731-.977zm11.387-5.464c-.3-.149-1.774-.874-2.047-.973-.272-.1-.471-.149-.669.149-.198.3-.769.973-.943 1.171-.173.198-.347.223-.647.074-.3-.149-1.27-.469-2.42-1.494-.894-.797-1.498-1.782-1.673-2.08-.173-.3-.018-.462.13-.61.135-.133.3-.347.45-.52.149-.174.198-.298.298-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.568-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.774-.726 2.022-1.429.247-.695.247-1.29.173-1.429-.073-.133-.272-.21-.572-.359z"/>
          </svg>
          Pesan via WhatsApp Admin
        </Button>
      </div>
    </div>
  );
}
