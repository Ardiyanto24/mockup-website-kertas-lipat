import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`${styles.footerContainer} container`}>
        {/* Brand Section */}
        <div className={styles.brandCol}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoFold}></span>
            <span className={styles.logoText}>Kertas<span className={styles.logoHighlight}>Lipat</span></span>
          </Link>
          <p className={styles.brandDesc}>
            Platform e-commerce percetakan, branding, custom merchandise, dan penyedia satu atap untuk kebutuhan promosi. Tanpa batas minimum order kaku, pengerjaan kilat, dan jaminan kualitas premium.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>Layanan Cetak</h4>
          <ul className={styles.linkList}>
            <li><Link href="#skema-order" className={styles.link}>Produk Satuan (Eceran)</Link></li>
            <li><Link href="#skema-order" className={styles.link}>Paket Branding UMKM</Link></li>
            <li><Link href="#skema-order" className={styles.link}>Paket Buku Tahunan Sekolah</Link></li>
            <li><Link href="#skema-order" className={styles.link}>Merchandise & Seminar Kit</Link></li>
          </ul>
        </div>

        {/* Info & Support Section */}
        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>Perusahaan</h4>
          <ul className={styles.linkList}>
            <li><Link href="#how-it-works" className={styles.link}>Cara Kerja Pemesanan</Link></li>
            <li><Link href="#showcase" className={styles.link}>Portfolio & Mockup</Link></li>
            <li><Link href="#testimonials" className={styles.link}>Testimoni Pelanggan</Link></li>
            <li><Link href="#contact" className={styles.link}>Hubungi Kontak</Link></li>
          </ul>
        </div>

        {/* Contact Info Section */}
        <div className={styles.contactCol}>
          <h4 className={styles.colTitle}>Hubungi Kami</h4>
          <ul className={styles.contactList}>
            <li className={styles.contactItem}>
              <span className={styles.contactIcon}>📞</span>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className={styles.link}>
                +62 812-3456-7890 (WhatsApp Admin)
              </a>
            </li>
            <li className={styles.contactItem}>
              <span className={styles.contactIcon}>✉️</span>
              <a href="mailto:info@kertaslipat.com" className={styles.link}>
                info@kertaslipat.com
              </a>
            </li>
            <li className={styles.contactItem}>
              <span className={styles.contactIcon}>📍</span>
              <span className={styles.address}>
                Jl. Kreatif No. 45, Kebayoran Baru, Jakarta Selatan, 12130
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className={styles.copyrightBar}>
        <div className={`${styles.copyrightContainer} container`}>
          <p className={styles.copyrightText}>
            © {currentYear} Kertas Lipat. All Rights Reserved. Designed for creators, startups, and institutions.
          </p>
          <div className={styles.socials}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Instagram</a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>TikTok</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
