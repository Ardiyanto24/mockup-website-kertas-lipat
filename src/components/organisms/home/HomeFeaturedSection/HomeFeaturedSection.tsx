'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/atoms/Badge/Badge';
import { ProductCard, ProductCardProps } from '@/components/molecules/shared/ProductCard/ProductCard';
import styles from './HomeFeaturedSection.module.css';

const featuredProducts: ProductCardProps[] = [
  {
    sku: 'KL-MRC-06',
    name: 'Kaos DTF Custom',
    category: 'Custom Merchandise & Apparel',
    scheme: 'Produk Satuan',
    basePrice: 75000,
    unit: 'pcs',
    features: ['Sablon DTF Lentur & Elastis', 'Bahan Cotton Combed 30s Premium', 'Tanpa Batas Varian Warna Desain'],
    description: 'Kaos kustom dengan teknik sablon DTF beresolusi tinggi. Warna solid, gambar tajam, awet dicuci berkali-kali tanpa pecah.',
    rating: 4.9,
    reviewCount: 48,
  },
  {
    sku: 'KL-MRC-02',
    name: 'Tumbler Custom',
    category: 'Custom Merchandise & Apparel',
    scheme: 'Produk Satuan',
    basePrice: 75000,
    unit: 'pcs',
    features: ['Bahan Stainless Steel SUS304', 'Grafir Logo Presisi Tinggi', 'Double-wall Insulated (Tahan Dingin/Panas)'],
    description: 'Tumbler stainless steel premium untuk merchandise eksklusif. Menjaga suhu minuman hingga 12 jam, grafir laser rapi.',
    rating: 4.8,
    reviewCount: 34,
  },
  {
    sku: 'KL-BDL-BR-01',
    name: 'Paket Branding UMKM — Starter',
    category: 'Paket Branding UMKM',
    scheme: 'Paket Bundling',
    basePrice: 150000,
    unit: 'paket',
    features: ['100 pcs Kartu Nama Doff', '50 pcs Stiker Label Vinyl', '1 pcs X-Banner / Roll Banner', 'Termasuk Jasa Desain Gratis'],
    description: 'Paket branding paling hemat untuk memulai usaha baru Anda. Desain disesuaikan dengan visi brand Anda, praktis langsung pakai.',
    rating: 4.9,
    reviewCount: 52,
  },
  {
    sku: 'KL-BDL-YB-02',
    name: 'Paket Buku Tahunan — Standard',
    category: 'School Yearbook & Graduation Kits',
    scheme: 'Paket Bundling',
    basePrice: 79000,
    unit: 'buku',
    features: ['Hard Cover Kokoh & Elegan', 'Isi 60 Halaman Full Color', 'Kertas Art Paper 150gsm Tebal', 'Min. Order 50 Buku'],
    description: 'Paket buku tahunan sekolah paling populer. Cetak full color berkualitas dengan cover hardcover dilaminasi doff tahan lama.',
    rating: 4.8,
    reviewCount: 29,
  },
];

export function HomeFeaturedSection() {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'SATUAN' | 'BUNDLING'>('ALL');

  const filteredProducts = featuredProducts.filter((product) => {
    if (activeFilter === 'SATUAN') return product.scheme === 'Produk Satuan';
    if (activeFilter === 'BUNDLING') return product.scheme === 'Paket Bundling';
    return true;
  });

  return (
    <section id="featured-products" className={styles.section}>
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <Badge variant="secondary">Terpopuler</Badge>
          <h2 className={styles.title}>Produk Terlaris & Paket Favorit</h2>
          <p className={styles.subtitle}>
            Berikut produk satuan dan paket bundling yang paling sering dipesan oleh mahasiswa, UMKM, dan sekolah mitra Kertas Lipat.
          </p>

          {/* Filter Tabs */}
          <div className={styles.filterContainer}>
            <button
              className={`${styles.filterBtn} ${activeFilter === 'ALL' ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveFilter('ALL')}
            >
              Semua Produk
            </button>
            <button
              className={`${styles.filterBtn} ${activeFilter === 'SATUAN' ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveFilter('SATUAN')}
            >
              Order Satuan
            </button>
            <button
              className={`${styles.filterBtn} ${activeFilter === 'BUNDLING' ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveFilter('BUNDLING')}
            >
              Paket Bundling
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className={styles.grid}>
          {filteredProducts.map((product) => (
            <div key={product.sku} className={styles.gridItem}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
