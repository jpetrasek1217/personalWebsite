import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
  slug: string;
  title: string;
  excerpt?: string;
  thumbnail?: string;
  niches?: string[];
}

export default function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <article className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white/60 backdrop-blur-sm">
      {post.thumbnail && (
        <div className="relative w-full h-44">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </div>
      )}
      <div className="p-5">
        {post.niches && post.niches.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {post.niches.map(n => (
              <span
                key={n}
                className="px-2 py-0.5 text-caption rounded-full bg-accent/20 text-accent font-header font-black"
              >
                {n}
              </span>
            ))}
          </div>
        )}
        <h2 className="font-header font-black text-h3 mb-1">{post.title}</h2>
        {post.excerpt && (
          <p className="font-body text-caption text-dark/70 mb-3">{post.excerpt}</p>
        )}
        <Link
          href={`/blog/${post.slug}`}
          className="text-accent font-header font-black text-caption hover:underline"
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}
