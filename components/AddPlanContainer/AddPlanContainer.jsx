import React, { useState } from "react";
import styles from "./AddPlanContainer.module.css";
import Link from "next/link";

export function AddPlanContainer() {


  const fill = focus ? "black": "white"  ;

  return (
    <Link className={styles.addPlanContainer} href={"/home/add-subscription"}>
      <p>Lägg till prenumerationer</p>
      <svg
        className={styles.svg}
        width="17"
        height="16"
        viewBox="0 0 17 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        
      >
        <path
          d="M7.71595 15.7159L7.71917 8.77163L0.774932 8.77485L0.774434 7.22563L7.71868 7.23331L7.71099 0.289073L9.26021 0.289571L9.25699 7.23381L16.1958 7.23604L16.1963 8.77435L9.25749 8.77212L9.25972 15.7109L7.71595 15.7159Z"
          fill={fill}
        />
      </svg>
    </Link>
  );
}
