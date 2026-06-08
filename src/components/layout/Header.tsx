'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const close = () => setMenuOpen(false);

  const linkClass = (href: string) =>
    `font-header font-black text-h3 transition-colors duration-200 hover:text-accent active:scale-110 inline-block ${
      pathname === href ? 'text-accent' : 'text-dark'
    }`;

  return (
    <>
      <header className="sticky top-0 z-50 bg-light/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" onClick={close} className="shrink-0">
            <Image
              src="/assets/personalLogo1.webp"
              alt="Joseph Petrasek"
              width={44}
              height={44}
              className="h-11 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <Link key={href} href={href} className={linkClass(href)}>
                {label}
              </Link>
            ))}
            <a
              href="#footer"
              className="font-header font-black text-h3 text-dark transition-colors duration-200 hover:text-accent active:scale-110 inline-block"
            >
              Contact
            </a>
          </nav>

          {/* Hamburger — mobile only, 3 static lines */}
          <button
            className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <span className="block h-0.5 w-full bg-dark rounded-full" />
            <span className="block h-0.5 w-full bg-dark rounded-full" />
            <span className="block h-0.5 w-full bg-dark rounded-full" />
          </button>
        </div>
      </header>

      {/* Mobile drawer — slides in from right */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-light/95 backdrop-blur-sm z-40 flex flex-col pt-24 px-8 gap-6 shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {NAV_LINKS.map(({ label, href }) => (
          <Link key={href} href={href} onClick={close} className={linkClass(href)}>
            {label}
          </Link>
        ))}
        <a
          href="#footer"
          onClick={close}
          className="font-header font-black text-h3 text-dark transition-colors duration-200 hover:text-accent active:scale-110 inline-block"
        >
          Contact
        </a>
      </div>

      {/* Backdrop — closes drawer on outside tap */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          onClick={close}
          aria-hidden="true"
        />
      )}
    </>
  );
}
