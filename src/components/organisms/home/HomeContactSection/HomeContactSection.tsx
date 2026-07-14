/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/atoms/Badge/Badge';
import { Button } from '@/components/atoms/Button/Button';
import { useHomepageContent, ContactFeature } from '@/hooks/useHomepageContent';
import styles from './HomeContactSection.module.css';

interface ContactData {
  badge: string;
  title: string;
  desc1: string;
  desc2: string;
  features: ContactFeature[];
  formTitle: string;
  btnText: string;
  waBase: string;
}

const STATIC_DATA: ContactData = {
  badge: 'Konsultasi Kreatif',
  title: 'Punya Kebutuhan Cetak Skala Besar atau Spesifikasi Kustom?',
  desc1: 'Apakah Anda merencanakan pengadaan Buku Tahunan Sekolah, Seminar Kit kantor, atau butuh kustomisasi bahan khusus yang tidak ada di katalog?',
  desc2: 'Hubungi Tim Desainer & Sales kami. Kami siap membantu dari tahap konsultasi konsep visual, pemilihan bahan cetak terbaik, hingga penawaran harga formal untuk administrasi Anda.',
  features: [
    { id: 1, icon: '💡', title: 'Bantuan Desain Profesional', text: 'Tim kreatif kami siap merapikan layout file Anda agar siap cetak.' },
    { id: 2, icon: '📝', title: 'Penawaran Harga Formal', text: 'Kami sediakan invoice penawaran resmi untuk sekolah & perusahaan.' }
  ],
  formTitle: 'Formulir Konsultasi Cetak',
  btnText: 'Kirim Permintaan Konsultasi',
  waBase: 'https://wa.me/6281234567890',
};

export function HomeContactSection() {
  const { content, isLoaded } = useHomepageContent();
  const [activeData, setActiveData] = useState<ContactData>(STATIC_DATA);

  useEffect(() => {
    if (isLoaded && content?.contact) {
      setActiveData(content.contact);
    }
  }, [isLoaded, content]);

  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    whatsapp: '',
    category: 'Paket Branding UMKM',
    quantityAndBudget: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [waLink, setWaLink] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Compile WhatsApp Link text
    const waBase = activeData.waBase || 'https://wa.me/6281234567890';
    const text = `Halo Kertas Lipat! Saya ingin berkonsultasi mengenai kebutuhan cetak/branding.

*Detail Permintaan:*
- *Nama:* ${formData.name}
- *Organisasi/Sekolah:* ${formData.organization || '-'}
- *WhatsApp:* ${formData.whatsapp}
- *Kategori:* ${formData.category}
- *Jumlah & Budget:* ${formData.quantityAndBudget || '-'}
- *Deskripsi Kebutuhan:* ${formData.message}

Terima kasih.`;

    // Save lead to localStorage history
    try {
      const storedLeads = localStorage.getItem('kertas_lipat_leads');
      const leads = storedLeads ? JSON.parse(storedLeads) : [];
      const newLead = {
        id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: 'contact',
        timestamp: new Date().toISOString(),
        name: formData.name.trim(),
        phone: formData.whatsapp.trim(),
        details: `Kategori: ${formData.category} | Org: ${formData.organization || '-'} | Budget/Qty: ${formData.quantityAndBudget || '-'} | Pesan: ${formData.message}`,
      };
      leads.unshift(newLead);
      localStorage.setItem('kertas_lipat_leads', JSON.stringify(leads));
    } catch (err) {
      console.error('Failed to save contact lead', err);
    }

    const encodedText = encodeURIComponent(text);
    setWaLink(`${waBase}?text=${encodedText}`);
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={`${styles.container} container`}>
        <div className={styles.grid}>
          {/* Creative Column / Sidebar */}
          <div className={styles.visualCol}>
            <Badge variant="primary" className={styles.visualBadge}>{activeData.badge}</Badge>
            <h2 className={styles.visualTitle}>{activeData.title}</h2>
            <p className={styles.visualDesc}>{activeData.desc1}</p>
            <p className={styles.visualDesc}>{activeData.desc2}</p>

            <div className={styles.features}>
              {activeData.features.map((feat) => (
                <div key={feat.id} className={styles.featureItem}>
                  <span className={styles.featureIcon}>{feat.icon}</span>
                  <div>
                    <h4 className={styles.featureTitle}>{feat.title}</h4>
                    <p className={styles.featureText}>{feat.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Column */}
          <div className={styles.formCol}>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className={styles.form}>
                <h3 className={styles.formTitle}>{activeData.formTitle}</h3>
                
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>Nama Lengkap *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={styles.input}
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Masukkan nama lengkap Anda"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="organization" className={styles.label}>Nama Organisasi / Perusahaan / Sekolah (Opsional)</label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    className={styles.input}
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder="Contoh: Panitia Kelulusan SMA 1 / PT Sukses"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="whatsapp" className={styles.label}>Nomor WhatsApp Aktif *</label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    className={styles.input}
                    value={formData.whatsapp}
                    onChange={handleChange}
                    required
                    placeholder="Contoh: 08123456789"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="category" className={styles.label}>Kategori Kebutuhan *</label>
                  <select
                    id="category"
                    name="category"
                    className={styles.select}
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="Cetak Buku Tahunan Sekolah (Yearbook)">Cetak Buku Tahunan Sekolah (Yearbook)</option>
                    <option value="Paket Branding UMKM">Paket Branding UMKM</option>
                    <option value="Merchandise / Seminar Kit Korporat">Merchandise / Seminar Kit Korporat</option>
                    <option value="Cetak Custom Lainnya (Spesifikasi Khusus)">Cetak Custom Lainnya (Spesifikasi Khusus)</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="quantityAndBudget" className={styles.label}>Estimasi Jumlah Pesanan & Budget</label>
                  <input
                    type="text"
                    id="quantityAndBudget"
                    name="quantityAndBudget"
                    className={styles.input}
                    value={formData.quantityAndBudget}
                    onChange={handleChange}
                    placeholder="Contoh: 150 pcs / Budget Rp 10 Juta"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>Deskripsi Kebutuhan Anda *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className={styles.textarea}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tuliskan spesifikasi bahan, ukuran, jilid, atau pertanyaan Anda di sini..."
                  />
                </div>

                <Button type="submit" variant="primary" className={styles.submitBtn}>
                  {activeData.btnText}
                </Button>
              </form>
            ) : (
              <div className={styles.successCard}>
                <div className={styles.successIcon}>✓</div>
                <h3 className={styles.successTitle}>Permintaan Berhasil Dikirim!</h3>
                <p className={styles.successDesc}>
                  Terima kasih, <strong>{formData.name}</strong>. Tim Kertas Lipat akan menindaklanjuti konsultasi Anda melalui nomor WhatsApp <strong>{formData.whatsapp}</strong>.
                </p>
                <p className={styles.successDesc}>
                  Untuk mempercepat proses konsultasi, Anda juga bisa langsung terhubung ke WhatsApp Sales Admin kami dengan membawa draf formulir yang baru saja Anda isi.
                </p>
                <div className={styles.successActions}>
                  <a href={waLink} target="_blank" rel="noopener noreferrer" className={styles.waBtn}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={styles.waIcon}>
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.733-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.381 9.805-9.768.002-2.607-1.012-5.059-2.859-6.908-1.847-1.848-4.301-2.865-6.913-2.867-5.407 0-9.809 4.385-9.811 9.773-.001 1.57.425 3.102 1.232 4.478l-.992 3.626 3.731-.977zm11.387-5.464c-.3-.149-1.774-.874-2.047-.973-.272-.1-.471-.149-.669.149-.198.3-.769.973-.943 1.171-.173.198-.347.223-.647.074-.3-.149-1.27-.469-2.42-1.494-.894-.797-1.498-1.782-1.673-2.08-.173-.3-.018-.462.13-.61.135-.133.3-.347.45-.52.149-.174.198-.298.298-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.568-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.774-.726 2.022-1.429.247-.695.247-1.29.173-1.429-.073-.133-.272-.21-.572-.359z"/>
                    </svg>
                    Hubungi Sales via WhatsApp
                  </a>
                  <button onClick={() => setIsSubmitted(false)} className={styles.resetBtn}>
                    Kirim Form Baru
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
