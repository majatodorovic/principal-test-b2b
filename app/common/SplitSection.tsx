'use client';

import AOS from 'aos';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface InfoSectionProps {
  imagePosition: 'left' | 'right';
  imageSrc: string;
  title: string;
  description: { text: string }[];
  seeVideoText?: string;
  videoSrc?: string;
  id?: string;
}

export default function InfoSection({
  imagePosition,
  imageSrc,
  title,
  description,
  seeVideoText,
  videoSrc,
  id,
}: InfoSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

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

  return (
    <>
      <section
        className="paddingOutSection scrollOffset"
        data-aos="fade-up"
        id={id}
      >
        <div className="roundedSection relative mx-auto min-h-[300px] w-full max-w-[1760px] overflow-hidden lg:min-h-[500px]">
          <Image
            src={imageSrc}
            alt={title}
            width={100}
            height={100}
            className={`absolute top-0 z-0 h-full w-2/3 object-cover xl:w-3/5 ${
              imagePosition === 'right' ? 'right-0' : 'left-0'
            }`}
          />
          <div
            className={clsx(
              'paddingInSection relative flex min-h-[300px] w-full flex-col gap-10 bg-gradient-to-r from-blue via-blue to-blue/30 sm:flex-row sm:to-blue/10 lg:min-h-[500px] xl:to-blue/0',
              {
                '!bg-gradient-to-l sm:!flex-row-reverse':
                  imagePosition === 'left',
              },
            )}
          >
            <div className="flex w-full flex-col gap-6 sm:w-2/3 xl:w-2/5">
              <h2 className="text-white">{title}</h2>
              {description.map((item, index) => (
                <p
                  key={index}
                  className="responsiveText text-white"
                  dangerouslySetInnerHTML={{ __html: item.text }}
                />
              ))}
            </div>
            {videoSrc ? (
              <div className="flex w-full flex-col items-center justify-center sm:w-1/3 xl:w-1/5">
                <button
                  onClick={toggleModal}
                  className="focus:outline-none"
                  aria-label="Open Video"
                >
                  <Image
                    src="/images/production/video.png"
                    alt="Video icon"
                    width={100}
                    height={100}
                    className="whiteFilter w-[70px] cursor-pointer lg:w-[100px]"
                  />
                </button>
                <p className="text-sm text-white lg:text-base">
                  {seeVideoText}
                </p>
              </div>
            ) : (
              <div className="hidden w-full flex-col items-center justify-center sm:w-1/3 xl:flex xl:w-1/5" />
            )}
            <div className="hidden flex-col items-center justify-center xl:flex xl:w-2/5" />
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
                <source src={videoSrc} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
