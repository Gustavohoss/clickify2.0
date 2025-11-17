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
    <div className="relative flex items-center justify-center gap-4 border-dashed bg-card/80 p-4">
      <div className="text-primary">
        <Sparkles />
      </div>
      <p className="font-semibold">Efeito Confete</p>
      <Badge variant="outline">Invisível</Badge>
    </div>
  );
};
