import HeroShort from '@/app/common/HeroShort';
import { Locale, getDictionary } from '@/app/dictionaries/dictionaries';
import Description from './components/Description';

export async function generateMetadata({ params }: any) {
  const { lang } = await params;
  const data = await getDictionary(lang, '/about-us/meta.json');

  return data;
}

export default async function AboutUs({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const lang = (await params).lang;
  const data = await getDictionary(lang, '/about-us/page.json');

  return (
    <>
      <main className="pageGap">
        <HeroShort data={data} lang={lang} />
        <Description data={data} lang={lang} />
      </main>
    </>
  );
}
