'use client';

import AOS from 'aos';
import Link from 'next/link';
import { useEffect } from 'react';

export default function HeroShort({ data, lang }: any) {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="paddingOutSection">
      <div
        className="relative mx-auto w-full max-w-[1760px] overflow-hidden rounded-b-[32px] xl:rounded-b-[50px] 2xl:rounded-b-[100px]"
        data-aos="fade-up"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute left-0 top-0 z-0 h-full w-full object-cover"
        >
          <source src="/videos/home/slider-video.mp4" type="video/mp4" />
        </video>
        <div className="relative h-full w-full bg-gradient-to-r from-blue to-blue/0 px-10 pb-10 pt-[100px] sm:px-12 sm:pr-12 lg:px-20 lg:pb-20 lg:pt-[140px] xl:px-[140px] xl:pt-[180px]">
          <h1 className="text-left">{data.title}</h1>
          <div className="mt-4 flex flex-wrap gap-1 sm:gap-2">
            {data.breadcrumbs.map(
              (crumb: { name: string; link: string }, index: number) => (
                <span
                  key={index}
                  className="responsiveText flex items-center text-white"
                >
                  <Link
                    href={`/${lang}/${crumb.link}`}
                    className="hover:underline"
                  >
                    {crumb.name}
                  </Link>
                  {index < data.breadcrumbs.length - 1 && (
                    <span className="ml-1 text-white sm:ml-2">/</span>
                  )}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
