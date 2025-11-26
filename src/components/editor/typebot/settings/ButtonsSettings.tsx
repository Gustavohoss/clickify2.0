'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Trash2 } from 'lucide-react';
import React from 'react';
import type { CanvasBlock, ButtonItem } from '../../types';

export const ButtonsBlockSettings = ({
  block,
  onUpdate,
}: {
  block: CanvasBlock;
  onUpdate: (id: number, props: any) => void;
}) => {
  const props = block.props || {};
  const buttons: ButtonItem[] = props.buttons || [];

  const handleChange = (key: string, value: any) => {
    onUpdate(block.id, { ...props, [key]: value });
  };

  const handleButtonChange = (index: number, newText: string) => {
    const newButtons = [...buttons];
    newButtons[index] = { ...newButtons[index], text: newText };
    handleChange('buttons', newButtons);
  };

  const addButton = () => {
    const newButtons = [...buttons, { text: 'New Button' }];
    handleChange('buttons', newButtons);
  };

  const removeButton = (index: number) => {
    const newButtons = buttons.filter((_: any, i: number) => i !== index);
    handleChange('buttons', newButtons);
  };

  return (
    <div
      className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 rounded-lg bg-[#262626] p-4 shadow-lg space-y-4 text-white z-20"
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div>
        <Label className="text-xs text-white/50">Botões</Label>
        <div className="space-y-2 mt-1">
          {buttons.map((button, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={button.text}
                onChange={(e) => handleButtonChange(index, e.target.value)}
                className="bg-[#181818] border-[#3f3f46] text-white"
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white/50 hover:bg-[#3f3f46]"
                onClick={() => removeButton(index)}
              >
                <Trash2 size={14} />
              </Button>
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          className="w-full mt-2 border-[#3f3f46] hover:bg-[#3f3f46]"
          onClick={addButton}
        >
          Adicionar botão
        </Button>
      </div>

      <div className="flex items-center justify-between rounded-lg bg-[#181818] p-3">
        <Label htmlFor="multiple-choice" className="text-sm">
          Permitir múltiplas escolhas
        </Label>
        <Switch
          id="multiple-choice"
          checked={props.multipleChoice}
          onCheckedChange={(c) => handleChange('multipleChoice', c)}
        />
      </div>
    </div>
  );
};
