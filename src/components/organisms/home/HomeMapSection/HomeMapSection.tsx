import React from 'react';
import { MapPin, Clock, Phone, Mail, Navigation } from 'lucide-react';
import { Badge } from '@/components/atoms/Badge/Badge';
import styles from './HomeMapSection.module.css';

export function HomeMapSection() {
  return (
    <section id="location" className={styles.section}>
      <div className={`${styles.container} container`}>
        {/* Section Header */}
        <div className={styles.header}>
          <Badge variant="teal" className={styles.badge}>Lokasi Workshop</Badge>
          <h2 className={styles.title}>Kunjungi Workshop Fisik Kami</h2>
          <p className={styles.subtitle}>
            Temui tim kami secara langsung, diskusikan sampel produk/bahan, konsultasikan desain cetak Anda, atau ambil langsung pesanan Anda.
          </p>
        </div>

        {/* Map and Details Grid */}
        <div className={styles.grid}>
          {/* Left Panel: Contact & Address Info Card */}
          <div className={styles.infoCard}>
            <h3 className={styles.cardTitle}>Workshop Kertas Lipat</h3>
            
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <div className={styles.iconBox}>
                  <MapPin size={20} />
                </div>
                <div className={styles.infoText}>
                  <h4 className={styles.infoLabel}>Alamat Utama</h4>
                  <p className={styles.infoDetail}>
                    Jl. KH. Ahmad Dahlan No. 45, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12130
                  </p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.iconBox}>
                  <Clock size={20} />
                </div>
                <div className={styles.infoText}>
                  <h4 className={styles.infoLabel}>Jam Operasional</h4>
                  <p className={styles.infoDetail}>Senin - Sabtu: 09:00 - 18:00 WIB (Minggu Libur)</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.iconBox}>
                  <Phone size={20} />
                </div>
                <div className={styles.infoText}>
                  <h4 className={styles.infoLabel}>Telepon / WhatsApp</h4>
                  <p className={styles.infoDetail}>+62 812-3456-7890</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.iconBox}>
                  <Mail size={20} />
                </div>
                <div className={styles.infoText}>
                  <h4 className={styles.infoLabel}>Email Support</h4>
                  <p className={styles.infoDetail}>hello@kertaslipat.com</p>
                </div>
              </div>
            </div>

            {/* Directions Action Button */}
            <a 
              href="https://maps.google.com/?q=Kebayoran+Baru+Jakarta+Selatan" 
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3986.420904773845!2d106.797204!3d-6.24156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1165e3170e9%3A0x6b8bc2299b9cf9b!2sKebayoran%20Baru%2C%20South%20Jakarta%20City%2C%20Jakarta!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Lokasi Workshop Kertas Lipat"
              className={styles.mapIframe}
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
