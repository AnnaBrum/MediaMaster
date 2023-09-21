'use client';
import Image from 'next/image';
import styles from './BrandBox.module.css';
import Link from 'next/link';


export function BrandBox({ logoUrl, serviceName, cost, serviceUrl }) {
  
  return (
    <div className={styles.brandBoxWrapper}>
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
        <p>{cost}kr</p>
      </div>
      
        <Link className={styles.costHeading} href={serviceName}>
          Byt betalningsplan
        </Link>
      
    </div>
  );
}

///images/logos/netflix_logo.jpeg
