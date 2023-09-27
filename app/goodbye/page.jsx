"use client";

import { Illustration } from "../../components/Illustration/Illustration";
import { Logo } from "../../components/Logo/Logo";
import styles from "./goodbye.module.css";

import { useEffect, useState } from "react";

export default function Goodbye() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      // Redirect to the home page after 5 seconds
      window.location.href = "/login";
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (visible) {
    return (
      <div className={styles.pageWrapper}>

        <h1 className={styles.headingOne}>
          Farväl
        </h1>
        <div className={styles.illustration}>
          <Illustration imageUrl="/images/illustration/logout_face.svg" />
        </div>
      </div>
    );
  }

  return null;
}
