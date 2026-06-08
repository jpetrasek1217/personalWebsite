export interface BlogPost {
  slug: string;
  title: string;
  content?: string;
  excerpt?: string;
  thumbnail?: string;
  niches?: string[];
}

const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL ?? '';

export async function fetchPosts(): Promise<BlogPost[]> {
  const apiUrl = getApiUrl();
  if (!apiUrl) return [];
  try {
    const res = await fetch(`${apiUrl}/posts`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function fetchPost(slug: string): Promise<BlogPost | null> {
  const apiUrl = getApiUrl();
  if (!apiUrl) return null;
  try {
    const res = await fetch(`${apiUrl}/posts/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function createPost(
  data: Omit<BlogPost, 'slug'>,
  token: string
): Promise<BlogPost> {
  const res = await fetch(`${getApiUrl()}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create post');
  return res.json();
}

export async function updatePost(
  slug: string,
  data: Partial<Omit<BlogPost, 'slug'>>,
  token: string
): Promise<BlogPost> {
  const res = await fetch(`${getApiUrl()}/posts/${slug}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update post');
  return res.json();
}

export async function deletePost(slug: string, token: string): Promise<void> {
  const res = await fetch(`${getApiUrl()}/posts/${slug}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to delete post');
}
