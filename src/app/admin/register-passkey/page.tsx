'use client';

import { useState } from 'react';
import { startRegistration } from '@simplewebauthn/browser';
import { registerBegin, registerComplete } from '@/services/authService';
import Container from '@/components/layout/Container';

export default function RegisterPasskeyPage() {
  const [bootstrapToken, setBootstrapToken] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const options = await registerBegin(bootstrapToken);
      const credential = await startRegistration({ optionsJSON: options as never });
      await registerComplete(credential);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Container className="py-16 max-w-sm">
        <h1 className="font-header font-black text-h2 mb-4">Passkey registered</h1>
        <p className="font-body text-body text-dark/70">
          Your passkey has been registered. You can now{' '}
          <a href="/admin/login" className="text-accent font-black hover:underline">
            sign in
          </a>
          .
        </p>
      </Container>
    );
  }

  return (
    <Container className="py-16 max-w-sm">
      <h1 className="font-header font-black text-h2 mb-2">Register passkey</h1>
      <p className="font-body text-caption text-dark/60 mb-8">
        One-time setup. Paste the bootstrap token from your server.
      </p>
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input
          type="password"
          value={bootstrapToken}
          onChange={e => setBootstrapToken(e.target.value)}
          placeholder="Bootstrap token"
          required
          className="px-4 py-3 rounded-xl border border-dark/20 font-body bg-white/70 backdrop-blur-sm focus:outline-none focus:border-accent transition-colors"
        />
        {error && <p className="text-red-500 font-body text-caption">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-accent text-dark font-header font-black rounded-full hover:scale-105 active:scale-95 transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? 'Waiting for passkey…' : 'Register passkey'}
        </button>
      </form>
    </Container>
  );
}
