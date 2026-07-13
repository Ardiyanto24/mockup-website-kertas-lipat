import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { products } from '@/data/products';
import { ProductsDetailTemplate } from '@/components/templates/ProductsDetailTemplate/ProductsDetailTemplate';

interface PageProps {
  params: Promise<{ sku: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    sku: product.sku.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { sku } = await params;
  const product = products.find((p) => p.sku.toLowerCase() === sku.toLowerCase());

  if (!product) {
    return {
      title: 'Produk Tidak Ditemukan - Kertas Lipat',
    };
  }

  return {
    title: `${product.name} - Custom Cetak & Sablon | Kertas Lipat`,
    description: `${product.description.slice(0, 150)}... Saring opsi, hitung harga otomatis, & pesan via WhatsApp.`,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { sku } = await params;
  const product = products.find((p) => p.sku.toLowerCase() === sku.toLowerCase());

  if (!product) {
    notFound();
  }

  return <ProductsDetailTemplate product={product} />;
}
