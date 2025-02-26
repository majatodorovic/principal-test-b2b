import 'aos/dist/aos.css';
import { Toaster } from 'react-hot-toast';
import { Locale, getDictionary } from '../dictionaries/dictionaries';
import '../globals.css';
import AOSContainer from '../utils/AOSContainer';
import Footer from './components/Footer';
import Navigation from './components/Navigation';

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const lang = (await params).lang;
  const data = {
    navigation: await getDictionary(lang, '/components/navigation.json'),
    footer: await getDictionary(lang, '/components/footer.json'),
  };

  return (
    <html lang={lang}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/images/favicon.ico" sizes="any" />
      </head>
      <body>
        <AOSContainer>
          <Toaster />
          <Navigation data={data.navigation} lang={lang} />
          {children}
          <Footer data={data.footer} lang={lang} />
        </AOSContainer>
      </body>
    </html>
  );
}
