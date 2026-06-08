import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/layout/Container';
import { fetchPost } from '@/services/blogService';

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) notFound();

  return (
    <Container className='py-12 max-w-2xl'>
      <Link
        href='/blog'
        className='text-accent font-header font-black text-caption hover:underline mb-6 inline-block'>
        ← Blog
      </Link>

      {post.thumbnail && (
        <div className='relative w-full h-56 rounded-xl overflow-hidden mb-6'>
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className='object-cover'
            sizes='672px'
          />
        </div>
      )}

      <h1 className='font-header font-black text-h1 mb-4'>{post.title}</h1>

      {post.niches && post.niches.length > 0 && (
        <div className='flex flex-wrap gap-2 mb-8'>
          {post.niches.map((n) => (
            <span
              key={n}
              className='px-3 py-1 rounded-full bg-accent/20 text-accent font-header font-black text-caption'>
              {n}
            </span>
          ))}
        </div>
      )}

      <div className='prose prose-sm max-w-none font-body'>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </Container>
  );
}
