'use client';

import React from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { cn } from '@/lib/utils';

const lessons = [
  {
    id: 'lesson-1',
    imageUrl: 'https://s3.typebot.io/public/workspaces/cm8gbxl5b000ba3ncy4y16grd/typebots/cmi0sldz2000djl043bd6dtvj/blocks/y510lieie4op8pdhz5o07zj8?v=1764037761049',
    description: 'Aula 1',
  },
  {
    id: 'lesson-2',
    imageUrl: 'https://s3.typebot.io/public/workspaces/cm8gbxl5b000ba3ncy4y16grd/typebots/cmi0sldz2000djl043bd6dtvj/blocks/e9v9vopox1y5qctk6ztvj4mw?v=1764038145428',
    description: 'Aula 2',
  },
  {
    id: 'lesson-3',
    imageUrl: 'https://s3.typebot.io/public/workspaces/cm8gbxl5b000ba3ncy4y16grd/typebots/cmi0sldz2000djl043bd6dtvj/blocks/rtykaylwwnetzpo5wcb5o4p5?v=1764046946432',
    description: 'Aula 3',
  },
];

export const LessonsCarousel = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' }, [
    Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-1 text-center relative z-30">
        <h1 className="md:text-5xl text-3xl lg:text-6xl text-white font-body mb-10" style={{ textShadow: '0 0 8px hsla(var(--primary), 0.5)' }}>
          Aulas <span className="text-primary">premium</span> e <span className="text-primary"> exclusivas! </span>
        </h1>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4">
            {[...lessons, ...lessons, ...lessons, ...lessons].map((lesson, index) => (
              <div key={`${lesson.id}-${index}`} className="relative flex-[0_0_280px] pl-4">
                <Image
                  src={lesson.imageUrl}
                  alt={lesson.description}
                  width={280}
                  height={415}
                  className={cn("rounded-xl object-cover h-[400px] md:h-[415px]")}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
