'use client';

import { useState, useEffect, useRef } from 'react';
import type { Niche } from '@/hooks/useProjectFilter';
import { NICHE_ICONS } from '@/data/niches';

interface ProjectFilterProps {
  activeFilters: Set<Niche>;
  onToggle: (niche: Niche) => void;
  allNiches: Niche[];
}

export default function ProjectFilter({
  activeFilters,
  onToggle,
  allNiches,
}: ProjectFilterProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div className='flex flex-wrap gap-2 gap-4 mb-8'>
      {allNiches.map((niche) => {
        const active = activeFilters.has(niche);
        return (
          <button
            key={niche}
            onClick={() => onToggle(niche)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-header font-black text-caption transition-all duration-200 active:scale-95 ${
              active
                ? 'bg-accent text-dark hover:bg-dark hover:text-light'
                : 'bg-dark/10 text-dark/40 hover:bg-dark/20'
            }`}>
            {(() => {
              const Icon = NICHE_ICONS[niche];
              return Icon ? <Icon size={14} /> : null;
            })()}
            {niche}
            {active && <span className='text-xs leading-none'>×</span>}
          </button>
        );
      })}
    </div>
  );
}
