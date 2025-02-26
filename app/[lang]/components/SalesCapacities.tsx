'use client';

import AOS from 'aos';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { InView } from 'react-intersection-observer';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function SalesCapacities({ data, lang }: any) {
  const [startCount, setStartCount] = useState(false);
  const [activeButton, setActiveButton] = useState(
    data.sales.groupButton[0].title,
  );
  const [cardsContent, setCardsContent] = useState(
    data.sales.groupButton[0].cards,
  );

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section data-aos="fade-up">
      <div className="relative">
        <Image
          src="/images/home/sales/sales-potential-bg.jpg"
          alt="Sales"
          width={100}
          height={100}
          className="absolute left-0 top-0 z-0 h-full w-full object-cover"
        />
        <div className="relative flex flex-col items-center gap-12 bg-blue/70 p-6 lg:p-10 xl:p-[60px] 2xl:p-[100px]">
          <h2
            className="text-center xl:mb-6"
            dangerouslySetInnerHTML={{ __html: data.sales.title }}
          />
          {/* Buttons Section */}
          <div className="mx-auto flex w-full flex-col overflow-hidden rounded-xl bg-white/20 sm:w-auto sm:max-w-full sm:flex-row">
            {data.sales.groupButton.map(
              (
                button: {
                  title: string;
                  card: {
                    number: string;
                    text: string;
                    icon: string;
                    numberSuffix: string;
                  };
                },
                index: number,
              ) => (
                <button
                  key={index}
                  className={clsx(
                    'w-full px-4 py-2 text-xs font-bold uppercase text-white transition duration-300 hover:bg-white hover:text-blue sm:w-auto sm:px-6 sm:py-3 2xl:text-base',
                    {
                      'bg-white !text-blue':
                        activeButton === data.sales.groupButton[index].title,
                    },
                  )}
                  onClick={() => {
                    setActiveButton(data.sales.groupButton[index].title);
                    setCardsContent(data.sales.groupButton[index].cards);
                  }}
                >
                  {button.title}
                </button>
              ),
            )}
          </div>
          {/* Cards Section */}
          <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {cardsContent.map(
              (
                card: {
                  icon: string;
                  number: number;
                  text: string;
                  numberSuffix: string;
                  numberPreffix: string;
                },
                index: number,
              ) => (
                <div
                  key={index}
                  className="flex flex-col items-center rounded-xl bg-white/20 p-6 text-center lg:p-8"
                >
                  <Image
                    src={card.icon}
                    alt={card.text}
                    width={80}
                    height={80}
                    className="whiteFilter mb-2 h-[60px] w-[60px] 2xl:h-[80px] 2xl:w-[80px]"
                  />
                  <div className="text-3xl font-bold text-white 2xl:text-5xl">
                    <InView
                      as="div"
                      onChange={(inView) => {
                        if (inView) setStartCount(true);
                      }}
                      triggerOnce={true}
                      className="mt-4"
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
              ),
            )}
          </div>
          <Link href={`/${lang}/offer`} className="outlineButton w-[200px]">
            {data.sales.seeOfferButton}
          </Link>
        </div>
      </div>
      {/* Slider Section */}
      <div className="relative mx-auto w-full bg-blue px-4 py-6 sm:px-8 sm:py-8 md:px-16 lg:px-24 xl:max-w-[1280px] xl:rounded-b-3xl 2xl:max-w-[1620px]">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1536: { slidesPerView: 5 },
          }}
          className="w-full"
        >
          {Array.from({ length: 16 }).map((_, index) => (
            <SwiperSlide
              key={index}
              className="flex items-center justify-center"
            >
              <Image
                src={`/images/home/sales/clients/${index + 1}.png`}
                alt={`Client ${index + 1}`}
                width={200}
                height={200}
                className="mx-auto h-[80px] rounded-lg object-cover sm:h-[100px]"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
