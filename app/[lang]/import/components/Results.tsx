'use client';

import AOS from 'aos';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { InView } from 'react-intersection-observer';

export default function Results({ data }: any) {
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="paddingOutSection" data-aos="fade-up">
      <div className="roundedSection relative mx-auto w-full max-w-[1760px] overflow-hidden">
        <Image
          src="/images/import/results/results-bg.jpg"
          alt="Results"
          width={100}
          height={100}
          className="absolute left-0 top-0 z-0 h-full w-full object-cover"
        />
        <div className="paddingInSection relative flex h-full w-full flex-col gap-14 bg-blue/80">
          <div className="flex flex-col gap-5">
            {data.results.description.map(
              (item: { text: string }, index: number) => {
                return (
                  <p key={index} className="responsiveText text-white">
                    {item.text}
                  </p>
                );
              },
            )}
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
            {data.results.cards.map(
              (
                card: {
                  icon: string;
                  number: number;
                  text: string;
                  numberPreffix: string;
                  numberSuffix: string;
                },
                index: number,
              ) => {
                console.log(card.number);
                return (
                  <div
                    key={index}
                    className="flex flex-1 flex-col items-center rounded-xl bg-white/20 px-4 py-6 text-center sm:rounded-3xl lg:py-8"
                  >
                    <Image
                      src={card.icon}
                      alt={card.text}
                      width={80}
                      height={80}
                      className="whiteFilter mb-2 h-[60px] w-[60px] 2xl:h-[80px] 2xl:w-[80px]"
                    />
                    <div className="text-3xl font-extrabold text-white 2xl:text-5xl">
                      <InView
                        as="div"
                        onChange={(inView) => {
                          if (inView) setStartCount(true);
                        }}
                        triggerOnce={true}
                      >
                        {startCount && (
                          <CountUp
                            start={0}
                            end={card.number}
                            prefix={card.numberPreffix}
                            suffix={card.numberSuffix}
                            duration={3}
                            separator=""
                          />
                        )}
                      </InView>
                    </div>
                    <p className="mt-2 text-xs text-white lg:text-base">
                      {card.text}
                    </p>
                  </div>
                );
              },
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
