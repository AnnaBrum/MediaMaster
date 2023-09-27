import Image from "next/image";

export function Logo() {
  return (
    <>
      <Image
        src="/images/logo.svg"
        alt="service icon"
        width={125}
        height={127}
        placeholder="empty"
        priority={false}
      ></Image>
    </>
  );
}
