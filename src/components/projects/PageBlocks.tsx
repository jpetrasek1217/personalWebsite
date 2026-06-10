'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';

function LightboxOverlay({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6 cursor-zoom-out'
      onClick={onClose}>
      <div className='cursor-default' onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export function SectionImg({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  return (
    <>
      <div
        className='w-full max-w-full lg:max-w-[60%] mx-auto rounded-xl overflow-hidden shadow-sm cursor-zoom-in'
        onClick={() => setOpen(true)}>
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          className='w-full h-auto object-cover'
          sizes='(max-width: 768px) 100vw, 896px'
        />
      </div>
      {open && (
        <LightboxOverlay onClose={close}>
          <Image
            src={src}
            alt={alt}
            width={1920}
            height={1280}
            className='max-w-[85vw] max-h-[85vh] w-auto h-auto rounded-xl shadow-xl'
            sizes='85vw'
          />
        </LightboxOverlay>
      )}
    </>
  );
}

export function NaturalImg({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  return (
    <>
      <div className='cursor-zoom-in' onClick={() => setOpen(true)}>
        <Image
          src={src}
          alt={alt}
          width={0}
          height={0}
          sizes='(max-width: 768px) 100vw, 896px'
          className='w-auto h-auto max-w-full rounded-xl shadow-sm'
        />
      </div>
      {open && (
        <LightboxOverlay onClose={close}>
          <Image
            src={src}
            alt={alt}
            width={0}
            height={0}
            sizes='85vw'
            className='max-w-[85vw] max-h-[85vh] w-auto h-auto rounded-xl shadow-xl'
          />
        </LightboxOverlay>
      )}
    </>
  );
}

export function GridImg({
  src,
  alt,
  label,
}: {
  src: string;
  alt: string;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const [expandedStyle, setExpandedStyle] = useState<React.CSSProperties>({});

  function onLightboxLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { naturalWidth: nw, naturalHeight: nh } = e.currentTarget;
    const larger = Math.max(nw, nh);
    console.log('nw: ', nw, '   nh: ', nh, '   larger: ', larger);
    if (larger < 800) {
      const scale = 800 / larger;
      setExpandedStyle(
        nw >= nh
          ? { width: Math.round(nw * scale) }
          : { height: Math.round(nh * scale) },
      );
    }
  }

  return (
    <>
      <div
        className='space-y-2 cursor-zoom-in shrink-0'
        onClick={() => setOpen(true)}>
        <Image
          src={src}
          alt={alt}
          width={0}
          height={0}
          className='h-30 sm:h-52 lg:h-72 w-auto rounded-xl shadow-sm'
          sizes='(max-width: 768px) 50vw, 400px'
        />
        <p className='font-header font-black text-caption text-center'>
          {label}
        </p>
      </div>
      {open && (
        <LightboxOverlay onClose={close}>
          <div className='space-y-3'>
            <Image
              src={src}
              alt={alt}
              width={0}
              height={0}
              onLoad={onLightboxLoad}
              style={expandedStyle}
              className='max-w-[80vw] max-h-[80vh] w-auto h-auto rounded-xl shadow-xl'
              sizes='80vw'
            />
            <p className='font-header font-black text-caption text-center text-white/80'>
              {label}
            </p>
          </div>
        </LightboxOverlay>
      )}
    </>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className='space-y-1.5 font-body text-body pl-5 list-disc list-outside'>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function ProjectTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className='rounded-xl overflow-hidden shadow-sm border border-dark/10'>
      <table className='w-full font-body text-body'>
        <thead>
          <tr className='bg-dark text-light'>
            {headers.map((h, i) => (
              <th
                key={i}
                className='text-left px-4 py-3 font-header font-black text-caption'>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white/40' : 'bg-white/20'}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-4 py-2.5${j === 0 ? ' font-header font-black text-caption' : ''}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function VideoEmbed({ src, title }: { src: string; title: string }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  return (
    <>
      <div
        className='max-w-full md:max-w-[60%] mx-auto aspect-video rounded-xl overflow-hidden shadow-sm cursor-zoom-in'
        onClick={() => setOpen(true)}>
        <iframe
          src={src}
          className='w-full h-full pointer-events-none'
          allow='autoplay'
          title={title}
        />
      </div>
      {open && (
        <LightboxOverlay onClose={close}>
          <div className='w-[80vw] aspect-video rounded-xl overflow-hidden shadow-xl'>
            <iframe
              src={src}
              className='w-full h-full'
              allow='autoplay'
              title={title}
            />
          </div>
        </LightboxOverlay>
      )}
    </>
  );
}

export function CodeBlock({ children }: { children: string }) {
  return (
    <pre className='bg-dark/5 rounded-xl px-5 py-4 font-mono text-caption leading-relaxed overflow-x-auto border border-dark/10'>
      <code>{children}</code>
    </pre>
  );
}
