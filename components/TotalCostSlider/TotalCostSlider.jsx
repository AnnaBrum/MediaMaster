'use client';
// import Image from 'next/image';
import { useState } from 'react';
import styles from './TotalCostSlider.module.css';

export function TotalCostSlider({ totalCost }) {
  const [content, setContent] = useState('Visa kostnad');

  const handleClick = () => {
    if (content == totalCost) {
      setContent('Visa kostnad');
    } else {
      setContent(totalCost);
    }
  };
  return (
    <div className={styles.totalCostWrapper}>
      <h2 className={styles.totalCostHeading}>Totalkostnad:</h2>
      <div className={styles.totalCostinnerDiv}>
        <h3 onClick={handleClick} className={styles.TotalCostPrice}>
          {content}
        </h3>
      </div>
    </div>
  );
}
