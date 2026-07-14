/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import { useHomepageContent, TestimonialItem } from '@/hooks/useHomepageContent';
import styles from './HomeTestimonialSection.module.css';

const STATIC_TESTIMONIALS: TestimonialItem[] = [
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
  const { content, isLoaded } = useHomepageContent();
  const [activeHeader, setActiveHeader] = useState({
    badge: 'Our Testimonials',
    title: 'Customer Say About Our Services',
    subtitle: 'Apa kata mereka yang telah mempercayakan branding, cetakan, dan merchandise kustom mereka kepada Kertas Lipat?',
  });
  const [activeTestimonials, setActiveTestimonials] = useState<TestimonialItem[]>(STATIC_TESTIMONIALS);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (isLoaded && content?.testimonials?.items) {
      setActiveHeader({
        badge: content.testimonials.badge,
        title: content.testimonials.title,
        subtitle: content.testimonials.subtitle,
      });
      if (content.testimonials.items.length > 0) {
        setActiveTestimonials(content.testimonials.items);
      }
    }
  }, [isLoaded, content]);

  // Auto-slide carousel effect
  useEffect(() => {
    if (activeTestimonials.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev === activeTestimonials.length - 1 ? 0 : prev + 1));
    }, 5000); // Slide every 5 seconds

    return () => clearInterval(timer);
  }, [activeTestimonials]);

  const activeTestimonial = activeTestimonials[activeIndex] || activeTestimonials[0] || STATIC_TESTIMONIALS[0];

  const handleImageClick = () => {
    if (activeTestimonials.length <= 1) return;
    setActiveIndex((prev) => (prev === activeTestimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className={styles.section}>
      {/* Decorative background grid and glow */}
      <div className={styles.gridBg}></div>
      <div className={styles.glowBg}></div>

      <div className={`${styles.container} container`}>
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.sectionBadge}>{activeHeader.badge}</span>
          <h2 className={styles.title}>{activeHeader.title}</h2>
          <p className={styles.subtitle}>{activeHeader.subtitle}</p>
        </div>

        {/* Layout Cards Grid */}
        <div className={styles.layout}>
          
          {/* Left Side: Interactive Customer Image Card with overlay */}
          <div className={styles.leftScreen}>
            {/* Decorative Dot Wave behind image card */}
            <div className={styles.decoDots}>
              <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
                <circle cx="10" cy="10" r="2" fill="rgba(255,255,255,0.15)" />
                <circle cx="30" cy="10" r="2" fill="rgba(255,255,255,0.15)" />
                <circle cx="50" cy="10" r="2" fill="rgba(255,255,255,0.15)" />
                <circle cx="70" cy="10" r="2" fill="rgba(255,255,255,0.15)" />
                <circle cx="90" cy="10" r="2" fill="rgba(255,255,255,0.15)" />
                <circle cx="10" cy="30" r="2" fill="rgba(255,255,255,0.15)" />
                <circle cx="30" cy="30" r="2" fill="rgba(255,255,255,0.15)" />
                <circle cx="50" cy="30" r="2" fill="rgba(255,255,255,0.15)" />
                <circle cx="70" cy="30" r="2" fill="rgba(255,255,255,0.15)" />
                <circle cx="90" cy="30" r="2" fill="rgba(255,255,255,0.15)" />
                <circle cx="10" cy="50" r="2" fill="rgba(255,255,255,0.15)" />
                <circle cx="30" cy="50" r="2" fill="rgba(255,255,255,0.15)" />
                <circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.15)" />
                <circle cx="70" cy="50" r="2" fill="rgba(255,255,255,0.15)" />
                <circle cx="90" cy="50" r="2" fill="rgba(255,255,255,0.15)" />
                <circle cx="10" cy="70" r="2" fill="rgba(255,255,255,0.15)" />
                <circle cx="30" cy="70" r="2" fill="rgba(255,255,255,0.15)" />
                <circle cx="50" cy="70" r="2" fill="rgba(255,255,255,0.15)" />
                <circle cx="70" cy="70" r="2" fill="rgba(255,255,255,0.15)" />
                <circle cx="90" cy="70" r="2" fill="rgba(255,255,255,0.15)" />
              </svg>
            </div>

            {/* Image Card */}
            <div 
              className={styles.imageCard}
              onClick={handleImageClick}
              title="Klik untuk melihat testimoni berikutnya"
            >
              <div key={`img-${activeTestimonial.id}`} className={styles.imageWrapper}>
                <Image
                  src={activeTestimonial.imageUrl}
                  alt={`Penyerahan produk Kertas Lipat ke ${activeTestimonial.name}`}
                  fill
                  className={styles.handoverImage}
                  priority
                />
              </div>

              {/* Overlapping Avatar Pill Badge at Bottom */}
              <div className={styles.trustedBadge}>
                <span className={styles.badgeText}>Trusted Clients</span>
                <div className={styles.avatarGroup}>
                  {activeTestimonials.slice(0, 3).map((item) => (
                    <span key={item.id} className={styles.miniAvatar}>{item.avatar}</span>
                  ))}
                  {activeTestimonials.length > 3 && (
                    <span className={styles.miniAvatarPlus}>+</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Primary Blue Review Box Card */}
          <div className={styles.rightCard}>
            <div key={`review-${activeTestimonial.id}`} className={styles.slideCard}>
              
              {/* Quote Icon & Stars Row */}
              <div className={styles.cardTopRow}>
                <Quote size={48} className={styles.quoteIcon} />
                <div className={styles.stars}>
                  {Array.from({ length: activeTestimonial.rating }).map((_, i) => (
                    <span key={i} className={styles.star}>★</span>
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <p className={styles.quote}>
                {activeTestimonial.quote}
              </p>

              {/* Author Profile Row */}
              <div className={styles.authorRow}>
                <div className={styles.avatar}>{activeTestimonial.avatar}</div>
                <div className={styles.authorMeta}>
                  <h4 className={styles.name}>{activeTestimonial.name}</h4>
                  <span className={styles.role}>{activeTestimonial.role}</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Navigation Dot Indicators */}
        <div className={styles.paginationDots}>
          {activeTestimonials.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Lihat review ke-${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
