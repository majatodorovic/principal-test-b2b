'use client';

import AOS from 'aos';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Distribution({ data, lang }: any) {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  const swiperRef = useRef<any>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const setIsVideoPlaying = useState(false)[1];
  const [autoplayDelay, setAutoplayDelay] = useState(3000);

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
    swiperRef.current?.autoplay.stop(); // Pauziraj autoplay dok traje video
  };

  const handleVideoEnd = () => {
    setIsVideoPlaying(false);
    setTimeout(() => {
      swiperRef.current?.slideNext(); // Nakon završetka videa, prebaci na sledeći slajd
      swiperRef.current?.autoplay.start(); // Ponovo pokreni autoplay
    }, 500); // Mala pauza pre nastavka autoplay-a
  };

  return (
    <section data-aos="fade-up">
      {/* Background Image for Small Screens */}
      <div className="absolute bottom-0 right-0 z-0 h-[40%] w-full sm:h-[50%]">
        <div className="relative h-full w-full bg-gradient-to-r from-white to-white/70">
          <div className="absolute left-0 top-0 h-10 w-full bg-gradient-to-b from-white to-transparent"></div>
          <div className="absolute bottom-0 left-0 h-10 w-full bg-gradient-to-t from-white to-transparent"></div>
        </div>
        <Image
          src="/images/home/distribution/distribution-bg.jpg"
          alt="Sales"
          width={100}
          height={100}
          className="absolute bottom-0 -z-10 h-full w-full object-cover object-right"
        />
      </div>
      <div className="paddingOutSection relative flex flex-col gap-[60px] 2xl:gap-[100px]">
        {/* Preparation Section */}
        <div className="roundedSection relative mx-auto w-full max-w-[1760px] overflow-hidden">
          <Image
            src="/images/home/distribution/preparation.jpg"
            alt="Preparation"
            width={100}
            height={100}
            className="absolute left-0 top-0 z-0 h-full w-full object-cover"
          />
          <div className="relative flex h-full w-full flex-col gap-[40px] bg-gradient-to-r from-blue via-blue/90 to-blue/10 p-6 lg:p-10 xl:gap-[80px] xl:p-[60px] 2xl:gap-[120px] 2xl:p-[100px]">
            <h2
              dangerouslySetInnerHTML={{ __html: data.distribution.title1 }}
            />
            <div className="grid grid-cols-2 gap-2 sm:gap-6 xl:grid-cols-4">
              {data.distribution.preparation.map(
                (item: { title: string; imageSrc: string }, index: number) => (
                  <div
                    className="relative overflow-hidden rounded-xl transition duration-300 hover:scale-105 sm:rounded-3xl"
                    key={index}
                  >
                    <Link href={`/${lang}/production#${index + 1}`}>
                      <div className="absolute h-full w-full bg-gradient-to-r from-black/80 to-black/10" />
                      <h3
                        className="absolute bottom-6 left-6 text-base font-bold text-white xl:text-2xl"
                        dangerouslySetInnerHTML={{ __html: item.title }}
                      />
                      <Image
                        src={item.imageSrc}
                        alt={`Preparation ${index}`}
                        width={400}
                        height={400}
                        className="h-auto w-full"
                      />
                    </Link>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
        {/* Distribution Section */}
        <div className="paddingInSection relative mx-auto flex w-full max-w-[1760px] flex-col-reverse items-center gap-10 !py-0 lg:flex-row xl:!p-0">
          <div className="h-full w-full flex-1 overflow-hidden rounded-[32px] sm:w-2/3 sm:rounded-[64px] lg:w-full xl:block">
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: autoplayDelay, disableOnInteraction: false }}
              loop={true}
              slidesPerView={1}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={(swiper) => {
                if (swiper.realIndex === 0 && data.distribution.video) {
                  setAutoplayDelay(15000);
                  swiper.autoplay.stop();
                  if (videoRef.current) {
                    videoRef.current.currentTime = 0;
                    videoRef.current.play();
                  }
                } else {
                  setAutoplayDelay(3000);
                  swiper.autoplay.start();
                }
              }}
            >
              {/* Video Slide */}
              {data.distribution.video && (
                <SwiperSlide>
                  <video
                    ref={videoRef}
                    src={data.distribution.video}
                    autoPlay
                    muted
                    playsInline // Dodaj ovo ovde
                    className="h-[250px] w-full object-cover sm:h-[400px] md:h-[500px] lg:h-[595px]"
                    onPlay={handleVideoPlay}
                    onEnded={handleVideoEnd}
                  />
                </SwiperSlide>
              )}
              {data.distribution.images?.map((image: string, index: number) => (
                <SwiperSlide key={index}>
                  <Image
                    src={image}
                    alt={`Distribution ${index + 1}`}
                    width={1000}
                    height={100}
                    className="h-[250px] w-full object-cover sm:h-[400px] md:h-[500px] lg:h-[595px]"
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
          <div className="flex flex-1 flex-col gap-6 xl:pr-[60px]">
            <h2
              dangerouslySetInnerHTML={{ __html: data.distribution.title2 }}
              className="text-blue"
            />
            {data.distribution.description.map(
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
        </div>
      </div>
    </section>
  );
}
