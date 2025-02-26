'use client';

import Image from 'next/image';

export default function Cards({ data }: any) {
  return (
    <div className="flex flex-1 flex-col gap-12 sm:flex-row sm:gap-6">
      <div className="flex flex-1 flex-col gap-8 sm:gap-12">
        <p
          dangerouslySetInnerHTML={{ __html: data.wholesale.title }}
          className="text-xl font-extrabold text-blue"
        />
        <div className="flex w-full flex-col gap-6">
          {data.wholesale.description.map(
            (
              item: {
                name: string;
                phone: { number: string }[];
                email: string;
                address: string;
              },
              index: number,
            ) => {
              return (
                <div
                  key={index}
                  className="responsiveText flex min-h-[270px] w-full flex-col gap-8 rounded-[32px] bg-blue px-6 py-6 text-white 2xl:rounded-[64px] 2xl:px-8 2xl:py-10"
                >
                  <p
                    dangerouslySetInnerHTML={{
                      __html: item.name,
                    }}
                    className="font-semibold"
                  />
                  <p
                    dangerouslySetInnerHTML={{
                      __html: item.address,
                    }}
                  />
                  <div className="flex flex-col">
                    {item.phone.map(
                      (item: { number: string }, index: number) => {
                        return (
                          <a
                            key={index}
                            href={`tel:${item.number}`}
                            dangerouslySetInnerHTML={{
                              __html: item.number,
                            }}
                          />
                        );
                      },
                    )}
                    <a
                      href={`mailto:${item.email}`}
                      dangerouslySetInnerHTML={{
                        __html: item.email,
                      }}
                    />
                  </div>
                </div>
              );
            },
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-8 sm:gap-12">
        <p
          dangerouslySetInnerHTML={{ __html: data.retail.title }}
          className="text-xl font-extrabold text-blue"
        />
        <div className="flex w-full flex-col gap-6">
          {data.retail.description.map(
            (
              item: {
                name: string;
                phone: { number: string }[];
                email: string;
                address: string;
              },
              index: number,
            ) => {
              return (
                <div
                  key={index}
                  className="responsiveText flex min-h-[270px] w-full flex-col gap-8 rounded-[32px] bg-blue px-6 py-6 text-white 2xl:rounded-[64px] 2xl:px-8 2xl:py-10"
                >
                  <p
                    dangerouslySetInnerHTML={{
                      __html: item.name,
                    }}
                    className="font-semibold"
                  />
                  <p
                    dangerouslySetInnerHTML={{
                      __html: item.address,
                    }}
                  />
                  <div className="flex flex-col">
                    {item.phone.map(
                      (item: { number: string }, index: number) => {
                        return (
                          <a
                            key={index}
                            href={`tel:${item.number}`}
                            dangerouslySetInnerHTML={{
                              __html: item.number,
                            }}
                          />
                        );
                      },
                    )}
                    <a
                      href={`mailto:${item.email}`}
                      dangerouslySetInnerHTML={{
                        __html: item.email,
                      }}
                    />
                  </div>
                </div>
              );
            },
          )}
          <div className="responsiveText flex min-h-[270px] w-full flex-col justify-center gap-8 rounded-[32px] bg-blue px-6 py-6 text-white 2xl:rounded-[64px] 2xl:px-8 2xl:py-10">
            <div className="flex items-center gap-6">
              <Image
                src="/images/contact/paper.png"
                alt="Paper"
                width={100}
                height={100}
                className="whiteFilter w-[60px] 2xl:w-[90px]"
              />
              <p
                dangerouslySetInnerHTML={{
                  __html: data.retail.pdfText,
                }}
              />
            </div>
            <a
              className="mx-auto flex items-center gap-2 hover:underline"
              href="/Podaci o identifikaciji Principal DOO.pdf"
              download
            >
              <Image
                src="/images/contact/download.png"
                alt="Download"
                width={100}
                height={100}
                className="whiteFilter h-5 w-5"
              />
              {data.retail.pdfButton}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
