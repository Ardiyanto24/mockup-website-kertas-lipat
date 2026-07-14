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
  
  // Fields for checkout type
  address?: string;
  notes?: string;
  items?: {
    name: string;
    sku: string;
    quantity: number;
    unit: string;
    variantName: string;
    needDesignService: boolean;
    addons: { name: string; price: number }[];
    total: number;
  }[];
  totalPrice?: number;
  uploadedFileName?: string;
  uploadedFileSize?: string;
  
  // Fields for contact type
  organization?: string;
  category?: string;
  quantityAndBudget?: string;
  message?: string;
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
            address: 'Jl. Merdeka No. 45, Kecamatan Sumur Bandung, Kota Bandung, Jawa Barat 40111',
            notes: 'Mohon agar barang dikirim sebelum jam 3 sore karena kantor tutup.',
            items: [
              {
                name: 'Brosur Lipat Tiga HVS',
                sku: 'KL-PRT-01',
                quantity: 500,
                unit: 'lembar',
                variantName: 'Bahan HVS 80gr',
                needDesignService: true,
                addons: [
                  { name: 'Laminasi Protektif Premium', price: 1500 }
                ],
                total: 325000
              }
            ],
            totalPrice: 375000,
            uploadedFileName: 'design_brosur_draft_final.zip',
            uploadedFileSize: '4.2 MB'
          },
          {
            id: 'lead_dummy_2',
            type: 'contact',
            timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
            name: 'Siti Aminah',
            phone: '085789012345',
            organization: 'Panitia Alumni SMA 1 Bandung',
            category: 'Buku Tahunan Sekolah',
            quantityAndBudget: '150 Buku / Budget Rp 20.000.000',
            message: 'Halo admin Kertas Lipat, kami berencana mencetak buku tahunan sekolah untuk angkatan 2026. Kami butuh konsultasi mengenai mockup cover hardcover timbul/embossed dan laminasi doff.'
          },
          {
            id: 'lead_dummy_3',
            type: 'checkout',
            timestamp: new Date(Date.now() - 1000 * 60 * 600).toISOString(), // 10 hours ago
            name: 'Denny Wijaya',
            phone: '089912345678',
            address: 'Ruko Paskal Hyper Square Blok B No. 12, Kota Bandung, Jawa Barat 40181',
            notes: '',
            items: [
              {
                name: 'Kartu Nama Premium Doff',
                sku: 'KL-PRT-03',
                quantity: 3,
                unit: 'box',
                variantName: 'Art Carton 260gr + Doff',
                needDesignService: false,
                addons: [],
                total: 135000
              }
            ],
            totalPrice: 135000
          }
        ];
        localStorage.setItem('kertas_lipat_leads', JSON.stringify(dummyLeads));
        setLeads(dummyLeads);
      }
    } catch {
      console.error('Failed to load leads history');
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

  // Currency formatting helper
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
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
      
      const searchCheckout = l.type === 'checkout' 
        ? (l.address || '').toLowerCase().includes(query) || 
          (l.notes || '').toLowerCase().includes(query) ||
          (l.items || []).some(item => item.name.toLowerCase().includes(query) || item.sku.toLowerCase().includes(query))
        : false;

      const searchContact = l.type === 'contact'
        ? (l.organization || '').toLowerCase().includes(query) ||
          (l.category || '').toLowerCase().includes(query) ||
          (l.message || '').toLowerCase().includes(query)
        : false;

      return (
        l.name.toLowerCase().includes(query) ||
        l.phone.includes(query) ||
        searchCheckout ||
        searchContact
      );
    });

  // Make direct WhatsApp link
  const getWhatsAppLink = (phone: string) => {
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

              {/* Structured Details Box based on Type */}
              {lead.type === 'checkout' ? (
                <div className={styles.detailsBox} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    <div>
                      <strong style={{ display: 'block', fontSize: '11px', color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Alamat Pengiriman</strong>
                      <span style={{ fontSize: '13px', color: '#334155' }}>{lead.address}</span>
                    </div>
                    {lead.notes && (
                      <div>
                        <strong style={{ display: 'block', fontSize: '11px', color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Catatan Pengiriman</strong>
                        <span style={{ fontSize: '13px', color: '#334155', fontStyle: 'italic' }}>"{lead.notes}"</span>
                      </div>
                    )}
                    {lead.uploadedFileName && (
                      <div>
                        <strong style={{ display: 'block', fontSize: '11px', color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>File Desain / Aset</strong>
                        <span style={{ fontSize: '13px', color: '#2563eb', fontWeight: 'bold' }}>
                          📁 {lead.uploadedFileName} ({lead.uploadedFileSize})
                        </span>
                      </div>
                    )}
                  </div>

                  <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
                    <strong style={{ display: 'block', fontSize: '11px', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>Rincian Barang Cetak</strong>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {lead.items?.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff', padding: '8px 12px', borderRadius: '4px', border: '1px solid #e2e8f0', flexWrap: 'wrap', gap: '8px' }}>
                          <div>
                            <span style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '13px' }}>{item.name}</span>
                            <span style={{ fontSize: '11px', color: '#64748b', marginLeft: '6px' }}>({item.sku})</span>
                            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                              <span>Varian: {item.variantName}</span>
                              {item.needDesignService && <span style={{ marginLeft: '8px', color: '#2563eb', fontWeight: '600' }}>• +Jasa Desain</span>}
                              {item.addons && item.addons.length > 0 && (
                                <span style={{ marginLeft: '8px', color: '#10b981' }}>
                                  • Add-ons: {item.addons.map(a => a.name).join(', ')}
                                </span>
                              )}
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <span style={{ fontSize: '12px', color: '#64748b', marginRight: '12px' }}>{item.quantity} {item.unit}</span>
                            <strong style={{ fontSize: '13px', color: '#0f172a' }}>{formatPrice(item.total)}</strong>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px', fontSize: '14px' }}>
                      <span style={{ fontWeight: '700', color: '#64748b', marginRight: '8px' }}>Total Pembayaran:</span>
                      <strong style={{ fontWeight: '900', color: '#2563eb' }}>{formatPrice(lead.totalPrice || 0)}</strong>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles.detailsBox} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    {lead.organization && (
                      <div>
                        <strong style={{ display: 'block', fontSize: '11px', color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Organisasi / Sekolah / Perusahaan</strong>
                        <span style={{ fontSize: '13px', color: '#334155' }}>{lead.organization}</span>
                      </div>
                    )}
                    <div>
                      <strong style={{ display: 'block', fontSize: '11px', color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Kategori Cetak</strong>
                      <span style={{ fontSize: '13px', color: '#334155', fontWeight: 'bold' }}>{lead.category}</span>
                    </div>
                    {lead.quantityAndBudget && (
                      <div>
                        <strong style={{ display: 'block', fontSize: '11px', color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Estimasi Jumlah & Budget</strong>
                        <span style={{ fontSize: '13px', color: '#334155' }}>{lead.quantityAndBudget}</span>
                      </div>
                    )}
                  </div>
                  <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
                    <strong style={{ display: 'block', fontSize: '11px', color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Deskripsi Kebutuhan</strong>
                    <p style={{ fontSize: '13px', color: '#334155', margin: 0, whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{lead.message}</p>
                  </div>
                </div>
              )}
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
