'use client';

import AOS from 'aos';
import Image from 'next/image';
import { useEffect } from 'react';

export default function About({ data }: any) {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="px-6 lg:px-12 xl:px-[140px]">
      <div
        className="relative mx-auto flex w-full max-w-[1620px] flex-col items-center gap-10 px-6 md:flex-row lg:px-0"
        data-aos="fade-up"
      >
        <Image
          src="/images/barka/barka-logo.png"
          alt="Barka logo"
          width={360}
          height={360}
          className="w-full max-w-[360px]"
        />
        <div className="flex flex-col gap-6">
          {data.about.map((item: { text: string }, index: number) => (
            <p
              key={index}
              className="responsiveText text-blue"
              dangerouslySetInnerHTML={{ __html: item.text }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
