'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { Product, products } from '@/data/products';
import { Navbar } from '@/components/organisms/shared/public/Navbar/Navbar';
import { Footer } from '@/components/organisms/shared/public/Footer/Footer';
import { ArrowLeft } from 'lucide-react';
import { ProductsDetailHeader } from '@/components/organisms/products/ProductsDetailHeader/ProductsDetailHeader';
import { ProductsDetailConfigurator } from '@/components/organisms/products/ProductsDetailConfigurator/ProductsDetailConfigurator';
import { ProductsDetailAccordion } from '@/components/organisms/products/ProductsDetailAccordion/ProductsDetailAccordion';
import { CatalogProductCard } from '@/components/molecules/shared/CatalogProductCard/CatalogProductCard';
import styles from './ProductsDetailTemplate.module.css';

interface ProductsDetailTemplateProps {
  product: Product;
}

export function ProductsDetailTemplate({ product }: ProductsDetailTemplateProps) {
  // Find 3 related products in same category, falling back to other products if needed
  const relatedProducts = useMemo(() => {
    let list = products.filter((p) => p.category === product.category && p.sku !== product.sku);
    if (list.length < 3) {
      const additional = products.filter(
        (p) => p.sku !== product.sku && !list.some((item) => item.sku === p.sku)
      );
      list = [...list, ...additional];
    }
    return list.slice(0, 3);
  }, [product]);

  return (
    <div className={styles.wrapper}>
      <Navbar />
      
      <main className={`${styles.main} container`}>
        {/* Top Breadcrumb and Back Navigation Panel */}
        <div className={styles.topNavigation}>
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <ol className={styles.breadcrumbList}>
              <li><Link href="/">Beranda</Link></li>
              <li className={styles.breadcrumbSeparator}>/</li>
              <li><Link href="/products">Katalog</Link></li>
              <li className={styles.breadcrumbSeparator}>/</li>
              <li className={styles.breadcrumbCurrent}>{product.name}</li>
            </ol>
          </nav>
          
          <Link href="/products" className={styles.backButton}>
            <ArrowLeft size={16} />
            <span>Kembali ke Katalog</span>
          </Link>
        </div>

        {/* Main Grid detail layout */}
        <div className={styles.layout}>
          {/* Left Column: Visual Gallery */}
          <div className={styles.leftCol}>
            <ProductsDetailHeader
              name={product.name}
              category={product.category}
              sku={product.sku}
              scheme={product.scheme}
              imageUrl={product.imageUrl}
            />
          </div>

          {/* Right Column: Pricing & Varian Selector */}
          <div className={styles.rightCol}>
            <ProductsDetailConfigurator
              sku={product.sku}
              name={product.name}
              category={product.category}
              scheme={product.scheme}
              basePrice={product.basePrice}
              unit={product.unit}
              minOrder={product.minOrder}
              imageUrl={product.imageUrl}
              description={product.description}
            />
          </div>
        </div>

        {/* Full-width Tabs Panel underneath */}
        <div className={styles.tabsWrapper}>
          <ProductsDetailAccordion
            description={product.description}
            category={product.category}
          />
        </div>

        {/* Explore Related Products Row */}
        <section className={styles.relatedSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionSubtitle}>Produk Relevan</span>
            <h2 className={styles.sectionTitle}>Explore Related Products</h2>
          </div>
          
          <div className={styles.relatedGrid}>
            {relatedProducts.map((p) => (
              <CatalogProductCard key={p.sku} product={p} />
            ))}
          </div>
        </section>


      </main>

      <Footer />
    </div>
  );
}
