'use client';

import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { CanvasBlock } from '../../types';
import { Label } from '@/components/ui/label';

export const JumpToBlockSettings = ({
  block,
  onUpdate,
  position,
  groups,
}: {
  block: CanvasBlock;
  onUpdate: (id: number, props: any) => void;
  position: { x: number; y: number };
  groups: CanvasBlock[];
}) => {
  const props = block.props || {};
  const targetGroupId = props.targetGroupId;

  const handleGroupSelect = (groupId: string) => {
    onUpdate(block.id, { ...props, targetGroupId: Number(groupId) });
  };

  return (
    <div
      className="absolute w-72 rounded-lg bg-[#262626] p-4 shadow-lg space-y-4 text-white"
      style={{
        left: `${position.x + 300}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div>
        <Label className="text-sm text-white/80">Pular para o grupo:</Label>
        <Select
            value={targetGroupId ? String(targetGroupId) : undefined}
            onValueChange={handleGroupSelect}
        >
            <SelectTrigger className="w-full mt-2 bg-[#181818] border-[#3f3f46]">
                <SelectValue placeholder="Selecione um grupo" />
            </SelectTrigger>
            <SelectContent className="bg-[#262626] border-[#3f3f46] text-white">
                {groups.map((group, index) => (
                    <SelectItem key={group.id} value={String(group.id)}>
                        Grupo #{index + 1}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
      </div>
    </div>
  );
};
