import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kertas Lipat - Platform E-Commerce & Kustomisasi Cetak Kreatif",
  description: "Cetak ide kreatifmu tanpa batas minimum order kaku. Solusi branding UMKM, event kampus, sekolah, dan merchandise custom premium.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
