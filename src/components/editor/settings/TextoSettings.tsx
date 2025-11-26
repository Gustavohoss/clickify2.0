'use client';

import React, { useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { RichTextToolbar } from './RichTextToolbar';
import type { CanvasComponentData, ComponentProps } from '../types';

export const TextoSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      // Set initial content
      editorRef.current.innerHTML = component.props.content || '';
    }
  }, [component.id]); // Only reset when the selected component changes

  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleContentChange = () => {
    if (editorRef.current) {
      onUpdate({ ...component.props, content: editorRef.current.innerHTML });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Conteúdo do Texto</h3>
        <div className="rounded-md border border-gray-200">
          <RichTextToolbar onFormat={handleFormat} />
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            className="prose prose-sm w-full max-w-none overflow-auto rounded-b-md p-4 h-64 outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 lg:prose-base dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: component.props.content || '' }}
            onBlur={handleContentChange} // Change from onInput to onBlur
          />
        </div>
      </Card>
    </div>
  );
};
