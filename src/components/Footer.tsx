'use client';
import { useResume } from '@/utils/resume';
import { getProfileIcon } from '@/utils/utils';
import Link from 'next/link';

const FooterLink = (props: {
  href: string;
  title: string;
  icon: React.ReactElement | string;
}) => {
  const { href, title, icon } = props;
  return (
    <a
      rel="noopener noreferrer"
      href={href}
      target="_blank"
      title={title}
      className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 dark:bg-violet-400 dark:text-gray-900"
    >
      {icon}
    </a>
  );
};

export const Footer = () => {
  const resumeData = useResume();
  return (
    <footer className="bg-gray-800 text-gray-50">
      <div className="container flex flex-col p-4 mx-auto md:p-8 lg:flex-row divide-gray-400">
        <ul className="self-center py-6 space-y-4 text-center flex flex-col sm:flex-row sm:space-y-0 sm:justify-around sm:space-x-4 lg:flex-1 lg:justify-start">
          <Link href="/articles">Articles</Link>
          <Link href="/resume">Resume / CV</Link>
        </ul>
        <div className="flex flex-col sm:flex-row self-center sm:pt-6 lg:pt-0">
          <div className="flex justify-center space-x-4"></div>
          {resumeData?.basics?.profiles?.map((profile, idx: number) => {
            return (
              <FooterLink
                key={idx}
                href={profile.url as string}
                title={profile.network as string}
                icon={getProfileIcon(profile.network as string)}
              />
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
