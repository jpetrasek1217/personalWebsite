import Image from 'next/image';
import Container from '@/components/layout/Container';

const GALLERY_PHOTOS = ['IMG_4227.webp', 'IMG_5207.webp', 'IMG_5218.webp'];

export default function AboutPage() {
  return (
    <Container className='py-12'>
      <h1 className='font-header font-black text-h1 mb-10'>
        About Joseph Petrasek
      </h1>

      {/* Bio section — photo left + text right on desktop, stacked on mobile */}
      <div className='flex flex-col md:flex-row gap-8 mb-14'>
        <div className='shrink-0 self-start'>
          <div className='relative w-56 h-72 rounded-xl overflow-hidden shadow-md'>
            <Image
              src='/assets/me.webp'
              alt='Joseph Petrasek'
              fill
              className='object-cover'
              sizes='224px'
              priority
            />
          </div>
        </div>

        <div className='font-body text-body leading-relaxed space-y-4'>
          <p>
            I am a <strong>Mechatronics Engineering graduate</strong> from
            McMaster University, deeply engaged with systems that use a{' '}
            <strong>multi-disciplinary approach</strong> to engineering and
            problem solving such as robotics, embedded systems, and product
            development.
          </p>
          <p>
            I strive to include emerging technologies in my designs, namely{' '}
            <strong>artificial intelligence</strong>. I am especially passionate
            about designing products with{' '}
            <strong>strong user experiences and real-world impact</strong>.
          </p>
          <p>
            I gravitate towards industries that leave the greatest{' '}
            <strong>positive impact on people</strong> such as medical,
            entertainment, and broadcasting. I am a major team player who is
            constantly learning new technologies and new perspectives from those
            I work with!
          </p>
          <p>
            Aside from my work, you can usually find me{' '}
            <strong>capturing or editing photos</strong>.
          </p>
        </div>
      </div>

      {/* Photo gallery */}
      <h2 className='font-header font-black text-h2 mb-6'>Photography</h2>
      <div className='columns-2 md:columns-3 gap-4'>
        {GALLERY_PHOTOS.map((photo, i) => (
          <div
            key={photo}
            className='mb-4 break-inside-avoid rounded-xl overflow-hidden shadow-sm'>
            <Image
              src={`/assets/${photo}`}
              alt={`Gallery photo ${i + 1}`}
              width={600}
              height={800}
              className='w-full h-auto object-cover'
              sizes='(max-width: 768px) 50vw, 33vw'
            />
          </div>
        ))}
      </div>
    </Container>
  );
}
