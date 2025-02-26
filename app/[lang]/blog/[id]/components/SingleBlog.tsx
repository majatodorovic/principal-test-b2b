'use client';

import HeroShort from '@/app/common/HeroShort';
import AOS from 'aos';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function SingleBlog({ data, lang }: any) {
  const { id } = useParams();
  const blogId = parseInt(id as string, 10);
  const blog = data.blogs.find((blog: { id: number }) => blog.id === blogId);

  const updatedData = {
    title: data.title,
    breadcrumbs: [
      ...data.breadcrumbs,
      { name: blog.title, link: `blog/${blogId}` },
    ],
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  if (!blog) {
    return (
      <section className="px-6 lg:px-12 xl:px-[140px]">
        <div
          className="relative mx-auto mb-[150px] flex w-full max-w-[1620px] flex-col gap-10 xl:gap-20"
          data-aos="fade-up"
        >
          <div>Blog not found</div>
        </div>
      </section>
    );
  }

  return (
    <>
      <HeroShort data={updatedData} lang={lang} />
      <section className="px-6 lg:px-12 xl:px-[140px]">
        <div
          className="relative mx-auto flex w-full max-w-[1620px] flex-col gap-10 xl:gap-20"
          data-aos="fade-up"
        >
          <div className="flex flex-col gap-10 md:flex-row xl:gap-14">
            <div className="flex flex-col gap-6 xl:gap-10">
              <h2
                dangerouslySetInnerHTML={{ __html: blog.title }}
                className="text-blue"
              />
              <div className="flex flex-col gap-4 xl:gap-6">
                <p className="responsiveText text-blue">{blog.description}</p>
              </div>
            </div>
            <Image
              src={blog.imageSrc}
              alt="Blog"
              width={100}
              height={100}
              className="mx-auto w-full rounded-3xl sm:w-[80%] md:w-[50%] xl:mx-0 xl:rounded-[32px] 2xl:rounded-[64px]"
            />
          </div>
        </div>
      </section>
    </>
  );
}
