'use client';
import Image from 'next/image';

interface CostSliderProps {
  logoUrl: string;
  serviceName: string;
  cost: BigInteger;
}

export function CostSlider({
  logoUrl,
  serviceName,
  cost,
}: CostSliderProps): JSX.Element {
  return (
    <div className="h-20 rounded-2xl border-2 border-black flex justify-between">
      <div className="flex items-center">
        <Image
          src={logoUrl}
          alt="huhu"
          width={44}
          height={44}
          placeholder="empty"
          priority={false}
        ></Image>
      </div>
      <h2 className=" text-xl align-middle self-center">{serviceName}</h2>
      <div className="px-3 rounded-2xl border-l-2 border-black flex items-center">
        <h3 className="r">{cost}</h3>
      </div>
    </div>
  );
}

///images/logos/netflix_logo.jpeg
