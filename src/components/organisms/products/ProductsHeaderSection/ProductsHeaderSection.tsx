import React from 'react';
import styles from './ProductsHeaderSection.module.css';

interface ProductsHeaderSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function ProductsHeaderSection({
  searchQuery,
  onSearchChange,
}: ProductsHeaderSectionProps) {
  return (
    <section className={styles.section}>
      <div className={`${styles.container} container`}>
        <div className={styles.content}>
          <h1 className={styles.title}>Katalog Produk Kertas Lipat</h1>
          <p className={styles.subtitle}>
            Cari dan saring 43 varian produk satuan (eceran) maupun paket bundling hemat kustom yang cocok untuk UMKM, event kampus, sekolah, hingga perusahaan.
          </p>

          {/* Search Box */}
          <div className={styles.searchWrapper}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Cari produk berdasarkan nama atau SKU... (Contoh: Kaos, Banner, YB)"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchQuery && (
              <button className={styles.clearBtn} onClick={() => onSearchChange('')}>
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Abstract fold overlay on header background */}
      <div className={styles.decorFold}></div>
    </section>
  );
}
