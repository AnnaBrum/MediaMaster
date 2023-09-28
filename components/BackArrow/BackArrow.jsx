import React from "react";
import Image from "next/image";

function BackArrow() {
  return (
    <Image
      src="/images/navigation/back.svg"
      alt="navigate back"
      height={30}
      width={30}
    ></Image>
  );
}

export default BackArrow();