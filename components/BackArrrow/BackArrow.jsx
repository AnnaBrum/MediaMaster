import Image from "next/image";

export function BackArrow() {
  return (
    <Image
      src="/images/navigation/back.svg"
      alt="navigate back"
      height={30}
      width={30}
    ></Image>
  );
}
