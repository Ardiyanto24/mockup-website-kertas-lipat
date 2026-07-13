import React from 'react';
import Link from 'next/link';
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  href?: string;
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
  disabled = false,
  href,
}: ButtonProps) {
  const combinedClasses = `${styles.btn} ${styles[variant]} ${styles[size]} ${className}`;

  if (href) {
    if (disabled) {
      return (
        <span className={`${combinedClasses} ${styles.disabled}`}>
          {children}
        </span>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedClasses}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
