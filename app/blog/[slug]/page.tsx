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

        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-5 flex items-center gap-2 before:block before:w-4 before:h-px before:bg-muted-foreground">
          {data.tags?.join(" · ")}
        </p>

        <h1 className="font-serif text-4xl font-normal leading-tight text-foreground mb-3">
          {data.title}
        </h1>

        <div className="font-mono text-xs text-muted-foreground flex gap-4 mb-6">
          <time>{data.date}</time>
          <span>{data.readingTime} min read</span>
        </div>

        <hr className="border-border mb-8" />

        <div
          className="
                prose prose-invert max-w-none
                prose-headings:font-serif
                prose-headings:font-normal
                prose-headings:text-foreground
                prose-headings:mb-3
                prose-headings:mt-8
                prose-p:text-prose-muted/90
                prose-p:leading-7
                prose-p:my-3
                prose-li:my-1
                prose-ul:my-3
                prose-ol:my-3
                prose-code:font-mono
                prose-code:text-sm
                prose-code:text-code-text
                prose-code:bg-code-bg
                prose-code:border prose-code:border-border
                prose-code:px-1.5
                prose-code:py-0.5
                prose-code:rounded-none
                prose-code:before:hidden
                prose-code:after:hidden
                prose-pre:bg-code-bg
                prose-pre:border
                prose-pre:border-border
                prose-pre:py-3
                prose-pre:px-4
                prose-pre:rounded-none
                prose-a:text-link
                prose-a:underline
                prose-a:underline-offset-4
                hover:prose-a:text-link-hover
                prose-blockquote:border-blockquote-border
                prose-blockquote:text-blockquote-text
                prose-blockquote:my-4"
        >
          <MDXRemote source={content} />
        </div>

        {data.tags && (
          <div className="flex gap-2 mt-12 pt-6 border-t border-border">
            {data.tags.map((tag: string) => (
              <span key={tag} className="font-mono text-[11px] px-2.5 py-1 rounded-none border border-border-muted text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        )}

      </article>
    </main>
  );
}