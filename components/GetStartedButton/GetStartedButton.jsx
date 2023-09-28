'use client';
import Image from 'next/image';
import styles from './GetStartedButton.module.css';
import Link from 'next/link';


export function GetStartedButton({ logoUrl, serviceName }) {
  
  return (
    <div className={styles.brandBoxWrapper}>
      <div className={styles.imageContainer}>
        <Image
          src={logoUrl}
          alt="service icon"
          width={30}
          height={30}
          placeholder="empty"
          priority={false}
        ></Image>
        <h2 className={styles.serviceNameHeading}>{serviceName}</h2>
      </div>   
      <div className={styles.add}>
      <Image
          src="/images/navigation/plus.svg"
          alt="service icon"
          width={18}
          height={18}
          style={{ width: 18, height: 18 }}
          placeholder="empty"
          priority={false}
        ></Image>
        </div>  
    </div>
  );
}

///images/logos/netflix_logo.jpeg
