'use client';
import Image from 'next/image';
import { useState } from 'react';
import styles from './TotalCostSlider.module.css';

interface TotalCostSliderProps {
  totalCost: number;
}

export function TotalCostSlider({
  totalCost,
}: TotalCostSliderProps): JSX.Element {
  const [content, setContent] = useState('Visa kostnad');
  //   const [padding, setPadding] = useState('px-3');

  const handleClick = () => {
    setContent(String(totalCost));
    // setPadding(String('px-10'));
  };
  return (
    <div className="h-20 rounded-2xl border-2 border-black flex justify-between">
      <h2 className="px-3 text-2xl align-middle self-center">Totalkostnad:</h2>
      <div className="px-3 rounded-2xl border-l-2 border-black flex items-center">
        <h3 onClick={handleClick} className={styles.fixedWidth}>
          {content}
        </h3>
      </div>
    </div>
  );
}
