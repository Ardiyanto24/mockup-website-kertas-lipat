import React, { useState } from 'react';
import styles from './HotspotTooltip.module.css';

interface HotspotTooltipProps {
  x: number; // percentage left (0-100)
  y: number; // percentage top (0-100)
  title: string;
  price: string;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  onClick?: () => void;
}

export function HotspotTooltip({
  x,
  y,
  title,
  price,
  tooltipPosition = 'top',
  onClick,
}: HotspotTooltipProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={styles.hotspotWrapper}
      style={{ left: `${x}%`, top: `${y}%` }}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onClick={onClick}
    >
      {/* Outer pulsing ring */}
      <div className={styles.pulse}></div>
      {/* Inner solid indicator dot */}
      <div className={styles.dot}></div>

      {/* Tooltip content */}
      <div className={`${styles.tooltip} ${styles[tooltipPosition]} ${isActive ? styles.active : ''}`}>
        <h4 className={styles.title}>{title}</h4>
        <div className={styles.priceRow}>
          <span className={styles.price}>{price}</span>
          <span className={styles.action}>Pesan</span>
        </div>
      </div>
    </div>
  );
}
