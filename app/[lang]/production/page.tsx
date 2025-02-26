import HeroShort from '@/app/common/HeroShort';
import InfoSection from '@/app/common/SplitSection';
import { Locale, getDictionary } from '@/app/dictionaries/dictionaries';
import PrivateBrand from './components/PrivateBrand';
import Standards from './components/Standards';

export async function generateMetadata({ params }: any) {
  const { lang } = await params;
  const data = await getDictionary(lang, '/production/meta.json');

  return data;
}

export default async function Production({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const lang = (await params).lang;
  const data = await getDictionary(lang, '/production/page.json');

  return (
    <>
      <main className="pageGap">
        <HeroShort data={data} lang={lang} />
        <Standards data={data} lang={lang} />
        <PrivateBrand data={data} lang={lang} />
        <div className="paddingOutSection px-6" data-aos="fade-up">
          <h3 className="w-full rounded-full bg-blue p-2 text-center text-lg font-extrabold text-white lg:p-3 lg:text-3xl 2xl:p-5 2xl:text-4xl">
            {data.preparingTitle}
          </h3>
        </div>
        <InfoSection
          id="2"
          imagePosition="right"
          imageSrc={data.cleaning.imageSrc}
          title={data.cleaning.title}
          description={data.cleaning.description}
          seeVideoText={data.cleaning.seeVideo}
          videoSrc={data.cleaning.videoSrc}
        />
        <InfoSection
          id="3"
          imagePosition="left"
          imageSrc={data.filleting.imageSrc}
          title={data.filleting.title}
          description={data.filleting.description}
          seeVideoText={data.filleting.seeVideo}
          videoSrc={data.filleting.videoSrc}
        />
        <InfoSection
          id="4"
          imagePosition="right"
          imageSrc={data.smoking.imageSrc}
          title={data.smoking.title}
          description={data.smoking.description}
          seeVideoText={data.smoking.seeVideo}
          videoSrc={data.smoking.videoSrc}
        />
      </main>
    </>
  );
}
