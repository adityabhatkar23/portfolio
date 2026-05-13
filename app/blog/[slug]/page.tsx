import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "content/blog");
  return fs.readdirSync(dir).map((file) => ({
    slug: file.replace(".mdx", ""),
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const file = path.join(process.cwd(), "content/blog", `${slug}.mdx`);
  const { data } = matter(fs.readFileSync(file, "utf8"));
  return { title: data.title, description: data.description };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const file = path.join(process.cwd(), "content/blog", `${slug}.mdx`);

  if (!fs.existsSync(file)) notFound();

  const { content, data } = matter(fs.readFileSync(file, "utf8"));


  return (
    <main className="min-h-screen py-16">
      <article className="mx-auto max-w-xl">

        <p className="font-mono text-[11px] uppercase tracking-widest text-neutral-500 mb-5 flex items-center gap-2 before:block before:w-4 before:h-px before:bg-neutral-500">
          {data.tags?.join(" · ")}
        </p>

        <h1 className="font-serif text-4xl font-normal leading-tight text-white mb-3">
          {data.title}
        </h1>

        <div className="font-mono text-xs text-neutral-500 flex gap-4 mb-6">
          <time>{data.date}</time>
          <span>{data.readingTime} min read</span>
        </div>

        <hr className="border-neutral-800 mb-8" />

        <div
          className="
                prose prose-invert prose-neutral max-w-none
                prose-headings:font-serif
                prose-headings:font-normal
                prose-headings:text-white
                prose-headings:mb-3
                prose-headings:mt-8
                prose-p:text-neutral-400
                prose-p:leading-7
                prose-p:my-3
                prose-li:my-1
                prose-ul:my-3
                prose-ol:my-3
                prose-code:font-mono
                prose-code:text-sm
                prose-code:text-neutral-200
                prose-code:bg-neutral-900
                prose-code:px-1.5
                prose-code:py-0.5
                prose-code:rounded
                prose-code:before:hidden
                prose-code:after:hidden
                prose-pre:bg-neutral-900
                prose-pre:border
                prose-pre:border-neutral-800
                prose-pre:py-3
                prose-pre:px-4
                prose-a:text-white
                prose-a:underline
                prose-a:underline-offset-4
                hover:prose-a:text-neutral-300
                prose-blockquote:border-neutral-700
                prose-blockquote:text-neutral-400
                prose-blockquote:my-4"
        >
          <MDXRemote source={content} />
        </div>

        {data.tags && (
          <div className="flex gap-2 mt-12 pt-6 border-t border-neutral-800">
            {data.tags.map((tag: string) => (
              <span key={tag} className="font-mono text-[11px] px-2.5 py-1 rounded-full border border-neutral-700 text-neutral-500">
                {tag}
              </span>
            ))}
          </div>
        )}

      </article>
    </main>
  );
}