'use client';

import Image from 'next/image';
import HackerText from './HackerText';
import RoleCarousel from './RoleCarousel';

export default function HeroGrid() {
  return (
    <section className='px-8 min-[500]:px-28 min-[1000]:px-12 pt-6 pb-8 flex items-center justify-center'>
      {/* ── Mobile grid (2 cols, < sm) ── */}
      <div className='min-[800px]:hidden grid grid-cols-2 gap-x-3 gap-y-2 w-full items-center'>
        {/* A — "Hello", overlaid on top-left of logo */}
        <div className='col-start-1 row-start-1 relative z-20 font-header text-h2 font-black self-end pb-1'>
          Hello
        </div>

        {/* B — Logo, spans full 2-col width for rows 1–3 */}
        <div className='col-start-1 col-span-2 row-start-1 row-span-3 relative z-10 flex items-center justify-center'>
          <Image
            src='/assets/minimal_logo.webp'
            alt='JP logo'
            width={320}
            height={320}
            className='w-full max-w-[320px] h-auto object-contain'
            priority
          />
        </div>

        {/* C — "My name is" */}
        <div className='col-start-1 col-span-2 row-start-4 font-header text-h3 font-black'>
          My name is
        </div>

        {/* D — HackerText */}
        <div className='col-start-1 col-span-2 row-start-5 flex items-center'>
          <HackerText
            text='Joseph Petrasek'
            className='text-h1 font-black leading-tight'
          />
        </div>

        {/* F+H — Accent pill with right-aligned carousel */}
        <div className='col-start-1 col-span-2 row-start-6 relative z-0 h-12 flex items-center justify-end rounded-full bg-accent shadow-lg overflow-hidden'>
          <RoleCarousel className='font-header font-black text-h3 text-dark mr-4 whitespace-nowrap' />
        </div>

        {/* E — "Welcome to my site!" */}
        <div className='col-start-1 col-span-2 row-start-7 font-header text-h2 font-black self-start pt-2'>
          Welcome to my site!
        </div>
      </div>

      {/* ── Desktop grid (9 cols — col 1 and col 9 empty) ── */}
      <div className='hidden min-[800px]:grid max-w-4xl w-full grid-cols-4 gap-x-4 gap-y-2 items-center'>
        {/* Hello */}
        <div className='col-start-1 row-start-1 font-header text-h2 min-[1000px]:text-hero-greeting font-black self-end pb-1'>
          Hello
        </div>
        {/* My name is */}
        <div className='col-start-3 col-span-2 row-start-1 font-header text-h3 min-[1000px]:text-hero-label font-black self-end pb-1'>
          My name is
        </div>

        {/* Logo — cols 2-3, rows 1-4, z-10 above pill */}
        <div className='col-start-1 col-span-2 row-start-1 row-span-4 relative z-10 flex items-center justify-center'>
          <Image
            src='/assets/minimal_logo.webp'
            alt='JP logo'
            width={480}
            height={480}
            className='w-full max-w-[480px] h-auto object-contain'
            priority
          />
        </div>

        {/* HackerText */}
        <div className='col-start-3 col-span-2 row-start-2 flex items-center'>
          <HackerText
            text='Joseph Petrasek'
            className='text-h1 min-[1000px]:text-hero-name font-black leading-tight'
          />
        </div>

        {/* Accent pill */}
        <div className='col-start-1 col-span-4 row-start-3 relative z-0 h-16 flex items-center justify-end rounded-full bg-accent shadow-lg overflow-hidden'>
          <RoleCarousel className='font-header font-black text-h3 min-[1000px]:text-hero-label text-dark mr-8 whitespace-nowrap' />
        </div>

        {/* Welcome */}
        <div className='col-start-3 col-span-2 row-start-4 font-header text-h2 min-[1000px]:text-hero-greeting font-black self-start pt-2'>
          Welcome to my site!
        </div>
      </div>
    </section>
  );
}
