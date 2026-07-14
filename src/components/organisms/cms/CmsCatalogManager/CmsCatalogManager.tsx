/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Undo, Save, RefreshCw } from 'lucide-react';
import { useProductCatalog, Product } from '@/hooks/useProductCatalog';
import styles from './CmsCatalogManager.module.css';

export function CmsCatalogManager() {
  const {
    catalog,
    isLoaded,
    addProduct,
    updateProduct,
    deleteProduct,
    resetCatalog,
  } = useProductCatalog();

  const [searchQuery, setSearchQuery] = useState('');
  const [schemeFilter, setSchemeFilter] = useState<'ALL' | 'SATUAN' | 'BUNDLING'>('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  // CRUD state
  const [isEditing, setIsEditing] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [isNewProduct, setIsNewProduct] = useState(false);

  if (!isLoaded) {
    return (
      <div className={styles.loadingWrapper}>
        <RefreshCw size={24} className={styles.spinIcon} />
        <p>Memuat katalog produk...</p>
      </div>
    );
  }

  // Get unique categories for filter dropdown
  const categories = Array.from(new Set(catalog.map((p) => p.category)));

  // Filter catalog
  const filteredCatalog = catalog.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesScheme =
      schemeFilter === 'ALL' ||
      (schemeFilter === 'SATUAN' && p.scheme === 'Produk Satuan') ||
      (schemeFilter === 'BUNDLING' && p.scheme === 'Paket Bundling');

    const matchesCategory =
      categoryFilter === 'ALL' || p.category === categoryFilter;

    return matchesSearch && matchesScheme && matchesCategory;
  });

  const handleOpenAdd = () => {
    setEditProduct({
      sku: '',
      name: '',
      scheme: 'Produk Satuan',
      category: 'Printing',
      pricingType: 'Per Pcs',
      basePrice: 0,
      unit: 'pcs',
      minOrder: 1,
      description: '',
      imageUrl: '/images/categories/cat_printing.png',
      images: ['/images/categories/cat_printing.png', '', '', '', '', '', '', ''],
      displayImageCount: 8,
      showReviews: true,
      useDiscountPrice: false,
      discountPrice: 0,
      variants: [],
      addons: [],
      tags: [],
    });
    setIsNewProduct(true);
    setIsEditing(true);
  };

  const handleOpenEdit = (product: Product) => {
    const normalized = JSON.parse(JSON.stringify(product));
    
    // Normalize images (length 8)
    if (!normalized.images || normalized.images.length === 0) {
      normalized.images = [normalized.imageUrl || '/images/categories/cat_printing.png', '', '', '', '', '', '', ''];
    } else {
      const imgArray = [...normalized.images];
      while (imgArray.length < 8) {
        imgArray.push('');
      }
      normalized.images = imgArray;
    }
    
    if (normalized.displayImageCount === undefined) normalized.displayImageCount = 8;
    if (normalized.showReviews === undefined) normalized.showReviews = true;
    if (normalized.useDiscountPrice === undefined) normalized.useDiscountPrice = false;
    if (normalized.discountPrice === undefined) normalized.discountPrice = 0;
    if (!normalized.variants) normalized.variants = [];
    if (!normalized.addons) normalized.addons = [];
    if (!normalized.tags) normalized.tags = [];

    setEditProduct(normalized);
    setIsNewProduct(false);
    setIsEditing(true);
  };

  const handleDelete = (sku: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus produk dengan SKU ${sku}?`)) {
      deleteProduct(sku);
    }
  };

  const handleResetCatalog = () => {
    if (confirm('Apakah Anda yakin ingin mengembalikan seluruh katalog produk ke setelan awal (default)?')) {
      resetCatalog();
    }
  };

  const handleSlotImageUpload = (file: File, slotIndex: number) => {
    const MAX_SIZE = 2 * 1024 * 1024; // 2MB
    if (file.size > MAX_SIZE) {
      alert('Ukuran berkas terlalu besar. Maksimal ukuran berkas adalah 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string' && editProduct) {
        const nextImages = [...(editProduct.images || [])];
        nextImages[slotIndex] = reader.result;
        
        // Slot 1 (index 0) updates imageUrl too for backward compatibility
        const updateObj: Partial<Product> = { images: nextImages };
        if (slotIndex === 0) {
          updateObj.imageUrl = reader.result;
        }
        
        setEditProduct({ ...editProduct, ...updateObj });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleClearSlotImage = (slotIndex: number) => {
    if (slotIndex === 0) {
      alert('Slot 1 (Foto Utama) wajib diisi.');
      return;
    }
    if (editProduct) {
      const nextImages = [...(editProduct.images || [])];
      nextImages[slotIndex] = '';
      setEditProduct({ ...editProduct, images: nextImages });
    }
  };

  const handleAddVariant = () => {
    if (editProduct) {
      const nextVariants = [...(editProduct.variants || []), { name: 'Varian Baru', addPrice: 0 }];
      setEditProduct({ ...editProduct, variants: nextVariants });
    }
  };

  const handleEditVariant = (index: number, key: 'name' | 'addPrice', value: any) => {
    if (editProduct) {
      const nextVariants = [...(editProduct.variants || [])];
      nextVariants[index] = { ...nextVariants[index], [key]: value };
      setEditProduct({ ...editProduct, variants: nextVariants });
    }
  };

  const handleRemoveVariant = (index: number) => {
    if (editProduct) {
      const nextVariants = (editProduct.variants || []).filter((_, idx) => idx !== index);
      setEditProduct({ ...editProduct, variants: nextVariants });
    }
  };

  const handleAddAddon = () => {
    if (editProduct) {
      const nextAddons = [...(editProduct.addons || []), { name: 'Add-on Baru', price: 0, description: '' }];
      setEditProduct({ ...editProduct, addons: nextAddons });
    }
  };

  const handleEditAddon = (index: number, key: 'name' | 'price' | 'description', value: any) => {
    if (editProduct) {
      const nextAddons = [...(editProduct.addons || [])];
      nextAddons[index] = { ...nextAddons[index], [key]: value };
      setEditProduct({ ...editProduct, addons: nextAddons });
    }
  };

  const handleRemoveAddon = (index: number) => {
    if (editProduct) {
      const nextAddons = (editProduct.addons || []).filter((_, idx) => idx !== index);
      setEditProduct({ ...editProduct, addons: nextAddons });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProduct) return;

    if (!editProduct.images || !editProduct.images[0]) {
      alert('Slot 1 (Foto Utama) wajib diunggah.');
      return;
    }

    if (isNewProduct) {
      // Check for duplicate SKU
      const duplicate = catalog.some((p) => p.sku.toLowerCase() === editProduct.sku.toLowerCase());
      if (duplicate) {
        alert(`SKU ${editProduct.sku} sudah terdaftar! Harap gunakan SKU lain.`);
        return;
      }
      addProduct(editProduct);
    } else {
      updateProduct(editProduct.sku, editProduct);
    }
    setIsEditing(false);
    setEditProduct(null);
  };

  return (
    <div className={styles.workspace}>
      {!isEditing ? (
        <div className={styles.card}>
          {/* Header & Controls bar */}
          <div className={styles.cardHeader}>
            <div>
              <h2 className={styles.cardTitle}>Manajemen Katalog Produk</h2>
              <span className={styles.cardSubtitle}>
                Kelola daftar produk satuan, paket bundling, harga dasar, dan deskripsi produk.
              </span>
            </div>

            <div className={styles.headerActions}>
              <button onClick={handleResetCatalog} className={styles.btnOutline}>
                <RefreshCw size={14} />
                <span>Reset Katalog</span>
              </button>
              <button onClick={handleOpenAdd} className={styles.btnPrimary}>
                <Plus size={14} />
                <span>Tambah Produk</span>
              </button>
            </div>
          </div>

          {/* Search & Filters Bar */}
          <div className={styles.filtersBar}>
            <div className={styles.searchWrapper}>
              <Search className={styles.searchIcon} size={16} />
              <input
                type="text"
                placeholder="Cari SKU atau nama produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <div className={styles.filterDropdowns}>
              <select
                value={schemeFilter}
                onChange={(e) => setSchemeFilter(e.target.value as any)}
                className={styles.filterSelect}
              >
                <option value="ALL">Semua Skema</option>
                <option value="SATUAN">Produk Satuan</option>
                <option value="BUNDLING">Paket Bundling</option>
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="ALL">Semua Kategori</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Table list */}
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>Foto</th>
                  <th>SKU</th>
                  <th>Nama Produk</th>
                  <th>Kategori</th>
                  <th>Skema</th>
                  <th>Harga Dasar</th>
                  <th>Min. Order</th>
                  <th style={{ width: '120px', textAlign: 'center' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredCatalog.length > 0 ? (
                  filteredCatalog.map((product) => (
                    <tr key={product.sku}>
                      <td>
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className={styles.tableThumbnail}
                        />
                      </td>
                      <td className={styles.skuText}>{product.sku}</td>
                      <td className={styles.productNameText}>{product.name}</td>
                      <td>
                        <span className={styles.categoryBadge}>{product.category}</span>
                      </td>
                      <td>
                        <span
                          className={`${styles.schemeBadge} ${
                            product.scheme === 'Paket Bundling' ? styles.schemeBundle : styles.schemeSingle
                          }`}
                        >
                          {product.scheme}
                        </span>
                      </td>
                      <td className={styles.priceText}>
                        Rp {product.basePrice.toLocaleString('id-ID')} / {product.unit}
                      </td>
                      <td style={{ textAlign: 'center' }}>{product.minOrder}</td>
                      <td>
                        <div className={styles.actionButtons}>
                          <button
                            onClick={() => handleOpenEdit(product)}
                            className={styles.actionBtnEdit}
                            title="Edit data produk"
                          >
                            <Edit2 size={12} />
                          </button>
                          <button
                            onClick={() => handleDelete(product.sku)}
                            className={styles.actionBtnDelete}
                            title="Hapus produk"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} style={{ textAlign: 'center', padding: '40px 0', color: '#64748b' }}>
                      Tidak ada produk katalog yang sesuai dengan pencarian Anda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Edit / Add Product Form Sheet */
        <div className={styles.card}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.cardHeader}>
              <div>
                <h2 className={styles.cardTitle}>
                  {isNewProduct ? 'Tambah Produk Katalog Baru' : `Edit Produk: ${editProduct?.sku}`}
                </h2>
                <span className={styles.cardSubtitle}>
                  Isi parameter identitas, harga, dan fitur produk secara lengkap.
                </span>
              </div>

              <div className={styles.headerActions}>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditProduct(null);
                  }}
                  className={styles.btnOutline}
                >
                  <Undo size={14} />
                  <span>Batalkan</span>
                </button>
                <button type="submit" className={styles.btnPrimary}>
                  <Save size={14} />
                  <span>Simpan Produk</span>
                </button>
              </div>
            </div>

            {editProduct && (
              <div className={styles.formBody}>
                <div className={styles.formRow}>
                  {/* SKU */}
                  <div className={styles.formGroup}>
                    <label className={styles.label}>SKU Produk (Unik) *</label>
                    <input
                      type="text"
                      value={editProduct.sku}
                      onChange={(e) => setEditProduct({ ...editProduct, sku: e.target.value })}
                      disabled={!isNewProduct}
                      className={styles.input}
                      required
                      placeholder="Contoh: KL-MRC-99"
                    />
                  </div>

                  {/* Nama */}
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Nama Produk *</label>
                    <input
                      type="text"
                      value={editProduct.name}
                      onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                      className={styles.input}
                      required
                      placeholder="Contoh: Kaos Kustom DTF"
                    />
                  </div>

                  {/* Skema */}
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Skema Pembelian *</label>
                    <select
                      value={editProduct.scheme}
                      onChange={(e) =>
                        setEditProduct({ ...editProduct, scheme: e.target.value as any })
                      }
                      className={styles.select}
                    >
                      <option value="Produk Satuan">Produk Satuan</option>
                      <option value="Paket Bundling">Paket Bundling</option>
                    </select>
                  </div>

                  {/* Kategori */}
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Kategori Produk *</label>
                    <select
                      value={editProduct.category}
                      onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
                      className={styles.select}
                    >
                      <option value="Printing">Printing</option>
                      <option value="Promotion">Promotion</option>
                      <option value="Stationery & Identity">Stationery & Identity</option>
                      <option value="Stickers & Labels">Stickers & Labels</option>
                      <option value="Custom Merchandise & Apparel">Custom Merchandise & Apparel</option>
                      <option value="Paket Branding UMKM">Paket Branding UMKM</option>
                      <option value="School Yearbook & Graduation Kits">School Yearbook & Graduation Kits</option>
                    </select>
                  </div>

                  {/* Tipe Harga */}
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Tipe Pricing / Kalkulasi *</label>
                    <input
                      type="text"
                      value={editProduct.pricingType}
                      onChange={(e) => setEditProduct({ ...editProduct, pricingType: e.target.value })}
                      className={styles.input}
                      required
                      placeholder="Contoh: Per Pcs, Per Lembar A3, Custom"
                    />
                  </div>

                  {/* Harga Dasar */}
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Harga Dasar (Rupiah) *</label>
                    <input
                      type="number"
                      value={editProduct.basePrice}
                      onChange={(e) =>
                        setEditProduct({ ...editProduct, basePrice: parseInt(e.target.value) || 0 })
                      }
                      className={styles.input}
                      required
                      min="0"
                    />
                  </div>

                  {/* Satuan */}
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Satuan Produk *</label>
                    <input
                      type="text"
                      value={editProduct.unit}
                      onChange={(e) => setEditProduct({ ...editProduct, unit: e.target.value })}
                      className={styles.input}
                      required
                      placeholder="Contoh: pcs, buku, paket, m²"
                    />
                  </div>

                  {/* Min. Order */}
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Minimal Pembelian (Order) *</label>
                    <input
                      type="number"
                      value={editProduct.minOrder}
                      onChange={(e) =>
                        setEditProduct({ ...editProduct, minOrder: parseInt(e.target.value) || 1 })
                      }
                      className={styles.input}
                      required
                      min="1"
                    />
                  </div>

                   {/* Tampilkan Review Toggle */}
                  <div className={styles.formGroup} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="checkbox"
                      id="showReviews"
                      checked={editProduct.showReviews}
                      onChange={(e) => setEditProduct({ ...editProduct, showReviews: e.target.checked })}
                      style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                    />
                    <label htmlFor="showReviews" className={styles.label} style={{ margin: 0, cursor: 'pointer' }}>
                      Tampilkan Ulasan/Review Produk
                    </label>
                  </div>

                  {/* Harga Diskon Toggle */}
                  <div className={styles.formGroup} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="checkbox"
                      id="useDiscountPrice"
                      checked={editProduct.useDiscountPrice}
                      onChange={(e) => setEditProduct({ ...editProduct, useDiscountPrice: e.target.checked })}
                      style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                    />
                    <label htmlFor="useDiscountPrice" className={styles.label} style={{ margin: 0, cursor: 'pointer' }}>
                      Aktifkan Harga Diskon
                    </label>
                  </div>

                  {/* Input Harga Diskon */}
                  {editProduct.useDiscountPrice && (
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Harga Diskon (Rupiah) *</label>
                      <input
                        type="number"
                        value={editProduct.discountPrice}
                        onChange={(e) =>
                          setEditProduct({ ...editProduct, discountPrice: parseInt(e.target.value) || 0 })
                        }
                        className={styles.input}
                        required
                        min="0"
                      />
                    </div>
                  )}

                  {/* Selector Jumlah Foto */}
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Jumlah Foto Ditampilkan di Slider (1-8) *</label>
                    <select
                      value={editProduct.displayImageCount}
                      onChange={(e) =>
                        setEditProduct({ ...editProduct, displayImageCount: parseInt(e.target.value) || 8 })
                      }
                      className={styles.select}
                    >
                      {[1,2,3,4,5,6,7,8].map((n) => (
                        <option key={n} value={n}>{n} Foto</option>
                      ))}
                    </select>
                  </div>

                  {/* Tags Input */}
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Tag Produk (pisahkan dengan koma)</label>
                    <input
                      type="text"
                      value={editProduct.tags ? editProduct.tags.join(', ') : ''}
                      onChange={(e) => {
                        const nextTags = e.target.value.split(',').map((t) => t.trim()).filter(Boolean);
                        setEditProduct({ ...editProduct, tags: nextTags });
                      }}
                      className={styles.input}
                      placeholder="Contoh: Brosur, Cetak, Marketing, Promosi"
                    />
                  </div>

                  {/* 8-slots Image Upload Grid */}
                  <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                    <label className={styles.label} style={{ marginBottom: '12px', fontWeight: 'bold' }}>
                      Foto Galeri Produk (Maksimal 8 Slot. Slot 1 Wajib Diisi)
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '16px' }}>
                      {[0, 1, 2, 3, 4, 5, 6, 7].map((slotIdx) => {
                        const imageUrl = editProduct.images?.[slotIdx] || '';
                        const isSlotRequired = slotIdx === 0;
                        return (
                          <div
                            key={slotIdx}
                            style={{
                              border: '1px dashed #cbd5e1',
                              borderRadius: '8px',
                              padding: '8px',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: '#f8fafc',
                              minHeight: '160px',
                              position: 'relative'
                            }}
                          >
                            <span style={{ fontSize: '10px', fontWeight: 600, color: '#64748b', marginBottom: '6px' }}>
                              Slot {slotIdx + 1} {isSlotRequired ? '(Utama *)' : '(Opsional)'}
                            </span>
                            
                            {imageUrl ? (
                              <div style={{ position: 'relative', width: '80px', height: '80px', marginBottom: '8px' }}>
                                <img
                                  src={imageUrl}
                                  alt={`Slot ${slotIdx + 1}`}
                                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
                                />
                                {!isSlotRequired && (
                                  <button
                                    type="button"
                                    onClick={() => handleClearSlotImage(slotIdx)}
                                    style={{
                                      position: 'absolute',
                                      top: '-6px',
                                      right: '-6px',
                                      background: '#ef4444',
                                      color: '#ffffff',
                                      border: 'none',
                                      borderRadius: '50%',
                                      width: '18px',
                                      height: '18px',
                                      cursor: 'pointer',
                                      fontSize: '10px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontWeight: 'bold'
                                    }}
                                    title="Hapus gambar"
                                  >
                                    ✕
                                  </button>
                                )}
                              </div>
                            ) : (
                              <div style={{ fontSize: '24px', color: '#cbd5e1', marginBottom: '8px' }}>📷</div>
                            )}

                            <input
                              type="file"
                              accept="image/png, image/jpeg, image/jpg"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleSlotImageUpload(file, slotIdx);
                              }}
                              style={{ display: 'none' }}
                              id={`file-slot-${slotIdx}`}
                              required={isSlotRequired && !imageUrl}
                            />
                            
                            <label
                              htmlFor={`file-slot-${slotIdx}`}
                              className={styles.btnSecondary}
                              style={{
                                padding: '4px 8px',
                                fontSize: '11px',
                                cursor: 'pointer',
                                textAlign: 'center',
                                width: '100%',
                                display: 'block'
                              }}
                            >
                              {imageUrl ? 'Ganti Foto' : 'Unggah Foto'}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Deskripsi */}
                  <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                    <label className={styles.label}>Deskripsi Detil Produk *</label>
                    <textarea
                      value={editProduct.description}
                      onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                      className={styles.textarea}
                      required
                      placeholder="Jelaskan spesifikasi bahan fisik cetakan atau isi kelengkapan paket bundling..."
                    />
                  </div>

                  {/* Varian Builder */}
                  <div className={`${styles.formGroup} ${styles.formGroupFull}`} style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', marginTop: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <label className={styles.label} style={{ margin: 0, fontWeight: 'bold' }}>Kelola Varian Produk</label>
                      <button
                        type="button"
                        onClick={handleAddVariant}
                        className={styles.btnSecondary}
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                      >
                        <Plus size={14} style={{ marginRight: '4px' }} />
                        <span>Tambah Varian Baru</span>
                      </button>
                    </div>

                    {(editProduct.variants && editProduct.variants.length > 0) ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                        {editProduct.variants.map((v, index) => (
                          <div key={index} style={{ display: 'flex', gap: '12px', alignItems: 'center', background: '#f8fafc', padding: '10px', borderRadius: '6px', width: '100%' }}>
                            <div style={{ flex: 2 }}>
                              <input
                                type="text"
                                value={v.name}
                                onChange={(e) => handleEditVariant(index, 'name', e.target.value)}
                                className={styles.input}
                                placeholder="Nama varian (contoh: Jilid Spiral)"
                                required
                              />
                            </div>
                            <div style={{ flex: 1 }}>
                              <input
                                type="number"
                                value={v.addPrice}
                                onChange={(e) => handleEditVariant(index, 'addPrice', parseInt(e.target.value) || 0)}
                                className={styles.input}
                                placeholder="+ Harga (Rupiah)"
                                required
                                min="0"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveVariant(index)}
                              className={styles.btnDanger}
                              style={{ padding: '8px' }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ fontSize: '13px', color: '#64748b', fontStyle: 'italic', background: '#f1f5f9', padding: '12px', borderRadius: '6px', textAlign: 'center', width: '100%' }}>
                        Belum ada varian custom yang ditambahkan. Menggunakan varian bawaan kategori secara otomatis.
                      </div>
                    )}
                  </div>

                  {/* Add-ons Builder */}
                  <div className={`${styles.formGroup} ${styles.formGroupFull}`} style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', marginTop: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <label className={styles.label} style={{ margin: 0, fontWeight: 'bold' }}>Kelola Layanan Add-on (Maksimal 3)</label>
                      <button
                        type="button"
                        onClick={handleAddAddon}
                        disabled={editProduct.addons && editProduct.addons.length >= 3}
                        className={styles.btnSecondary}
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                      >
                        <Plus size={14} style={{ marginRight: '4px' }} />
                        <span>Tambah Add-on Baru</span>
                      </button>
                    </div>

                    {(editProduct.addons && editProduct.addons.length > 0) ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                        {editProduct.addons.map((a, index) => (
                          <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: '#f8fafc', padding: '12px', borderRadius: '6px', width: '100%' }}>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', width: '100%' }}>
                              <div style={{ flex: 2 }}>
                                <input
                                  type="text"
                                  value={a.name}
                                  onChange={(e) => handleEditAddon(index, 'name', e.target.value)}
                                  className={styles.input}
                                  placeholder="Nama Add-on (contoh: Laminasi Glossy)"
                                  required
                                />
                              </div>
                              <div style={{ flex: 1 }}>
                                <input
                                  type="number"
                                  value={a.price}
                                  onChange={(e) => handleEditAddon(index, 'price', parseInt(e.target.value) || 0)}
                                  className={styles.input}
                                  placeholder="Harga (Rupiah)"
                                  required
                                  min="0"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveAddon(index)}
                                className={styles.btnDanger}
                                style={{ padding: '8px' }}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                            <div>
                              <input
                                type="text"
                                value={a.description}
                                onChange={(e) => handleEditAddon(index, 'description', e.target.value)}
                                className={styles.input}
                                placeholder="Deskripsi singkat add-on"
                                required
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ fontSize: '13px', color: '#64748b', fontStyle: 'italic', background: '#f1f5f9', padding: '12px', borderRadius: '6px', textAlign: 'center', width: '100%' }}>
                        Belum ada add-on custom yang ditambahkan. Menggunakan add-on bawaan (Laminasi, Box, Express) secara otomatis.
                      </div>
                    )}
                  </div>

                </div>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
