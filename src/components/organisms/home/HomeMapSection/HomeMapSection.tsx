/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Phone, Mail, Navigation } from 'lucide-react';
import { Badge } from '@/components/atoms/Badge/Badge';
import { useHomepageContent } from '@/hooks/useHomepageContent';
import styles from './HomeMapSection.module.css';

interface MapsData {
  badge: string;
  title: string;
  subtitle: string;
  cardTitle: string;
  hours: string;
  phone: string;
  email: string;
  directionUrl: string;
  address: string;
  iframeSrc: string;
}

const STATIC_DATA: MapsData = {
  badge: 'Lokasi Workshop',
  title: 'Kunjungi Workshop Fisik Kami',
  subtitle: 'Temui tim kami secara langsung, diskusikan sampel produk/bahan, konsultasikan desain cetak Anda, atau ambil langsung pesanan Anda.',
  cardTitle: 'Workshop Kertas Lipat',
  hours: 'Senin - Sabtu: 09:00 - 18:00 WIB (Minggu Libur)',
  phone: '+62 812-3456-7890',
  email: 'hello@kertaslipat.com',
  directionUrl: 'https://maps.google.com/?q=Kebayoran+Baru+Jakarta+Selatan',
  address: 'Jl. KH. Ahmad Dahlan No. 45, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12130',
  iframeSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3986.420904773845!2d106.797204!3d-6.24156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1165e3170e9%3A0x6b8bc2299b9cf9b!2sKebayoran%20Baru%2C%20South%20Jakarta%20City%2C%20Jakarta!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid',
};

export function HomeMapSection() {
  const { content, isLoaded } = useHomepageContent();
  const [activeData, setActiveData] = useState<MapsData>(STATIC_DATA);

  useEffect(() => {
    if (isLoaded && content?.maps) {
      setActiveData(content.maps);
    }
  }, [isLoaded, content]);

  return (
    <section id="location" className={styles.section}>
      <div className={`${styles.container} container`}>
        {/* Section Header */}
        <div className={styles.header}>
          <Badge variant="teal" className={styles.badge}>{activeData.badge}</Badge>
          <h2 className={styles.title}>{activeData.title}</h2>
          <p className={styles.subtitle}>{activeData.subtitle}</p>
        </div>

        {/* Map and Details Grid */}
        <div className={styles.grid}>
          {/* Left Panel: Contact & Address Info Card */}
          <div className={styles.infoCard}>
            <h3 className={styles.cardTitle}>{activeData.cardTitle}</h3>
            
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <div className={styles.iconBox}>
                  <MapPin size={20} />
                </div>
                <div className={styles.infoText}>
                  <h4 className={styles.infoLabel}>Alamat Utama</h4>
                  <p className={styles.infoDetail}>{activeData.address}</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.iconBox}>
                  <Clock size={20} />
                </div>
                <div className={styles.infoText}>
                  <h4 className={styles.infoLabel}>Jam Operasional</h4>
                  <p className={styles.infoDetail}>{activeData.hours}</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.iconBox}>
                  <Phone size={20} />
                </div>
                <div className={styles.infoText}>
                  <h4 className={styles.infoLabel}>Telepon / WhatsApp</h4>
                  <p className={styles.infoDetail}>{activeData.phone}</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.iconBox}>
                  <Mail size={20} />
                </div>
                <div className={styles.infoText}>
                  <h4 className={styles.infoLabel}>Email Support</h4>
                  <p className={styles.infoDetail}>{activeData.email}</p>
                </div>
              </div>
            </div>

            {/* Directions Action Button */}
            <a 
              href={activeData.directionUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.directionsBtn}
            >
              <Navigation size={18} />
              <span>Petunjuk Arah (Google Maps)</span>
            </a>
          </div>

          {/* Right Panel: Embedded Interactive Google Map */}
          <div className={styles.mapContainer}>
            <iframe
              src={activeData.iframeSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Google Maps Lokasi ${activeData.cardTitle}`}
              className={styles.mapIframe}
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
