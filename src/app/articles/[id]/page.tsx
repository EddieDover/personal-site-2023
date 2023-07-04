import { reformatDate } from '@/utils/utils';
import fs from 'fs';
import matter from 'gray-matter';
import { env } from 'process';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

async function getAllPostIds() {
  const fileNames = fs.readdirSync('public/posts/');
  const data = fileNames.map((fileName) => {
    return {
      title: fileName.replace(/\.md$/, ''),
    };
  });
  return data;
}

async function getPost(id: string) {
  let URL =
    env.NODE_ENV === 'production'
      ? 'https://www.eddiedover.dev'
      : 'http://localhost:3000' + `/posts/${id}.md`;
  const res = await fetch(`${URL}`);
  const textData = await res.text();
  const post = await matter(textData);
  const content = post.content;
  return { ...post.data, id, content };
}

export default async function Page({ params }: { params: { id: string } }) {
  const matterpost: {
    title?: string;
    date?: string;
    id: string;
    content: string;
  } = await getPost(params.id);
  return (
    <div className="conatiner w-full h-full px-5">
      <p className="text-center text-3xl py-5">{matterpost.title}</p>
      <p className="text-center text-lg">
        {reformatDate(matterpost.date as string)}
      </p>
      <article className="prose prose-slate">
        <ReactMarkdown>{matterpost.content}</ReactMarkdown>
      </article>
    </div>
  );
}

export const dynamicParams = true;
export async function generateStaticParams() {
  const paths = await getAllPostIds();
  return paths;
}
