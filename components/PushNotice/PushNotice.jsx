import React from "react";
import styles from "./PushNotice.module.css";

function PushNotice() {
  return (
    <button>
    <div className={styles.notisWrapper}>
      <iframe
        width="100"
        height="100"
        src="https://rive.app/s/WDoECX9XOUqddHZfBWM1tQ/embed"
        allowFullScreen
      ></iframe>
    </div>
    </button>
  );
}

export default PushNotice;
