"use client";
import Image from "next/image";
import styles from "./BrandBox.module.css";
import Link from "next/link";

export function BrandBox({ logoUrl, serviceName, cost, plan, mySub }) {
  return (
    <div className={styles.brandBoxWrapper}>
      <div className={styles.serviceContainer}>
        <div className={styles.logoAndName}>
          <div className={styles.imageContainer}>
            <Image
              src={logoUrl}
              alt="service icon"
              fill
              placeholder="empty"
              priority={false}
              style={{
                objectFit: "contain",
              }}
            ></Image>
          </div>
          <div className={styles.serviceNameHeading}>
            <h2>{serviceName}</h2>
          </div>
        </div>
        <p>{cost}kr</p>
      </div>
      <div className={styles.changePlan}>
        <Link
          className={styles.link}
          href={`home/my-subscriptions/${serviceName}/${mySub}`}
        >
          Byt betalningsplan
          <Image
            src="/images/navigation/forward.svg"
            alt="service icon"
            width={8}
            height={8}
            placeholder="empty"
            priority={false}
          ></Image>
        </Link>
      </div>
    </div>
  );
}
