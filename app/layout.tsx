import type { Metadata } from 'next';
import { Bebas_Neue } from 'next/font/google';
import clsx from 'clsx';
import './globals.css';

const bebasNeue = Bebas_Neue({
  weight: ['400'],
  variable: '--font-bebas-neue',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'LiteFlix',
  description: 'The best movies and TV shows',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={clsx(bebasNeue.variable)}>
      <body className="antialiased font-normal">{children}</body>
    </html>
  );
}
