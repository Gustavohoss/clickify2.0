'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, Plus } from 'lucide-react';
import type { CanvasBlock } from '../../types';
import Image from 'next/image';

export const ImageChoiceSettings = ({
  block,
  onUpdate,
  position,
}: {
  block: CanvasBlock;
  onUpdate: (id: number, props: any) => void;
  position: { x: number; y: number };
}) => {
  const props = block.props || {};
  const choices = props.choices || [];

  const handleChoiceChange = (index: number, newUrl: string) => {
    const newChoices = [...choices];
    newChoices[index].imageUrl = newUrl;
    onUpdate(block.id, { ...props, choices: newChoices });
  };

  const addChoice = () => {
    const newChoices = [...choices, { imageUrl: `https://picsum.photos/seed/${Date.now()}/200/100` }];
    onUpdate(block.id, { ...props, choices: newChoices });
  };

  const removeChoice = (index: number) => {
    const newChoices = choices.filter((_: any, i: number) => i !== index);
    onUpdate(block.id, { ...props, choices: newChoices });
  };

  return (
    <div
      className="absolute w-80 rounded-lg bg-[#262626] p-4 shadow-lg space-y-4 text-white"
      style={{
        left: `${position.x + 300}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div>
        <Label className="text-xs text-white/50">Opções de Imagem</Label>
        <ScrollArea className="h-64 mt-2 pr-2">
            <div className="space-y-4">
            {choices.map((choice: any, index: number) => (
                <div key={index} className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="relative w-16 h-9 rounded-md overflow-hidden bg-gray-700">
                             <Image src={choice.imageUrl} alt={`Choice ${index}`} layout="fill" objectFit="cover" />
                        </div>
                        <Input
                            value={choice.imageUrl}
                            onChange={(e) => handleChoiceChange(index, e.target.value)}
                            className="bg-[#181818] border-[#3f3f46] text-white flex-grow"
                            placeholder="URL da imagem..."
                        />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-white/50 hover:bg-[#3f3f46]"
                            onClick={() => removeChoice(index)}
                        >
                            <Trash2 size={14} />
                        </Button>
                    </div>
                </div>
            ))}
            </div>
        </ScrollArea>
      </div>
      <Button
        variant="outline"
        className="w-full mt-2 border-[#3f3f46] hover:bg-[#3f3f46]"
        onClick={addChoice}
      >
        <Plus size={16} className="mr-2" />
        Adicionar opção
      </Button>
    </div>
  );
};
