'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/atoms/Badge/Badge';
import styles from './HomeTestimonialSection.module.css';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
  segment: 'Mahasiswa' | 'UMKM' | 'Sekolah';
  imageUrl: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Rian (20 th)',
    role: 'Ketua Panitia Event Kampus',
    avatar: '👨‍🎓',
    quote: 'Cari vendor kaos panitia yang ramah budget & mau terima order 25 pcs itu susah. Untung nemu Kertas Lipat! Sablon DTF nya lentur banget, ga pecah pas ditarik. Kipas promosi dan ID Card nya juga rapi. Event sukses besar!',
    rating: 5,
    segment: 'Mahasiswa',
    imageUrl: '/images/showcase_handover.png',
  },
  {
    id: 2,
    name: 'Ibu Endang (38 th)',
    role: 'Pemilik "Sambal Bu Endang"',
    avatar: '👩‍🍳',
    quote: 'Paket Branding UMKM Starter sangat praktis! Saya dibantu dibuatkan desain stiker botol gratis oleh tim desainer. Bahan stiker vinyl-nya benar-benar tahan air, tidak terkelupas biarpun disimpan di kulkas. Usaha sambal saya jadi keliatan premium!',
    rating: 5,
    segment: 'UMKM',
    imageUrl: '/images/showcase_handover_umkm.png',
  },
  {
    id: 3,
    name: 'Pak Budi (45 th)',
    role: 'Wakil Kepala Sekolah Kesiswaan',
    avatar: '👨‍🏫',
    quote: 'Kami memesan 150 Paket Buku Tahunan Sekolah Standard. Finishing Spot UV pada cover terlihat mewah dan rapi. Pihak sales sangat kooperatif menyusun penawaran harga formal untuk birokrasi sekolah kami. Sangat terpercaya.',
    rating: 5,
    segment: 'Sekolah',
    imageUrl: '/images/showcase_handover_sekolah.png',
  },
];

export function HomeTestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-slide carousel effect
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000); // Slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section id="testimonials" className={styles.section}>
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <Badge variant="success">Testimoni</Badge>
          <h2 className={styles.title}>Dipercaya Lintas Generasi</h2>
          <p className={styles.subtitle}>
            Apa kata mereka yang telah mempercayakan branding, cetakan, dan merchandise kustom kepada Kertas Lipat?
          </p>
        </div>

        <div className={styles.splitLayout}>
          
          {/* Left Screen: Active Handover Photo corresponding to the review */}
          <div className={styles.leftScreen}>
            <div className={styles.imageOverlay}></div>
            <div key={`img-${activeTestimonial.id}`} className={styles.imageWrapper}>
              <Image
                src={activeTestimonial.imageUrl}
                alt={`Penyerahan produk Kertas Lipat ke ${activeTestimonial.name}`}
                fill
                className={styles.handoverImage}
                priority
              />
            </div>
            <div className={styles.imageOverlayContent}>
              <span className={styles.customerTrustBadge}>✓ Mitra Terpercaya</span>
              <p className={styles.overlayText}>Kertas Lipat mengutamakan kepuasan di setiap pengerjaan kustom Anda.</p>
            </div>
          </div>

          {/* Right Screen: Auto-sliding Reviews Carousel */}
          <div className={styles.rightScreen}>
            {/* Slider Container */}
            <div className={styles.sliderContainer}>
              <div key={`review-${activeTestimonial.id}`} className={styles.slideCard}>
                
                {/* Author Info */}
                <div className={styles.cardHeader}>
                  <div className={styles.avatar}>{activeTestimonial.avatar}</div>
                  <div className={styles.meta}>
                    <h4 className={styles.name}>{activeTestimonial.name}</h4>
                    <span className={styles.role}>{activeTestimonial.role}</span>
                  </div>
                  <Badge 
                    variant={
                      activeTestimonial.segment === 'Mahasiswa' 
                        ? 'primary' 
                        : activeTestimonial.segment === 'UMKM' 
                        ? 'secondary' 
                        : 'purple'
                    } 
                    className={styles.segmentBadge}
                  >
                    {activeTestimonial.segment}
                  </Badge>
                </div>

                {/* Rating Stars */}
                <div className={styles.stars}>
                  {Array.from({ length: activeTestimonial.rating }).map((_, i) => (
                    <span key={i} className={styles.star}>★</span>
                  ))}
                </div>

                {/* Testimonial Quote */}
                <blockquote className={styles.quote}>
                  &ldquo;{activeTestimonial.quote}&rdquo;
                </blockquote>
              </div>
            </div>

            {/* Dots Pagination Indicators */}
            <div className={styles.paginationDots}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ''}`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Lihat review ke-${index + 1}`}
                />
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
