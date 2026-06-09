import type { Metadata } from 'next';
import { Lato, Roboto } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnimatedBackground from '@/components/layout/AnimatedBackground';

const lato = Lato({
  weight: '900',
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap',
});

const roboto = Roboto({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Joseph Petrasek',
  description:
    'Personal portfolio of Joseph Petrasek, Mechatronics Engineer, ML Engineer, and Product Developer.',
  openGraph: {
    title: "Joseph Petrasek's Portfolio",
    description: 'Personal portfolio of Joseph Petrasek.',
    url: 'https://josephpetrasek.com',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' className={`${lato.variable} ${roboto.variable}`}>
      <body className='relative min-h-screen flex flex-col'>
        <AnimatedBackground />
        <div className='relative z-10 flex flex-col flex-1 min-h-screen'>
          <Header />
          <main className='flex-grow'>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
