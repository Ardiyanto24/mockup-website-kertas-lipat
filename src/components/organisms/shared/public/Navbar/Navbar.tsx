'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/atoms/Button/Button';
import styles from './Navbar.module.css';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cartItems } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isHomeActive = pathname === '/';
  const isProductsActive = pathname === '/products' || pathname?.startsWith('/products/');

  const totalCartQty = cartItems.reduce((acc, item) => acc + item.quantity, 0);

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

        {/* Actions Container */}
        <div className={styles.navActions}>
          <Link href="/cart" className={styles.cartIconWrapper} aria-label="Buka Keranjang">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.cartIcon}>
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {totalCartQty > 0 && (
              <span className={styles.cartBadge}>{totalCartQty}</span>
            )}
          </Link>

          <div className={styles.headerActionBtn}>
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
