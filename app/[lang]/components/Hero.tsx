'use client';

import AOS from 'aos';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Hero({ data, lang }: any) {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="paddingOutSection" data-aos="fade-up">
      <div className="relative mx-auto w-full max-w-[1760px] overflow-hidden rounded-b-[32px] xl:rounded-b-[50px] 2xl:rounded-b-[100px]">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute left-0 top-0 z-0 h-full w-full object-cover"
        >
          <source src="/videos/home/slider-video.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 flex h-full w-full flex-col gap-4 bg-gradient-to-r from-blue to-blue/0 px-12 pb-[140px] pt-[200px] lg:gap-6 xl:px-20 xl:pb-[140px] xl:pt-[200px] 2xl:px-[180px]">
          <h1
            className="strokeText uppercase leading-tight text-white [&>span]:text-transparent"
            dangerouslySetInnerHTML={{ __html: data.hero.title }}
          />
          <div className="h-[2px] w-[100px] bg-white lg:w-[140px] xl:w-[180px]" />
          <p
            className="responsiveText text-white"
            dangerouslySetInnerHTML={{ __html: data.hero.subTitle }}
          />
          <Link
            href={`/${lang}/offer`}
            className="outlineButton w-[160px] lg:w-[200px]"
          >
            {data.hero.exploreProductsButton}
          </Link>
        </div>
      </div>
    </section>
  );
}
