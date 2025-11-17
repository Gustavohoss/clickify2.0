
'use client';

import React, { useCallback, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { CanvasComponentData } from '../types';

export const ConfettiCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const { particleCount = 200, spread = 70, originX = 0.5, originY = 0.6 } = component.props;

  const fire = useCallback(() => {
    confetti({
      particleCount,
      spread,
      origin: { x: originX, y: originY },
    });
  }, [particleCount, spread, originX, originY]);

  useEffect(() => {
    fire();
  }, [fire]);

  return (
    <div className="relative flex items-center justify-center gap-4 rounded-lg border-2 border-dashed border-gray-300 bg-transparent p-4">
      <div className="text-primary">
        <Sparkles />
      </div>
      <p className="font-semibold text-black">Efeito Confete</p>
      <Badge variant="outline" className="bg-white text-black hover:bg-gray-200">Invisível</Badge>
    </div>
  );
};
