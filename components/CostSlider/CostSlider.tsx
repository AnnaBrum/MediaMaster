'use client';
import Image from 'next/image';
import { useState } from 'react';
import styles from './CostSlider.module.css';

interface CostSliderProps {
  logoUrl: string;
  serviceName: string;
  cost: string;
}

export function CostSlider({
  logoUrl,
  serviceName,
  cost,
}: CostSliderProps): JSX.Element {
  const [content, setContent] = useState('Visa kostnad');
  const [padding, setPadding] = useState('px-3');

  const handleClick = () => {
    setContent(String(cost));
    setPadding(String('px-10'));
  };
  return (
    <div className="h-20 rounded-2xl border-2 border-black flex justify-between">
      <div className="flex items-center">
        <Image
          src={logoUrl}
          alt="huhu"
          width={44}
          height={44}
          placeholder="empty"
          priority={false}
        ></Image>
      </div>
      <h2 className=" text-xl align-middle self-center">{serviceName}</h2>
      <div className="shrink-0 rounded-2xl border-l-2 border-black flex items-center justify-center">
        <h3 className={styles.fixedWidth} onClick={handleClick}>
          {content}
        </h3>
      </div>
    </div>
  );
}

///images/logos/netflix_logo.jpeg
