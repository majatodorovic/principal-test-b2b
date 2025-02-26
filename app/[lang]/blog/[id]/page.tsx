import { Locale, getDictionary } from '@/app/dictionaries/dictionaries';
import SingleBlog from './components/SingleBlog';

export async function generateMetadata({ params }: any) {
  const { lang } = await params;
  const data = await getDictionary(lang, '/blog/meta.json');

  return data;
}

export default async function BlogId({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const lang = (await params).lang;
  const data = await getDictionary(lang, '/blog/page.json');

  return (
    <>
      <main className="pageGap">
        <SingleBlog data={data} lang={lang} />
      </main>
    </>
  );
}
