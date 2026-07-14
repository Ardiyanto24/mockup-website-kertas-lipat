/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/atoms/Badge/Badge';
import { HotspotTooltip } from '@/components/molecules/shared/HotspotTooltip/HotspotTooltip';
import { useHomepageContent, ShowcaseHotspot } from '@/hooks/useHomepageContent';
import { products } from '@/data/products';
import styles from './HomeShowcaseSection.module.css';

const STATIC_HOTSPOTS: ShowcaseHotspot[] = [
  { id: 1, name: 'Stiker Vinyl Label', x: 23, y: 38, targetSku: 'KL-STI-01' },
  { id: 2, name: 'Celemek Custom Logo', x: 50, y: 73, targetSku: 'KL-MRC-09' },
  { id: 3, name: 'Menu Laminasi Anti Air', x: 74, y: 28, targetSku: 'KL-PRM-06' }
];

export function HomeShowcaseSection() {
  const router = useRouter();
  const { content, isLoaded } = useHomepageContent();
  const [activeHeader, setActiveHeader] = useState({
    badge: 'Shop The Look',
    title: 'Galeri Hasil Cetak Kertas Lipat',
    subtitle: 'Inspirasi branding nyata dari ribuan produk yang kami produksi dengan presisi tinggi untuk UMKM, Event, Sekolah, dan Korporasi.',
  });
  const [activeHotspots, setActiveHotspots] = useState<ShowcaseHotspot[]>(STATIC_HOTSPOTS);

  useEffect(() => {
    if (isLoaded && content?.showcase) {
      setActiveHeader({
        badge: content.showcase.badge,
        title: content.showcase.title,
        subtitle: content.showcase.subtitle,
      });
      if (content.showcase.hotspots) {
        setActiveHotspots(content.showcase.hotspots);
      }
    }
  }, [isLoaded, content]);

  return (
    <section id="showcase" className={styles.section}>
      {/* Decorative glows */}
      <div className={styles.glowLeft}></div>
      <div className={styles.glowRight}></div>

      <div className={`${styles.container} container`}>
        {/* Section Header */}
        <div className={styles.header}>
          <Badge variant="teal" className={styles.sectionBadge}>{activeHeader.badge}</Badge>
          <h2 className={styles.title}>{activeHeader.title}</h2>
          <p className={styles.subtitle}>{activeHeader.subtitle}</p>
        </div>

        {/* Hotspots Interactive Showcase Container */}
        <div 
          className={styles.flatlayWrapper} 
          style={{ 
            position: 'relative', 
            width: '100%', 
            borderRadius: '24px', 
            overflow: 'hidden', 
            border: '1px solid rgba(15, 23, 42, 0.08)', 
            boxShadow: '0 20px 40px rgba(15, 23, 42, 0.06)' 
          }}
        >
          {/* Main flatlay theme image */}
          <Image
            src="/images/showcase_flatlay.png"
            alt="Kertas Lipat Creative Flatlay Showcase"
            width={1200}
            height={600}
            style={{ width: '100%', height: 'auto', display: 'block' }}
            priority
          />
          
          {/* Map interactive hotspot pulse icons */}
          {activeHotspots.map((spot) => {
            const spotProduct = products.find(p => p.sku === spot.targetSku);
            const title = spotProduct ? spotProduct.name : spot.name;
            const price = spotProduct ? `Mulai Rp ${spotProduct.basePrice.toLocaleString('id-ID')}` : 'Hubungi Kami';
            
            // Adjust tooltip box side position based on hotspot screen location
            const tooltipPos = spot.x > 75 ? 'left' : (spot.x < 25 ? 'right' : 'top');

            return (
              <HotspotTooltip
                key={spot.id}
                x={spot.x}
                y={spot.y}
                title={title}
                price={price}
                tooltipPosition={tooltipPos}
                onClick={() => router.push(`/products/${spot.targetSku.toLowerCase()}`)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
