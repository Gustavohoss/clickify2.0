'use client';

import { Input } from '@/components/ui/input';
import { Label as UILabel } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Trash2, Grip } from 'lucide-react';
import type { CanvasComponentData, ComponentProps, ArgumentItem } from '../types';
import { Textarea } from '@/components/ui/textarea';

export const ArgumentosSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  const items = component.props.items || [];

  const handleUpdateItem = (
    itemId: number,
    key: keyof ArgumentItem,
    value: string
  ) => {
    const newItems = items.map((item) =>
      item.id === itemId ? { ...item, [key]: value } : item
    );
    onUpdate({ ...component.props, items: newItems });
  };

  const handleAddItem = () => {
    const newItem: ArgumentItem = {
      id: Date.now(),
      icon: '💬',
      title: 'Novo Argumento',
      description: 'Descreva o argumento aqui.',
    };
    onUpdate({ ...component.props, items: [...items, newItem] });
  };

  const handleDeleteItem = (itemId: number) => {
    const newItems = items.filter((item) => item.id !== itemId);
    onUpdate({ ...component.props, items: newItems });
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Layout</h3>
        <div className="space-y-4">
          <div>
            <UILabel htmlFor="layout" className="text-xs">Layout</UILabel>
            <Select
              value={component.props.layout || 'list'}
              onValueChange={(value: 'list' | '2-cols' | '3-cols' | '4-cols') => onUpdate({ ...component.props, layout: value })}
            >
              <SelectTrigger id="layout" className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="list">Em Lista</SelectItem>
                <SelectItem value="2-cols">2 Colunas</SelectItem>
                <SelectItem value="3-cols">3 Colunas</SelectItem>
                <SelectItem value="4-cols">4 Colunas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Argumentos</h3>
        <ScrollArea className="h-[30rem]">
          <div className="space-y-3 pr-4">
            {items.map((item: ArgumentItem) => (
              <Card key={item.id} className="relative bg-card p-3 space-y-3">
                <div className="absolute top-2 left-2 flex items-center justify-center text-muted-foreground">
                  <Grip className="h-4 w-4 cursor-grab" />
                </div>
                <div className="absolute top-2 right-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 shrink-0 text-muted-foreground hover:text-destructive"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-2 pt-8">
                  <UILabel htmlFor={`icon-${item.id}`} className="text-xs">Ícone</UILabel>
                  <Input
                    id={`icon-${item.id}`}
                    value={item.icon}
                    onChange={(e) => handleUpdateItem(item.id, 'icon', e.target.value)}
                    className="h-8"
                  />
                  <UILabel htmlFor={`title-${item.id}`} className="text-xs">Título</UILabel>
                  <Input
                    id={`title-${item.id}`}
                    value={item.title}
                    onChange={(e) => handleUpdateItem(item.id, 'title', e.target.value)}
                    className="h-8"
                  />
                  <UILabel htmlFor={`description-${item.id}`} className="text-xs self-start">Descrição</UILabel>
                  <Textarea
                    id={`description-${item.id}`}
                    value={item.description}
                    onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                    className="h-20"
                  />
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
        <Button variant="outline" className="mt-4 w-full" onClick={handleAddItem}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Argumento
        </Button>
      </Card>
    </div>
  );
};
