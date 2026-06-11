'use client';

import { useEffect, useState } from 'react';
import { FaEnvelope, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const SOCIALS = [
  {
    label: 'Email',
    href: 'mailto:josephpetrasek1017@gmail.com',
    icon: FaEnvelope,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/josephpetrasek',
    icon: FaLinkedinIn,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/jpetrasek1217',
    icon: FaGithub,
  },
];

export default function Footer() {
  const [glowing, setGlowing] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const handler = () => {
      clearTimeout(timer);
      setGlowing(false);
      requestAnimationFrame(() => requestAnimationFrame(() => setGlowing(true)));
      timer = setTimeout(() => setGlowing(false), 2500);
    };
    window.addEventListener('scroll-to-footer', handler);
    return () => {
      window.removeEventListener('scroll-to-footer', handler);
      clearTimeout(timer);
    };
  }, []);

  return (
    <footer
      id='footer'
      className='bg-dark flex justify-center items-center gap-8 py-8 mt-16'>
      {SOCIALS.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('mailto') ? undefined : '_blank'}
          rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
          aria-label={label}
          className='text-accent hover:text-light active:scale-110 transition-all duration-200 text-2xl'
          style={glowing ? { animation: 'icon-glow 2.5s ease-out forwards' } : undefined}>
          <Icon />
        </a>
      ))}
    </footer>
  );
}
