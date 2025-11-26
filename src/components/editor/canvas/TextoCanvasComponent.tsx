'use client';

import type { CanvasComponentData } from '../types';

export const TextoCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const { content = '' } = component.props;

  return (
    <div
      className="w-full max-w-none text-foreground"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
