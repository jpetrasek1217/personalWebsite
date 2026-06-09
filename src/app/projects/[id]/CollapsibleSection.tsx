'use client';

import { useState } from 'react';

export default function CollapsibleSection({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className='mt-8'>
      <button
        onClick={() => setOpen((o) => !o)}
        className='flex items-center gap-2 font-header font-black text-body text-dark hover:text-accent transition-colors duration-200'>
        <span className='text-caption'>{open ? '▲' : '▼'}</span>
        See how it was made
      </button>
      {open && <div className='mt-6'>{children}</div>}
    </div>
  );
}
