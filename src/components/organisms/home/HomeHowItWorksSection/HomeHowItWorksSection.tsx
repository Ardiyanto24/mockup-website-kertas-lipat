/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useState, useEffect } from 'react';
import { Sliders, FileUp, ShieldCheck, Package } from 'lucide-react';
import { Badge } from '@/components/atoms/Badge/Badge';
import { useHomepageContent, HowItWorksStep } from '@/hooks/useHomepageContent';
import styles from './HomeHowItWorksSection.module.css';

interface HowItWorksData {
  badge: string;
  title: string;
  subtitle: string;
  steps: HowItWorksStep[];
}

const STATIC_DATA: HowItWorksData = {
  badge: 'Cara Pemesanan',
  title: 'Alur Pemesanan Simpel & Transparan',
  subtitle: 'Proses pemesanan produk kustom online bebas ribet, dirancang untuk mewujudkan ide kreatif Anda dalam 4 langkah mudah.',
  steps: [
    {
      id: 1,
      title: 'Pilih & Konfigurasi',
      description: 'Pilih produk satuan atau paket bundling favoritmu. Tentukan varian bahan, ukuran, serta kuantitas pesanan.',
      iconName: 'Sliders',
    },
    {
      id: 2,
      title: 'Kirim / Unggah Desain',
      description: 'Unggah file desainmu (PDF, PNG, AI, ZIP) di detail produk. Belum punya desain? Pilih opsi "Butuh Bantuan Desain".',
      iconName: 'FileUp',
    },
    {
      id: 3,
      title: 'Verifikasi & Bayar',
      description: 'Tim desainer kami memeriksa resolusi file desain secara instan sebelum Anda melakukan pembayaran yang aman.',
      iconName: 'ShieldCheck',
    },
    {
      id: 4,
      title: 'Produksi & Kirim',
      description: 'Pesanan diproduksi menggunakan mesin cetak modern berpresisi tinggi dan dikirim aman berasuransi ke alamatmu.',
      iconName: 'Package',
    },
  ],
};

const IconMap = {
  Sliders,
  FileUp,
  ShieldCheck,
  Package,
};

export function HomeHowItWorksSection() {
  const { content, isLoaded } = useHomepageContent();
  const [activeData, setActiveData] = useState<HowItWorksData>(STATIC_DATA);

  useEffect(() => {
    if (isLoaded && content?.howItWorks?.steps) {
      setActiveData(content.howItWorks);
    }
  }, [isLoaded, content]);

  return (
    <section id="how-it-works" className={styles.section}>
      {/* Subtle grid and decorative circle glows */}
      <div className={styles.sectionGrid}></div>
      <div className={styles.glowTop}></div>
      <div className={styles.glowBottom}></div>

      <div className={`${styles.container} container`}>
        {/* Section Header */}
        <div className={styles.header}>
          <Badge variant="success" className={styles.badge}>{activeData.badge}</Badge>
          <h2 className={styles.title}>{activeData.title}</h2>
          <p className={styles.subtitle}>{activeData.subtitle}</p>
        </div>

        {/* Steps Container */}
        <div className={styles.stepsWrapper}>
          {/* Connecting Timeline Line (Desktop only) */}
          <div className={styles.timelineLine}></div>

          <div className={styles.grid}>
            {activeData.steps.map((step) => {
              const IconComponent = IconMap[step.iconName] || Sliders;
              
              return (
                <div key={step.id} className={styles.stepCard}>
                  {/* Large floating background index number */}
                  <span className={styles.stepIndex}>0{step.id}</span>
                  
                  {/* Icon Box Container with soft shadow and glow */}
                  <div className={styles.iconContainer}>
                    <div className={styles.iconBox}>
                      <IconComponent size={24} className={styles.icon} />
                    </div>
                    <span className={styles.connectorDot}></span>
                  </div>

                  {/* Card Content */}
                  <div className={styles.cardContent}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDesc}>{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
