import type { Metadata } from 'next';
import '../(public)/globals.css';

export const metadata: Metadata = {
  title: 'CMS Dashboard - Kertas Lipat',
  description: 'Panel Manajemen Konten & Produk Kertas Lipat V1',
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        {children}
      </body>
    </html>
  );
}
