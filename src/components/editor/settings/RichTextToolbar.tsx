'use client';

import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Bold, Italic, Underline, Strikethrough, Baseline, Highlighter, Link as LinkIcon, List as ListIcon, ListOrdered, AlignLeft, AlignCenter, AlignRight, AlignJustify, RemoveFormatting
} from 'lucide-react';

const colorPalette = [
    '#000000', '#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3',
    '#ffffff', '#ffb6c1', '#fffacd', '#f0f8ff', '#f5f5f5', '#d3d3d3', '#a9a9a9', '#fa8072',
    '#ffdead', '#f0e68c', '#90ee90', '#dda0dd', '#c0c0c0', '#800000', '#a52a2a', '#b8860b',
    '#006400', '#00008b', '#483d8b', '#808080', '#696969', '#400000', '#8b0000', '#808000',
    '#008000', '#000080', '#2f4f4f'
];

export const RichTextToolbar = ({ onFormat }: { onFormat: (command: string, value?: string) => void }) => {
  const ToolbarButton = ({ icon, command, value }: { icon: ReactNode; command: string; value?: string; }) => (
    <Button
      variant="ghost"
      size="icon"
      className="h-7 w-7 text-black/60 hover:bg-black/10 hover:text-black/80"
      onMouseDown={(e) => {
        e.preventDefault();
        onFormat(command, value);
      }}
    >
      {icon}
    </Button>
  );

  const ColorPickerButton = ({ icon, command }: { icon: ReactNode; command: 'foreColor' | 'hiliteColor' }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-black/60 hover:bg-black/10 hover:text-black/80">
          {icon}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2">
        <div className="grid grid-cols-8 gap-1">
          {colorPalette.map((color, i) => (
            <Button
              key={`${color}-${i}`}
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-sm p-0"
              style={{ backgroundColor: color }}
              onMouseDown={(e) => {
                e.preventDefault();
                onFormat(command, color);
              }}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );

  return (
    <div className="flex flex-wrap items-center gap-1 rounded-t-md border border-gray-200 bg-gray-50 p-1">
      <Select defaultValue="p" onValueChange={(value) => onFormat('formatBlock', value)}>
        <SelectTrigger className="h-7 w-[100px] border-none bg-transparent text-xs text-black/80 focus:ring-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="p">Normal</SelectItem>
          <SelectItem value="h1">Título 1</SelectItem>
          <SelectItem value="h2">Título 2</SelectItem>
          <SelectItem value="h3">Título 3</SelectItem>
        </SelectContent>
      </Select>
      <Separator orientation="vertical" className="h-5 bg-black/20" />
      <ToolbarButton icon={<Bold />} command="bold" />
      <ToolbarButton icon={<Italic />} command="italic" />
      <ToolbarButton icon={<Underline />} command="underline" />
      <ToolbarButton icon={<Strikethrough />} command="strikeThrough" />
      <Separator orientation="vertical" className="h-5 bg-black/20" />
      <ColorPickerButton icon={<Baseline />} command="foreColor" />
      <ColorPickerButton icon={<Highlighter />} command="hiliteColor" />
      <Separator orientation="vertical" className="h-5 bg-black/20" />
      <ToolbarButton icon={<AlignLeft />} command="justifyLeft" />
      <ToolbarButton icon={<AlignCenter />} command="justifyCenter" />
      <ToolbarButton icon={<AlignRight />} command="justifyRight" />
      <ToolbarButton icon={<AlignJustify />} command="justifyFull" />
      <Separator orientation="vertical" className="h-5 bg-black/20" />
      <ToolbarButton icon={<LinkIcon />} command="createLink" />
      <ToolbarButton icon={<ListIcon />} command="insertUnorderedList" />
      <ToolbarButton icon={<ListOrdered />} command="insertOrderedList" />
      <Separator orientation="vertical" className="h-5 bg-black/20" />
      <ToolbarButton icon={<RemoveFormatting />} command="removeFormat" />
    </div>
  );
};
