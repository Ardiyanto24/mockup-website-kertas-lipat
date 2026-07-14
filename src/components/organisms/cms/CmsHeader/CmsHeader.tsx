'use client';

import React from 'react';
import { ShieldCheck, RefreshCw } from 'lucide-react';
import styles from './CmsHeader.module.css';

interface CmsHeaderProps {
  activeMainMenu: 'BERANDA' | 'KATALOG' | 'RIWAYAT';
  handleResetToDefault: () => void;
}

export function CmsHeader({ activeMainMenu, handleResetToDefault }: CmsHeaderProps) {
  const getHeaderTitle = () => {
    if (activeMainMenu === 'KATALOG') return 'CMS Pengaturan Katalog';
    if (activeMainMenu === 'RIWAYAT') return 'Riwayat Transaksi & Leads';
    return 'CMS Pengaturan Konten';
  };

  const getHeaderSubtitle = () => {
    if (activeMainMenu === 'KATALOG') return 'Pusat kustomisasi daftar produk satuan, paket bundling, harga dasar, dan deskripsi produk';
    if (activeMainMenu === 'RIWAYAT') return 'Daftar riwayat data checkout pemesanan WhatsApp dan kontak formulir';
    return 'Pusat kustomisasi isi visual seksi halaman depan Beranda Kertas Lipat';
  };

  return (
    <header className={styles.header}>
      <div>
        <h1 className={styles.title}>{getHeaderTitle()}</h1>
        <p className={styles.subtitle}>{getHeaderSubtitle()}</p>
      </div>

      {/* User Profile Pill Indicator */}
      <div className={styles.headerActions}>
        {activeMainMenu === 'BERANDA' && (
          <button
            onClick={handleResetToDefault}
            className={styles.btnOutline}
            title="Reset ke setelan bawaan cetak"
          >
            <RefreshCw size={12} />
            <span>Setelan Awal</span>
          </button>
        )}

        <div className={styles.userPill}>
          <div className={styles.avatar}>
            <ShieldCheck size={18} color="#267aec" />
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>Demo Admin</span>
            <span className={styles.userRole}>Sesi Aktif</span>
          </div>
        </div>
      </div>
    </header>
  );
}
