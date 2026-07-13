import React from 'react';
import { Sliders, FileUp, ShieldCheck, Package } from 'lucide-react';
import { Badge } from '@/components/atoms/Badge/Badge';
import styles from './HomeHowItWorksSection.module.css';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    id: 1,
    title: 'Pilih & Konfigurasi',
    description: 'Pilih produk satuan atau paket bundling favoritmu. Tentukan varian bahan, ukuran, serta kuantitas pesanan.',
    icon: <Sliders size={24} className={styles.icon} />,
  },
  {
    id: 2,
    title: 'Kirim / Unggah Desain',
    description: 'Unggah file desainmu (PDF, PNG, AI, ZIP) di detail produk. Belum punya desain? Pilih opsi "Butuh Bantuan Desain".',
    icon: <FileUp size={24} className={styles.icon} />,
  },
  {
    id: 3,
    title: 'Verifikasi & Bayar',
    description: 'Tim desainer kami memeriksa resolusi file desain secara instan sebelum Anda melakukan pembayaran yang aman.',
    icon: <ShieldCheck size={24} className={styles.icon} />,
  },
  {
    id: 4,
    title: 'Produksi & Kirim',
    description: 'Pesanan diproduksi menggunakan mesin cetak modern berpresisi tinggi dan dikirim aman berasuransi ke alamatmu.',
    icon: <Package size={24} className={styles.icon} />,
  },
];

export function HomeHowItWorksSection() {
  return (
    <section id="how-it-works" className={styles.section}>
      {/* Subtle grid and decorative circle glows */}
      <div className={styles.sectionGrid}></div>
      <div className={styles.glowTop}></div>
      <div className={styles.glowBottom}></div>

      <div className={`${styles.container} container`}>
        {/* Section Header */}
        <div className={styles.header}>
          <Badge variant="success" className={styles.badge}>Cara Pemesanan</Badge>
          <h2 className={styles.title}>Alur Pemesanan Simpel & Transparan</h2>
          <p className={styles.subtitle}>
            Proses pemesanan produk kustom online bebas ribet, dirancang untuk mewujudkan ide kreatif Anda dalam 4 langkah mudah.
          </p>
        </div>

        {/* Steps Container */}
        <div className={styles.stepsWrapper}>
          {/* Connecting Timeline Line (Desktop only) */}
          <div className={styles.timelineLine}></div>

          <div className={styles.grid}>
            {steps.map((step) => (
              <div key={step.id} className={styles.stepCard}>
                {/* Large floating background index number */}
                <span className={styles.stepIndex}>0{step.id}</span>
                
                {/* Icon Box Container with soft shadow and glow */}
                <div className={styles.iconContainer}>
                  <div className={styles.iconBox}>
                    {step.icon}
                  </div>
                  <span className={styles.connectorDot}></span>
                </div>

                {/* Card Content */}
                <div className={styles.cardContent}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
