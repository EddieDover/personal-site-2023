'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { reformatDate } from '@/utils/utils';

interface Post {
  title: string;
  date: string;
  id: string;
}

const Page = (props: { params: { title: string } }) => {
  const [postIds, setPostIds] = useState<Post[]>([]);

  useEffect(() => {
    async function getPostIds() {
      const fileNames = await fetch('api/posts');
      const data = await fileNames.json();
      return data as Post[];
    }
    getPostIds().then((data: Post[]) => {
      setPostIds(data);
    });
  }, []);

  return (
    <div className="conatiner w-full h-full px-5">
      <h1 className="text-center text-3xl py-5">
        Various things I've written down
      </h1>
      {postIds ? (
        <ul className="text-center">
          {postIds.map((post: Post, idx: number) => (
            <li className="cursor-pointer" key={post.id}>
              <p className="text-lg">
                <Link className="underline" href={`/blog/${post.id}`}>{` ${
                  post.title
                } - ${reformatDate(post.date)}`}</Link>
              </p>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
export default Page;
