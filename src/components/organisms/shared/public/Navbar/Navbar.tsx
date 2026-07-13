'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/atoms/Button/Button';
import styles from './Navbar.module.css';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isHomeActive = pathname === '/';
  const isProductsActive = pathname === '/products' || pathname?.startsWith('/products/');

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
          <Link href="/" className={`${styles.navLink} ${isHomeActive ? styles.active : ''}`}>
            Beranda
          </Link>
          <Link href="/products" className={`${styles.navLink} ${isProductsActive ? styles.active : ''}`}>
            Produk
          </Link>
        </nav>

        {/* Header Action Button */}
        <div className={styles.headerAction}>
          <Button href="/#contact" variant="primary" size="sm">
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
          <Link href="/" className={`${styles.mobileNavLink} ${isHomeActive ? styles.activeMobile : ''}`} onClick={toggleMenu}>
            Beranda
          </Link>
          <Link href="/products" className={`${styles.mobileNavLink} ${isProductsActive ? styles.activeMobile : ''}`} onClick={toggleMenu}>
            Produk
          </Link>
          <div className={styles.mobileMenuAction}>
            <Button href="/#contact" variant="primary" size="md" onClick={toggleMenu}>
              Konsultasi Gratis
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
