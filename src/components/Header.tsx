'use client';
import React from 'react';
import { JsonResume } from '@/types/JsonResume';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { getProfileIcon } from '@/utils/utils';

const NavLink = (props: {
  href: string;
  text: React.ReactElement | string;
  openOutside?: boolean;
}) => {
  const { href, text, openOutside = false } = props;
  return (
    <li className="flex">
      <Link
        rel="noopener noreferrer"
        href={href}
        target={openOutside ? '_blank' : '_self'}
        className="flex mx-auto my-1 sm:m-0 sm:items-center px-4 sm:-mb-1 sm:border-b-2 dark:border-transparent"
      >
        {text}
      </Link>
    </li>
  );
};

const Header = (props: { resumeData: JsonResume | null }): any => {
  const { resumeData } = props;
  return (
    <header className="p-4 dark:bg-gray-800 dark:text-gray-100">
      <div className="flex flex-col sm:flex-row sm:h-8">
        <ul className="flex flex-col flex-grow space-x-3 md:flex-row">
          <NavLink href="/articles" text="Articles" />
          <NavLink href="/resume" text="Resume / CV" />
        </ul>
        <Link
          rel="noopener noreferrer"
          href="/"
          aria-label="Back to homepage"
          className="items-center hidden -ml-24 sm:flex -mb-1 border-b-2 border-black dark:border-transparent"
        >
          <span>Eddie Dover</span>
        </Link>
        {resumeData ? (
          <ul className="items-stretch space-x-3 flex-grow justify-end flex flex-col sm:flex-row">
            {resumeData?.basics?.profiles?.map((profile) => {
              return (
                <NavLink
                  key={profile.network}
                  href={profile.url as string}
                  openOutside={true}
                  text={getProfileIcon(profile.network as string)}
                />
              );
            })}
          </ul>
        ) : null}
        {/* <button title="Button" type="button" className="p-4 md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 dark:text-gray-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button> */}
      </div>
    </header>
  );
};
export default Header;
