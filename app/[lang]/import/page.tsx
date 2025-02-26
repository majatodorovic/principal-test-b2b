import HeroShort from '@/app/common/HeroShort';
import { Locale, getDictionary } from '@/app/dictionaries/dictionaries';
import Quality from './components/Quality';
import Results from './components/Results';
import Sustainability from './components/Sustainability';
import World from './components/World';

export async function generateMetadata({ params }: any) {
  const { lang } = await params;
  const data = await getDictionary(lang, '/import/meta.json');

  return data;
}

export default async function Import({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const lang = (await params).lang;
  const data = await getDictionary(lang, '/import/page.json');

  return (
    <>
      <main className="pageGap">
        <HeroShort data={data} lang={lang} />
        <Results data={data} lang={lang} />
        <World data={data} lang={lang} />
        <Quality data={data} lang={lang} />
        <Sustainability data={data} lang={lang} />
      </main>
    </>
  );
}
