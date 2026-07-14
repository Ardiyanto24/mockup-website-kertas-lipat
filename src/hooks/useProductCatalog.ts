'use client';

import { useState, useEffect } from 'react';
import { Product, products as STATIC_PRODUCTS } from '@/data/products';

export function useProductCatalog() {
  const [catalog, setCatalog] = useState<Product[]>(STATIC_PRODUCTS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('kertas_lipat_product_catalog');
    if (stored) {
      setCatalog(JSON.parse(stored));
    } else {
      localStorage.setItem('kertas_lipat_product_catalog', JSON.stringify(STATIC_PRODUCTS));
    }
    setIsLoaded(true);
  }, []);

  const saveCatalog = (newCatalog: Product[]) => {
    setCatalog(newCatalog);
    localStorage.setItem('kertas_lipat_product_catalog', JSON.stringify(newCatalog));
  };

  const addProduct = (product: Product) => {
    const next = [...catalog, product];
    saveCatalog(next);
  };

  const updateProduct = (sku: string, updated: Product) => {
    const next = catalog.map((p) => (p.sku === sku ? updated : p));
    saveCatalog(next);
  };

  const deleteProduct = (sku: string) => {
    const next = catalog.filter((p) => p.sku !== sku);
    saveCatalog(next);
  };

  const resetCatalog = () => {
    saveCatalog(STATIC_PRODUCTS);
  };

  return {
    catalog,
    isLoaded,
    addProduct,
    updateProduct,
    deleteProduct,
    resetCatalog,
  };
}
export type { Product };
