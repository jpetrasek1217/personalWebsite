import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import projects from '@/data/projects.json';
import type { PageItemType } from '@/hooks/useProjectFilter';
import { NICHE_ICONS } from '@/data/niches';

function isYouTubeOrVimeo(src: string) {
  return src.includes('youtube.com') || src.includes('youtu.be') || src.includes('vimeo.com');
}

function PageItem({ item }: { item: PageItemType }) {
  switch (item.type) {
    case 'markdown':
      return (
        <div className="prose prose-sm max-w-none font-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{item.content}</ReactMarkdown>
        </div>
      );
    case 'image':
      return (
        <div className="relative w-full rounded-xl overflow-hidden shadow-sm">
          <Image
            src={item.src}
            alt={item.alt ?? ''}
            width={1200}
            height={800}
            className="w-full h-auto object-cover"
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </div>
      );
    case 'video':
      if (isYouTubeOrVimeo(item.src)) {
        return (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-sm">
            <iframe
              src={item.src}
              title={item.title ?? 'Video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        );
      }
      return (
        <video
          src={item.src}
          title={item.title}
          controls
          className="w-full rounded-xl shadow-sm"
        />
      );
    default:
      return null;
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find(p => p.id === id);
  if (!project) notFound();

  const hasCustomPage = Array.isArray(project.page) && project.page.length > 0;

  return (
    <Container className="py-12 max-w-3xl">
      {/* Top bar: Back (left) + View Project (right) */}
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/"
          className="font-header font-black text-caption text-dark hover:text-accent transition-colors duration-200"
        >
          ← Back
        </Link>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-accent text-dark font-header font-black text-caption rounded-full hover:scale-105 active:scale-95 transition-transform duration-200"
          >
            View Project →
          </a>
        )}
      </div>

      {/* Thumbnail */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-8 shadow-md">
        <Image
          src={`/assets/${project.thumbnail}`}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 896px"
          priority
        />
      </div>

      {/* Title */}
      <h1 className="font-header font-black text-h1 mb-3">{project.title}</h1>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.niches.map(niche => {
          const Icon = NICHE_ICONS[niche];
          return (
            <span
              key={niche}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/20 text-accent font-header font-black text-caption"
            >
              {Icon && <Icon size={14} />}
              {niche}
            </span>
          );
        })}
        {project.tags.map(tag => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full bg-dark/10 text-dark font-header font-black text-caption"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Description */}
      <p className="font-body text-body mb-8">{project.description}</p>

      {/* Custom page items OR fallback extendedDescription */}
      {hasCustomPage ? (
        <div className="flex flex-col gap-8">
          {(project.page as PageItemType[]).map((item, i) => (
            <PageItem key={i} item={item} />
          ))}
        </div>
      ) : (
        project.extendedDescription && (
          <div className="prose prose-sm max-w-none font-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {project.extendedDescription}
            </ReactMarkdown>
          </div>
        )
      )}
    </Container>
  );
}
