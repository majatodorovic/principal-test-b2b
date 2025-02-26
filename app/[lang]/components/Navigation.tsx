'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navigation({ data, lang }: any) {
  const pathname = usePathname();
  const [languageMenu, setLanguageMenu] = useState(false);
  const [burgerMenu, setBurgerMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (burgerMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [burgerMenu]);

  const goToNewDynamicRoute = (lang: string) => {
    const newPath = pathname.replace(/^\/[^/]+/, `/${lang}`);
    router.push(newPath);
  };

  return (
    <>
      <nav className="fixed left-1/2 top-0 z-50 flex w-full -translate-x-1/2 transform items-center justify-between bg-white px-6 py-4 shadow-lg xl:w-[calc(100%-320px)] xl:max-w-[1620px] xl:rounded-b-[24px] xl:py-6">
        <Link href={`/${lang}`}>
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={150}
            height={50}
            className="h-auto w-[150px] 2xl:w-[260px]"
          />
        </Link>
        <div className="hidden items-center gap-2 xl:flex 2xl:gap-4">
          {data?.links?.map(
            (link: { text: string; href: string }, index: number) => {
              return (
                <Link
                  href={`/${lang}${link.href}`}
                  key={index}
                  className={clsx(
                    'rounded-md px-2 text-sm font-semibold text-blue transition duration-300 hover:bg-blue hover:!text-white xl:text-base',
                    {
                      'bg-blue !text-white':
                        pathname === `/${lang}${link.href}`,
                    },
                  )}
                >
                  {link.text === 'Barka' ? (
                    <Image
                      src="/images/navigation/barka.png"
                      alt="Logo"
                      width={20}
                      height={20}
                      className="my-[2px] h-[20px] w-[80px] 2xl:h-[26px] 2xl:w-[120px]"
                    />
                  ) : (
                    link.text
                  )}
                </Link>
              );
            },
          )}
        </div>
         <Link
          href="https://b2b.principal.croonus.com/prijava" 
          className="hidden items-center space-x-2 sm:flex"
         >
          <Image
            src="/images/navigation/b2b.png"
            alt="B2B"
            width={24}
            height={24}
            className="blueFilter h-5 w-5 2xl:h-7 2xl:w-7"
          />
          <span className="text-sm font-semibold text-blue xl:text-base">
            B2B
          </span>
        </Link>
        <div className="relative hidden items-center gap-2 xl:flex">
          <Image
            src="/images/navigation/worldwide.png"
            alt="Worldwide"
            width={24}
            height={24}
            className="blueFilter h-4 w-4 2xl:h-6 2xl:w-6"
          />
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={() => setLanguageMenu(!languageMenu)}
          >
            <div className="text-sm font-semibold text-blue xl:text-base">
              {data.languages.button}
            </div>
            <Image
              src="/images/arrow.png"
              alt="Arrow"
              width={24}
              height={24}
              className="blueFilter h-6 w-6 cursor-pointer"
            />
          </div>
          {languageMenu && (
            <div className="absolute -bottom-[94px] -right-6 flex w-[140px] flex-col gap-2 rounded-b-xl bg-white px-4 py-4 shadow-xl">
              {data.languages.list.map((language: { name: string }) => (
                <button
                  key={language.name}
                  className={clsx('rounded-md text-center text-blue', {
                    'bg-blue !text-white': lang === language.name,
                  })}
                  onClick={() => goToNewDynamicRoute(language.name)}
                >
                  {language.name.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="xl:hidden">
          <Image
            src="/images/navigation/burger.png"
            alt="Burger Menu"
            width={260}
            height={50}
            className="blueFilter w-6 cursor-pointer"
            onClick={() => setBurgerMenu(!burgerMenu)}
          />
        </div>
      </nav>
      {burgerMenu && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setBurgerMenu(false)}
        />
      )}
      <div
        className={clsx(
          'fixed right-0 top-0 z-50 h-full w-[250px] transform overflow-y-auto bg-white p-6 shadow-lg transition-transform',
          {
            'translate-x-full': !burgerMenu,
            'translate-x-0': burgerMenu,
          },
        )}
      >
        <div className="flex items-center justify-end">
          <button onClick={() => setBurgerMenu(false)}>
            <Image
              src="/images/navigation/close.png"
              alt="Close Menu"
              width={20}
              height={20}
              className="blueFilter h-5 w-7"
            />
          </button>
        </div>
        <div className="mt-6 flex flex-col gap-4">
          {data?.links?.map(
            (link: { text: string; href: string }, index: number) => (
              <Link
                href={`/${lang}${link.href}`}
                key={index}
                className={clsx(
                  'rounded-md p-2 text-sm font-semibold text-blue',
                  {
                    'bg-blue !text-white': pathname === `/${lang}${link.href}`,
                  },
                )}
                onClick={() => setBurgerMenu(false)}
              >
                {link.text === 'Barka' ? (
                  <Image
                    src="/images/navigation/barka.png"
                    alt="Logo"
                    width={20}
                    height={20}
                    className="my-[2px] h-[20px] w-[80px] 2xl:h-[26px] 2xl:w-[120px]"
                  />
                ) : (
                  link.text
                )}
              </Link>
            ),
          )}
        </div>

        <div className="mt-6 border-t pt-6">
          <Link 
            href="https://b2b.principal.croonus.com/prijava" 
            className="xl:hidden"
          >
            <div className="mt-4 flex items-center gap-2">
              <Image
                src="/images/navigation/b2b.png"
                alt="B2B"
                width={24}
                height={24}
                className="blueFilter h-4 w-4"
              />
              <span className="text-sm font-semibold text-blue">B2B</span>
            </div>
          </Link>
          <br />
          <div className="flex items-center gap-2">
            <Image
              src="/images/navigation/worldwide.png"
              alt="Worldwide"
              width={24}
              height={24}
              className="blueFilter h-4 w-4"
            />
            <div className="text-sm font-semibold text-blue">
              {data.languages.button}
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            {data.languages.list.map((language: { name: string }) => (
              <button
                key={language.name}
                className={clsx(
                  'rounded-md p-2 text-sm font-semibold text-blue',
                  { 'bg-blue !text-white': lang === language.name },
                )}
                onClick={() => goToNewDynamicRoute(language.name)}
              >
                {language.name.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
