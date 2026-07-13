'use client';

import React, { useState } from 'react';
import styles from './ProductsDetailAccordion.module.css';

interface ProductsDetailAccordionProps {
  description: string;
  category: string;
  sku: string;
}

export function ProductsDetailAccordion({
  description,
  category,
  sku,
}: ProductsDetailAccordionProps) {
  // Accordion open/close states
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    description: true,
    specs: false,
    fileGuidelines: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Dynamic specs mapping based on category/SKU
  const technicalSpecs = () => {
    if (sku.startsWith('KL-STI-04')) {
      return [
        { label: 'Ukuran Buku', value: 'A5 (14.8 cm x 21 cm)' },
        { label: 'Bahan Cover', value: 'Art Carton 260 gsm (Full Color)' },
        { label: 'Bahan Isi', value: 'HVS 75 gsm (Polos / Bergaris)' },
        { label: 'Jumlah Halaman', value: '50 lembar (100 halaman)' },
        { label: 'Finishing Jilid', value: 'Steples / Jilid Lem / Spiral Besi tebal' },
      ];
    } else if (category.includes('Merchandise')) {
      return [
        { label: 'Bahan Utama', value: 'Keramik Stoneware (Mug) / SUS304 Stainless (Tumbler) / Kanvas (Totebag)' },
        { label: 'Metode Cetak', value: 'Sublimasi HD / Laser Engraving / Sablon DTF' },
        { label: 'Area Cetak Maks', value: '20 cm x 8 cm (Mug) / Sesuai template media' },
        { label: 'Daya Tahan', value: 'Tahan air & goresan ringan, dicuci tidak pudar' },
      ];
    } else if (category.includes('Stickers')) {
      return [
        { label: 'Jenis Kertas', value: 'HVS Sticker (Ekonomis) / Vinyl Matte & Glossy (Waterproof)' },
        { label: 'Perekat', value: 'High-tack Acrylic Adhesive (Daya rekat kuat)' },
        { label: 'Metode Potong', value: 'Kiss-cut (Setengah putus) / Die-cut (Putus lembaran)' },
        { label: 'Tinta Cetak', value: 'Tinta Eco-Solvent / UV Flatbed (Tahan cuaca)' },
      ];
    } else {
      return [
        { label: 'Format Media', value: 'Custom sesuai pesanan' },
        { label: 'Bahan Dasar', value: 'Art Paper / Flexi Jerman 340gsm / Luster / PVC tebal' },
        { label: 'Resolusi Output', value: '1440 DPI High-Definition Printing' },
        { label: 'Profil Warna', value: 'CMYK Industri Cetak' },
      ];
    }
  };

  return (
    <div className={styles.accordionContainer}>
      
      {/* SECTION 1: Deskripsi Produk */}
      <div className={styles.accordionItem}>
        <button
          className={styles.accordionHeader}
          onClick={() => toggleSection('description')}
          aria-expanded={openSections.description}
        >
          <span className={styles.headerText}>Deskripsi Lengkap Produk</span>
          <span className={styles.headerIcon}>{openSections.description ? '▲' : '▼'}</span>
        </button>
        <div className={`${styles.accordionContent} ${openSections.description ? styles.contentOpen : ''}`}>
          <p className={styles.descParagraph}>{description}</p>
          <p className={styles.descParagraph}>
            Kertas Lipat mengedepankan kualitas cetakan presisi tinggi dengan harga transparan yang ramah bagi organisasi mahasiswa, graduasi sekolah, pelaku UMKM, maupun korporat. Setiap pesanan diperiksa kualitasnya sebelum pengiriman untuk memastikan kepuasan Anda.
          </p>
        </div>
      </div>

      {/* SECTION 2: Spesifikasi Teknis */}
      <div className={styles.accordionItem}>
        <button
          className={styles.accordionHeader}
          onClick={() => toggleSection('specs')}
          aria-expanded={openSections.specs}
        >
          <span className={styles.headerText}>Spesifikasi Bahan & Ukuran</span>
          <span className={styles.headerIcon}>{openSections.specs ? '▲' : '▼'}</span>
        </button>
        <div className={`${styles.accordionContent} ${openSections.specs ? styles.contentOpen : ''}`}>
          <table className={styles.specsTable}>
            <tbody>
              {technicalSpecs().map((spec, index) => (
                <tr key={index} className={styles.specsRow}>
                  <td className={styles.specLabel}>{spec.label}</td>
                  <td className={styles.specValue}>{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 3: Panduan Desain File */}
      <div className={styles.accordionItem}>
        <button
          className={styles.accordionHeader}
          onClick={() => toggleSection('fileGuidelines')}
          aria-expanded={openSections.fileGuidelines}
        >
          <span className={styles.headerText}>Panduan Pengiriman File & Cetak</span>
          <span className={styles.headerIcon}>{openSections.fileGuidelines ? '▲' : '▼'}</span>
        </button>
        <div className={`${styles.accordionContent} ${openSections.fileGuidelines ? styles.contentOpen : ''}`}>
          <ul className={styles.guidelinesList}>
            <li className={styles.guidelineItem}>
              <strong>Format File:</strong> Kami menerima berkas dengan ekstensi <code>.PDF</code>, <code>.ZIP</code>, <code>.PNG</code>, <code>.AI</code>, atau <code>.PSD</code>.
            </li>
            <li className={styles.guidelineItem}>
              <strong>Resolusi Minimal:</strong> Pastikan resolusi desain Anda minimal <strong>300 DPI</strong> untuk menghindari hasil cetak yang pecah atau buram.
            </li>
            <li className={styles.guidelineItem}>
              <strong>Profil Warna (CMYK):</strong> Ubah profil warna desain Anda ke <strong>CMYK Coated FOGRA39</strong>. Pengiriman file berbasis RGB akan mengalami pergeseran warna saat naik mesin cetak.
            </li>
            <li className={styles.guidelineItem}>
              <strong>Convert Outline Fonts:</strong> Jika mengirim file Adobe Illustrator (.AI), pastikan semua teks telah di-convert ke path (Create Outlines) agar font tidak hilang/berubah saat kami buka.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
