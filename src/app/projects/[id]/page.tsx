import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import projects from '@/data/projects.json';
import { NICHE_ICONS } from '@/data/niches';

import YouTubeVideoEvaluator from './pages/youtube-video-evaluator';
import Gatekeep from './pages/gatekeep';
import PacemakerGui from './pages/pacemaker-gui';
import RoboticCarControls from './pages/robotic-car-controls';
import AversaCa from './pages/aversa-ca';
import JoinsauleCom from './pages/joinsaule-com';
import SevenSDProject from './pages/7sd-project';
import DiceInsertFoam from './pages/dice-insert-foam';

const PROJECT_PAGES: Record<string, React.ComponentType> = {
  'youtube-video-evaluator': YouTubeVideoEvaluator,
  gatekeep: Gatekeep,
  'pacemaker-gui': PacemakerGui,
  'robotic-car-controls': RoboticCarControls,
  'aversa-ca': AversaCa,
  'joinsaule-com': JoinsauleCom,
  '7sd-project': SevenSDProject,
  'dice-insert-foam': DiceInsertFoam,
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  const CustomPage = PROJECT_PAGES[id];

  return (
    <Container className='py-12 max-w-3xl'>
      {/* Top bar: Back (left) + View Project (right) */}
      <div className='flex items-center justify-between mb-8'>
        <Link
          href='/'
          className='font-header font-black text-caption text-dark hover:text-accent transition-colors duration-200'>
          ← Back
        </Link>
        {project.link && (
          <a
            href={project.link}
            target='_blank'
            rel='noopener noreferrer'
            className='px-5 py-2 bg-accent text-dark font-header font-black text-caption rounded-full hover:scale-105 active:scale-95 transition-transform duration-200'>
            View Project →
          </a>
        )}
      </div>

      {/* Thumbnail */}
      <div className='relative max-w-full md:max-w-[60%] mx-auto aspect-video rounded-xl overflow-hidden mb-8 shadow-md'>
        <Image
          src={`/assets/${project.thumbnail}`}
          alt={project.title}
          fill
          className='object-cover'
          sizes='(max-width: 768px) 50vw, 448px'
          priority
        />
      </div>

      {/* Title */}
      <h1 className='font-header font-black text-h1 mb-3'>{project.title}</h1>

      {/* Tags */}
      <div className='flex flex-wrap gap-2 mb-6'>
        {project.niches.map((niche) => {
          const Icon = NICHE_ICONS[niche];
          return (
            <span
              key={niche}
              className='flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark text-light font-header font-black text-caption'>
              {Icon && <Icon size={14} />}
              {niche}
            </span>
          );
        })}
        {project.tags.map((tag) => (
          <span
            key={tag}
            className='px-3 py-1 rounded-full bg-dark/10 text-dark font-header font-black text-caption'>
            {tag}
          </span>
        ))}
      </div>

      {/* Project-specific page content */}
      {CustomPage && <CustomPage />}
    </Container>
  );
}
