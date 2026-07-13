'use client';

import React, { useState, useMemo } from 'react';
import { Product } from '@/data/products';
import { CatalogProductCard } from '@/components/molecules/shared/CatalogProductCard/CatalogProductCard';
import { Button } from '@/components/atoms/Button/Button';
import styles from './ProductsCatalogSection.module.css';

interface ProductsCatalogSectionProps {
  products: Product[];
  searchQuery: string;
}

export function ProductsCatalogSection({
  products,
  searchQuery,
}: ProductsCatalogSectionProps) {
  // Mobile drawer filter state
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter states
  const [selectedSchemes, setSelectedSchemes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMinOrder, setSelectedMinOrder] = useState<string>('ALL'); // 'ALL', 'SATUAN' (1), 'PARTAI' (10+), 'GROSIR' (50+)
  const [sortBy, setSortBy] = useState<string>('POPULAR'); // 'POPULAR', 'PRICE_LOW', 'PRICE_HIGH'

  // Categories list extracted from product database reference in PRD
  const categories = [
    'Printing',
    'Promotion',
    'Stationery & Identity',
    'Stickers & Labels',
    'Custom Merchandise & Apparel',
    'Paket Branding UMKM',
    'School Yearbook & Graduation Kits',
  ];

  // Helper toggle functions
  const handleSchemeToggle = (scheme: string) => {
    setSelectedSchemes((prev) =>
      prev.includes(scheme) ? prev.filter((s) => s !== scheme) : [...prev, scheme]
    );
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const resetFilters = () => {
    setSelectedSchemes([]);
    setSelectedCategories([]);
    setSelectedMinOrder('ALL');
    setSortBy('POPULAR');
  };

  // Filter & Sort Logic using useMemo
  const processedProducts = useMemo(() => {
    let result = [...products];

    // 1. Search Query Filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.sku.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // 2. Scheme Filter (OR condition if multiple selected)
    if (selectedSchemes.length > 0) {
      result = result.filter((p) => selectedSchemes.includes(p.scheme));
    }

    // 3. Category Filter (OR condition if multiple selected)
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // 4. Min Order Filter
    if (selectedMinOrder !== 'ALL') {
      if (selectedMinOrder === 'SATUAN') {
        result = result.filter((p) => p.minOrder === 1);
      } else if (selectedMinOrder === 'PARTAI') {
        result = result.filter((p) => p.minOrder >= 10 && p.minOrder < 50);
      } else if (selectedMinOrder === 'GROSIR') {
        result = result.filter((p) => p.minOrder >= 50);
      }
    }

    // 5. Sorting
    if (sortBy === 'PRICE_LOW') {
      result.sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortBy === 'PRICE_HIGH') {
      result.sort((a, b) => b.basePrice - a.basePrice);
    } else {
      // DEFAULT: POPULAR (or default array order)
      result.sort((a, b) => a.sku.localeCompare(b.sku));
    }

    return result;
  }, [products, searchQuery, selectedSchemes, selectedCategories, selectedMinOrder, sortBy]);

  return (
    <section className={styles.section}>
      <div className={`${styles.container} container`}>
        <div className={styles.layout}>
          
          {/* Collapsible sticky filter sidebar */}
          <aside className={`${styles.sidebar} ${isFilterOpen ? styles.sidebarOpen : ''}`}>
            <div className={styles.sidebarHeader}>
              <h3 className={styles.sidebarTitle}>Saring Produk</h3>
              <button className={styles.closeFilterBtn} onClick={() => setIsFilterOpen(false)}>
                ✕
              </button>
            </div>

            {/* Filter Group: Skema Pembelian */}
            <div className={styles.filterGroup}>
              <h4 className={styles.filterGroupName}>Skema Pembelian</h4>
              <div className={styles.checkboxList}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={selectedSchemes.includes('Produk Satuan')}
                    onChange={() => handleSchemeToggle('Produk Satuan')}
                  />
                  Produk Satuan
                </label>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={selectedSchemes.includes('Paket Bundling')}
                    onChange={() => handleSchemeToggle('Paket Bundling')}
                  />
                  Paket Bundling
                </label>
              </div>
            </div>

            {/* Filter Group: Kategori Produk */}
            <div className={styles.filterGroup}>
              <h4 className={styles.filterGroupName}>Kategori</h4>
              <div className={styles.checkboxList}>
                {categories.map((cat) => (
                  <label key={cat} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => handleCategoryToggle(cat)}
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            {/* Filter Group: Batas Minimum Order */}
            <div className={styles.filterGroup}>
              <h4 className={styles.filterGroupName}>Minimal Order</h4>
              <div className={styles.radioList}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="minOrder"
                    checked={selectedMinOrder === 'ALL'}
                    onChange={() => setSelectedMinOrder('ALL')}
                  />
                  Semua Varian
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="minOrder"
                    checked={selectedMinOrder === 'SATUAN'}
                    onChange={() => setSelectedMinOrder('SATUAN')}
                  />
                  Bisa Satuan (Min 1 pcs)
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="minOrder"
                    checked={selectedMinOrder === 'PARTAI'}
                    onChange={() => setSelectedMinOrder('PARTAI')}
                  />
                  Partai Kecil (Min 10 pcs)
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="minOrder"
                    checked={selectedMinOrder === 'GROSIR'}
                    onChange={() => setSelectedMinOrder('GROSIR')}
                  />
                  Grosir (Min 50 pcs)
                </label>
              </div>
            </div>

            {/* Reset Action */}
            <Button variant="outline" size="sm" onClick={resetFilters} className={styles.resetBtn}>
              Atur Ulang Filter
            </Button>
          </aside>

          {/* Product Grid Content area */}
          <div className={styles.content}>
            {/* Header controls bar */}
            <div className={styles.contentHeader}>
              <div className={styles.resultCount}>
                Menampilkan <strong>{processedProducts.length}</strong> produk
              </div>
              <div className={styles.controlsRow}>
                {/* Sort selector */}
                <div className={styles.sortWrapper}>
                  <span className={styles.sortLabel}>Urutkan:</span>
                  <select
                    className={styles.sortSelect}
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="POPULAR">Terpopuler</option>
                    <option value="PRICE_LOW">Harga: Rendah ke Tinggi</option>
                    <option value="PRICE_HIGH">Harga: Tinggi ke Rendah</option>
                  </select>
                </div>
                {/* Mobile Filter Toggle Button */}
                <button className={styles.mobileFilterBtn} onClick={() => setIsFilterOpen(true)}>
                  Filter ⚙️
                </button>
              </div>
            </div>

            {/* Grid display */}
            {processedProducts.length > 0 ? (
              <div className={styles.grid}>
                {processedProducts.map((product) => (
                  <div key={product.sku} className={styles.gridItem}>
                    <CatalogProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>📦</div>
                <h3 className={styles.emptyTitle}>Produk Tidak Ditemukan</h3>
                <p className={styles.emptyDesc}>
                  Maaf, tidak ada produk cetak yang sesuai dengan saringan atau kata kunci pencarian Anda. Silakan coba atur ulang filter Anda.
                </p>
                <Button variant="primary" onClick={resetFilters}>
                  Atur Ulang Semua Saringan
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
