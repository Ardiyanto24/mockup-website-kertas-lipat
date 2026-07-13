import React from 'react';
import { Button } from '@/components/atoms/Button/Button';
import { Badge } from '@/components/atoms/Badge/Badge';
import styles from './HomeOrderSchemeSection.module.css';

export function HomeOrderSchemeSection() {
  return (
    <section id="skema-order" className={styles.section}>
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <Badge variant="primary" className={styles.badge}>Skema Pemesanan</Badge>
          <h2 className={styles.title}>Sesuaikan Pesanan dengan Kebutuhan Anda</h2>
          <p className={styles.subtitle}>
            Kertas Lipat memberikan fleksibilitas penuh untuk Anda. Pilih dari skema order eceran satuan atau paket bundling hemat siap pakai.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Card 1: Order Satuan */}
          <div className={`${styles.card} ${styles.cardSingle}`}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="9" y1="9" x2="15" y2="9" />
                  <line x1="9" y1="13" x2="15" y2="13" />
                  <line x1="9" y1="17" x2="13" y2="17" />
                </svg>
              </div>
              <Badge variant="teal">Bisa Satuan</Badge>
            </div>
            
            <h3 className={styles.cardTitle}>Order Satuan (Micro Products)</h3>
            <p className={styles.cardDesc}>
              Solusi cetak tanpa beban minimal order kaku. Sangat cocok untuk cetak contoh produk (sample), kaos panitia skala kecil, tumbler kustom hadiah personal, cetak kartu nama individu, hingga banner promosi insidentil.
            </p>
            
            <ul className={styles.cardFeatures}>
              <li><span className={styles.check}>✓</span> Minimal order hanya 1 pcs</li>
              <li><span className={styles.check}>✓</span> Banyak pilihan material & varian</li>
              <li><span className={styles.check}>✓</span> Simulasi harga real-time di PDP</li>
              <li><span className={styles.check}>✓</span> Cocok untuk uji coba kualitas bahan</li>
            </ul>

            <div className={styles.cardAction}>
              <Button href="#featured-products" variant="primary" className={styles.btn}>
                Lihat Produk Satuan
              </Button>
            </div>
            
            {/* Abstract Fold Line */}
            <div className={styles.foldSingle}></div>
          </div>

          {/* Card 2: Paket Bundling */}
          <div className={`${styles.card} ${styles.cardBundle}`}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              <Badge variant="secondary">Hemat Paket</Badge>
            </div>
            
            <h3 className={styles.cardTitle}>Paket Bundling (Bundle Packages)</h3>
            <p className={styles.cardDesc}>
              Gabungan produk terlaris dalam satu paket siap pakai dengan harga yang jauh lebih hemat. Sempurna untuk Paket Branding UMKM (kartu nama + stiker + banner) atau Paket Buku Tahunan & Souvenir Kelulusan Sekolah.
            </p>
            
            <ul className={styles.cardFeatures}>
              <li><span className={styles.check}>✓</span> Harga paket jauh lebih hemat s.d 25%</li>
              <li><span className={styles.check}>✓</span> Layanan Satu Vendor (All-in-One)</li>
              <li><span className={styles.check}>✓</span> Sudah termasuk Jasa Desain Grafis</li>
              <li><span className={styles.check}>✓</span> Template standar siap pakai</li>
            </ul>

            <div className={styles.cardAction}>
              <Button href="#featured-products" variant="secondary" className={styles.btn}>
                Lihat Paket Hemat
              </Button>
            </div>
            
            {/* Abstract Fold Line */}
            <div className={styles.foldBundle}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
