'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { Project } from '@/hooks/useProjectFilter';
import { NICHE_ICONS } from '@/data/niches';


export default function ProjectCard({ project }: { project: Project }) {
  const router = useRouter();

  return (
    <article
      className="relative overflow-hidden rounded-xl cursor-pointer group aspect-video bg-dark/10"
      onClick={() => router.push(`/projects/${project.id}`)}
    >
      {/* Thumbnail */}
      <Image
        src={`/assets/${project.thumbnail}`}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 50vw"
        onError={e => {
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-dark/90 via-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out flex flex-col justify-end p-4 sm:p-5">
        <h3 className="font-header font-black text-h3 text-light mb-1 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          {project.title}
        </h3>
        <p className="font-body text-caption text-light/80 mb-3 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-75">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-100">
          {project.niches.map(niche => {
            const Icon = NICHE_ICONS[niche];
            return (
              <span
                key={niche}
                className="flex items-center gap-1 px-2 py-0.5 text-caption rounded-full bg-dark text-light"
              >
                {Icon && <Icon size={13} />}
                {niche}
              </span>
            );
          })}
        </div>
      </div>
    </article>
  );
}
