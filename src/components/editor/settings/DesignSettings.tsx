'use client';

import { Button } from '@/components/ui/button';

export const DesignSettings = () => {
  const designSections = ['GERAL', 'HEADER', 'CORES', 'TIPOGRAFIA', 'ANIMAÇÃO'];
  return (
    <div className="space-y-2">
      {designSections.map((section) => (
        <Button key={section} variant="ghost" className="w-full justify-start font-semibold">
          {section}
        </Button>
      ))}
    </div>
  );
};
