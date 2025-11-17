'use client';

import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CanvasComponentData } from '../types';

export const ImagemCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const { imageUrl = '', altText = 'Imagem', borderRadius = 'md' } = component.props;

  const borderRadiusClasses: Record<string, string> = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  if (!imageUrl) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-md border-2 border-dashed bg-gray-100">
        <div className="text-center text-gray-500">
          <ImageIcon className="mx-auto h-12 w-12" />
          <p className="mt-2 text-sm font-semibold text-black">Adicione uma imagem</p>
          <p className="mt-1 text-xs text-gray-500">Insira uma URL nas configurações.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative aspect-video w-full overflow-hidden',
        borderRadiusClasses[borderRadius]
      )}
    >
      <Image src={imageUrl} alt={altText} layout="fill" objectFit="cover" />
    </div>
  );
};
