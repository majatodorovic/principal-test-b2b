'use client';

import AOS from 'aos';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Lists({ data }: any) {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const swiperRef = useRef<any>(null);

  const handleSwiperUpdate = (swiper: any) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="paddingOutSection" data-aos="fade-up">
      <div className="paddingInSection relative mx-auto w-full max-w-[1760px] !py-0 lg:!px-0">
        <div className="relative overflow-hidden rounded-3xl">
          <Swiper
            spaceBetween={10}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 5 },
              1024: { slidesPerView: 6 },
              1536: { slidesPerView: 8 },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onInit={(swiper) => handleSwiperUpdate(swiper)}
            onSlideChange={(swiper) => handleSwiperUpdate(swiper)}
          >
            {data.cards.map(
              (card: { icon: string; text: string }, index: number) => (
                <SwiperSlide
                  key={index}
                  className={clsx(
                    'hoverCard !h-[124px] w-full !min-w-[134px] rounded-3xl bg-blue/20 !transition duration-300 xl:!h-[170px] xl:!min-w-[170px]',
                    {
                      '!bg-blue': index === selectedIndex,
                    },
                  )}
                  onClick={() => setSelectedIndex(index)}
                >
                  <div className="flex h-full flex-col items-center px-2 py-3 text-center xl:py-4">
                    <Image
                      src={card.icon}
                      alt={card.text}
                      width={60}
                      height={60}
                      className={clsx(
                        'blueFilter h-[60px] w-[60px] xl:h-[80px] xl:w-[80px]',
                        {
                          whiteFilter: index === selectedIndex,
                        },
                      )}
                    />
                    <p
                      className={clsx('mt-2 text-xs text-blue xl:text-base', {
                        '!text-white': index === selectedIndex,
                      })}
                      dangerouslySetInnerHTML={{ __html: card.text }}
                    />
                  </div>
                </SwiperSlide>
              ),
            )}
          </Swiper>
          {!isBeginning && (
            <button
              className="absolute left-0 top-1/2 z-10 h-full -translate-y-1/2 transform rounded-l-3xl bg-blue"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <Image
                src="/images/arrow.png"
                alt="Arrow"
                width={20}
                height={20}
                className="whiteFilter h-6 w-6 rotate-90 lg:h-8 lg:w-8"
              />
            </button>
          )}
          {!isEnd && (
            <button
              className="absolute right-0 top-1/2 z-10 h-full -translate-y-1/2 transform rounded-r-3xl bg-blue"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <Image
                src="/images/arrow.png"
                alt="Arrow"
                width={20}
                height={20}
                className="whiteFilter h-6 w-6 -rotate-90 lg:h-8 lg:w-8"
              />
            </button>
          )}
        </div>
        <div className="mt-[60px] flex flex-col gap-[60px] lg:mt-[100px]">
          {data.cards[selectedIndex]?.items?.map((item: any, index: number) => (
            <div key={index} className="flex flex-col gap-8 xl:gap-12">
              <h3 className="w-full rounded-full bg-blue p-2 text-center text-lg font-extrabold text-white lg:p-3 lg:text-3xl 2xl:p-5 2xl:text-4xl">
                {item.title}
              </h3>
              <div className="flex w-full flex-col gap-6 lg:flex-row xl:gap-14">
                <div className="flex w-full flex-col gap-6 lg:w-1/4 xl:gap-12">
                  <Image
                    src={item.imageSrc}
                    alt={`Item ${index}`}
                    width={20}
                    height={20}
                    className="mx-auto w-full max-w-[300px] rounded-3xl border-2 border-blue lg:mx-0 lg:w-[250px] lg:max-w-full xl:w-[400px]"
                  />
                  <p
                    className="text-sm text-blue lg:text-base"
                    dangerouslySetInnerHTML={{ __html: item.about }}
                  />
                </div>
                <div className="w-full lg:w-3/4">
                  {item.table.map((row: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className={clsx(
                          'w-full rounded-3xl bg-white p-4 lg:rounded-full',
                          {
                            '!bg-blue/20': index % 2 === 0,
                          },
                        )}
                      >
                        <div className="flex flex-col gap-1 sm:flex-row sm:gap-0">
                          <div className="flex flex-[3] items-center sm:px-4">
                            <p className="text-left text-sm text-blue lg:text-base 2xl:text-lg">
                              {row.column1}
                            </p>
                          </div>
                          {row.column2 && (
                            <div className="flex flex-1 items-center border-blue sm:border-l sm:px-4 sm:text-center">
                              <p className="text-left text-sm text-blue lg:text-base 2xl:text-lg">
                                {row.column2}
                              </p>
                            </div>
                          )}
                          {row.column3 && (
                            <div className="flex flex-1 items-center border-blue sm:border-l sm:px-4 sm:text-center">
                              <p className="text-left text-sm text-blue lg:text-base 2xl:text-lg">
                                {row.column3}
                              </p>
                            </div>
                          )}
                          {row.column4 && (
                            <div className="flex flex-1 items-center border-blue sm:border-l sm:px-4 sm:text-center">
                              <p className="text-left text-sm text-blue lg:text-base 2xl:text-lg">
                                {row.column4}
                              </p>
                            </div>
                          )}
                          {row.column5 && (
                            <div className="flex flex-1 items-center border-blue sm:border-l sm:px-4 sm:text-center">
                              <p className="text-left text-sm text-blue lg:text-base 2xl:text-lg">
                                {row.column5}
                              </p>
                            </div>
                          )}
                          {row.column6 && (
                            <div className="flex flex-1 items-center border-blue sm:border-l sm:px-4 sm:text-center">
                              <p className="text-left text-sm text-blue lg:text-base 2xl:text-lg">
                                {row.column6}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
