'use client';
// import Image from 'next/image';
import { useState } from 'react';
import styles from './TotalCostSlider.module.css';

//   const [padding, setPadding] = useState('px-3');

export function TotalCostSlider({ totalCost }) {
  const [content, setContent] = useState('Visa kostnad');

  const handleClick = () => {
    setContent(totalCost);
    // setPadding(String('px-10'));
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
