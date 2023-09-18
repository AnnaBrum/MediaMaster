'use client';
import Image from 'next/image';
import { useState } from 'react';
import styles from './CostSlider.module.css';

// interface CostSliderProps {
//   logoUrl: string;
//   serviceName: string;
//   cost: string;
// }

export function CostSlider({ logoUrl, serviceName, cost }) {
  const [content, setContent] = useState('Visa kostnad');
  const [padding, setPadding] = useState('px-3');

  const handleClick = () => {
    setContent(String(cost));
    setPadding(String('px-10'));
  };
  return (
    <div className={styles.costSliderWrapper}>
      <div className={styles.imageContainer}>
        <Image
          src={logoUrl}
          alt="huhu"
          width={44}
          height={44}
          placeholder="empty"
          priority={false}
        ></Image>
        <h2 className={styles.serviceNameHeading}>{serviceName}</h2>
      </div>
      <div className={styles.innerDiv}>
        <h3 className={styles.costHeading} onClick={handleClick}>
          {content}
        </h3>
      </div>
    </div>
  );
}

///images/logos/netflix_logo.jpeg
