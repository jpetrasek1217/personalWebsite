'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { startAuthentication } from '@simplewebauthn/browser';
import { setToken } from '@/utils/auth';
import { loginBegin, loginComplete } from '@/services/authService';
import Container from '@/components/layout/Container';

export default function AdminLoginPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const options = await loginBegin();
      const assertion = await startAuthentication({ optionsJSON: options as never });
      const access_token = await loginComplete(assertion);
      setToken(access_token);
      router.push('/admin/posts');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-16 max-w-sm">
      <h1 className="font-header font-black text-h2 mb-8">Admin Login</h1>
      <div className="flex flex-col gap-4">
        <button
          onClick={handleLogin}
          disabled={loading}
          className="px-6 py-3 bg-accent text-dark font-header font-black rounded-full hover:scale-105 active:scale-95 transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? 'Waiting for passkey…' : 'Sign in with passkey'}
        </button>
        {error && <p className="text-red-500 font-body text-caption">{error}</p>}
      </div>
    </Container>
  );
}
