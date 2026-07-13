'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/atoms/Button/Button';
import styles from './Navbar.module.css';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={`${styles.navContainer} container`}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoFold}></span>
          <span className={styles.logoText}>Kertas<span className={styles.logoHighlight}>Lipat</span></span>
        </Link>

        {/* Desktop Menu */}
        <nav className={styles.desktopNav}>
          <Link href="/" className={`${styles.navLink} ${styles.active}`}>Beranda</Link>
          <Link href="#skema-order" className={styles.navLink}>Varian Produk</Link>
          <Link href="#featured-products" className={styles.navLink}>Produk Terlaris</Link>
          <Link href="#how-it-works" className={styles.navLink}>Cara Kerja</Link>
          <Link href="#showcase" className={styles.navLink}>Portfolio</Link>
          <Link href="#contact" className={styles.navLink}>Form Konsultasi</Link>
        </nav>

        {/* Header Action Button */}
        <div className={styles.headerAction}>
          <Button href="#contact" variant="primary" size="sm">
            Konsultasi Gratis
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerActive : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <nav className={styles.mobileNav}>
          <Link href="/" className={styles.mobileNavLink} onClick={toggleMenu}>Beranda</Link>
          <Link href="#skema-order" className={styles.mobileNavLink} onClick={toggleMenu}>Varian Produk</Link>
          <Link href="#featured-products" className={styles.mobileNavLink} onClick={toggleMenu}>Produk Terlaris</Link>
          <Link href="#how-it-works" className={styles.mobileNavLink} onClick={toggleMenu}>Cara Kerja</Link>
          <Link href="#showcase" className={styles.mobileNavLink} onClick={toggleMenu}>Portfolio</Link>
          <Link href="#contact" className={styles.mobileNavLink} onClick={toggleMenu}>Form Konsultasi</Link>
          <div className={styles.mobileMenuAction}>
            <Button href="#contact" variant="primary" size="md" onClick={toggleMenu}>
              Konsultasi Gratis
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
