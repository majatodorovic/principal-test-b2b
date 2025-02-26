'use client';

import AOS from 'aos';
import Image from 'next/image';
import { useEffect } from 'react';

export default function Sustainability({ data }: any) {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    window.addEventListener('scroll', AOS.refresh);
    return () => {
      window.removeEventListener('scroll', AOS.refresh);
    };
  }, []);

  return (
    <section className="paddingOutSection" data-aos="fade-up">
      <div className="paddingInSection relative mx-auto flex w-full max-w-[1760px] flex-col items-center gap-10 !py-0 lg:flex-row lg:!px-0 xl:gap-20">
        <div className="flex w-full flex-1 flex-col gap-4 xl:gap-6">
          <h2
            dangerouslySetInnerHTML={{ __html: data.sustainability.title }}
            className="mb-2 text-blue"
          />
          <p
            className="responsiveText text-blue"
            dangerouslySetInnerHTML={{ __html: data.sustainability.text1 }}
          />
          <p
            className="responsiveText text-blue"
            dangerouslySetInnerHTML={{ __html: data.sustainability.text2 }}
          />
          <p
            className="responsiveText text-blue"
            dangerouslySetInnerHTML={{
              __html: data.sustainability.text3,
            }}
          />
          <div className="flex flex-col gap-2 xl:gap-3">
            {data.sustainability.activities.map(
              (item: { text: string }, index: number) => {
                return (
                  <div
                    key={index}
                    className="responsiveText flex items-start gap-3 text-blue"
                  >
                    <Image
                      src="/images/import/sustainability/check.png"
                      alt="Check"
                      width={100}
                      height={100}
                      className="mt-1 h-4 w-4"
                    />
                    {item.text}
                  </div>
                );
              },
            )}
          </div>
          <p
            className="responsiveText text-blue"
            dangerouslySetInnerHTML={{ __html: data.sustainability.text4 }}
          />
        </div>
        <div className="flex-1">
          <Image
            src="/images/import/sustainability/sustainability.jpg"
            alt="Sustainability"
            width={100}
            height={100}
            className="mx-auto w-full rounded-3xl sm:w-1/2 lg:w-full xl:mx-0 xl:rounded-[32px] 2xl:rounded-[64px]"
          />
        </div>
      </div>
    </section>
  );
}
