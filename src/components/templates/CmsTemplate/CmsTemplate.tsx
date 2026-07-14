'use client';

import React from 'react';
import { RefreshCw } from 'lucide-react';
import { HomepageContent } from '@/hooks/useHomepageContent';
import { CmsSidebar, SubmenuItem } from '@/components/organisms/cms/CmsSidebar/CmsSidebar';
import { CmsHeader } from '@/components/organisms/cms/CmsHeader/CmsHeader';
import { CmsEditorForm } from '@/components/organisms/cms/CmsEditorForm/CmsEditorForm';
import { CmsCatalogManager } from '@/components/organisms/cms/CmsCatalogManager/CmsCatalogManager';
import { CmsLeadsTracker } from '@/components/organisms/cms/CmsLeadsTracker/CmsLeadsTracker';
import styles from './CmsTemplate.module.css';

interface CmsTemplateProps {
  isAuthenticated: boolean;
  isLoaded: boolean;
  activeMainMenu: 'BERANDA' | 'KATALOG' | 'RIWAYAT';
  setActiveMainMenu: (menu: 'BERANDA' | 'KATALOG' | 'RIWAYAT') => void;
  draftContent: HomepageContent | null;
  setDraftContent: (content: HomepageContent) => void;
  activeSubMenu: string;
  setActiveSubMenu: (id: string) => void;
  showNotification: boolean;
  isBerandaExpanded: boolean;
  setIsBerandaExpanded: (expanded: boolean) => void;
  handleLogout: () => void;
  handleResetToDefault: () => void;
  handleSave: (e: React.FormEvent) => void;
  handleCancel: () => void;
  submenus: SubmenuItem[];
}

export function CmsTemplate({
  isAuthenticated,
  isLoaded,
  activeMainMenu,
  setActiveMainMenu,
  draftContent,
  setDraftContent,
  activeSubMenu,
  setActiveSubMenu,
  showNotification,
  isBerandaExpanded,
  setIsBerandaExpanded,
  handleLogout,
  handleResetToDefault,
  handleSave,
  handleCancel,
  submenus,
}: CmsTemplateProps) {
  
  if (!isAuthenticated) {
    return (
      <div className={styles.centeredWrapper}>
        <div className={styles.loadingCard}>
          <RefreshCw size={24} className={styles.spinIcon} />
          <p>Memeriksa sesi masuk...</p>
        </div>
      </div>
    );
  }

  if (!isLoaded || !draftContent) {
    return (
      <div className={styles.centeredWrapper}>
        <div className={styles.loadingCard}>
          <RefreshCw size={24} className={styles.spinIcon} />
          <p>Memuat data editor konten...</p>
        </div>
      </div>
    );
  }


  return (
    <div className={styles.wrapper}>
      {/* Toast Notification Alert */}
      {showNotification && (
        <div className={styles.toast}>
          <div className={styles.toastBody}>
            <span className={styles.toastIcon}>✓</span>
            <span>Perubahan berhasil disimpan dan telah diterapkan ke halaman Beranda!</span>
          </div>
        </div>
      )}

      {/* Navigation Sidebar Organism */}
      <CmsSidebar
        activeMainMenu={activeMainMenu}
        setActiveMainMenu={setActiveMainMenu}
        activeSubMenu={activeSubMenu}
        setActiveSubMenu={setActiveSubMenu}
        isBerandaExpanded={isBerandaExpanded}
        setIsBerandaExpanded={setIsBerandaExpanded}
        handleLogout={handleLogout}
        submenus={submenus}
      />

      {/* Main CMS Contents Workspace */}
      <main className={styles.mainArea}>
        {/* Workspace Top Header Bar Organism */}
        <CmsHeader
          activeMainMenu={activeMainMenu}
          handleResetToDefault={handleResetToDefault}
        />

        {/* Editor Form Sheet Organism / Catalog Manager */}
        <div style={{ padding: '40px', maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
          {activeMainMenu === 'KATALOG' ? (
            <CmsCatalogManager />
          ) : activeMainMenu === 'RIWAYAT' ? (
            <CmsLeadsTracker />
          ) : (
            <CmsEditorForm
              activeSubMenu={activeSubMenu}
              draftContent={draftContent}
              setDraftContent={setDraftContent}
              handleSave={handleSave}
              handleCancel={handleCancel}
              submenus={submenus}
            />
          )}
        </div>
      </main>
    </div>
  );
}
