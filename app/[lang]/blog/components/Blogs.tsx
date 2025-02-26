'use client';

import AOS from 'aos';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Blogs({ data, lang }: any) {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="px-6 lg:px-12 xl:px-[140px]">
      <div
        className="relative mx-auto flex w-full max-w-[1620px] flex-col gap-10 xl:gap-20"
        data-aos="fade-up"
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {data.blogs.map(
            (blog: {
              id: number;
              title: string;
              description: string;
              imageSrc: string;
            }) => {
              return (
                <div
                  key={blog.id}
                  className="overflow-hidden rounded-3xl bg-blue/20"
                >
                  <Image
                    src={blog.imageSrc}
                    alt="Blog"
                    width={360}
                    height={360}
                    className="w-full"
                  />
                  <div className="flex flex-col gap-6 p-6 !pt-4 text-blue">
                    <h3 className="text-lg font-semibold lg:text-xl xl:text-2xl">
                      {blog.title}
                    </h3>
                    <p className="responsiveText line-clamp-3">
                      {blog.description}
                    </p>
                    <Link
                      className="mainButton sm:w-[260px]"
                      href={`/${lang}/blog/${blog.id}`}
                    >
                      {data.seeMoreButton}
                    </Link>
                  </div>
                </div>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}
