'use client';

import AOS from 'aos';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';
import { InView } from 'react-intersection-observer';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Leader({ data, lang }: any) {
  const [loyaltyCardTitle, setLoyaltyCardTitle] = useState(
    data.leader.loyaltyCards[0].title,
  );
  const [loyaltyCardDescription, setLoyaltyCardDescription] = useState(
    data.leader.loyaltyCards[0].description,
  );
  const [startCount, setStartCount] = useState(false);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="paddingOutSection" data-aos="fade-up">
      <div className="roundedSection relative mx-auto w-full max-w-[1760px] overflow-hidden">
        <Image
          src="/images/home/leader/leader-bg.jpg"
          alt="Leader"
          width={100}
          height={100}
          className="absolute left-0 top-0 z-0 h-full w-full object-cover"
        />
        <div className="paddingInSection relative z-10 flex flex-col gap-6 bg-blue/80 xl:gap-12">
          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="flex flex-1 flex-col gap-6 xl:gap-10">
              <h2 dangerouslySetInnerHTML={{ __html: data.leader.title }} />
              <p
                className="responsiveText text-white xl:pr-[100px]"
                dangerouslySetInnerHTML={{ __html: data.leader.description }}
              />
              <Link
                href={`/${lang}/about-us`}
                className="outlineButton w-[200px]"
              >
                {data.leader.aboutUsButton}
              </Link>
            </div>
            {/* Buttons Section */}
            <div className="flex w-full flex-1 flex-col gap-4">
              <div className="grid w-full grid-cols-1 overflow-hidden rounded-lg bg-white/20 sm:flex lg:rounded-2xl">
                {data?.leader?.loyaltyCards?.map(
                  (
                    card: { title: string; description: string },
                    index: number,
                  ) => (
                    <button
                      key={index}
                      className={clsx(
                        'flex-grow px-3 py-2 text-xs font-bold uppercase text-white transition duration-300 hover:bg-white hover:text-blue lg:py-3 2xl:text-base',
                        {
                          '!bg-white !text-blue':
                            loyaltyCardTitle === card.title,
                        },
                      )}
                      onClick={() => {
                        setLoyaltyCardTitle(card.title);
                        setLoyaltyCardDescription(card.description);
                      }}
                    >
                      {card.title}
                    </button>
                  ),
                )}
              </div>
              <div className="responsiveText rounded-xl bg-white/20 px-6 py-4 text-white lg:rounded-3xl lg:px-12 lg:py-8">
                {loyaltyCardDescription}
              </div>
            </div>
          </div>
          {/* Slider Section */}
          <div className="relative">
            <Swiper
              modules={[Autoplay]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              spaceBetween={10}
              slidesPerView={2}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 5 },
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
            >
              {data.leader.numberCards.map(
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
                  return (
                    <SwiperSlide
                      key={index}
                      className="!h-auto rounded-xl bg-white/20 px-6 py-6 lg:rounded-3xl lg:px-8 lg:py-8"
                    >
                      <div className="flex flex-col items-center text-center">
                        <Image
                          src={card.icon}
                          alt={card.text}
                          width={60}
                          height={60}
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
                    </SwiperSlide>
                  );
                },
              )}
            </Swiper>
            <button
              className="absolute left-0 top-1/2 z-10 h-full -translate-y-1/2 transform rounded-l-xl bg-white text-black lg:rounded-l-3xl"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <Image
                src="/images/arrow.png"
                alt="Arrow"
                width={24}
                height={24}
                className="blackFilter h-5 w-5 rotate-90 lg:h-7 lg:w-7"
              />
            </button>
            <button
              className="absolute right-0 top-1/2 z-10 h-full -translate-y-1/2 transform rounded-r-xl bg-white text-black lg:rounded-r-3xl"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <Image
                src="/images/arrow.png"
                alt="Arrow"
                width={24}
                height={24}
                className="blackFilter h-5 w-5 -rotate-90 lg:h-7 lg:w-7"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
