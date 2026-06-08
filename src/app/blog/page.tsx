import Container from '@/components/layout/Container';
import BlogPostCard from '@/components/blog/BlogPostCard';
import { fetchPosts } from '@/services/blogService';

export default async function BlogPage() {
  const posts = await fetchPosts();

  return (
    <Container className="py-12 max-w-2xl">
      <h1 className="font-header font-black text-h1 mb-2">Blog</h1>
      <p className="font-body text-caption text-dark/60 mb-10">
        Stuff I want to remember and not have to fetch from a million different pages
      </p>

      {posts.length === 0 ? (
        <p className="font-body text-body text-dark/50">No posts yet — check back soon.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {posts.map(post => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </Container>
  );
}
