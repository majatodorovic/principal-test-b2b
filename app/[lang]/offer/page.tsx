import HeroShort from '@/app/common/HeroShort';
import { Locale, getDictionary } from '@/app/dictionaries/dictionaries';
import Lists from './components/Lists';

export async function generateMetadata({ params }: any) {
  const { lang } = await params;
  const data = await getDictionary(lang, '/offer/meta.json');

  return data;
}

export default async function Offer({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const lang = (await params).lang;
  const data = await getDictionary(lang, '/offer/page.json');

  return (
    <>
      <main className="pageGap">
        <HeroShort data={data} lang={lang} />
        <Lists data={data} lang={lang} />
      </main>
    </>
  );
}
