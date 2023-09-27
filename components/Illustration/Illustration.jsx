import Image from "next/image";

export function Illustration({imageUrl}) {
  return (
    <>
      <Image
        src={imageUrl}
        alt="happy face"
        width={260}
        height={260}
        style={{ width: 260, height: 260}}
        placeholder="empty"
        priority={false}
      ></Image>
    </>
  );
}
