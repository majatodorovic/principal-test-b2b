'use client';

import AOS from 'aos';
import Image from 'next/image';
import { useEffect } from 'react';

export default function Products({ data }: any) {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const labelClass = 'min-w-[300px] lg:min-w-[360px] font-bold';
  const textClass = 'responsiveText text-blue';

  return (
    <section className="paddingOutSection">
      <div
        className="paddingInSection mx-auto flex w-full max-w-[1760px] flex-col gap-14 !py-0 lg:px-0 xl:gap-20"
        data-aos="fade-up"
      >
        {data.products.map(
          (
            product: {
              title: string;
              imageSrc: string;
              description: {
                text: string;
              }[];
              country: {
                label: string;
                text: string;
              };
              comercialPack: {
                label: string;
                text: string;
              };
              transportPack: {
                label: string;
                text: string;
              };
              packNumber: {
                label: string;
                text: string;
              };
              storageMethod: {
                label: string;
                imageSrc: string;
                temperature: string;
              };
              preparationMethod: {
                label: string;
                images: {
                  imageSrc: string;
                }[];
              };
            },
            index: number,
          ) => (
            <div key={index} className="flex flex-col gap-8 xl:gap-12">
              <h3 className="w-full rounded-full bg-blue p-2 text-center text-lg font-extrabold text-white lg:p-3 lg:text-3xl 2xl:p-5 2xl:text-4xl">
                {product.title}
              </h3>
              <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start xl:gap-12">
                <Image
                  src={product.imageSrc}
                  alt={`Product - ${index}`}
                  width={400}
                  height={400}
                  className="w-full max-w-[400px] rounded-3xl"
                />
                <div className="flex flex-col gap-8 xl:gap-12">
                  {/* Product Description */}
                  <div className="flex flex-col gap-4">
                    {product.description.map(
                      (item: { text: string }, index: number) => (
                        <p
                          key={index}
                          dangerouslySetInnerHTML={{ __html: item.text }}
                          className={textClass}
                        />
                      ),
                    )}
                  </div>
                  {/* Product Details */}
                  <div className={textClass}>
                    {[
                      {
                        label: product.country.label,
                        text: product.country.text,
                      },
                      {
                        label: product.comercialPack.label,
                        text: product.comercialPack.text,
                      },
                      {
                        label: product.transportPack.label,
                        text: product.transportPack.text,
                      },
                      {
                        label: product.packNumber.label,
                        text: product.packNumber.text,
                      },
                    ].map((info, infoIndex) => (
                      <div
                        key={infoIndex}
                        className="mb-2 flex flex-col sm:flex-row"
                      >
                        <p
                          dangerouslySetInnerHTML={{ __html: info.label }}
                          className={labelClass}
                        />
                        <p dangerouslySetInnerHTML={{ __html: info.text }} />
                      </div>
                    ))}
                  </div>
                  {/* Additional Info */}
                  <div className="flex flex-col gap-4 rounded-[32px] bg-blue/20 px-8 py-3 xl:flex-row xl:gap-8">
                    {/* Storage Method */}
                    <div className="flex items-center gap-2 text-blue">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: product.storageMethod.label,
                        }}
                      />
                      <p
                        dangerouslySetInnerHTML={{
                          __html: product.storageMethod.temperature,
                        }}
                        className="font-bold"
                      />
                      <Image
                        src={product.storageMethod.imageSrc}
                        alt="Thermometer"
                        width={40}
                        height={40}
                        className="blueFilter"
                      />
                    </div>
                    {/* Preparation Method */}
                    {product.preparationMethod.images.length > 0 && (
                      <div className="flex items-center gap-2 text-blue">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: product.preparationMethod.label,
                          }}
                        />
                        {product.preparationMethod.images.map(
                          (image: { imageSrc: string }, imageIndex: number) => (
                            <Image
                              key={imageIndex}
                              src={image.imageSrc}
                              alt="Preparation Image"
                              width={40}
                              height={40}
                              className="blueFilter"
                            />
                          ),
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
