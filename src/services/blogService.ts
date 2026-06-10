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

async function throwApiError(res: Response, fallback: string): Promise<never> {
  let msg = fallback;
  try {
    const body = await res.json();
    msg = body.detail ?? body.message ?? body.error ?? msg;
  } catch {
    try { msg = (await res.text()) || msg; } catch {}
  }
  throw new Error(`${res.status}: ${msg}`);
}

export async function createPost(data: BlogPost, token: string): Promise<BlogPost> {
  const res = await fetch(`${getApiUrl()}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  if (!res.ok) await throwApiError(res, 'Failed to create post');
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
  if (!res.ok) await throwApiError(res, 'Failed to update post');
  return res.json();
}

export async function deletePost(slug: string, token: string): Promise<void> {
  const res = await fetch(`${getApiUrl()}/posts/${slug}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) await throwApiError(res, 'Failed to delete post');
}

export async function uploadImage(file: File, token: string): Promise<string> {
  const form = new FormData();
  form.append('file', file);
  const res = await fetch(`${getApiUrl()}/images`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
  if (!res.ok) await throwApiError(res, 'Failed to upload image');
  const { url } = await res.json();
  return url as string;
}
