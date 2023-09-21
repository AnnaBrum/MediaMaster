
import { useState } from "react";
import styles from "./CategoryButton.module.css";

export function CategoryButton({ categoryId, category }) {

  const handleClick = () => {
    // if (categoryId === category) {

    // }
    console.log("klickad");
  };

  return (
    <button className={styles.categoryButton} key={categoryId} onClick={handleClick}>
      {}
    </button>
  );
}
