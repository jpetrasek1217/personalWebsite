'use client';

import { useProjectFilter } from '@/hooks/useProjectFilter';
import ProjectCard from './ProjectCard';
import ProjectFilter from './ProjectFilter';
import Container from '@/components/layout/Container';

export default function ProjectGrid() {
  const { activeFilters, toggleFilter, filteredProjects, ALL_NICHES } =
    useProjectFilter();

  return (
    <Container className='py-12'>
      <ProjectFilter
        activeFilters={activeFilters}
        onToggle={toggleFilter}
        allNiches={ALL_NICHES}
      />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Container>
  );
}
