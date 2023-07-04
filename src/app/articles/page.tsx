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
  const [fetching, setFetching] = useState<boolean>(false);

  useEffect(() => {
    async function getPostIds() {
      const fileNames = await fetch('api/posts');
      const data = await fileNames.json();
      return data as Post[];
    }
    setFetching(true);
    getPostIds()
      .then((data: Post[]) => {
        setPostIds(data);
        setFetching(false);
      })
      .catch((err) => {
        setFetching(false);
        console.error(err);
      });
  }, []);

  return (
    <div className="conatiner w-full h-full px-5">
      {fetching ? (
        <h1 className="text-center text-xl py-5">Fetching posts...</h1>
      ) : null}
      {!fetching && !postIds.length ? (
        <h1 className="text-center text-xl py-5">
          When I have interesting things to say, this is where they'll go.
        </h1>
      ) : null}
      {!fetching && postIds.length ? (
        <>
          <h1 className="text-center text-3xl py-5">
            Various things I've written down
          </h1>
          <ul className="text-center">
            {postIds.map((post: Post, idx: number) => (
              <li className="cursor-pointer" key={post.id}>
                <p className="text-lg">
                  <Link className="underline" href={`/article/${post.id}`}>{` ${
                    post.title
                  } - ${reformatDate(post.date)}`}</Link>
                </p>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
};
export default Page;
