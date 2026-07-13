import React from 'react';
import type { Metadata } from 'next';
import { products } from '@/src/data/products';
import { ProductsTemplate } from '@/components/templates/ProductsTemplate/ProductsTemplate';

export const metadata: Metadata = {
  title: 'Katalog Produk Cetak & Custom Merchandise - Kertas Lipat',
  description: 'Telusuri 43 katalog produk cetak satuan, custom merchandise, dan paket bundling branding UMKM & kelulusan sekolah dengan harga transparan.',
};

export default function ProductsPage() {
  return <ProductsTemplate products={products} />;
}
