'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import { createPost } from '@/services/blogService';
import { getToken, isAuthenticated } from '@/utils/auth';

export default function NewPostPage() {
  const router = useRouter();
  const [slug, setSlug] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [niches, setNiches] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) router.replace('/admin/login');
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await createPost(
        {
          slug,
          title,
          content: content || undefined,
          excerpt: excerpt || undefined,
          thumbnail: thumbnail || undefined,
          niches: niches ? niches.split(',').map(s => s.trim()).filter(Boolean) : undefined,
        },
        getToken()!
      );
      router.push('/admin/posts');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'px-4 py-3 rounded-xl border border-dark/20 font-body bg-white/70 backdrop-blur-sm focus:outline-none focus:border-accent transition-colors';

  return (
    <Container className="py-16 max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/posts" className="text-accent font-header font-black text-caption hover:underline">
          ← Posts
        </Link>
        <h1 className="font-header font-black text-h2">New Post</h1>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" value={slug} onChange={e => setSlug(e.target.value)}
          placeholder="Slug (e.g. my-post-title — lowercase, hyphens only)" required
          pattern="[a-z0-9-]+" title="Lowercase letters, numbers, and hyphens only"
          className={inputClass} />
        <input type="text" value={title} onChange={e => setTitle(e.target.value)}
          placeholder="Title" required className={inputClass} />
        <input type="text" value={excerpt} onChange={e => setExcerpt(e.target.value)}
          placeholder="Excerpt (optional)" className={inputClass} />
        <input type="text" value={thumbnail} onChange={e => setThumbnail(e.target.value)}
          placeholder="Thumbnail URL (optional)" className={inputClass} />
        <input type="text" value={niches} onChange={e => setNiches(e.target.value)}
          placeholder="Niches — comma-separated (optional)" className={inputClass} />
        <textarea value={content} onChange={e => setContent(e.target.value)}
          placeholder="Content (Markdown)" rows={16}
          className={`${inputClass} resize-y`} />
        {error && <p className="text-red-500 font-body text-caption">{error}</p>}
        <button type="submit" disabled={loading}
          className="px-6 py-3 bg-accent text-dark font-header font-black rounded-full hover:scale-105 active:scale-95 transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? 'Publishing…' : 'Publish'}
        </button>
      </form>
    </Container>
  );
}
