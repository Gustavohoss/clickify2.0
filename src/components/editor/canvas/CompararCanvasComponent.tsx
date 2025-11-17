'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { MoreHorizontal } from 'lucide-react';
import type { CanvasComponentData } from '../types';

export const CompararCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const {
    beforeImageUrl = 'https://picsum.photos/seed/before/600/400',
    afterImageUrl = 'https://picsum.photos/seed/after/600/400',
    sliderColor = '#FFFFFF',
    sliderIconColor = '#000000',
  } = component.props;

  const [sliderPosition, setSliderPosition] = useState(component.props.sliderPosition || 50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchStart = () => setIsDragging(true);
  const handleTouchEnd = () => setIsDragging(false);
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging) handleMove(e.touches[0].clientX);
  };

  return (
    <Card className="overflow-hidden bg-card">
      <div
        ref={containerRef}
        className="group relative w-full select-none aspect-video"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        <div className="absolute inset-0">
          <Image src={beforeImageUrl} alt="Before" layout="fill" objectFit="cover" />
        </div>
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image src={afterImageUrl} alt="After" layout="fill" objectFit="cover" />
        </div>
        <div
          className="absolute top-0 bottom-0 w-1 cursor-ew-resize"
          style={{
            left: `${sliderPosition}%`,
            transform: 'translateX(-50%)',
            backgroundColor: sliderColor,
          }}
        >
          <div
            className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full"
            style={{ backgroundColor: sliderColor }}
          >
            <MoreHorizontal className="h-6 w-6 rotate-90" style={{ color: sliderIconColor }} />
          </div>
        </div>
      </div>
    </Card>
  );
};
