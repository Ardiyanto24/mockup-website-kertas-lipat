'use client';

import React, { useState } from 'react';
import styles from './ProductsDetailAccordion.module.css';

interface ProductsDetailAccordionProps {
  description: string;
  category: string;
}

export function ProductsDetailAccordion({
  description,
  category,
}: ProductsDetailAccordionProps) {
  const [activeTab, setActiveTab] = useState<'desc' | 'info' | 'review'>('desc');


  return (
    <div className={styles.tabsContainer}>
      {/* Tab Buttons Row */}
      <div className={styles.tabHeaders}>
        <button
          className={`${styles.tabBtn} ${activeTab === 'desc' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('desc')}
        >
          Deskripsi Produk
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'info' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('info')}
        >
          Spesifikasi Cetak
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'review' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('review')}
        >
          Ulasan Pembeli (4)
        </button>
      </div>

      {/* Tab Contents Panel */}
      <div className={styles.tabPanel}>
        {activeTab === 'desc' && (
          <div className={styles.contentSection}>
            <p className={styles.paragraph}>{description}</p>
            <div className={styles.guideBlock}>
              <h4 className={styles.guideTitle}>Panduan Cetak Kreatif Kertas Lipat:</h4>
              <ul className={styles.guideList}>
                <li className={styles.guideItem}>
                  <span className={styles.guideDot}>✓</span>
                  Gunakan format warna CMYK untuk file desain Anda (bukan RGB) agar warna cetak presisi.
                </li>
                <li className={styles.guideItem}>
                  <span className={styles.guideDot}>✓</span>
                  Pastikan resolusi minimal file brief adalah 300 DPI untuk hasil cetak yang jernih dan tajam.
                </li>
                <li className={styles.guideItem}>
                  <span className={styles.guideDot}>✓</span>
                  Lakukan convert font ke outline (.ai / .pdf) agar font tidak hilang saat diproses cetak.
                </li>
                <li className={styles.guideItem}>
                  <span className={styles.guideDot}>✓</span>
                  Berikan bleed minimal 2mm di setiap sisi potong file brief desain Anda.
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'info' && (
          <div className={styles.contentSection}>
            <table className={styles.specTable}>
              <tbody>
                <tr>
                  <td className={styles.specLabel}>Kategori Produk</td>
                  <td className={styles.specValue}>{category}</td>
                </tr>
                <tr>
                  <td className={styles.specLabel}>Bahan Baku Utama</td>
                  <td className={styles.specValue}>Art Carton 260gsm, PVC, HVS Premium (tergantung varian)</td>
                </tr>
                <tr>
                  <td className={styles.specLabel}>Pilihan Finishing</td>
                  <td className={styles.specValue}>Laminasi Doff, Laminasi Glossy, Jilid Spiral, Jilid Lem Panas</td>
                </tr>
                <tr>
                  <td className={styles.specLabel}>Ketahanan Cetak</td>
                  <td className={styles.specValue}>Tinta anti air (waterproof) berkualitas tinggi, anti pudar hingga bertahun-tahun</td>
                </tr>
                <tr>
                  <td className={styles.specLabel}>Format File Diterima</td>
                  <td className={styles.specValue}>PDF, ZIP, PNG, JPG, AI, PSD, CDR</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'review' && (
          <div className={styles.contentSection}>
            <div className={styles.reviewsList}>
              <div className={styles.reviewCard}>
                <div className={styles.reviewMeta}>
                  <strong className={styles.reviewerName}>Aditya Pratama</strong>
                  <span className={styles.reviewDate}>12 Juni 2026</span>
                </div>
                <div className={styles.reviewStars}>
                  <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
                </div>
                <p className={styles.reviewComment}>
                  Hasil cetak kipas PVC-nya sangat kokoh dan gambarnya tajam sekali! Desain dibantu tim Kertas Lipat sangat komunikatif. Rekomendasi banget!
                </p>
              </div>

              <div className={styles.reviewCard}>
                <div className={styles.reviewMeta}>
                  <strong className={styles.reviewerName}>Rani Wijaya</strong>
                  <span className={styles.reviewDate}>28 Mei 2026</span>
                </div>
                <div className={styles.reviewStars}>
                  <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
                </div>
                <p className={styles.reviewComment}>
                  Buku tahunan sekolah jadi keren banget dengan laminasi doff. Kualitas kertas tebal dan penjilidan rapi sekali. Selesai tepat waktu.
                </p>
              </div>

              <div className={styles.reviewCard}>
                <div className={styles.reviewMeta}>
                  <strong className={styles.reviewerName}>Dian Sastro</strong>
                  <span className={styles.reviewDate}>15 Mei 2026</span>
                </div>
                <div className={styles.reviewStars}>
                  <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
                </div>
                <p className={styles.reviewComment}>
                  Stikernya bagus sekali dan lemnya sangat rekat. Warna persis seperti file PSD yang saya unggah. Order kedua kali di sini.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#F5A623" stroke="#F5A623">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
