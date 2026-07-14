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
      features: ['Fitur 1', 'Fitur 2', 'Fitur 3'],
      description: '',
      imageUrl: '/images/categories/cat_printing.png',
    });
    setIsNewProduct(true);
    setIsEditing(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditProduct(JSON.parse(JSON.stringify(product)));
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

  const handleImageUpload = (file: File) => {
    const MAX_SIZE = 2 * 1024 * 1024; // 2MB
    if (file.size > MAX_SIZE) {
      alert('Ukuran berkas terlalu besar. Maksimal ukuran berkas adalah 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string' && editProduct) {
        setEditProduct({ ...editProduct, imageUrl: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProduct) return;

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

                  {/* Image upload */}
                  <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                    <label className={styles.label}>Foto Produk *</label>
                    <div className={styles.fileInputContainer}>
                      {editProduct.imageUrl && (
                        <img
                          src={editProduct.imageUrl}
                          alt="Pratinjau Unggahan"
                          className={styles.imagePreview}
                        />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file);
                        }}
                        className={styles.fileInput}
                      />
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

                  {/* Fitur list bullet points */}
                  <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <label className={styles.label}>Daftar Ringkasan Fitur / Poin (Bullet List)</label>
                      <button
                        type="button"
                        onClick={() => {
                          const nextFeatures = [...editProduct.features, 'Fitur Baru'];
                          setEditProduct({ ...editProduct, features: nextFeatures });
                        }}
                        className={styles.btnSecondary}
                        style={{ padding: '4px 10px', fontSize: '11px' }}
                      >
                        <Plus size={12} style={{ marginRight: '4px' }} />
                        <span>Tambah Poin</span>
                      </button>
                    </div>
                    
                    {editProduct.features.map((feat, index) => (
                      <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                        <input
                          type="text"
                          value={feat}
                          onChange={(e) => {
                            const nextFeatures = [...editProduct.features];
                            nextFeatures[index] = e.target.value;
                            setEditProduct({ ...editProduct, features: nextFeatures });
                          }}
                          className={styles.input}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const nextFeatures = editProduct.features.filter((_, idx) => idx !== index);
                            setEditProduct({ ...editProduct, features: nextFeatures });
                          }}
                          className={styles.btnDanger}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
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
