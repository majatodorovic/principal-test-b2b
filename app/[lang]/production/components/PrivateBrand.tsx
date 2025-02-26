'use client';

import AOS from 'aos';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function PrivateBrand({ data }: any) {
  const swiperRef = useRef<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <section className="paddingOutSection scrollOffset" id="1">
        <div
          className="paddingInSection relative mx-auto w-full max-w-[1760px] !py-0 lg:!px-0"
          data-aos="fade-up"
        >
          <div className="flex flex-col items-center gap-20 md:flex-row lg:items-start">
            <div className="flex w-full flex-col gap-6 sm:gap-8 md:w-[calc(50%-24px)] lg:w-[calc(50%-48px)] xl:w-[calc(50%-80px)]">
              <h2
                dangerouslySetInnerHTML={{ __html: data.privateBrand.title }}
                className="text-blue"
              />
              <div className="flex flex-col gap-4 sm:gap-6">
                {data.privateBrand.description.map(
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
              <div className="relative mt-10 w-full">
                <Swiper
                  modules={[Autoplay]}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  loop={true}
                  slidesPerView={2}
                  breakpoints={{
                    640: { slidesPerView: 3 },
                    768: { slidesPerView: 3 },
                    1536: { slidesPerView: 5 },
                  }}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                >
                  {Array.from({ length: 16 }).map((_, index) => (
                    <SwiperSlide key={index} className="">
                      <div>
                        <Image
                          src={`/images/production/swiper/${index + 1}.jpg`}
                          alt={`Product ${index + 1}`}
                          width={200}
                          height={200}
                          className="w-full max-w-[200px]"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <button
                  className="absolute left-0 top-1/2 z-10 h-full -translate-y-1/2 transform rounded-l-xl bg-blue lg:rounded-l-3xl"
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
                <button
                  className="absolute right-0 top-1/2 z-10 h-full -translate-y-1/2 transform rounded-r-xl bg-blue lg:rounded-r-3xl"
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
              </div>
            </div>
            <Image
              src="/images/production/private-brand.jpg"
              alt="Private brand"
              width={100}
              height={100}
              className="mx-auto h-auto w-full rounded-3xl md:w-[50%] xl:mx-0 xl:rounded-[32px] 2xl:rounded-[64px]"
              onClick={toggleModal}
            />
          </div>
        </div>
      </section>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="relative max-w-[326px] rounded-2xl">
            <button
              onClick={toggleModal}
              className="absolute right-3 top-2 z-10 flex items-center justify-center rounded-full bg-white py-1"
              aria-label="Close Modal"
            >
              <Image
                src="/images/navigation/close.png"
                alt="Close Menu"
                width={20}
                height={20}
                className="blueFilter h-5 w-7"
              />
            </button>
            <div className="aspect-w-16 aspect-h-9">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="h-full !max-h-[580px] w-full rounded-xl object-contain"
              >
                <source
                  src="/videos/production/pakovanje.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
