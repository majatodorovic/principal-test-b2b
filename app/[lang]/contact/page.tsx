import HeroShort from '@/app/common/HeroShort';
import { Locale, getDictionary } from '@/app/dictionaries/dictionaries';
import Support from './components/Support';

export async function generateMetadata({ params }: any) {
  const { lang } = await params;
  const data = await getDictionary(lang, '/contact/meta.json');

  return data;
}

export default async function Contact({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const lang = (await params).lang;
  const data = await getDictionary(lang, '/contact/page.json');

  return (
    <>
      <main className="pageGap">
        <HeroShort data={data} lang={lang} />
        <Support data={data} lang={lang} />
      </main>
    </>
  );
}
