'use client';

import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Bold, Italic, Underline, Strikethrough, Baseline, Highlighter, Link as LinkIcon, List as ListIcon, ListOrdered, AlignLeft, AlignCenter, AlignRight, AlignJustify, RemoveFormatting
} from 'lucide-react';


export const RichTextToolbar = ({ onFormat }: { onFormat: (command: string, value?: string) => void }) => {
  const ToolbarButton = ({ icon, command, value }: { icon: ReactNode; command: string; value?: string; }) => (
    <Button
      variant="ghost"
      size="icon"
      className="h-7 w-7 text-gray-400 hover:bg-white/10 hover:text-white"
      onMouseDown={(e) => {
        e.preventDefault();
        onFormat(command, value);
      }}
    >
      {icon}
    </Button>
  );

  return (
    <div className="flex flex-wrap items-center gap-1 rounded-t-md border-b border-white/10 bg-transparent p-1">
      <Select defaultValue="p" onValueChange={(value) => onFormat('formatBlock', value)}>
        <SelectTrigger className="h-7 w-[80px] border-none bg-transparent text-xs text-gray-300 focus:ring-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className='bg-gray-800 text-white'>
          <SelectItem value="p">Normal</SelectItem>
          <SelectItem value="h1">Título 1</SelectItem>
          <SelectItem value="h2">Título 2</SelectItem>
          <SelectItem value="h3">Título 3</SelectItem>
        </SelectContent>
      </Select>
       <Select defaultValue="p" onValueChange={(value) => onFormat('formatBlock', value)}>
        <SelectTrigger className="h-7 w-[80px] border-none bg-transparent text-xs text-gray-300 focus:ring-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className='bg-gray-800 text-white'>
          <SelectItem value="p">Normal</SelectItem>
        </SelectContent>
      </Select>
      <ToolbarButton icon={<Bold />} command="bold" />
      <ToolbarButton icon={<Italic />} command="italic" />
      <ToolbarButton icon={<Underline />} command="underline" />
      <ToolbarButton icon={<Strikethrough />} command="strikeThrough" />
      <ToolbarButton icon={<Baseline />} command="foreColor" />
      <ToolbarButton icon={<RemoveFormatting />} command="removeFormat" />
      <ToolbarButton icon={<ListIcon />} command="insertUnorderedList" />
      <ToolbarButton icon={<ListOrdered />} command="insertOrderedList" />
      <ToolbarButton icon={<LinkIcon />} command="createLink" />
    </div>
  );
};
