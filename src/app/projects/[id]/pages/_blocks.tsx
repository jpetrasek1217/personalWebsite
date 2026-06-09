import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function Md({ children }: { children: string }) {
  return (
    <div className="prose prose-sm max-w-none font-body">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}

export function Img({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full rounded-xl overflow-hidden shadow-sm">
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={800}
        className="w-full h-auto object-cover"
        sizes="(max-width: 768px) 100vw, 896px"
      />
    </div>
  );
}
