'use client';

import AOS from 'aos';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Description({ data }: any) {
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="px-6 lg:px-12 xl:px-[140px]">
      <div
        className="relative mx-auto flex w-full max-w-[1620px] flex-col gap-6 xl:gap-10"
        data-aos="fade-up"
      >
        <div className="flex flex-col items-center gap-6 lg:flex-row xl:items-start xl:gap-14">
          <div className="flex flex-1 flex-col gap-4 md:gap-6">
            {data.description1.map((item: { text: string }, index: number) => {
              return (
                <p
                  key={index}
                  className="responsiveText text-blue"
                  dangerouslySetInnerHTML={{ __html: item.text }}
                />
              );
            })}
          </div>
          <div className="h-full !max-h-[500px] w-full flex-1 overflow-hidden rounded-[32px] sm:w-2/3 sm:rounded-[64px] lg:w-full">
            <Swiper
              modules={[Autoplay]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              slidesPerView={1}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              className="max-h-[500px]"
            >
              {data.images?.map((item: { imageSrc: string }, index: number) => (
                <SwiperSlide key={index}>
                  <Image
                    src={item.imageSrc}
                    alt={`About us ${index + 1}`}
                    width={1000}
                    height={1000}
                    className="h-full w-full object-cover"
                  />
                </SwiperSlide>
              ))}
              <button
                className="absolute left-0 top-1/2 z-10 h-full -translate-y-1/2 transform bg-blue p-1"
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <Image
                  src="/images/arrow.png"
                  alt="Arrow"
                  width={24}
                  height={24}
                  className="whiteFilter h-6 w-6 rotate-90 lg:h-8 lg:w-8"
                />
              </button>
              <button
                className="absolute right-0 top-1/2 z-10 h-full -translate-y-1/2 transform bg-blue p-1"
                onClick={() => swiperRef.current?.slideNext()}
              >
                <Image
                  src="/images/arrow.png"
                  alt="Arrow"
                  width={24}
                  height={24}
                  className="whiteFilter h-6 w-6 -rotate-90 lg:h-8 lg:w-8"
                />
              </button>
            </Swiper>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:gap-6">
          {data.description2.map((item: { text: string }, index: number) => {
            return (
              <p
                key={index}
                className="responsiveText text-blue"
                dangerouslySetInnerHTML={{ __html: item.text }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
