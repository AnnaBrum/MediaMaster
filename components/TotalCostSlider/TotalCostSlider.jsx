"use client";
import { useState } from "react";
import styles from "./TotalCostSlider.module.css";

export function TotalCostSlider({ totalCost }) {
  const [content, setContent] = useState("Visa kostnad");
  const [isBoxShadowApplied, setIsBoxShadowApplied] = useState(false);

  const handleClick = () => {
    if (content !== "Visa kostnad") {
      setContent("Visa kostnad");
      setIsBoxShadowApplied(false);
    } else {
      setContent(`${totalCost} kr`);
      setIsBoxShadowApplied(true);
    }
  };

  return (
    <div className={styles.totalCostWrapper}>
      <h2 className={styles.totalCostHeading}>Totalkostnad/mån</h2>
      <div
        className={`${styles.totalCostinnerDiv} ${
          isBoxShadowApplied ? styles.boxShadowClass : ""
        }`}
      >
        <h3 onClick={handleClick} className={styles.TotalCostPrice}>
          {content}
        </h3>
      </div>
    </div>
  );
}
