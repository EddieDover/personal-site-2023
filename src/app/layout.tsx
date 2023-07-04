'use client';
import Header from '@/components/Header';
import './globals.css';
import { Inter } from 'next/font/google';
import Providers from '@/utils/provider';
import Footer from '@/components/Footer';
import { JsonResume } from '@/types/JsonResume';
import { useState, useEffect } from 'react';

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
  const [resumeData, setResumeData] = useState<JsonResume | null>(null);
  useEffect(() => {
    async function getResumeData() {
      const response = await fetch('/resume.json');
      const data = (await response.json()) as JsonResume;
      return data;
    }
    getResumeData().then((data) => {
      setResumeData(data);
    });
  }, []);

  return (
    <html lang="en" className="w-full h-full" data-theme="light">
      <body
        className={`w-full h-full bg-base flex flex-col ${inter.className}`}
      >
        <Header resumeData={resumeData} />
        {children}
        <Footer resumeData={resumeData} />
      </body>
    </html>
  );
}
