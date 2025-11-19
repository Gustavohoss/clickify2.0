
'use client';

import React from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const lessons = [
  PlaceHolderImages.find(p => p.id === 'lesson-card-1'),
  PlaceHolderImages.find(p => p.id === 'lesson-card-2'),
  PlaceHolderImages.find(p => p.id === 'lesson-card-3'),
  PlaceHolderImages.find(p => p.id === 'lesson-card-4'),
  PlaceHolderImages.find(p => p.id === 'lesson-card-5'),
  PlaceHolderImages.find(p => p.id === 'lesson-card-6'),
].filter(Boolean) as any[];

export const LessonsCarousel = () => {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      dragFree: true,
    },
    [Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  return (
    <section className="relative py-8 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-background to-transparent z-20" />
      <div className="container mx-auto px-1 text-center relative z-30">
        <h1 className="md:text-5xl text-3xl lg:text-6xl text-white font-body mb-10" style={{ textShadow: '0 0 8px hsla(var(--primary), 0.5)' }}>
          Aulas <span className="text-primary">premium</span> e <span className="text-primary"> exclusivas! </span>
        </h1>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {[...lessons, ...lessons].map((lesson, index) => (
              <div key={`${lesson.id}-${index}`} className="relative flex-[0_0_280px] shrink-0 px-4">
                <Image
                  src={lesson.imageUrl}
                  alt={lesson.description}
                  width={280}
                  height={415}
                  className="rounded-xl object-cover h-[415px]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
