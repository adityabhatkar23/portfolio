import Link from "next/link";
import { getPosts } from "../../lib/posts";

export default function BlogPage() {
  const posts = getPosts();

  return (
    <main className="min-h-screen ">
      <div className="mx-auto max-w-2xl">

        <p className="font-mono text-[11px] uppercase tracking-widest text-neutral-500 mb-5 flex items-center gap-2 before:block before:w-4 before:h-px before:bg-neutral-500">
          writing
        </p>

        <h1 className="text-2xl font-normal text-white mb-8">
          my blog
        </h1>

        <hr className="border-neutral-800 mb-8" />

        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug}>
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-xl font-normal text-white hover:text-neutral-300 transition-colors">
                  {post.title}
                </h2>
              </Link>
              <div className="font-mono text-xs text-neutral-500 flex gap-4 mt-1.5 mb-3">
                <time>{post.date}</time>
                {post.tags && <span>{post.tags.join(" · ")}</span>}
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {post.description}
              </p>
            </article>
          ))}
        </div>

      </div>
    </main>
  );
}