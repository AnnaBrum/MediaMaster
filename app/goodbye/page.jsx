"use client";

import { LogoutAnimation } from "../../components/LogoutAnimation/LogoutAnimation";
import styles from "./goodbye.module.css";

import { useEffect, useState } from "react";

export default function Goodbye() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      // Redirect to the home page after 4 seconds
      window.location.href = "/login";
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (visible) {
    return (
      <div className={styles.pageWrapper}>
        <h1 className={styles.headingOne}>Farväl!</h1>
        <div className={styles.illustration}>
          <LogoutAnimation />
        </div>
      </div>
    );
  }

  return null;
}
