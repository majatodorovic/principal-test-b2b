'use client';

import { sendNewsletterRequest } from '@/app/services/api/newsletter';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Footer({ data, lang }: any) {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateIsMobile = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);

      setOpenSections((prev) => {
        const initialState = {
          links: !mobile,
          ...data.locations.reduce(
            (acc: { [key: string]: boolean }, _: any, index: number) => {
              acc[`location-${index}`] = !mobile;
              return acc;
            },
            {},
          ),
        };
        return prev !== initialState ? initialState : prev;
      });
    };

    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);

    return () => {
      window.removeEventListener('resize', updateIsMobile);
    };
  }, [data.locations]);

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleNewsletterSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value;

    await sendNewsletterRequest(email);
  };

  return (
    <footer className="relative w-full bg-blue">
      <Image
        src="/images/footer/footer-left.png"
        alt="Footer Left"
        width={260}
        height={50}
        className="absolute left-0 top-0 hidden h-full w-auto object-contain 2xl:block"
      />
      <Image
        src="/images/footer/mobile-bg.jpg"
        alt="Footer Left"
        width={260}
        height={50}
        className="absolute left-0 top-0 h-full w-full object-cover sm:hidden"
      />
      <div className="absolute right-0 top-0 z-10 hidden h-full w-auto sm:flex">
        <Image
          src="/images/footer/footer-right.jpg"
          alt="Footer Right"
          width={260}
          height={50}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-blue/70 sm:bg-inherit sm:bg-gradient-to-r sm:from-blue sm:to-blue/20" />
      </div>
      <div className="relative z-10 text-sm sm:text-base">
        <div className="paddingInSection mx-auto flex w-full max-w-[1760px] flex-col gap-10">
          <div className="flex flex-col items-center justify-between gap-10 sm:flex-row">
            <Link href={`/${lang}`}>
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={260}
                height={50}
                className="whiteFilter"
              />
            </Link>
            <div className="flex gap-3">
              {data.social.map(
                (item: { imageSrc: string; link: string }, index: number) => (
                  <Link
                    key={index}
                    className="rounded-xl bg-white/30 p-3 sm:p-4"
                    href={item.link}
                    target="_blank"
                  >
                    <Image
                      src={item.imageSrc}
                      alt={`Social - ${index}`}
                      width={20}
                      height={20}
                      className="whiteFilter h-5 w-5 sm:h-6 sm:w-6"
                    />
                  </Link>
                ),
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 rounded-3xl bg-white/30 p-10 text-white sm:grid-cols-2 sm:rounded-[32px] md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
            {/* Locations Section */}
            {data?.locations?.map(
              (
                location: {
                  title: string;
                  address: string;
                  phone: string;
                  email: string;
                },
                index: number,
              ) => (
                <div key={`location-${index}`} className="sm:mb-0 sm:block">
                  <div
                    className="flex cursor-pointer items-center justify-between sm:block sm:cursor-auto"
                    onClick={() =>
                      isMobile && toggleSection(`location-${index}`)
                    }
                  >
                    <h5 className="font-bold">{location.title}</h5>
                    {isMobile && (
                      <button className="sm:hidden">
                        {openSections[`location-${index}`] ? (
                          <Image
                            src="/images/arrow.png"
                            alt="Arrow"
                            width={24}
                            height={24}
                            className="whiteFilter h-8 w-8 rotate-180 transition duration-300"
                          />
                        ) : (
                          <Image
                            src="/images/arrow.png"
                            alt="Arrow"
                            width={24}
                            height={24}
                            className="whiteFilter h-8 w-8 transition duration-300"
                          />
                        )}
                      </button>
                    )}
                  </div>
                  {openSections[`location-${index}`] && (
                    <div className="mt-2">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: location.address,
                        }}
                      />
                      <p className="mt-2">
                        <a
                          href={`tel:${location.phone}`}
                          className="text-blue-500"
                        >
                          {location.phone}
                        </a>
                      </p>
                      <p>
                        <a
                          href={`mailto:${location.email}`}
                          className="text-blue-500 break-words"
                        >
                          {location.email}
                        </a>
                      </p>
                    </div>
                  )}
                </div>
              ),
            )}
            {/* Links Section */}
            <div>
              <div
                className="flex cursor-pointer items-center justify-between sm:block sm:cursor-auto"
                onClick={() => isMobile && toggleSection('links')}
              >
                <h4 className="font-bold">{data.links.title}</h4>
                {isMobile && (
                  <button className="sm:hidden">
                    {openSections['links'] ? (
                      <Image
                        src="/images/arrow.png"
                        alt="Arrow"
                        width={24}
                        height={24}
                        className="whiteFilter h-8 w-8 rotate-180 transition duration-300"
                      />
                    ) : (
                      <Image
                        src="/images/arrow.png"
                        alt="Arrow"
                        width={24}
                        height={24}
                        className="whiteFilter h-8 w-8 transition duration-300"
                      />
                    )}
                  </button>
                )}
              </div>
              {openSections['links'] && (
                <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <div className="space-y-2">
                    {data.links.items
                      .slice(0, 5)
                      .map(
                        (
                          item: { text: string; href: string },
                          index: number,
                        ) => (
                          <Link
                            key={index}
                            className="block text-white hover:underline"
                            href={`/${lang}${item.href}`}
                          >
                            {item.text}
                          </Link>
                        ),
                      )}
                  </div>
                  <div className="space-y-2">
                    {data.links.items
                      .slice(5)
                      .map(
                        (
                          item: { text: string; href: string },
                          index: number,
                        ) => (
                          <Link
                            key={index}
                            className="block text-white hover:underline"
                            href={`/${lang}${item.href}`}
                          >
                            {item.text}
                          </Link>
                        ),
                      )}
                  </div>
                </div>
              )}
            </div>
            {/* Newsletter Section */}
            <div className="sm:col-span-2 2xl:col-span-1">
              <h4 className="mb-4 font-bold">{data.newsletter.title}</h4>
              <p className="mb-4 text-sm sm:text-sm">
                {data.newsletter.description}
              </p>
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex overflow-hidden rounded-lg"
              >
                <input
                  type="email"
                  name="email"
                  placeholder={data.newsletter.placeholder}
                  className="w-[120px] flex-1 rounded-none bg-blue p-2 text-sm text-white placeholder-[#44A4C6] outline-none sm:w-full"
                  required
                />
                <button type="submit" className="bg-blue px-4 py-2 text-white">
                  {data.newsletter.button}
                </button>
              </form>
            </div>
          </div>
          <div
            className="w-full text-center text-white [&>a]:underline"
            dangerouslySetInnerHTML={{
              __html: data.copyright,
            }}
          />
        </div>
      </div>
    </footer>
  );
}
