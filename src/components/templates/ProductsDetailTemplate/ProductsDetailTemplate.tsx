/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { Product, products } from '@/data/products';
import { Navbar } from '@/components/organisms/shared/public/Navbar/Navbar';
import { Footer } from '@/components/organisms/shared/public/Footer/Footer';
import { ArrowLeft } from 'lucide-react';
import { ProductsDetailHeader } from '@/components/organisms/products/ProductsDetailHeader/ProductsDetailHeader';
import { ProductsDetailConfigurator } from '@/components/organisms/products/ProductsDetailConfigurator/ProductsDetailConfigurator';
import { CatalogProductCard } from '@/components/molecules/shared/CatalogProductCard/CatalogProductCard';
import { useProductCatalog } from '@/hooks/useProductCatalog';
import styles from './ProductsDetailTemplate.module.css';

interface ProductsDetailTemplateProps {
  product: Product;
}

export function ProductsDetailTemplate({ product: staticProduct }: ProductsDetailTemplateProps) {
  const { catalog, isLoaded } = useProductCatalog();
  const [activeProduct, setActiveProduct] = React.useState<Product>(staticProduct);
  const [allProducts, setAllProducts] = React.useState<Product[]>(products);

  React.useEffect(() => {
    if (isLoaded && catalog) {
      setAllProducts(catalog);
      const match = catalog.find((p) => p.sku.toLowerCase() === staticProduct.sku.toLowerCase());
      if (match) {
        setActiveProduct(match);
      }
    }
  }, [isLoaded, catalog, staticProduct.sku]);

  // Find 3 related products in same category, falling back to other products if needed
  const relatedProducts = useMemo(() => {
    let list = allProducts.filter((p) => p.category === activeProduct.category && p.sku !== activeProduct.sku);
    if (list.length < 3) {
      const additional = allProducts.filter(
        (p) => p.sku !== activeProduct.sku && !list.some((item) => item.sku === p.sku)
      );
      list = [...list, ...additional];
    }
    return list.slice(0, 3);
  }, [activeProduct, allProducts]);

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
              <li className={styles.breadcrumbCurrent}>{activeProduct.name}</li>
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
              name={activeProduct.name}
              category={activeProduct.category}
              sku={activeProduct.sku}
              scheme={activeProduct.scheme}
              imageUrl={activeProduct.imageUrl}
              images={activeProduct.images}
              displayImageCount={activeProduct.displayImageCount}
            />
          </div>

          {/* Right Column: Pricing & Varian Selector */}
          <div className={styles.rightCol}>
            <ProductsDetailConfigurator
              sku={activeProduct.sku}
              name={activeProduct.name}
              category={activeProduct.category}
              scheme={activeProduct.scheme}
              basePrice={activeProduct.basePrice}
              unit={activeProduct.unit}
              minOrder={activeProduct.minOrder}
              imageUrl={activeProduct.imageUrl}
              description={activeProduct.description}
              pricingType={activeProduct.pricingType}
              showReviews={activeProduct.showReviews}
              ratingScore={activeProduct.ratingScore}
              reviewCount={activeProduct.reviewCount}
              discountPrice={activeProduct.discountPrice}
              useDiscountPrice={activeProduct.useDiscountPrice}
              variants={activeProduct.variants}
              addons={activeProduct.addons}
              tags={activeProduct.tags}
            />
          </div>
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
