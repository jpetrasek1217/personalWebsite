import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import projects from '@/data/projects.json';
import { NICHE_ICONS } from '@/data/niches';

import Gatekeep from './pages/gatekeep';
import PacemakerGui from './pages/pacemaker-gui';
import RoboticCarControls from './pages/robotic-car-controls';
import SevenSDProject from './pages/7sd-project';
import DiceInsertFoam from './pages/dice-insert-foam';
import Saule from './pages/saule';
import CreditClassifier from './pages/credit-classifier';
import Optimine from './pages/optimine';
import Stm32Projects from './pages/stm32-projects';
import YouTubeVideoEvaluator from '@/components/youtube-video-evaluator/YouTubeVideoEvaluator';
import YouTubeVideoEvaluatorPage from './pages/youtube-video-evaluator';
import CollapsibleSection from './CollapsibleSection';

const PROJECT_PAGES: Record<string, React.ComponentType> = {
  'youtube-video-evaluator': YouTubeVideoEvaluatorPage,
  gatekeep: Gatekeep,
  'pacemaker-gui': PacemakerGui,
  'robotic-car-controls': RoboticCarControls,
  '7sd-project': SevenSDProject,
  'dice-insert-foam': DiceInsertFoam,
  saule: Saule,
  'credit-classifier': CreditClassifier,
  optimine: Optimine,
  'stm32-projects': Stm32Projects,
};

const FEATURED_COMPONENTS: Record<string, React.ComponentType> = {
  'youtube-video-evaluator': YouTubeVideoEvaluator,
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id) as
    | ((typeof projects)[number] & { featuredComponent?: boolean })
    | undefined;
  if (!project) notFound();

  const CustomPage = PROJECT_PAGES[id];
  const FeaturedComponent = FEATURED_COMPONENTS[id];

  const visibleProjects = (projects as (typeof projects)[number][]).filter(
    (p) => p.visibility,
  );
  const currentIndex = visibleProjects.findIndex((p) => p.id === id);
  const prevProject = currentIndex > 0 ? visibleProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < visibleProjects.length - 1
      ? visibleProjects[currentIndex + 1]
      : null;

  const navLinkClass =
    'font-header font-black text-caption text-dark hover:text-accent transition-colors duration-200 max-w-[45%] truncate';

  const navBar = (
    <div className='flex items-center justify-between'>
      {prevProject ? (
        <Link href={`/projects/${prevProject.id}`} className={navLinkClass}>
          ← {prevProject.title}
        </Link>
      ) : (
        <div />
      )}
      {nextProject ? (
        <Link href={`/projects/${nextProject.id}`} className={`${navLinkClass} text-right ml-auto`}>
          {nextProject.title} →
        </Link>
      ) : (
        <div />
      )}
    </div>
  );

  const metaBlock = (
    <>
      {/* Thumbnail */}
      <div className='relative max-w-full md:max-w-[60%] mx-auto aspect-video rounded-xl overflow-hidden my-8 shadow-md'>
        <Image
          src={`/assets/${project.thumbnail}`}
          alt={project.title}
          fill
          className='object-cover'
          sizes='(max-width: 768px) 100vw, 448px'
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
    </>
  );

  if (project.featuredComponent && FeaturedComponent) {
    return (
      <Container className='py-12 max-w-3xl'>
        {navBar}
        <FeaturedComponent />
        <CollapsibleSection>
          {metaBlock}
          {CustomPage && <CustomPage />}
        </CollapsibleSection>
        <div className='mt-12'>{navBar}</div>
      </Container>
    );
  }

  return (
    <Container className='py-12 max-w-3xl'>
      {navBar}
      {metaBlock}
      {/* Project-specific page content */}
      {CustomPage && <CustomPage />}
      <div className='mt-12'>{navBar}</div>
    </Container>
  );
}
