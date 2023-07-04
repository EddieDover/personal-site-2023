import Header from '@/components/Header';
import './globals.css';
import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Eddie Dover',
  description: 'The Personal website of Eddie Dover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="w-full h-full" data-theme="light">
      <body
        className={`w-full h-full bg-base flex flex-col ${inter.className}`}
      >
        <Header />
        <div className="flex flex-grow flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
