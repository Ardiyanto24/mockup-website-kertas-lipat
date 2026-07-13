import React from 'react';
import { Product } from '@/data/products';
import { Navbar } from '@/components/organisms/shared/public/Navbar/Navbar';
import { Footer } from '@/components/organisms/shared/public/Footer/Footer';
import { ProductsDetailHeader } from '@/components/organisms/products/ProductsDetailHeader/ProductsDetailHeader';
import { ProductsDetailConfigurator } from '@/components/organisms/products/ProductsDetailConfigurator/ProductsDetailConfigurator';
import { ProductsDetailAccordion } from '@/components/organisms/products/ProductsDetailAccordion/ProductsDetailAccordion';
import styles from './ProductsDetailTemplate.module.css';

interface ProductsDetailTemplateProps {
  product: Product;
}

export function ProductsDetailTemplate({ product }: ProductsDetailTemplateProps) {
  return (
    <div className={styles.wrapper}>
      <Navbar />
      
      <main className={`${styles.main} container`}>
        <div className={styles.layout}>
          {/* Left Column: Visual Gallery & Specs Accordion */}
          <div className={styles.leftCol}>
            <ProductsDetailHeader
              name={product.name}
              category={product.category}
              sku={product.sku}
              scheme={product.scheme}
              imageUrl={product.imageUrl}
            />
            <div className={styles.accordionSpacing}>
              <ProductsDetailAccordion
                description={product.description}
                category={product.category}
                sku={product.sku}
              />
            </div>
          </div>

          {/* Right Column: Pricing Configurator */}
          <div className={styles.rightCol}>
            <ProductsDetailConfigurator
              sku={product.sku}
              name={product.name}
              category={product.category}
              scheme={product.scheme}
              basePrice={product.basePrice}
              unit={product.unit}
              minOrder={product.minOrder}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
