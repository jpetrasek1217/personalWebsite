'use client';

import { useState, useMemo } from 'react';
import projects from '@/data/projects.json';

export type Niche = 'Mechatronics' | 'Mechanical' | 'Full Stack' | 'AI/ML';

export const ALL_NICHES: Niche[] = ['Mechatronics', 'Mechanical', 'Full Stack', 'AI/ML'];

export type PageItemType =
  | { type: 'markdown'; content: string }
  | { type: 'image'; src: string; alt?: string }
  | { type: 'video'; src: string; title?: string };

export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  niches: Niche[];
  tags: string[];
  link?: string;
  visibility: boolean;
  extendedDescription?: string;
  page?: PageItemType[];
}

export function useProjectFilter() {
  const [activeFilters, setActiveFilters] = useState<Set<Niche>>(new Set(ALL_NICHES));

  const toggleFilter = (niche: Niche) => {
    setActiveFilters(prev => {
      const next = new Set(prev);
      if (next.has(niche)) {
        next.delete(niche);
      } else {
        next.add(niche);
      }
      return next.size === 0 ? new Set(ALL_NICHES) : next;
    });
  };

  const filteredProjects = useMemo(
    () =>
      (projects as Project[]).filter(
        p => p.visibility && p.niches.some(n => activeFilters.has(n))
      ),
    [activeFilters]
  );

  return { activeFilters, toggleFilter, filteredProjects, ALL_NICHES };
}
