import HeroShort from '@/app/common/HeroShort';
import { Locale, getDictionary } from '@/app/dictionaries/dictionaries';
import About from './components/About';
import Products from './components/Products';

export async function generateMetadata({ params }: any) {
  const { lang } = await params;
  const data = await getDictionary(lang, '/barka/meta.json');

  return data;
}

export default async function Barka({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const lang = (await params).lang;
  const data = await getDictionary(lang, '/barka/page.json');

  return (
    <>
      <main className="pageGap">
        <HeroShort data={data} lang={lang} />
        <About data={data} />
        <Products data={data} />
      </main>
    </>
  );
}
