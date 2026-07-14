/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useEffect, useState } from 'react';
import { Trash2, Search, Calendar, MessageSquare, ShoppingCart, ExternalLink } from 'lucide-react';
import styles from './CmsLeadsTracker.module.css';

export interface Lead {
  id: string;
  type: 'checkout' | 'contact';
  timestamp: string;
  name: string;
  phone: string;
  details: string;
}

export function CmsLeadsTracker() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'checkout' | 'contact'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Load leads from localStorage
  const loadLeads = () => {
    try {
      const stored = localStorage.getItem('kertas_lipat_leads');
      if (stored) {
        setLeads(JSON.parse(stored));
      } else {
        const dummyLeads: Lead[] = [
          {
            id: 'lead_dummy_1',
            type: 'checkout',
            timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
            name: 'Budi Santoso',
            phone: '081234567890',
            details: 'Barang: Brosur Lipat Tiga HVS (500 Pcs) | Total: Rp 325.000 | Alamat: Jl. Merdeka No. 45, Bandung | Catatan: Minta kirim sebelum jam 3 sore',
          },
          {
            id: 'lead_dummy_2',
            type: 'contact',
            timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
            name: 'Siti Aminah (SMA 1 Bandung)',
            phone: '085789012345',
            details: 'Kategori: Buku Tahunan Sekolah (Hardcover) | Org: SMA 1 Bandung | Budget/Qty: 150 Buku, Budget 20jt | Pesan: Halo, kami butuh konsultasi layout hardcover metalik untuk alumni angkatan 2026.',
          },
          {
            id: 'lead_dummy_3',
            type: 'checkout',
            timestamp: new Date(Date.now() - 1000 * 60 * 600).toISOString(), // 10 hours ago
            name: 'Denny Wijaya',
            phone: '089912345678',
            details: 'Barang: Kartu Nama Premium Doff (3 Box) | Total: Rp 135.000 | Alamat: Ruko Paskal Hyper Square B-12, Bandung',
          },
        ];
        localStorage.setItem('kertas_lipat_leads', JSON.stringify(dummyLeads));
        setLeads(dummyLeads);
      }
    } catch (err) {
      console.error('Failed to load leads history', err);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleDeleteLead = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus data lead ini dari riwayat?')) {
      const updated = leads.filter(l => l.id !== id);
      setLeads(updated);
      localStorage.setItem('kertas_lipat_leads', JSON.stringify(updated));
    }
  };

  const handleClearAll = () => {
    if (confirm('Apakah Anda yakin ingin MENGHAPUS SEMUA data riwayat leads? Tindakan ini tidak dapat dibatalkan.')) {
      setLeads([]);
      localStorage.removeItem('kertas_lipat_leads');
    }
  };

  // Formatting date time
  const formatDateTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  // Filter & Search leads
  const filteredLeads = leads
    .filter((l) => {
      if (activeTab === 'checkout') return l.type === 'checkout';
      if (activeTab === 'contact') return l.type === 'contact';
      return true;
    })
    .filter((l) => {
      const query = searchQuery.toLowerCase();
      return (
        l.name.toLowerCase().includes(query) ||
        l.phone.includes(query) ||
        l.details.toLowerCase().includes(query)
      );
    });

  // Make direct WhatsApp link
  const getWhatsAppLink = (phone: string) => {
    // clean non-digits
    let cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('0')) {
      cleaned = '62' + cleaned.slice(1);
    }
    return `https://wa.me/${cleaned}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h2 className={styles.title}>Riwayat Transaksi & Leads</h2>
          <p className={styles.subtitle}>
            Daftar pelanggan yang melakukan checkout keranjang belanja atau mengirim formulir kontak.
          </p>
        </div>
        {leads.length > 0 && (
          <div className={styles.actions}>
            <button onClick={handleClearAll} className={styles.clearBtn}>
              Hapus Semua Riwayat
            </button>
          </div>
        )}
      </div>

      {/* Tab Filters & Search Bar Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', flexWrap: 'wrap', marginTop: '10px' }}>
        <div className={styles.tabs}>
          <button
            onClick={() => setActiveTab('all')}
            className={`${styles.tabBtn} ${activeTab === 'all' ? styles.tabBtnActive : ''}`}
          >
            Semua ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab('checkout')}
            className={`${styles.tabBtn} ${activeTab === 'checkout' ? styles.tabBtnActive : ''}`}
          >
            Checkout Keranjang ({leads.filter(l => l.type === 'checkout').length})
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`${styles.tabBtn} ${activeTab === 'contact' ? styles.tabBtnActive : ''}`}
          >
            Hubungi Kontak ({leads.filter(l => l.type === 'contact').length})
          </button>
        </div>

        <div className={styles.searchBar}>
          <Search size={16} style={{ color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Cari nama, nomor WA, atau detail..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* Lead Cards List */}
      {filteredLeads.length > 0 ? (
        <div className={styles.leadList}>
          {filteredLeads.map((lead) => (
            <div key={lead.id} className={styles.leadCard}>
              <div className={styles.cardHeader}>
                <div className={styles.badgeRow}>
                  {lead.type === 'checkout' ? (
                    <span className={`${styles.badge} ${styles.badgeCheckout}`}>
                      <ShoppingCart size={10} style={{ marginRight: '4px', display: 'inline' }} />
                      Checkout WA
                    </span>
                  ) : (
                    <span className={`${styles.badge} ${styles.badgeContact}`}>
                      <MessageSquare size={10} style={{ marginRight: '4px', display: 'inline' }} />
                      Form Kontak
                    </span>
                  )}
                  <span className={styles.timestamp}>
                    <Calendar size={10} style={{ marginRight: '4px', display: 'inline', marginTop: '-2px' }} />
                    {formatDateTime(lead.timestamp)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteLead(lead.id)}
                  className={styles.deleteBtn}
                  title="Hapus dari riwayat"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className={styles.clientInfo}>
                <span className={styles.clientName}>{lead.name}</span>
                <span style={{ color: '#cbd5e1' }}>|</span>
                <a
                  href={getWhatsAppLink(lead.phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.waLink}
                >
                  <span>{lead.phone}</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              <div className={styles.detailsBox}>
                {lead.details}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon}>📂</span>
          <h3 className={styles.emptyTitle}>Belum ada data history</h3>
          <p className={styles.emptyText}>
            {searchQuery 
              ? 'Tidak ditemukan leads yang cocok dengan kriteria pencarian Anda.' 
              : 'Riwayat data leads masih kosong. Data akan terisi otomatis begitu ada user yang melakukan checkout atau mengirim form kontak.'
            }
          </p>
        </div>
      )}
    </div>
  );
}
