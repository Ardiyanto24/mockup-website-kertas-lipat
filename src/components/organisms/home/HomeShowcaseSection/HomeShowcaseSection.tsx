'use client';

import React from 'react';
import Image from 'next/image';
import { Badge } from '@/components/atoms/Badge/Badge';
import { HotspotTooltip } from '@/components/molecules/shared/HotspotTooltip/HotspotTooltip';
import styles from './HomeShowcaseSection.module.css';

interface HotspotItem {
  id: number;
  x: number;
  y: number;
  title: string;
  price: string;
  tooltipPosition: 'top' | 'bottom' | 'left' | 'right';
}

const hotspots: HotspotItem[] = [
  {
    id: 1,
    x: 35,
    y: 35,
    title: 'Menu Cafe & Restoran',
    price: 'Custom Quote',
    tooltipPosition: 'top',
  },
  {
    id: 2,
    x: 54,
    y: 48,
    title: 'Stiker Vinyl Label',
    price: 'Rp 15.000/lbr A3',
    tooltipPosition: 'right',
  },
  {
    id: 3,
    x: 75,
    y: 65,
    title: 'Kartu Nama Premium',
    price: 'Rp 75.000/100 pcs',
    tooltipPosition: 'bottom',
  },
  {
    id: 4,
    x: 25,
    y: 75,
    title: 'Celemek Kain Custom',
    price: 'Rp 30.000/pcs',
    tooltipPosition: 'top',
  },
];

export function HomeShowcaseSection() {
  return (
    <section id="showcase" className={styles.section}>
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <Badge variant="primary">Shop The Look</Badge>
          <h2 className={styles.title}>Galeri Aplikasi Branding di Dunia Nyata</h2>
          <p className={styles.subtitle}>
            Sentuh atau hover titik interaktif pada mockup flatlay di bawah ini untuk melihat spesifikasi produk cetak dan melakukan pemesanan instan.
          </p>
        </div>

        {/* Flatlay Image with hotspots */}
        <div className={styles.flatlayWrapper}>
          <Image
            src="/images/showcase_flatlay.png"
            alt="Flatlay Aplikasi Branding Kertas Lipat Cafe"
            width={1200}
            height={680}
            className={styles.flatlayImage}
            priority
          />

          {/* Render Hotspots */}
          {hotspots.map((hotspot) => (
            <HotspotTooltip
              key={hotspot.id}
              x={hotspot.x}
              y={hotspot.y}
              title={hotspot.title}
              price={hotspot.price}
              tooltipPosition={hotspot.tooltipPosition}
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
