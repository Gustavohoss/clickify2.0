'use client';

import type { CanvasComponentData } from '../types';

export const EspacadorCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const { height = 50 } = component.props;

  return (
    <div
      className="flex w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-card/80"
      style={{ height: `${height}px` }}
    >
      <span className="text-sm text-gray-500">Espaçador ({height}px)</span>
    </div>
  );
};
