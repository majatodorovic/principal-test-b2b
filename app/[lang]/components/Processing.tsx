'use client';

import AOS from 'aos';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Processing({ data, lang }: any) {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="px-6 lg:px-12 xl:px-[140px]">
      <div
        className="relative mx-auto w-full max-w-[1620px]"
        data-aos="fade-up"
      >
        <div className="flex flex-col gap-10 lg:flex-row xl:gap-20">
          <div className="flex flex-col gap-6 xl:gap-8">
            <h2
              dangerouslySetInnerHTML={{ __html: data.processing.title }}
              className="text-blue"
            />
            <div className="flex flex-col gap-4 xl:gap-6">
              {data.processing.description.map(
                (item: { text: string }, index: number) => {
                  return (
                    <p key={index} className="responsiveText text-blue">
                      {item.text}
                    </p>
                  );
                },
              )}
            </div>
            <Link href={`/${lang}/production`} className="mainButton w-[180px]">
              {data.brand.exploreMoreButton}
            </Link>
          </div>
          <Image
            src="/images/home/processing/processing.jpg"
            alt="Processing"
            width={100}
            height={100}
            className="mx-auto w-full rounded-3xl sm:w-[80%] md:w-[50%] xl:mx-0 xl:rounded-[32px] 2xl:rounded-[64px]"
          />
        </div>
      </div>
    </section>
  );
}
