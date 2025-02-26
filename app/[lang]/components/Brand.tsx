'use client';

import AOS from 'aos';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Brand({ data, lang }: any) {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="paddingOutSection !py-0 xl:mb-[200px] 2xl:mb-[140px]">
      <div
        className="relative mx-auto w-full max-w-[1760px]"
        data-aos="fade-up"
      >
        {/* Layout for small screens */}
        <div className="paddingInSection relative flex flex-col gap-10 !py-0 xl:hidden">
          <h2
            dangerouslySetInnerHTML={{ __html: data.brand.title }}
            className="text-blue xl:text-center"
          />
          <div className="flex flex-col gap-6 sm:flex-row lg:gap-10">
            <div className="relative z-10 flex flex-1 flex-col gap-6">
              <p
                className="responsiveText text-blue"
                dangerouslySetInnerHTML={{ __html: data.brand.description }}
              />
              <Link
                href={`/${lang}/barka`}
                className="mainButton block w-[160px]"
              >
                {data.brand.exploreMoreButton}
              </Link>
            </div>
            <div className="relative flex flex-1 items-center">
              <Image
                src="/images/home/brand/brand-barka.jpg"
                alt="Brand"
                width={100}
                height={100}
                className="w-full rounded-3xl xl:rounded-[32px] 2xl:rounded-[64px]"
              />
              <Image
                src="/images/home/brand/brand-barka-logo.jpg"
                alt="Brand Logo"
                width={200}
                height={144}
                className="absolute left-1/2 top-1/2 z-10 w-[150px] -translate-x-1/2 -translate-y-1/2 transform rounded-xl"
              />
            </div>
          </div>
        </div>
        {/* Layout for large screens */}
        <div className="hidden xl:flex">
          <Image
            src="/images/home/brand/brand-barka.jpg"
            alt="Brand"
            width={100}
            height={100}
            className="flex-1 rounded-[64px]"
          />
          <div className="ml-10 flex flex-1 flex-col gap-6">
            <h2
              dangerouslySetInnerHTML={{ __html: data.brand.title }}
              className="text-blue"
            />
            <p
              className="responsiveText text-blue"
              dangerouslySetInnerHTML={{ __html: data.brand.description }}
            />
            <Link href={`${lang}/barka`} className="mainButton w-[180px]">
              {data.brand.exploreMoreButton}
            </Link>
          </div>
          <Image
            src="/images/home/brand/brand-barka-logo.jpg"
            alt="Brand Logo"
            width={500}
            height={360}
            className="absolute -bottom-20 left-1/2 -translate-x-1/2 translate-y-1/2 transform rounded-[32px] drop-shadow-lg xl:w-[300px] 2xl:-bottom-8 2xl:w-[390px] 2xl:rounded-[64px]"
          />
        </div>
      </div>
    </section>
  );
}
