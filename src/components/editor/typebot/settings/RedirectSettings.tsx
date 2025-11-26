'use client';

import React from 'react';
import { Braces } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import type { CanvasBlock } from '../../types';

export const RedirectBlockSettings = ({
  block,
  onUpdate,
}: {
  block: CanvasBlock;
  onUpdate: (id: number, props: any) => void;
}) => {
  const props = block.props || {};

  const handleChange = (key: string, value: any) => {
    onUpdate(block.id, { ...props, [key]: value });
  };

  return (
    <div
      className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 rounded-lg bg-[#262626] p-4 shadow-lg space-y-4 text-white z-20"
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div>
        <Label className="text-sm text-white/80">URL:</Label>
        <div className="relative mt-1">
          <Input
            placeholder="Digite uma URL..."
            value={props.url || ''}
            onChange={(e) => handleChange('url', e.target.value)}
            className="bg-[#181818] border-[#3f3f46] text-white pr-8 focus:border-orange-500 focus-visible:ring-orange-500"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-white">
            <Braces size={16} />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between rounded-lg p-3 -mx-3 hover:bg-[#3f3f46]">
        <Label htmlFor="open-in-new-tab" className="text-sm">
          Abrir em nova aba
        </Label>
        <Switch
          id="open-in-new-tab"
          checked={props.openInNewTab}
          onCheckedChange={(c) => handleChange('openInNewTab', c)}
        />
      </div>
    </div>
  );
};
