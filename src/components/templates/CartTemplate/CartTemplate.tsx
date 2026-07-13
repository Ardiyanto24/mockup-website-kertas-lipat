'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { Navbar } from '@/components/organisms/shared/public/Navbar/Navbar';
import { Footer } from '@/components/organisms/shared/public/Footer/Footer';
import { CartListingSection } from '@/components/organisms/cart/CartListingSection/CartListingSection';
import { CartCheckoutPanel } from '@/components/organisms/cart/CartCheckoutPanel/CartCheckoutPanel';
import styles from './CartTemplate.module.css';

export function CartTemplate() {
  const { cartItems } = useCart();
  const isCartEmpty = cartItems.length === 0;

  return (
    <div className={styles.wrapper}>
      <Navbar />
      
      <main className={`${styles.main} container`}>
        <h1 className={styles.pageTitle}>Keranjang Belanja Kustom</h1>
        
        {isCartEmpty ? (
          <div className={styles.emptyContainer}>
            <CartListingSection />
          </div>
        ) : (
          <div className={styles.layout}>
            {/* Left Column: Cart items listing */}
            <div className={styles.leftCol}>
              <CartListingSection />
            </div>

            {/* Right Column: Checkout Options & Totals */}
            <div className={styles.rightCol}>
              <CartCheckoutPanel />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
