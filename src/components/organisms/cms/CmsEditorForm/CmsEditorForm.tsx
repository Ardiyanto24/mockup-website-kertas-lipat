/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { Undo, Save, Plus, Trash2 } from 'lucide-react';
import { HomepageContent } from '@/hooks/useHomepageContent';
import { products } from '@/data/products';
import styles from './CmsEditorForm.module.css';

interface CmsEditorFormProps {
  activeSubMenu: string;
  draftContent: HomepageContent;
  setDraftContent: (content: HomepageContent) => void;
  handleSave: (e: React.FormEvent) => void;
  handleCancel: () => void;
  submenus: { id: string; name: string }[];
}

export function CmsEditorForm({
  activeSubMenu,
  draftContent,
  setDraftContent,
  handleSave,
  handleCancel,
  submenus,
}: CmsEditorFormProps) {
  return (
    <div className={styles.editorWorkspace}>
      <div className={styles.editorCard}>
        <form onSubmit={handleSave} className={styles.form}>
          
          {/* Form Title Header Card */}
          <div className={styles.editorHeader}>
            <div>
              <h2 className={styles.editorTitle}>
                Seksi: {submenus.find((s) => s.id === activeSubMenu)?.name}
              </h2>
              <span className={styles.editorSubtitle}>
                Modifikasi parameter teks dan visual, lalu tekan Simpan Perubahan di bawah.
              </span>
            </div>

            {/* Form Quick Action Header Buttons */}
            <div className={styles.editorActions}>
              <button type="button" onClick={handleCancel} className={styles.btnSecondary}>
                <Undo size={14} style={{ marginRight: '6px', display: 'inline-block', verticalAlign: 'middle' }} />
                <span>Batalkan</span>
              </button>
              <button type="submit" className={styles.btnPrimary}>
                <Save size={14} style={{ marginRight: '6px', display: 'inline-block', verticalAlign: 'middle' }} />
                <span>Simpan Perubahan</span>
              </button>
            </div>
          </div>

          {/* Form Input Blocks based on activeSubMenu */}
          <div className={styles.editorBody}>
            
            {/* 1. HERO SLIDES EDITOR */}
            {activeSubMenu === 'HERO' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <div className={styles.tipsBanner}>
                  <strong>Tips Penulisan Judul (Styling Segments):</strong><br />
                  Gunakan kurung kurawal <code>{'{teks}'}</code> untuk memberikan efek highlight biru berlatar belakang. <br />
                  Gunakan kurung siku <code>{'[teks]'}</code> untuk memberikan warna oranye pada teks. <br />
                  Contoh: <code>Cetak {'{Ide Kreatifmu}'}, Hidupkan {'[Brand-mu.]'}</code>
                </div>

                {draftContent.hero.slides.map((slide, sIdx) => (
                  <div key={slide.id} className={styles.slideCard}>
                    <div className={styles.slideCardHeader}>
                      <span className={styles.slideTitle}>Slide #{slide.id}</span>
                    </div>
                    <div className={styles.formRow}>
                      <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                        <label className={styles.label}>Judul Slide (Mendukung Highlight Template)</label>
                        <input
                          type="text"
                          value={slide.title}
                          onChange={(e) => {
                            const next = { ...draftContent };
                            next.hero.slides[sIdx].title = e.target.value;
                            setDraftContent(next);
                          }}
                          className={styles.input}
                          required
                        />
                      </div>
                      <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                        <label className={styles.label}>Penjelasan / Deskripsi Pendek</label>
                        <textarea
                          value={slide.subText}
                          onChange={(e) => {
                            const next = { ...draftContent };
                            next.hero.slides[sIdx].subText = e.target.value;
                            setDraftContent(next);
                          }}
                          className={styles.textarea}
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Gambar Latar Belakang (URL Mockup)</label>
                        <input
                          type="text"
                          value={slide.image}
                          onChange={(e) => {
                            const next = { ...draftContent };
                            next.hero.slides[sIdx].image = e.target.value;
                            setDraftContent(next);
                          }}
                          className={styles.input}
                          required
                        />
                      </div>
                      <div className={styles.formGroup} style={{ display: 'none' }}></div>
                      
                      {/* CTA 1 (Primary) settings */}
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Teks Tombol Utama (CTA)</label>
                        <input
                          type="text"
                          value={slide.ctaText}
                          onChange={(e) => {
                            const next = { ...draftContent };
                            next.hero.slides[sIdx].ctaText = e.target.value;
                            setDraftContent(next);
                          }}
                          className={styles.input}
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Tautan Tombol Utama (CTA Href)</label>
                        <input
                          type="text"
                          value={slide.ctaHref}
                          onChange={(e) => {
                            const next = { ...draftContent };
                            next.hero.slides[sIdx].ctaHref = e.target.value;
                            setDraftContent(next);
                          }}
                          className={styles.input}
                          required
                        />
                      </div>

                      {/* CTA 2 (Secondary) settings */}
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Teks Tombol Sekunder</label>
                        <input
                          type="text"
                          value={slide.secondaryCtaText}
                          onChange={(e) => {
                            const next = { ...draftContent };
                            next.hero.slides[sIdx].secondaryCtaText = e.target.value;
                            setDraftContent(next);
                          }}
                          className={styles.input}
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Tautan Tombol Sekunder (Secondary Href)</label>
                        <input
                          type="text"
                          value={slide.secondaryCtaHref}
                          onChange={(e) => {
                            const next = { ...draftContent };
                            next.hero.slides[sIdx].secondaryCtaHref = e.target.value;
                            setDraftContent(next);
                          }}
                          className={styles.input}
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 2. VALUE PROPOSITION (USP) EDITOR */}
            {activeSubMenu === 'VALUE_PROP' && (
              <div className={styles.featuresGrid}>
                {draftContent.valueProp.usps.map((usp, uIdx) => (
                  <div key={usp.id} className={styles.slideCard}>
                    <div className={styles.slideCardHeader}>
                      <span className={styles.slideTitle}>USP #{usp.id}</span>
                    </div>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Judul Keunggulan</label>
                        <input
                          type="text"
                          value={usp.title}
                          onChange={(e) => {
                            const next = { ...draftContent };
                            next.valueProp.usps[uIdx].title = e.target.value;
                            setDraftContent(next);
                          }}
                          className={styles.input}
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Ikon Lucide (Referensi Kode)</label>
                        <select
                          value={usp.iconName}
                          onChange={(e) => {
                            const next = { ...draftContent };
                            next.valueProp.usps[uIdx].iconName = e.target.value as any;
                            setDraftContent(next);
                          }}
                          className={styles.select}
                        >
                          <option value="Hash">Hash (Tanpa Minimum)</option>
                          <option value="Zap">Zap (Kilat & Presisi)</option>
                          <option value="Paintbrush">Paintbrush (Desain Kreatif)</option>
                          <option value="Truck">Truck (Kirim Nusantara)</option>
                        </select>
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Tipe Pendaran Glow</label>
                        <select
                          value={usp.colorClass}
                          onChange={(e) => {
                            const next = { ...draftContent };
                            next.valueProp.usps[uIdx].colorClass = e.target.value as any;
                            setDraftContent(next);
                          }}
                          className={styles.select}
                        >
                          <option value="greenGlow">Hijau (Green Glow)</option>
                          <option value="orangeGlow">Oranye (Orange Glow)</option>
                          <option value="purpleGlow">Ungu (Purple Glow)</option>
                          <option value="blueGlow">Biru (Blue Glow)</option>
                        </select>
                      </div>
                      <div className={styles.formGroup} style={{ display: 'none' }}></div>
                      <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                        <label className={styles.label}>Penjelasan Detil</label>
                        <textarea
                          value={usp.description}
                          onChange={(e) => {
                            const next = { ...draftContent };
                            next.valueProp.usps[uIdx].description = e.target.value;
                            setDraftContent(next);
                          }}
                          className={styles.textarea}
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 3. ORDER SCHEME EDITOR */}
            {activeSubMenu === 'ORDER_SCHEME' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {/* Header settings */}
                <div className={styles.slideCard}>
                  <div className={styles.slideCardHeader}>
                    <span className={styles.slideTitle}>Header Seksi Skema Order</span>
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Teks Badge Seksi</label>
                      <input
                        type="text"
                        value={draftContent.orderScheme.badge}
                        onChange={(e) => {
                          const next = { ...draftContent };
                          next.orderScheme.badge = e.target.value;
                          setDraftContent(next);
                        }}
                        className={styles.input}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Judul Seksi Utama (Title)</label>
                      <input
                        type="text"
                        value={draftContent.orderScheme.title}
                        onChange={(e) => {
                          const next = { ...draftContent };
                          next.orderScheme.title = e.target.value;
                          setDraftContent(next);
                        }}
                        className={styles.input}
                        required
                      />
                    </div>
                    <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                      <label className={styles.label}>Sub-Judul Seksi (Subtitle)</label>
                      <textarea
                        value={draftContent.orderScheme.subtitle}
                        onChange={(e) => {
                          const next = { ...draftContent };
                          next.orderScheme.subtitle = e.target.value;
                          setDraftContent(next);
                        }}
                        className={styles.textarea}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Cards settings */}
                <div className={styles.featuresGrid}>
                  {draftContent.orderScheme.cards.map((card, cIdx) => (
                    <div key={card.id} className={styles.slideCard}>
                      <div className={styles.slideCardHeader}>
                        <span className={styles.slideTitle}>Kartu Skema #{card.id}</span>
                      </div>
                      <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                          <label className={styles.label}>Judul Kartu</label>
                          <input
                            type="text"
                            value={card.title}
                            onChange={(e) => {
                              const next = { ...draftContent };
                              next.orderScheme.cards[cIdx].title = e.target.value;
                              setDraftContent(next);
                            }}
                            className={styles.input}
                            required
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.label}>Label Badge Kartu</label>
                          <input
                            type="text"
                            value={card.badge}
                            onChange={(e) => {
                              const next = { ...draftContent };
                              next.orderScheme.cards[cIdx].badge = e.target.value;
                              setDraftContent(next);
                            }}
                            className={styles.input}
                            required
                          />
                        </div>
                        <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                          <label className={styles.label}>Deskripsi Skema</label>
                          <textarea
                            value={card.description}
                            onChange={(e) => {
                              const next = { ...draftContent };
                              next.orderScheme.cards[cIdx].description = e.target.value;
                              setDraftContent(next);
                            }}
                            className={styles.textarea}
                            required
                          />
                        </div>

                        {/* Features list bullet points */}
                        <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                          <label className={styles.label}>Daftar Keunggulan Poin (1 Per Baris, maks 4)</label>
                          {card.features.map((feat, fIdx) => (
                            <input
                              key={fIdx}
                              type="text"
                              value={feat}
                              onChange={(e) => {
                                const next = { ...draftContent };
                                next.orderScheme.cards[cIdx].features[fIdx] = e.target.value;
                                setDraftContent(next);
                              }}
                              className={styles.input}
                              style={{ marginBottom: '8px' }}
                              placeholder={`Poin Keunggulan ke-${fIdx + 1}`}
                              required
                            />
                          ))}
                        </div>

                        {/* Button settings */}
                        <div className={styles.formGroup}>
                          <label className={styles.label}>Teks Tombol Kartu</label>
                          <input
                            type="text"
                            value={card.btnText}
                            onChange={(e) => {
                              const next = { ...draftContent };
                              next.orderScheme.cards[cIdx].btnText = e.target.value;
                              setDraftContent(next);
                            }}
                            className={styles.input}
                            required
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.label}>Tautan Tombol (Href)</label>
                          <input
                            type="text"
                            value={card.btnHref}
                            onChange={(e) => {
                              const next = { ...draftContent };
                              next.orderScheme.cards[cIdx].btnHref = e.target.value;
                              setDraftContent(next);
                            }}
                            className={styles.input}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. FEATURED PRODUCTS SELECTOR */}
            {activeSubMenu === 'FEATURED' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {/* Header settings */}
                <div className={styles.slideCard}>
                  <div className={styles.slideCardHeader}>
                    <span className={styles.slideTitle}>Header Seksi Produk Populer</span>
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Teks Badge Seksi</label>
                      <input
                        type="text"
                        value={draftContent.featured.badge}
                        onChange={(e) => {
                          const next = { ...draftContent };
                          next.featured.badge = e.target.value;
                          setDraftContent(next);
                        }}
                        className={styles.input}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Judul Seksi Utama (Title)</label>
                      <input
                        type="text"
                        value={draftContent.featured.title}
                        onChange={(e) => {
                          const next = { ...draftContent };
                          next.featured.title = e.target.value;
                          setDraftContent(next);
                        }}
                        className={styles.input}
                        required
                      />
                    </div>
                    <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                      <label className={styles.label}>Sub-Judul Seksi (Subtitle)</label>
                      <textarea
                        value={draftContent.featured.subtitle}
                        onChange={(e) => {
                          const next = { ...draftContent };
                          next.featured.subtitle = e.target.value;
                          setDraftContent(next);
                        }}
                        className={styles.textarea}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Products selector grid */}
                <div className={styles.slideCard}>
                  <div className={styles.slideCardHeader}>
                    <span className={styles.slideTitle}>Pilih Produk Unggulan Tampil di Beranda (Maksimal 8)</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', margin: '8px 16px 16px 16px' }}>
                    Pilih produk dari katalog di bawah untuk ditampilkan sebagai produk terlaris. Jumlah terpilih: <strong>{draftContent.featured.selectedSkus.length}</strong> produk.
                  </div>
                  <div className={styles.catalogGrid}>
                    {products.map((p) => {
                      const isChecked = draftContent.featured.selectedSkus.includes(p.sku);
                      return (
                        <label 
                          key={p.sku} 
                          className={`${styles.checkboxItem} ${isChecked ? styles.checkboxItemChecked : ''}`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              const next = { ...draftContent };
                              if (e.target.checked) {
                                if (next.featured.selectedSkus.length >= 8) {
                                  alert('Maksimal produk terpopuler yang dapat ditampilkan adalah 8.');
                                  return;
                                }
                                next.featured.selectedSkus.push(p.sku);
                              } else {
                                next.featured.selectedSkus = next.featured.selectedSkus.filter((s) => s !== p.sku);
                              }
                              setDraftContent(next);
                            }}
                            className={styles.checkbox}
                          />
                          <div className={styles.checkboxLabelText}>
                            <span className={styles.checkboxTitle}>{p.name}</span>
                            <span className={styles.checkboxDesc}>{p.sku} • Rp {p.basePrice.toLocaleString('id-ID')}</span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* 5. HOW IT WORKS EDITOR */}
            {activeSubMenu === 'HOW_IT_WORKS' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {/* Header settings */}
                <div className={styles.slideCard}>
                  <div className={styles.slideCardHeader}>
                    <span className={styles.slideTitle}>Header Seksi Cara Pemesanan</span>
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Teks Badge Seksi</label>
                      <input
                        type="text"
                        value={draftContent.howItWorks.badge}
                        onChange={(e) => {
                          const next = { ...draftContent };
                          next.howItWorks.badge = e.target.value;
                          setDraftContent(next);
                        }}
                        className={styles.input}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Judul Seksi Utama (Title)</label>
                      <input
                        type="text"
                        value={draftContent.howItWorks.title}
                        onChange={(e) => {
                          const next = { ...draftContent };
                          next.howItWorks.title = e.target.value;
                          setDraftContent(next);
                        }}
                        className={styles.input}
                        required
                      />
                    </div>
                    <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                      <label className={styles.label}>Sub-Judul Seksi (Subtitle)</label>
                      <textarea
                        value={draftContent.howItWorks.subtitle}
                        onChange={(e) => {
                          const next = { ...draftContent };
                          next.howItWorks.subtitle = e.target.value;
                          setDraftContent(next);
                        }}
                        className={styles.textarea}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Steps list */}
                <div className={styles.featuresGrid}>
                  {draftContent.howItWorks.steps.map((step, sIdx) => (
                    <div key={step.id} className={styles.slideCard}>
                      <div className={styles.slideCardHeader}>
                        <span className={styles.slideTitle}>Langkah {step.id}</span>
                      </div>
                      <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                          <label className={styles.label}>Judul Langkah</label>
                          <input
                            type="text"
                            value={step.title}
                            onChange={(e) => {
                              const next = { ...draftContent };
                              next.howItWorks.steps[sIdx].title = e.target.value;
                              setDraftContent(next);
                            }}
                            className={styles.input}
                            required
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.label}>Ikon Langkah</label>
                          <select
                            value={step.iconName}
                            onChange={(e) => {
                              const next = { ...draftContent };
                              next.howItWorks.steps[sIdx].iconName = e.target.value as any;
                              setDraftContent(next);
                            }}
                            className={styles.select}
                          >
                            <option value="Sliders">Sliders (Pilih & Konfigurasi)</option>
                            <option value="FileUp">FileUp (Kirim / Unggah Desain)</option>
                            <option value="ShieldCheck">ShieldCheck (Verifikasi & Bayar)</option>
                            <option value="Package">Package (Produksi & Kirim)</option>
                          </select>
                        </div>
                        <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                          <label className={styles.label}>Penjelasan Langkah</label>
                          <textarea
                            value={step.description}
                            onChange={(e) => {
                              const next = { ...draftContent };
                              next.howItWorks.steps[sIdx].description = e.target.value;
                              setDraftContent(next);
                            }}
                            className={styles.textarea}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. QUALITY SECTION EDITOR */}
            {activeSubMenu === 'QUALITY' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {/* Header settings */}
                <div className={styles.slideCard}>
                  <div className={styles.slideCardHeader}>
                    <span className={styles.slideTitle}>Header Seksi Kualitas</span>
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Teks Badge Seksi</label>
                      <input
                        type="text"
                        value={draftContent.quality.badge}
                        onChange={(e) => {
                          const next = { ...draftContent };
                          next.quality.badge = e.target.value;
                          setDraftContent(next);
                        }}
                        className={styles.input}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Judul Seksi Utama (Title)</label>
                      <input
                        type="text"
                        value={draftContent.quality.title}
                        onChange={(e) => {
                          const next = { ...draftContent };
                          next.quality.title = e.target.value;
                          setDraftContent(next);
                        }}
                        className={styles.input}
                        required
                      />
                    </div>
                    <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                      <label className={styles.label}>Sub-Judul Seksi (Subtitle)</label>
                      <textarea
                        value={draftContent.quality.subtitle}
                        onChange={(e) => {
                          const next = { ...draftContent };
                          next.quality.subtitle = e.target.value;
                          setDraftContent(next);
                        }}
                        className={styles.textarea}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Tabs settings */}
                <div className={styles.featuresGrid}>
                  {draftContent.quality.tabs.map((tab, tIdx) => (
                    <div key={tab.id} className={styles.slideCard}>
                      <div className={styles.slideCardHeader}>
                        <span className={styles.slideTitle}>Tab Fisik #{tab.id}</span>
                      </div>
                      <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                          <label className={styles.label}>Nama Label Navigasi Tab</label>
                          <input
                            type="text"
                            value={tab.label}
                            onChange={(e) => {
                              const next = { ...draftContent };
                              next.quality.tabs[tIdx].label = e.target.value;
                              setDraftContent(next);
                            }}
                            className={styles.input}
                            required
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.label}>Emoji Icon Tab</label>
                          <input
                            type="text"
                            value={tab.icon}
                            onChange={(e) => {
                              const next = { ...draftContent };
                              next.quality.tabs[tIdx].icon = e.target.value;
                              setDraftContent(next);
                            }}
                            className={styles.input}
                            required
                          />
                        </div>
                        <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                          <label className={styles.label}>Judul Detail Tab Kualitas</label>
                          <input
                            type="text"
                            value={tab.title}
                            onChange={(e) => {
                              const next = { ...draftContent };
                              next.quality.tabs[tIdx].title = e.target.value;
                              setDraftContent(next);
                            }}
                            className={styles.input}
                            required
                          />
                        </div>
                        <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                          <label className={styles.label}>Gambar Demo Kualitas (URL)</label>
                          <input
                            type="text"
                            value={tab.image}
                            onChange={(e) => {
                              const next = { ...draftContent };
                              next.quality.tabs[tIdx].image = e.target.value;
                              setDraftContent(next);
                            }}
                            className={styles.input}
                            required
                          />
                        </div>
                        <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                          <label className={styles.label}>Penjelasan Detail Karakteristik</label>
                          <textarea
                            value={tab.description}
                            onChange={(e) => {
                              const next = { ...draftContent };
                              next.quality.tabs[tIdx].description = e.target.value;
                              setDraftContent(next);
                            }}
                            className={styles.textarea}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. SHOWCASE & HOTSPOTS EDITOR */}
            {activeSubMenu === 'SHOWCASE' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {/* Header settings */}
                <div className={styles.slideCard}>
                  <div className={styles.slideCardHeader}>
                    <span className={styles.slideTitle}>Header Seksi Showcase</span>
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Teks Badge Seksi</label>
                      <input
                        type="text"
                        value={draftContent.showcase.badge}
                        onChange={(e) => {
                          const next = { ...draftContent };
                          next.showcase.badge = e.target.value;
                          setDraftContent(next);
                        }}
                        className={styles.input}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Judul Seksi Utama (Title)</label>
                      <input
                        type="text"
                        value={draftContent.showcase.title}
                        onChange={(e) => {
                          const next = { ...draftContent };
                          next.showcase.title = e.target.value;
                          setDraftContent(next);
                        }}
                        className={styles.input}
                        required
                      />
                    </div>
                    <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                      <label className={styles.label}>Sub-Judul Seksi (Subtitle)</label>
                      <textarea
                        value={draftContent.showcase.subtitle}
                        onChange={(e) => {
                          const next = { ...draftContent };
                          next.showcase.subtitle = e.target.value;
                          setDraftContent(next);
                        }}
                        className={styles.textarea}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Hotspots list */}
                <div className={styles.featuresGrid}>
                  {draftContent.showcase.hotspots.map((spot, sIdx) => (
                    <div key={spot.id} className={styles.slideCard}>
                      <div className={styles.slideCardHeader}>
                        <span className={styles.slideTitle}>Hotspot Indicator #{spot.id}</span>
                      </div>
                      <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                          <label className={styles.label}>Nama Tooltip Produk</label>
                          <input
                            type="text"
                            value={spot.name}
                            onChange={(e) => {
                              const next = { ...draftContent };
                              next.showcase.hotspots[sIdx].name = e.target.value;
                              setDraftContent(next);
                            }}
                            className={styles.input}
                            required
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.label}>Hubungkan SKU Produk Katalog</label>
                          <select
                            value={spot.targetSku}
                            onChange={(e) => {
                              const next = { ...draftContent };
                              next.showcase.hotspots[sIdx].targetSku = e.target.value;
                              setDraftContent(next);
                            }}
                            className={styles.select}
                          >
                            {products.map((p) => (
                              <option key={p.sku} value={p.sku}>
                                {p.name} ({p.sku})
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.label}>Koordinat X Horizontal (0 - 100%)</label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={spot.x}
                            onChange={(e) => {
                              const next = { ...draftContent };
                              next.showcase.hotspots[sIdx].x = parseInt(e.target.value) || 0;
                              setDraftContent(next);
                            }}
                            className={styles.input}
                            required
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.label}>Koordinat Y Vertikal (0 - 100%)</label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={spot.y}
                            onChange={(e) => {
                              const next = { ...draftContent };
                              next.showcase.hotspots[sIdx].y = parseInt(e.target.value) || 0;
                              setDraftContent(next);
                            }}
                            className={styles.input}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8. TESTIMONIALS EDITOR */}
            {activeSubMenu === 'TESTIMONIALS' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {/* Header settings */}
                <div className={styles.slideCard}>
                  <div className={styles.slideCardHeader}>
                    <span className={styles.slideTitle}>Header Seksi Testimoni</span>
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Teks Badge Seksi</label>
                      <input
                        type="text"
                        value={draftContent.testimonials.badge}
                        onChange={(e) => {
                          const next = { ...draftContent };
                          next.testimonials.badge = e.target.value;
                          setDraftContent(next);
                        }}
                        className={styles.input}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Judul Seksi Utama (Title)</label>
                      <input
                        type="text"
                        value={draftContent.testimonials.title}
                        onChange={(e) => {
                          const next = { ...draftContent };
                          next.testimonials.title = e.target.value;
                          setDraftContent(next);
                        }}
                        className={styles.input}
                        required
                      />
                    </div>
                    <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                      <label className={styles.label}>Sub-Judul Seksi (Subtitle)</label>
                      <textarea
                        value={draftContent.testimonials.subtitle}
                        onChange={(e) => {
                          const next = { ...draftContent };
                          next.testimonials.subtitle = e.target.value;
                          setDraftContent(next);
                        }}
                        className={styles.textarea}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Testimonials list table */}
                <div className={styles.slideCard}>
                  <div className={styles.slideCardHeader} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className={styles.slideTitle}>Daftar Ulasan Pelanggan</span>
                    <button
                      type="button"
                      onClick={() => {
                        const next = { ...draftContent };
                        const newId = next.testimonials.items.length > 0 ? Math.max(...next.testimonials.items.map((i) => i.id)) + 1 : 1;
                        next.testimonials.items.push({
                          id: newId,
                          name: 'Nama Klien Baru',
                          role: 'Jabatan / Usaha',
                          avatar: '👤',
                          quote: 'Tuliskan ulasan klien di sini...',
                          rating: 5,
                          segment: 'UMKM',
                          imageUrl: '/images/showcase_handover_umkm.png',
                        });
                        setDraftContent(next);
                      }}
                      className={styles.btnSecondary}
                      style={{ padding: '4px 10px', fontSize: '11px' }}
                    >
                      <Plus size={12} style={{ marginRight: '4px', display: 'inline-block', verticalAlign: 'middle' }} />
                      <span>Tambah Testimoni</span>
                    </button>
                  </div>
                  <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>Klien</th>
                          <th>Profil Info</th>
                          <th>Avatar & Foto</th>
                          <th style={{ width: '40%' }}>Ulasan (Quote)</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {draftContent.testimonials.items.map((item, index) => (
                          <tr key={item.id}>
                            <td>
                              <input
                                type="text"
                                value={item.name}
                                onChange={(e) => {
                                  const next = { ...draftContent };
                                  next.testimonials.items[index].name = e.target.value;
                                  setDraftContent(next);
                                }}
                                className={styles.input}
                                style={{ fontSize: '12px', padding: '6px' }}
                                required
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                value={item.role}
                                onChange={(e) => {
                                  const next = { ...draftContent };
                                  next.testimonials.items[index].role = e.target.value;
                                  setDraftContent(next);
                                }}
                                className={styles.input}
                                style={{ fontSize: '11px', padding: '6px', marginBottom: '4px' }}
                                placeholder="Role/Jabatan"
                                required
                              />
                              <select
                                value={item.segment}
                                onChange={(e) => {
                                  const next = { ...draftContent };
                                  next.testimonials.items[index].segment = e.target.value as any;
                                  setDraftContent(next);
                                }}
                                className={styles.select}
                                style={{ fontSize: '11px', padding: '4px' }}
                              >
                                <option value="Mahasiswa">Mahasiswa</option>
                                <option value="UMKM">UMKM</option>
                                <option value="Sekolah">Sekolah</option>
                              </select>
                            </td>
                            <td>
                              <input
                                type="text"
                                value={item.avatar}
                                onChange={(e) => {
                                  const next = { ...draftContent };
                                  next.testimonials.items[index].avatar = e.target.value;
                                  setDraftContent(next);
                                }}
                                className={styles.input}
                                style={{ fontSize: '11px', padding: '6px', marginBottom: '4px' }}
                                placeholder="Avatar Emoji"
                                required
                              />
                              <input
                                type="text"
                                value={item.imageUrl}
                                onChange={(e) => {
                                  const next = { ...draftContent };
                                  next.testimonials.items[index].imageUrl = e.target.value;
                                  setDraftContent(next);
                                }}
                                className={styles.input}
                                style={{ fontSize: '10px', padding: '6px' }}
                                placeholder="URL Foto Handover"
                                required
                              />
                            </td>
                            <td>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <select
                                  value={item.rating}
                                  onChange={(e) => {
                                    const next = { ...draftContent };
                                    next.testimonials.items[index].rating = parseInt(e.target.value) || 5;
                                    setDraftContent(next);
                                  }}
                                  className={styles.select}
                                  style={{ fontSize: '11px', padding: '4px', width: '80px' }}
                                >
                                  <option value="1">1 Star</option>
                                  <option value="2">2 Stars</option>
                                  <option value="3">3 Stars</option>
                                  <option value="4">4 Stars</option>
                                  <option value="5">5 Stars</option>
                                </select>
                                <textarea
                                  value={item.quote}
                                  onChange={(e) => {
                                    const next = { ...draftContent };
                                    next.testimonials.items[index].quote = e.target.value;
                                    setDraftContent(next);
                                  }}
                                  className={styles.textarea}
                                  style={{ fontSize: '11px', padding: '6px', minHeight: '60px' }}
                                  required
                                />
                              </div>
                            </td>
                            <td>
                              <button
                                type="button"
                                onClick={() => {
                                  const next = { ...draftContent };
                                  next.testimonials.items = next.testimonials.items.filter((_, idx) => idx !== index);
                                  setDraftContent(next);
                                }}
                                className={styles.btnDanger}
                                title="Hapus testimoni"
                              >
                                <Trash2 size={12} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* 9. CONTACT CONTENT EDITOR */}
            {activeSubMenu === 'CONTACT' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {/* Left Column Content (Visual & Info) */}
                <div className={styles.slideCard}>
                  <div className={styles.slideCardHeader}>
                    <span className={styles.slideTitle}>Kolase Informasi (Visual Column)</span>
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Teks Badge Seksi</label>
                      <input
                        type="text"
                        value={draftContent.contact.badge}
                        onChange={(e) => {
                          const next = { ...draftContent };
                          next.contact.badge = e.target.value;
                          setDraftContent(next);
                        }}
                        className={styles.input}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Nomor Tujuan WhatsApp Admin (wa.me)</label>
                      <input
                        type="text"
                        value={draftContent.contact.waBase}
                        onChange={(e) => {
                          const next = { ...draftContent };
                          next.contact.waBase = e.target.value;
                          setDraftContent(next);
                        }}
                        className={styles.input}
                        required
                      />
                    </div>
                    <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                      <label className={styles.label}>Judul Utama Seksi</label>
                      <input
                        type="text"
                        value={draftContent.contact.title}
                        onChange={(e) => {
                          const next = { ...draftContent };
                          next.contact.title = e.target.value;
                          setDraftContent(next);
                        }}
                        className={styles.input}
                        required
                      />
                    </div>
                    <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                      <label className={styles.label}>Deskripsi Paragraf 1</label>
                      <textarea
                        value={draftContent.contact.desc1}
                        onChange={(e) => {
                          const next = { ...draftContent };
                          next.contact.desc1 = e.target.value;
                          setDraftContent(next);
                        }}
                        className={styles.textarea}
                        required
                      />
                    </div>
                    <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                      <label className={styles.label}>Deskripsi Paragraf 2</label>
                      <textarea
                        value={draftContent.contact.desc2}
                        onChange={(e) => {
                          const next = { ...draftContent };
                          next.contact.desc2 = e.target.value;
                          setDraftContent(next);
                        }}
                        className={styles.textarea}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Features (USP) Grid */}
                <div className={styles.featuresGrid}>
                  {draftContent.contact.features.map((feat, fIdx) => (
                    <div key={feat.id} className={styles.slideCard}>
                      <div className={styles.slideCardHeader}>
                        <span className={styles.slideTitle}>Fitur Keunggulan #{feat.id}</span>
                      </div>
                      <div className={styles.formRow}>
                        <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                          <label className={styles.label}>Judul Fitur</label>
                          <input
                            type="text"
                            value={feat.title}
                            onChange={(e) => {
                              const next = { ...draftContent };
                              next.contact.features[fIdx].title = e.target.value;
                              setDraftContent(next);
                            }}
                            className={styles.input}
                            required
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.label}>Emoji Icon</label>
                          <input
                            type="text"
                            value={feat.icon}
                            onChange={(e) => {
                              const next = { ...draftContent };
                              next.contact.features[fIdx].icon = e.target.value;
                              setDraftContent(next);
                            }}
                            className={styles.input}
                            required
                          />
                        </div>
                        <div className={styles.formGroup} style={{ display: 'none' }}>
                          {/* placeholder to keep layout balance */}
                        </div>
                        <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                          <label className={styles.label}>Penjelasan Singkat Fitur</label>
                          <textarea
                            value={feat.text}
                            onChange={(e) => {
                              const next = { ...draftContent };
                              next.contact.features[fIdx].text = e.target.value;
                              setDraftContent(next);
                            }}
                            className={styles.textarea}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Column Content (Form Settings) */}
                <div className={styles.slideCard}>
                  <div className={styles.slideCardHeader}>
                    <span className={styles.slideTitle}>Pengaturan Formulir (Form Column)</span>
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Judul Formulir</label>
                      <input
                        type="text"
                        value={draftContent.contact.formTitle}
                        onChange={(e) => {
                          const next = { ...draftContent };
                          next.contact.formTitle = e.target.value;
                          setDraftContent(next);
                        }}
                        className={styles.input}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Teks Tombol Kirim</label>
                      <input
                        type="text"
                        value={draftContent.contact.btnText}
                        onChange={(e) => {
                          const next = { ...draftContent };
                          next.contact.btnText = e.target.value;
                          setDraftContent(next);
                        }}
                        className={styles.input}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 10. MAPS CONFIG */}
            {activeSubMenu === 'MAPS' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {/* Header Settings */}
                <div className={styles.slideCard}>
                  <div className={styles.slideCardHeader}>
                    <span className={styles.slideTitle}>Header Seksi Peta</span>
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Teks Badge Seksi</label>
                      <input
                        type="text"
                        value={draftContent.maps.badge}
                        onChange={(e) => {
                          const next = { ...draftContent };
                          next.maps.badge = e.target.value;
                          setDraftContent(next);
                        }}
                        className={styles.input}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Judul Seksi Utama (Title)</label>
                      <input
                        type="text"
                        value={draftContent.maps.title}
                        onChange={(e) => {
                          const next = { ...draftContent };
                          next.maps.title = e.target.value;
                          setDraftContent(next);
                        }}
                        className={styles.input}
                        required
                      />
                    </div>
                    <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                      <label className={styles.label}>Sub-Judul Seksi (Subtitle)</label>
                      <textarea
                        value={draftContent.maps.subtitle}
                        onChange={(e) => {
                          const next = { ...draftContent };
                          next.maps.subtitle = e.target.value;
                          setDraftContent(next);
                        }}
                        className={styles.textarea}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Workshop Info Panel settings */}
                <div className={styles.slideCard}>
                  <div className={styles.slideCardHeader}>
                    <span className={styles.slideTitle}>Informasi Kontak & Detail Workshop (Info Card)</span>
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Nama Workshop (Card Title)</label>
                      <input
                        type="text"
                        value={draftContent.maps.cardTitle}
                        onChange={(e) => {
                          const next = { ...draftContent };
                          next.maps.cardTitle = e.target.value;
                          setDraftContent(next);
                        }}
                        className={styles.input}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Jam Operasional</label>
                      <input
                        type="text"
                        value={draftContent.maps.hours}
                        onChange={(e) => {
                          const next = { ...draftContent };
                          next.maps.hours = e.target.value;
                          setDraftContent(next);
                        }}
                        className={styles.input}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Telepon / WhatsApp</label>
                      <input
                        type="text"
                        value={draftContent.maps.phone}
                        onChange={(e) => {
                          const next = { ...draftContent };
                          next.maps.phone = e.target.value;
                          setDraftContent(next);
                        }}
                        className={styles.input}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Email Support</label>
                      <input
                        type="text"
                        value={draftContent.maps.email}
                        onChange={(e) => {
                          const next = { ...draftContent };
                          next.maps.email = e.target.value;
                          setDraftContent(next);
                        }}
                        className={styles.input}
                        required
                      />
                    </div>
                    <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                      <label className={styles.label}>Petunjuk Arah Link (Google Maps Search Link)</label>
                      <input
                        type="text"
                        value={draftContent.maps.directionUrl}
                        onChange={(e) => {
                          const next = { ...draftContent };
                          next.maps.directionUrl = e.target.value;
                          setDraftContent(next);
                        }}
                        className={styles.input}
                        required
                      />
                    </div>
                    <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                      <label className={styles.label}>Alamat Lengkap Workshop (Teks Display)</label>
                      <textarea
                        value={draftContent.maps.address}
                        onChange={(e) => {
                          const next = { ...draftContent };
                          next.maps.address = e.target.value;
                          setDraftContent(next);
                        }}
                        className={styles.textarea}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Google Maps Embed iframe URL */}
                <div className={styles.slideCard}>
                  <div className={styles.slideCardHeader}>
                    <span className={styles.slideTitle}>Embedded Iframe Google Maps (Right Panel)</span>
                  </div>
                  <div className={styles.formRow}>
                    <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                      <label className={styles.label}>Google Maps Iframe Src (URL embed)</label>
                      <textarea
                        value={draftContent.maps.iframeSrc}
                        onChange={(e) => {
                          const next = { ...draftContent };
                          next.maps.iframeSrc = e.target.value;
                          setDraftContent(next);
                        }}
                        className={styles.textarea}
                        required
                        style={{ minHeight: '80px' }}
                      />
                      <span style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
                        Masukkan tautan <strong>src</strong> lengkap dari kode embed Google Maps (mendukung parameter API maps.google.com).
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
          
        </form>
      </div>
    </div>
  );
}
