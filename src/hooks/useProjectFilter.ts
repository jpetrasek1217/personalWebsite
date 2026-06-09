'use client';

import { useState, useMemo } from 'react';
import projects from '@/data/projects.json';

export type Niche = 'Mechatronics' | 'Mechanical' | 'Full Stack' | 'AI/ML';

export const ALL_NICHES: Niche[] = ['Mechatronics', 'Mechanical', 'Full Stack', 'AI/ML'];

export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  niches: Niche[];
  tags: string[];
  link?: string;
  visibility: boolean;
}

export function useProjectFilter() {
  const [activeFilters, setActiveFilters] = useState<Set<Niche>>(new Set());

  const toggleFilter = (niche: Niche) => {
    setActiveFilters(prev => {
      const next = new Set(prev);
      if (next.has(niche)) {
        next.delete(niche);
      } else {
        next.add(niche);
        // All niches selected = same as no filter; reset to clean state
        if (next.size === ALL_NICHES.length) return new Set();
      }
      return next;
    });
  };

  const filteredProjects = useMemo(() => {
    const visible = (projects as Project[]).filter(p => p.visibility);
    if (activeFilters.size === 0) return visible;
    return visible.filter(p => p.niches.some(n => activeFilters.has(n)));
  }, [activeFilters]);

  const isFiltered = activeFilters.size > 0;

  return { activeFilters, toggleFilter, filteredProjects, ALL_NICHES, isFiltered };
}
