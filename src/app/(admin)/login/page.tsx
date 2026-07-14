'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Key, ArrowRight, ShieldAlert } from 'lucide-react';
import styles from './login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Check if already logged in, redirect if yes
  useEffect(() => {
    const session = sessionStorage.getItem('kertas_lipat_admin_session');
    if (session === 'true') {
      router.push('/cms');
    }
  }, [router]);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Harap isi semua kolom.');
      return;
    }

    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      // Demo credentials check
      if (email === 'admin@kertaslipat.com' && password === 'admin123') {
        sessionStorage.setItem('kertas_lipat_admin_session', 'true');
        router.push('/cms');
      } else {
        setError('Email atau password salah. Coba gunakan Demo Admin.');
        setIsLoading(false);
      }
    }, 1200);
  };

  const triggerDemoLogin = () => {
    setError('');
    setEmail('admin@kertaslipat.com');
    setPassword('admin123');
    setIsLoading(true);

    // Auto-login after filling inputs
    setTimeout(() => {
      sessionStorage.setItem('kertas_lipat_admin_session', 'true');
      router.push('/cms');
    }, 1200);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Background Blobs */}
      <div className={styles.blob1}></div>
      <div className={styles.blob2}></div>

      <div className={styles.loginCard}>
        {/* Brand Logo Header */}
        <div className={styles.logoContainer}>
          <div className={styles.logoIcon}>K</div>
          <span className={styles.logoText}>
            Kertas<span className={styles.logoOrange}>Lipat</span>
          </span>
        </div>

        <div className={styles.cardHeader}>
          <h1 className={styles.title}>CMS Area</h1>
          <p className={styles.subtitle}>Selamat datang. Masuk untuk mengelola konten situs.</p>
        </div>

        {error && (
          <div className={styles.errorBanner} role="alert">
            <ShieldAlert size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>
                <Mail size={16} />
              </span>
              <input
                id="email"
                type="email"
                placeholder="admin@kertaslipat.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Kata Sandi
            </label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>
                <Lock size={16} />
              </span>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.rememberForgot}>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" className={styles.checkbox} defaultChecked />
              <span>Ingat saya</span>
            </label>
            <a href="#" onClick={(e) => { e.preventDefault(); alert('Hubungi tim IT Kertas Lipat untuk reset password.'); }} className={styles.forgotLink}>
              Lupa sandi?
            </a>
          </div>

          <button type="submit" disabled={isLoading} className={styles.submitButton}>
            {isLoading ? (
              <span className={styles.spinner}></span>
            ) : (
              <>
                <span>Masuk Sekarang</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className={styles.divider}>
          <span className={styles.dividerSpan}>Atau</span>
        </div>

        {/* Demo Shortcut Card */}
        <div className={styles.demoCard}>
          <div className={styles.demoHeader}>
            <Key size={16} />
            <span>Akses Uji Coba Cepat (Demo)</span>
          </div>
          <div className={styles.demoCreds}>
            Gunakan pintasan di bawah untuk masuk otomatis menggunakan akun administrator uji coba:
            <br />
            Email: <strong>admin@kertaslipat.com</strong>
            <br />
            Sandi: <strong>admin123</strong>
          </div>
          <button
            type="button"
            onClick={triggerDemoLogin}
            disabled={isLoading}
            className={styles.demoButton}
          >
            <span>Masuk Otomatis (Demo Admin)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
