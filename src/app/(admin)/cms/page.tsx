/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Image as ImageIcon,
  Sparkles,
  Layers,
  Award,
  Sliders,
  ShieldCheck,
  HelpCircle,
  MessageSquare,
  Mail,
  MapPin,
} from 'lucide-react';
import { useHomepageContent, HomepageContent } from '@/hooks/useHomepageContent';
import { CmsTemplate } from '@/components/templates/CmsTemplate/CmsTemplate';
import { SubmenuItem } from '@/components/organisms/cms/CmsSidebar/CmsSidebar';

export default function CMSPage() {
  const router = useRouter();
  const { content, isLoaded, saveContent, resetToDefault } = useHomepageContent();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [draftContent, setDraftContent] = useState<HomepageContent | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState('HERO');
  const [showNotification, setShowNotification] = useState(false);
  const [isBerandaExpanded, setIsBerandaExpanded] = useState(true);

  // Authenticate session on client mount
  useEffect(() => {
    const adminSession = sessionStorage.getItem('admin_logged_in');
    if (adminSession === 'true') {
      setIsAuthenticated(true);
    } else {
      router.push('/login');
    }
  }, [router]);

  // Sync draftContent whenever database content loads
  useEffect(() => {
    if (content && !draftContent) {
      setDraftContent(JSON.parse(JSON.stringify(content)));
    }
  }, [content, draftContent]);

  useEffect(() => {
    if (content) {
      setDraftContent(JSON.parse(JSON.stringify(content)));
    }
  }, [content]);

  // Logout session handler
  const handleLogout = () => {
    sessionStorage.removeItem('admin_logged_in');
    router.push('/login');
  };

  // Save draft content to localStorage
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (draftContent) {
      saveContent(draftContent);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  // Cancel edits and rollback draftContent
  const handleCancel = () => {
    if (content) {
      setDraftContent(JSON.parse(JSON.stringify(content)));
    }
  };

  // Reset all values to factory print defaults
  const handleResetToDefault = () => {
    if (confirm('Apakah Anda yakin ingin mengembalikan semua konten ke data awal cetak pabrik (default)?')) {
      resetToDefault();
    }
  };

  const submenus: SubmenuItem[] = [
    { id: 'HERO', name: 'Seksi Hero Banner', icon: <ImageIcon size={16} /> },
    { id: 'VALUE_PROP', name: 'Seksi Value Prop (USP)', icon: <Sparkles size={16} /> },
    { id: 'ORDER_SCHEME', name: 'Seksi Skema Order', icon: <Layers size={16} /> },
    { id: 'FEATURED', name: 'Seksi Produk Populer', icon: <Award size={16} /> },
    { id: 'HOW_IT_WORKS', name: 'Seksi Cara Kerja', icon: <Sliders size={16} /> },
    { id: 'QUALITY', name: 'Seksi Bukti Kualitas', icon: <ShieldCheck size={16} /> },
    { id: 'SHOWCASE', name: 'Seksi Showcase Hotspot', icon: <HelpCircle size={16} /> },
    { id: 'TESTIMONIALS', name: 'Seksi Ulasan Testimoni', icon: <MessageSquare size={16} /> },
    { id: 'CONTACT', name: 'Seksi Formulir Kontak', icon: <Mail size={16} /> },
    { id: 'MAPS', name: 'Seksi Peta Workshop', icon: <MapPin size={16} /> }
  ];

  return (
    <CmsTemplate
      isAuthenticated={isAuthenticated}
      isLoaded={isLoaded}
      draftContent={draftContent}
      setDraftContent={setDraftContent}
      activeSubMenu={activeSubMenu}
      setActiveSubMenu={setActiveSubMenu}
      showNotification={showNotification}
      isBerandaExpanded={isBerandaExpanded}
      setIsBerandaExpanded={setIsBerandaExpanded}
      handleLogout={handleLogout}
      handleResetToDefault={handleResetToDefault}
      handleSave={handleSave}
      handleCancel={handleCancel}
      submenus={submenus}
    />
  );
}
