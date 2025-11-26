'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Minus, Plus } from 'lucide-react';
import type { CanvasBlock } from '../../types';

export const ABTestSettings = ({
  block,
  onUpdate,
}: {
  block: CanvasBlock;
  onUpdate: (id: number, props: any) => void;
}) => {
  const props = block.props || {};
  const percentageA = props.percentageA || 50;

  const handleChange = (value: number) => {
    let newPercentage = value;
    if (newPercentage < 0) newPercentage = 0;
    if (newPercentage > 100) newPercentage = 100;
    onUpdate(block.id, { ...props, percentageA: newPercentage });
  };

  return (
    <div
      className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 rounded-lg bg-[#262626] p-4 shadow-lg space-y-4 text-white z-20"
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div>
        <Label className="text-sm text-white/80">Percentual de usuários para seguir A:</Label>
        <div className="flex items-center gap-2 mt-2">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 bg-[#181818] border-orange-500 text-orange-500 hover:bg-[#3f3f46]"
            onClick={() => handleChange(percentageA - 1)}
          >
            <Minus size={16} />
          </Button>
          <Input
            type="number"
            value={percentageA}
            onChange={(e) => handleChange(parseInt(e.target.value, 10))}
            className="w-full text-center bg-[#181818] border-orange-500 text-white focus:border-orange-500 focus-visible:ring-orange-500"
            min={0}
            max={100}
          />
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 bg-[#181818] border-orange-500 text-orange-500 hover:bg-[#3f3f46]"
            onClick={() => handleChange(percentageA + 1)}
          >
            <Plus size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};
