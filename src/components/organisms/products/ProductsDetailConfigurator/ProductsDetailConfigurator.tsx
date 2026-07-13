'use client';

import React, { useState, useMemo } from 'react';
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
}

export function ProductsDetailConfigurator({
  sku,
  name,
  category,
  scheme,
  basePrice,
  unit,
  minOrder,
}: ProductsDetailConfiguratorProps) {
  // Configurator states
  const [quantity, setQuantity] = useState(minOrder);
  const [selectedVariant, setSelectedVariant] = useState('STANDARD');
  const [needDesignService, setNeedDesignService] = useState(false);
  
  // File upload state
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string } | null>(null);
  const [dragActive, setDragActive] = useState(false);

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

  // Dynamic pricing calculation logic
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

    // 3. Design fee addition
    const designFee = needDesignService ? (scheme === 'Paket Bundling' ? 150000 : 50000) : 0;
    
    const finalTotal = itemsTotal + designFee;

    return {
      baseUnitPrice: basePrice,
      variantAddon: activeVariantObj.addPrice,
      rawUnitPrice: unitPriceWithVariant,
      discountPercentage: Math.round(discountPct * 100),
      unitPriceFinal: discountedUnitPrice,
      itemsTotal: itemsTotal,
      designServiceFee: designFee,
      totalPrice: finalTotal,
    };
  }, [basePrice, activeVariantObj, quantity, scheme, needDesignService]);

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

  // WhatsApp click checkout handler
  const handleCheckout = () => {
    const waBase = 'https://wa.me/6281234567890';
    const text = `Halo Kertas Lipat! Saya ingin memesan produk kustom berikut:

*Detail Pesanan:*
- *Produk:* ${name} (${sku})
- *Skema:* ${scheme}
- *Kuantitas:* ${quantity} ${unit}
- *Pilihan Varian:* ${activeVariantObj.name}
- *Jasa Desain:* ${needDesignService ? 'Ya (Butuh Bantuan Desain)' : 'Tidak (Sudah Ada File)'}
- *File Desain:* ${uploadedFile ? `${uploadedFile.name} (${uploadedFile.size})` : '-'}

*Kalkulasi Harga:*
- *Harga Unit:* ${formatPrice(pricingCalculation.unitPriceFinal)} / ${unit} ${pricingCalculation.discountPercentage > 0 ? `(Diskon ${pricingCalculation.discountPercentage}%)` : ''}
- *Total Barang:* ${formatPrice(pricingCalculation.itemsTotal)}
- *Biaya Desain:* ${formatPrice(pricingCalculation.designServiceFee)}
- *Total Pembayaran:* *${formatPrice(pricingCalculation.totalPrice)}*

Mohon bantuannya untuk memproses pesanan saya. Terima kasih.`;

    const encodedText = encodeURIComponent(text);
    window.open(`${waBase}?text=${encodedText}`, '_blank');
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

      {/* Design Assistance Service */}
      <div className={styles.configGroup}>
        <label className={styles.designLabel}>
          <input
            type="checkbox"
            className={styles.designCheckbox}
            checked={needDesignService}
            onChange={() => setNeedDesignService(!needDesignService)}
          />
          <div className={styles.designText}>
            <span className={styles.designTitle}>Butuh Jasa Desain Kertas Lipat</span>
            <span className={styles.designDesc}>
              Belum punya file desain siap cetak? Kami bantu buatkan tata letak desain estetik. Tambahan biaya flat: {formatPrice(scheme === 'Paket Bundling' ? 150000 : 50000)}
            </span>
          </div>
        </label>
      </div>

      {/* File Uploader drag and drop */}
      <div className={styles.configGroup}>
        <h3 className={styles.groupTitle}>Kirim Aset / File Desain</h3>
        
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
              id="fileUpload"
              className={styles.fileInput}
              accept=".pdf,.zip,.png,.jpg,.jpeg,.ai"
              onChange={handleFileInput}
            />
            <label htmlFor="fileUpload" className={styles.dropzoneLabel}>
              <span className={styles.uploadIcon}>📁</span>
              <span className={styles.uploadTextPrimary}>Seret & lepas file Anda di sini</span>
              <span className={styles.uploadTextSecondary}>Atau klik untuk pilih file (PDF, ZIP, PNG, AI, maks 20MB)</span>
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

      {/* Price breakdown and checkout */}
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

        {needDesignService && (
          <div className={styles.priceRow}>
            <span className={styles.priceLabel}>Biaya Layanan Desain</span>
            <span className={styles.priceValue}>{formatPrice(pricingCalculation.designServiceFee)}</span>
          </div>
        )}

        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>Total Pembayaran</span>
          <span className={styles.totalValue}>{formatPrice(pricingCalculation.totalPrice)}</span>
        </div>

        <Button variant="secondary" size="lg" className={styles.checkoutBtn} onClick={handleCheckout}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={styles.checkoutWaIcon}>
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.733-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.381 9.805-9.768.002-2.607-1.012-5.059-2.859-6.908-1.847-1.848-4.301-2.865-6.913-2.867-5.407 0-9.809 4.385-9.811 9.773-.001 1.57.425 3.102 1.232 4.478l-.992 3.626 3.731-.977zm11.387-5.464c-.3-.149-1.774-.874-2.047-.973-.272-.1-.471-.149-.669.149-.198.3-.769.973-.943 1.171-.173.198-.347.223-.647.074-.3-.149-1.27-.469-2.42-1.494-.894-.797-1.498-1.782-1.673-2.08-.173-.3-.018-.462.13-.61.135-.133.3-.347.45-.52.149-.174.198-.298.298-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.568-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.774-.726 2.022-1.429.247-.695.247-1.29.173-1.429-.073-.133-.272-.21-.572-.359z"/>
          </svg>
          Pesan via WhatsApp Admin
        </Button>
      </div>
    </div>
  );
}
