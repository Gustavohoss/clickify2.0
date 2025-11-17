'use client';

import type { CanvasComponentData } from '../types';

export const TextoCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const { content = '' } = component.props;

  return (
    <div
      className="prose prose-sm w-full max-w-none text-black dark:prose-invert lg:prose-base"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
