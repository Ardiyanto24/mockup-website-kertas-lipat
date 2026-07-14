/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useState } from 'react';
import { Product } from '@/data/products';
import { Navbar } from '@/components/organisms/shared/public/Navbar/Navbar';
import { Footer } from '@/components/organisms/shared/public/Footer/Footer';
import { ProductsHeaderSection } from '@/components/organisms/products/ProductsHeaderSection/ProductsHeaderSection';
import { ProductsCatalogSection } from '@/components/organisms/products/ProductsCatalogSection/ProductsCatalogSection';
import { useProductCatalog } from '@/hooks/useProductCatalog';
import styles from './ProductsTemplate.module.css';

interface ProductsTemplateProps {
  products: Product[];
}

export function ProductsTemplate({ products: staticProducts }: ProductsTemplateProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const { catalog, isLoaded } = useProductCatalog();
  const [activeProducts, setActiveProducts] = useState<Product[]>(staticProducts);

  React.useEffect(() => {
    if (isLoaded && catalog) {
      setActiveProducts(catalog);
    }
  }, [isLoaded, catalog]);

  return (
    <div className={styles.wrapper}>
      <Navbar />
      <main className={styles.main}>
        <ProductsHeaderSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <ProductsCatalogSection
          products={activeProducts}
          searchQuery={searchQuery}
        />
      </main>
      <Footer />
    </div>
  );
}
