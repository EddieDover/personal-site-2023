import { readFileSync, readdirSync } from "fs"
import { NextResponse } from "next/server";
import { join } from "path"
import matter from "gray-matter"

export function GET() {
    const posts = getPosts()
    return NextResponse.json(posts);
}

function getPosts() {
    // Get all markdown files inside the posts directory
    const postsDirectory = join(process.cwd(), 'public/posts')
    const filenames = readdirSync(postsDirectory)
    const posts = filenames.map((filename) => {
        const filePath = join(postsDirectory, filename)
        const fileContents = readFileSync(filePath, 'utf8');
        const matterdata = matter(fileContents)
        return {
            id: filename.replace('.md', ''),
            title: matterdata.data.title as string,
            date: matterdata.data.date as string,
        }
    });
    return posts
}
