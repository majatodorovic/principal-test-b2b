'use client';

import AOS from 'aos';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import Cards from './Cards';
import Form from './Form';

export default function Support({ data }: any) {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const Map = dynamic(() => import('./Map'), { ssr: false });

  return (
    <section className="paddingOutSection">
      <div
        className="paddingInSection relative mx-auto w-full max-w-[1760px] !py-0 lg:!px-0"
        data-aos="fade-up"
      >
        <div className="flex w-full flex-col gap-8 xl:flex-row xl:gap-10">
          <div className="flex flex-1 flex-col gap-14">
            <Cards data={data} />
            <Form data={data} />
          </div>
          <div className="flex-1">
            <Map data={data} />
          </div>
        </div>
      </div>
    </section>
  );
}
