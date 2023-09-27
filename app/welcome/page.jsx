"use client";

import { Illustration } from "../../components/Illustration/Illustration";
import styles from "./welcome.module.css";

import { useEffect, useState } from "react";

export default function Welcome() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      window.location.href = "/home";
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (visible) {
    return (
      <div className={styles.pageWrapper}>

        <h1 className={styles.headingOne}>
          Välkommen till <br /> Media Watch!
        </h1>
        <div className={styles.illustration}>
          <Illustration imageUrl="/images/illustration/login_face.svg" />
        </div>
      </div>
    );
  }

  return null;
}
