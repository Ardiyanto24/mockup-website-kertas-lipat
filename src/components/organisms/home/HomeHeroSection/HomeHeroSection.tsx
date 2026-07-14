'use client';

import React, { useState, useEffect, useCallback } from 'react';

import { Button } from '@/components/atoms/Button/Button';
import styles from './HomeHeroSection.module.css';

interface Slide {
  id: number;
  titleSegments: { text: string; highlight?: boolean; orange?: boolean }[];
  subText: string;
  image: string;
  ctaText: string;
  ctaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
}

const slides: Slide[] = [
  {
    id: 1,
    titleSegments: [
      { text: 'Cetak ' },
      { text: 'Ide Kreatifmu', highlight: true },
      { text: ', Hidupkan ' },
      { text: 'Brand-mu.', orange: true },
    ],
    subText: 'Solusi cetak, merchandise custom, dan kebutuhan branding terlengkap. Tanpa batas minimal order kaku, pengerjaan cepat, dan jaminan kualitas premium untuk UMKM, kampus, hingga korporasi.',
    image: '/images/hero_branding_mockup.png',
    ctaText: 'Jelajahi Produk',
    ctaHref: '#featured-products',
    secondaryCtaText: 'Konsultasi Desain & Bahan',
    secondaryCtaHref: 'https://wa.me/6281234567890',
  },
  {
    id: 2,
    titleSegments: [
      { text: 'Sukseskan ' },
      { text: 'Event Kampusmu', highlight: true },
      { text: ' Tanpa Beban ' },
      { text: 'Minimum Order.', orange: true },
    ],
    subText: 'Bikin kaos panitia, ID card, banner promosi, kipas tangan, hingga pin custom dengan fleksibilitas order satuan. Hemat anggaran, pengerjaan cepat, hasil dijamin memuaskan!',
    image: '/images/hero_campus_mockup.png',
    ctaText: 'Lihat Produk Kampus',
    ctaHref: '#featured-products',
    secondaryCtaText: 'Minta Diskon Anggota',
    secondaryCtaHref: 'https://wa.me/6281234567890',
  },
  {
    id: 3,
    titleSegments: [
      { text: 'Abadikan ' },
      { text: 'Momen Kelulusan', highlight: true },
      { text: ' & Tingkatkan ' },
      { text: 'Citra Profesional.', orange: true },
    ],
    subText: 'Penyedia satu atap untuk Buku Tahunan Sekolah premium, souvenir kelulusan, dan seminar kit eksklusif perusahaan. Dilengkapi bantuan desain profesional dan contoh fisik nyata.',
    image: '/images/hero_school_mockup.png',
    ctaText: 'Lihat Paket Kelulusan',
    ctaHref: '#featured-products',
    secondaryCtaText: 'Hubungi Sales Formal',
    secondaryCtaHref: '#contact',
  },
];

export function HomeHeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000); // Auto transition every 6 seconds
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className={styles.heroSection}>
      {/* Slides */}
      {slides.map((slide, index) => {
        const isCurrent = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`${styles.slide} ${isCurrent ? styles.slideActive : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {/* Dark Scrim overlay on left side for text contrast */}
            <div className={styles.scrimOverlay}></div>

            <div className={`${styles.contentContainer} container`}>
              <div className={styles.textOverlay}>
                <h1 className={styles.title}>
                  {slide.titleSegments.map((seg, sIdx) => (
                    <span
                      key={sIdx}
                      className={seg.highlight ? styles.highlightText : (seg.orange ? styles.orangeText : '')}
                    >
                      {seg.text}
                    </span>
                  ))}
                </h1>
                <p className={styles.subText}>{slide.subText}</p>
                <div className={styles.ctaGroup}>
                  <Button href={slide.ctaHref} variant="primary" size="lg">
                    {slide.ctaText}
                  </Button>
                  <Button 
                    href={slide.secondaryCtaHref} 
                    variant="outline" 
                    size="lg"
                    className={styles.outlineCta}
                  >
                    {slide.secondaryCtaText}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Manual Arrow Controls */}
      <button className={`${styles.arrow} ${styles.leftArrow}`} onClick={prevSlide} aria-label="Previous Slide">
        ‹
      </button>
      <button className={`${styles.arrow} ${styles.rightArrow}`} onClick={nextSlide} aria-label="Next Slide">
        ›
      </button>

      {/* Dot Indicators */}
      <div className={styles.dotContainer}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentSlide ? styles.dotActive : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
}
