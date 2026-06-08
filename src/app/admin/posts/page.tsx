'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import { fetchPosts, BlogPost } from '@/services/blogService';
import { isAuthenticated } from '@/utils/auth';

export default function AdminPostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/admin/login');
      return;
    }
    fetchPosts().then(p => {
      setPosts(p);
      setLoading(false);
    });
  }, [router]);

  return (
    <Container className="py-16 max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-header font-black text-h2">Posts</h1>
        <Link
          href="/admin/posts/new"
          className="px-5 py-2 bg-accent text-dark font-header font-black rounded-full hover:scale-105 active:scale-95 transition-transform duration-200">
          + New Post
        </Link>
      </div>

      {loading ? (
        <p className="font-body text-dark/50">Loading…</p>
      ) : posts.length === 0 ? (
        <p className="font-body text-dark/50">No posts yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {posts.map(post => (
            <div
              key={post.slug}
              className="flex items-center justify-between p-4 rounded-xl border border-dark/10 bg-white/60 backdrop-blur-sm">
              <div>
                <p className="font-header font-black text-body">{post.title}</p>
                <p className="font-body text-caption text-dark/50">{post.slug}</p>
              </div>
              <Link
                href={`/admin/posts/${post.slug}/edit`}
                className="px-4 py-1.5 rounded-full border border-dark/20 font-header font-black text-caption hover:bg-dark/5 transition-colors">
                Edit
              </Link>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}
