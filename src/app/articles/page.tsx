'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { reformatDate } from '@/utils/utils';

interface Post {
  title: string;
  date: string;
  id: string;
}

const Page = () => {
  const [postIds, setPostIds] = useState<Post[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);

  useEffect(() => {
    async function getPostIds() {
      const fileNames = await fetch('api/posts');
      const data = (await fileNames.json()) as Post[];
      return data;
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
          When I have interesting things to say, this is where they&apos;ll go.
        </h1>
      ) : null}
      {!fetching && postIds.length ? (
        <>
          <h1 className="text-center text-3xl py-5">
            Various things I&apos;ve written down
          </h1>
          <ul className="text-center">
            {postIds.map((post: Post) => (
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
