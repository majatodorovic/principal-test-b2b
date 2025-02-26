import { Locale, getDictionary } from '../dictionaries/dictionaries';
import Brand from './components/Brand';
import Distribution from './components/Distribution';
import Hero from './components/Hero';
import Leader from './components/Leader';
import Processing from './components/Processing';
import SalesCapacities from './components/SalesCapacities';

export async function generateMetadata({ params }: any) {
  const { lang } = await params;
  const data = await getDictionary(lang, '/home/meta.json');

  return data;
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const lang = (await params).lang;
  const data = await getDictionary(lang, '/home/page.json');

  return (
    <>
      <main className="pageGap">
        <Hero data={data} lang={lang} />
        <Leader data={data} lang={lang} />
        <Brand data={data} lang={lang} />
        <SalesCapacities data={data} lang={lang} />
        <Processing data={data} lang={lang} />
        <Distribution data={data} lang={lang} />
      </main>
    </>
  );
}
