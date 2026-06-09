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
    <div className='flex flex-col sm:flex-row sm:items-center gap-3 mb-8'>
      {/* Left: filter dropdown */}
      <div ref={ref} className='relative shrink-0'>
        <button
          onClick={() => setOpen((o) => !o)}
          className='flex items-center gap-2 px-4 py-1.5 rounded-full bg-dark/10 text-dark font-header font-black text-caption hover:bg-dark/20 transition-colors duration-200 active:scale-95'>
          Filter
          <span className='text-xs'>{open ? '▲' : '▼'}</span>
        </button>

        {open && (
          <div className='absolute top-full left-0 mt-2 bg-light/95 backdrop-blur-sm rounded-xl shadow-md border border-dark/10 p-2 z-20 min-w-[170px]'>
            {allNiches.map((niche) => {
              const active = activeFilters.has(niche);
              const Icon = NICHE_ICONS[niche];
              return (
                <button
                  key={niche}
                  onClick={() => onToggle(niche)}
                  className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg font-header font-black text-caption transition-colors duration-150 ${
                    active
                      ? 'bg-accent/20 text-accent'
                      : 'hover:bg-dark/10 text-dark'
                  }`}>
                  {Icon && <Icon size={14} />}
                  {niche}
                  {active && <span className='ml-auto text-xs'>✓</span>}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Right: active filter chips */}
      <div className='flex flex-wrap gap-2'>
        {Array.from(activeFilters).map((niche) => {
          const Icon = NICHE_ICONS[niche];
          return (
            <button
              key={niche}
              onClick={() => onToggle(niche)}
              className='flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-dark font-header font-black text-caption transition-all duration-200 active:scale-95 hover:bg-dark hover:text-light'>
              {Icon && <Icon size={14} />}
              {niche}
              <span className='text-xs leading-none'>×</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
