import React from 'react';
import { Badge } from '@/components/atoms/Badge/Badge';
import styles from './HomeTestimonialSection.module.css';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
  segment: 'Mahasiswa' | 'UMKM' | 'Sekolah' | 'Korporat';
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
  },
  {
    id: 2,
    name: 'Ibu Endang (38 th)',
    role: 'Pemilik "Sambal Bu Endang"',
    avatar: '👩‍🍳',
    quote: 'Paket Branding UMKM Starter sangat praktis! Saya dibantu dibuatkan desain stiker botol gratis oleh tim desainer. Bahan stiker vinyl-nya benar-benar tahan air, tidak terkelupas biarpun disimpan di kulkas. Usaha sambal saya jadi keliatan premium!',
    rating: 5,
    segment: 'UMKM',
  },
  {
    id: 3,
    name: 'Pak Budi (45 th)',
    role: 'Wakil Kepala Sekolah Kesiswaan',
    avatar: '👨‍🏫',
    quote: 'Kami memesan 150 Paket Buku Tahunan Sekolah Standard. Finishing Spot UV pada cover terlihat mewah dan rapi. Pihak sales sangat kooperatif menyusun penawaran harga formal untuk birokrasi sekolah kami. Sangat terpercaya.',
    rating: 5,
    segment: 'Sekolah',
  },
  {
    id: 4,
    name: 'Citra (25 th)',
    role: 'HR Specialist Tech Startup',
    avatar: '👩‍💼',
    quote: 'Cetak seminar kit (notebook spiral custom, goodie bag, dan pen berlogo) sebanyak 100 set selesai hanya dalam 3 hari! Hasil cetak warna logonya presisi sesuai brand guidelines perusahaan. Delivery aman dengan proteksi tebal.',
    rating: 5,
    segment: 'Korporat',
  },
];

export function HomeTestimonialSection() {
  return (
    <section id="testimonials" className={styles.section}>
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <Badge variant="success">Testimoni</Badge>
          <h2 className={styles.title}>Dipercaya Lintas Generasi & Skala Usaha</h2>
          <p className={styles.subtitle}>
            Apa kata mereka yang telah mempercayakan branding, cetakan, dan merchandise kustom mereka kepada Kertas Lipat?
          </p>
        </div>

        {/* Testimonials Masonry Grid */}
        <div className={styles.grid}>
          {testimonials.map((t) => (
            <div key={t.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.avatar}>{t.avatar}</div>
                <div className={styles.meta}>
                  <h4 className={styles.name}>{t.name}</h4>
                  <span className={styles.role}>{t.role}</span>
                </div>
                <Badge variant={t.segment === 'Mahasiswa' ? 'primary' : t.segment === 'UMKM' ? 'secondary' : t.segment === 'Sekolah' ? 'purple' : 'success'} className={styles.segmentBadge}>
                  {t.segment}
                </Badge>
              </div>

              <div className={styles.stars}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className={styles.star}>★</span>
                ))}
              </div>

              <p className={styles.quote}>&ldquo;{t.quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
