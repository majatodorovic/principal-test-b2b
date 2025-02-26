import HeroShort from '@/app/common/HeroShort';
import InfoSection from '@/app/common/SplitSection';
import { Locale, getDictionary } from '@/app/dictionaries/dictionaries';
import Newspeaper from './components/Newspaper';

export async function generateMetadata({ params }: any) {
  const { lang } = await params;
  const data = await getDictionary(lang, '/fishmarkets/meta.json');

  return data;
}

export default async function Production({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const lang = (await params).lang;
  const data = await getDictionary(lang, '/fishmarkets/page.json');

  return (
    <>
      <main className="pageGap">
        <HeroShort data={data} lang={lang} />
        <Newspeaper data={data} lang={lang} />
        <InfoSection
          imagePosition="right"
          imageSrc={data.food.imageSrc}
          title={data.food.title}
          description={data.food.description}
        />
        <InfoSection
          imagePosition="left"
          imageSrc={data.specialties.imageSrc}
          title={data.specialties.title}
          description={data.specialties.description}
        />
        <InfoSection
          imagePosition="right"
          imageSrc={data.potato.imageSrc}
          title={data.potato.title}
          description={data.potato.description}
        />
      </main>
    </>
  );
}
