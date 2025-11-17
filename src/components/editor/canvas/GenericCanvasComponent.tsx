'use client';

import { Card } from '@/components/ui/card';
import type { CanvasComponentData } from '../types';

export const GenericCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  return (
    <Card className="flex items-center gap-4 bg-card p-4 text-card-foreground">
      <div className="text-primary">{component.icon}</div>
      <p className="font-semibold">{component.name}</p>
    </Card>
  );
};
