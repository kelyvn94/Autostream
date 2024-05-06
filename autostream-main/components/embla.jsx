"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export const EmblaCouresel = ({ images, image }) => {
  const [isMounted, setisMounted] = useState(false);
  const [emblaRef] = useEmblaCarousel();

  

  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="embla h-full aspect-video w-full" ref={emblaRef}>
      <div className="embla__container h-full cursor-grab">
        <div className="relative aspect-video embla__slide  mt-2">
          <Image src={image} alt="image_car" fill quality={100} className="object-cover rounded-md" />
        </div>
        {images?.map((item, i) => (
          <div key={i} className="embla__slide aspect-video mt-2 relative ">
            <Image src={item?.image} alt="image_car" quality={100} fill objectFit="cover " className="rounded-md" />
          </div>
        ))}
      </div>

      
    </div>
  );
};
