'use client';

import React, { useState } from 'react';
import { Product } from '@/src/data/products';
import { Navbar } from '@/components/organisms/shared/public/Navbar/Navbar';
import { Footer } from '@/components/organisms/shared/public/Footer/Footer';
import { ProductsHeaderSection } from '@/components/organisms/products/ProductsHeaderSection/ProductsHeaderSection';
import { ProductsCatalogSection } from '@/components/organisms/products/ProductsCatalogSection/ProductsCatalogSection';
import styles from './ProductsTemplate.module.css';

interface ProductsTemplateProps {
  products: Product[];
}

export function ProductsTemplate({ products }: ProductsTemplateProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className={styles.wrapper}>
      <Navbar />
      <main className={styles.main}>
        <ProductsHeaderSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <ProductsCatalogSection
          products={products}
          searchQuery={searchQuery}
        />
      </main>
      <Footer />
    </div>
  );
}
