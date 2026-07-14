/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/atoms/Badge/Badge';
import { ProductCard, ProductCardProps } from '@/components/molecules/shared/ProductCard/ProductCard';
import { useHomepageContent } from '@/hooks/useHomepageContent';
import { products } from '@/data/products';
import styles from './HomeFeaturedSection.module.css';

const STATIC_PRODUCTS: ProductCardProps[] = [
  {
    sku: 'KL-MRC-06',
    name: 'Kaos DTF Custom',
    category: 'Custom Merchandise & Apparel',
    scheme: 'Produk Satuan',
    basePrice: 75000,
    unit: 'pcs',
    features: ['Sablon DTF Lentur & Elastis', 'Bahan Cotton Combed 30s Premium', 'Tanpa Batas Varian Warna Desain'],
    description: 'Kaos kustom dengan teknik sablon DTF beresolusi tinggi. Warna solid, gambar tajam, awet dicuci berkali-kali tanpa pecah.',
    imageUrl: '/images/categories/cat_merchandise.png',
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
    imageUrl: '/images/categories/cat_merchandise.png',
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
    imageUrl: '/images/categories/cat_branding_pack.png',
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
    imageUrl: '/images/categories/cat_yearbook.png',
    rating: 4.8,
    reviewCount: 29,
  },
];

export function HomeFeaturedSection() {
  const { content, isLoaded } = useHomepageContent();
  const [activeHeader, setActiveHeader] = useState({
    badge: 'Terpopuler',
    title: 'Produk Terlaris & Paket Favorit',
    subtitle: 'Berikut produk satuan dan paket bundling yang paling sering dipesan oleh mahasiswa, UMKM, dan sekolah mitra Kertas Lipat.',
  });
  const [activeProducts, setActiveProducts] = useState<ProductCardProps[]>(STATIC_PRODUCTS);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'SATUAN' | 'BUNDLING'>('ALL');

  useEffect(() => {
    if (isLoaded && content?.featured) {
      setActiveHeader({
        badge: content.featured.badge,
        title: content.featured.title,
        subtitle: content.featured.subtitle,
      });

      if (content.featured.selectedSkus && content.featured.selectedSkus.length > 0) {
        const filtered = products
          .filter((p) => content.featured.selectedSkus.includes(p.sku))
          .map((p) => ({
            sku: p.sku,
            name: p.name,
            category: p.category,
            scheme: p.scheme,
            basePrice: p.basePrice,
            unit: p.unit,
            features: p.features || [],
            description: p.description,
            imageUrl: p.imageUrl,
            // Assign some realistic mock rating metrics since they aren't stored in basic master catalog
            rating: p.sku === 'KL-MRC-06' || p.sku === 'KL-BDL-BR-01' ? 4.9 : 4.8,
            reviewCount: p.sku === 'KL-MRC-06' ? 48 : (p.sku === 'KL-BDL-BR-01' ? 52 : 34),
          }));
        
        // Sort according to active selectedSkus order
        const sorted = [...filtered].sort((a, b) => {
          return content.featured.selectedSkus.indexOf(a.sku) - content.featured.selectedSkus.indexOf(b.sku);
        });
        setActiveProducts(sorted);
      }
    }
  }, [isLoaded, content]);

  const filteredProducts = activeProducts.filter((product) => {
    if (activeFilter === 'SATUAN') return product.scheme === 'Produk Satuan';
    if (activeFilter === 'BUNDLING') return product.scheme === 'Paket Bundling';
    return true;
  });

  return (
    <section id="featured-products" className={styles.section}>
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <Badge variant="secondary">{activeHeader.badge}</Badge>
          <h2 className={styles.title}>{activeHeader.title}</h2>
          <p className={styles.subtitle}>{activeHeader.subtitle}</p>

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
