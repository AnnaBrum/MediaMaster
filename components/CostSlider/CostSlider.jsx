"use client";
import Image from "next/image";
import { useState } from "react";
import styles from "./CostSlider.module.css";

export function CostSlider({ iconUrl, serviceName, cost }) {
  const [content, setContent] = useState("Visa kostnad");
  const [isBoxShadowApplied, setIsBoxShadowApplied] = useState(false);

  const handleClick = () => {
    if (content !== "Visa kostnad") {
      setContent("Visa kostnad");
      setIsBoxShadowApplied(false);
    } else {
      setContent(`${cost} kr`);
      setIsBoxShadowApplied(true);
    }
  };

  return (
    <div className={styles.costSliderWrapper}>
      <div className={styles.imageContainer}>
        <Image
          src={iconUrl}
          alt="huhu"
          width={20}
          height={20}
          placeholder="empty"
          priority={false}
        ></Image>
        <h2 className={styles.serviceNameHeading}>{serviceName}</h2>
      </div>
      <div
        className={`${styles.innerDiv} ${
          isBoxShadowApplied ? styles.boxShadowClass : ""
        }`}
      >
        <h3 className={styles.costHeading} onClick={handleClick}>
          {content}
        </h3>
      </div>
    </div>
  );
}
