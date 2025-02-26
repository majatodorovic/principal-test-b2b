'use client';

import AOS from 'aos';
import Image from 'next/image';
import { useEffect } from 'react';

export default function Standards({ data }: any) {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="paddingOutSection" data-aos="fade-up">
      <div className="roundedSection relative mx-auto w-full max-w-[1760px] overflow-hidden">
        <Image
          src="/images/production/modern-processing.jpg"
          alt="Modern processing"
          width={100}
          height={100}
          className="absolute left-0 top-0 z-0 hidden h-full w-full object-cover md:block"
        />
        <Image
          src="/images/production/modern-processing-2.jpg"
          alt="Modern processing 2"
          width={100}
          height={100}
          className="absolute left-0 top-0 z-0 block h-full w-full object-cover md:hidden"
        />
        <div className="paddingInSection relative flex w-full flex-col gap-6 bg-gradient-to-r from-blue via-blue/90 to-blue/30 md:w-1/2 md:bg-none">
          {data.standards.map((item: { text: string }, index: number) => {
            return (
              <p
                key={index}
                className="responsiveText text-white"
                dangerouslySetInnerHTML={{ __html: item.text }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
