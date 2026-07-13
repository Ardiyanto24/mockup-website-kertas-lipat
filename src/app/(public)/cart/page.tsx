import React from 'react';
import type { Metadata } from 'next';
import { CartTemplate } from '@/components/templates/CartTemplate/CartTemplate';

export const metadata: Metadata = {
  title: 'Keranjang Belanja Cetak Kustom - Kertas Lipat',
  description: 'Tinjau pesanan cetak kustom, unggah berkas brief desain, dan checkout pesanan Anda melalui WhatsApp secara instan.',
};

export default function CartPage() {
  return <CartTemplate />;
}
