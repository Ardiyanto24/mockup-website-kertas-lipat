'use client';

import React from 'react';
import { LogOut, FileText, ShoppingBag, ChevronDown } from 'lucide-react';
import styles from './CmsSidebar.module.css';

export interface SubmenuItem {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface CmsSidebarProps {
  activeMainMenu: 'BERANDA' | 'KATALOG';
  setActiveMainMenu: (menu: 'BERANDA' | 'KATALOG') => void;
  activeSubMenu: string;
  setActiveSubMenu: (id: string) => void;
  isBerandaExpanded: boolean;
  setIsBerandaExpanded: (expanded: boolean) => void;
  handleLogout: () => void;
  submenus: SubmenuItem[];
}

export function CmsSidebar({
  activeMainMenu,
  setActiveMainMenu,
  activeSubMenu,
  setActiveSubMenu,
  isBerandaExpanded,
  setIsBerandaExpanded,
  handleLogout,
  submenus,
}: CmsSidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.logoIcon}>K</div>
        <span className={styles.logoText}>
          Kertas<span className={styles.logoOrange}>Lipat</span>
        </span>
      </div>

      <nav className={styles.sidebarNav}>
        {/* Main Menu 1: Kelola Beranda */}
        <div className={styles.menuGroup}>
          <button
            onClick={() => {
              setActiveMainMenu('BERANDA');
              setIsBerandaExpanded(!isBerandaExpanded);
            }}
            className={`${styles.menuHeader} ${activeMainMenu === 'BERANDA' ? styles.menuHeaderActive : ''}`}
            style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', cursor: 'pointer', background: 'none', border: 'none' }}
          >
            <FileText size={16} />
            <span>Kelola Beranda</span>
            <ChevronDown
              size={14}
              style={{
                marginLeft: 'auto',
                transform: isBerandaExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
                color: '#94a3b8'
              }}
            />
          </button>
          
          {isBerandaExpanded && (
            <div className={styles.subNav}>
              {submenus.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => {
                    setActiveMainMenu('BERANDA');
                    setActiveSubMenu(sub.id);
                  }}
                  className={`${styles.subNavItem} ${activeMainMenu === 'BERANDA' && activeSubMenu === sub.id ? styles.subNavItemActive : ''}`}
                >
                  {sub.icon}
                  <span>{sub.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Menu 2: Kelola Katalog */}
        <div className={styles.menuGroup}>
          <button
            onClick={() => setActiveMainMenu('KATALOG')}
            className={`${styles.menuHeader} ${activeMainMenu === 'KATALOG' ? styles.menuHeaderActive : ''}`}
            style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', cursor: 'pointer', background: 'none', border: 'none' }}
          >
            <ShoppingBag size={16} />
            <span>Kelola Katalog</span>
          </button>
        </div>
      </nav>

      {/* Sidebar Footer (Logout) */}
      <div className={styles.sidebarFooter}>
        <div className={styles.userSection}>
          <div className={styles.avatarMini}>A</div>
          <div className={styles.userMeta}>
            <span className={styles.userName}>Administrator</span>
            <span className={styles.userRole}>Super Admin</span>
          </div>
        </div>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          <LogOut size={16} />
          <span>Keluar Sesi</span>
        </button>
      </div>
    </aside>
  );
}
