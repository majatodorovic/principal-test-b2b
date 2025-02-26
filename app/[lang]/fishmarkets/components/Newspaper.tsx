'use client';

import AOS from 'aos';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Newspaper({ data }: any) {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="px-6 lg:px-12 xl:px-[140px]">
      <div
        className="relative mx-auto mb-[150px] flex w-full max-w-[1620px] flex-col gap-10 xl:gap-20"
        data-aos="fade-up"
      >
        <div className="flex flex-col items-center gap-10 md:flex-row xl:items-start xl:gap-20">
          <div className="flex flex-col items-start gap-6 md:gap-8">
            <h2
              dangerouslySetInnerHTML={{ __html: data.newspaper.title }}
              className="text-blue"
            />
            <div className="flex flex-col gap-4 md:gap-6">
              {data.newspaper.description.map(
                (item: { text: string }, index: number) => {
                  return (
                    <p
                      key={index}
                      className="responsiveText text-blue"
                      dangerouslySetInnerHTML={{ __html: item.text }}
                    />
                  );
                },
              )}
            </div>
            <Link
              href="https://wolt.com/sr/srb/cacak/restaurant/ribarnica-barka?srsltid=AfmBOoqzfU8dauYa-ESWFueXBX24b9amYFMQfTbJuHnxWaVWAjXYrGgD"
              target="_blank"
              className="mx-auto flex w-auto items-center gap-6 rounded-3xl bg-[#009DE0] px-8 py-3 text-base font-bold text-white sm:mx-0 xl:text-xl"
            >
              <Image
                src="/images/fishmarkets/wolt.png"
                alt="Wolt"
                width={100}
                height={100}
                className="whiteFilter max-h-10 w-auto"
              />
              {data.newspaper.woltText}
            </Link>
          </div>
          <Image
            src="/images/fishmarkets/newspaper.png"
            alt="Newspaper"
            width={100}
            height={100}
            className="mx-auto max-h-[550px] w-full sm:w-[50%] xl:mx-0"
          />
        </div>
        <div className="flex flex-col gap-[200px] md:flex-row md:gap-[60px] lg:gap-[100px]">
          {data.newspaper.restoraunts.map(
            (
              item: {
                imageSrc: string;
                name: string;
                address: string;
                phone: string;
              },
              index: number,
            ) => {
              return (
                <div key={index} className="relative w-full">
                  <Image
                    src={item.imageSrc}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="h-full w-[90%] rounded-3xl object-cover md:w-full xl:rounded-[32px] 2xl:rounded-[64px]"
                  />
                  <div className="responsiveText absolute -bottom-[150px] right-0 flex w-[250px] transform flex-col gap-6 rounded-3xl bg-blue p-6 text-white md:right-1/2 md:w-[300px] md:translate-x-1/2 md:p-8 lg:w-[360px] lg:p-10 xl:-right-8 xl:translate-x-0 xl:rounded-[32px] 2xl:-right-14">
                    <p dangerouslySetInnerHTML={{ __html: item.name }} />
                    <p dangerouslySetInnerHTML={{ __html: item.address }} />
                    <a
                      dangerouslySetInnerHTML={{ __html: item.phone }}
                      href={`tel:${item.phone}`}
                    />
                  </div>
                </div>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}
