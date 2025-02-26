'use client';

import AOS from 'aos';
import Image from 'next/image';
import { useEffect } from 'react';

export default function World({ data }: any) {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section data-aos="fade-up">
      <div className="flex flex-col">
        <div className="flex flex-col justify-center gap-2 sm:flex-row">
          {data.world.products.map(
            (product: { text: string; imageSrc: string }, index: number) => {
              return (
                <div key={index} className="flex flex-col items-center">
                  <Image
                    src={product.imageSrc}
                    alt={`Product - ${index}`}
                    width={100}
                    height={100}
                    className="w-[250px] sm:w-[150px] md:w-[200px] lg:w-[300px]"
                  />
                  <p
                    dangerouslySetInnerHTML={{ __html: product.text }}
                    className="text-center text-sm font-bold uppercase text-blue xl:text-base"
                  />
                </div>
              );
            },
          )}
        </div>
        <Image
          src="/images/import/world/map.png"
          alt="World"
          width={100}
          height={100}
          className="h-full w-full"
        />
      </div>
    </section>
  );
}
