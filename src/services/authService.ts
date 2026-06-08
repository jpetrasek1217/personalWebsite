const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL ?? '';

export async function loginBegin(): Promise<object> {
  const res = await fetch(`${getApiUrl()}/auth/login/begin`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to begin authentication');
  return res.json();
}

export async function loginComplete(assertion: object): Promise<string> {
  const res = await fetch(`${getApiUrl()}/auth/login/complete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(assertion),
  });
  if (!res.ok) throw new Error('Authentication failed');
  const { access_token } = await res.json();
  return access_token;
}

export async function registerBegin(bootstrapToken: string): Promise<object> {
  const res = await fetch(`${getApiUrl()}/auth/register/begin`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${bootstrapToken}` },
  });
  if (!res.ok) throw new Error('Failed to begin registration');
  return res.json();
}

export async function registerComplete(credential: object): Promise<void> {
  const res = await fetch(`${getApiUrl()}/auth/register/complete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credential),
  });
  if (!res.ok) throw new Error('Registration failed');
}
