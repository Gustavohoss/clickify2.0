'use client';

import { Input } from '@/components/ui/input';
import { Label as UILabel } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';
import type { CanvasComponentData, ComponentProps, AlertModel } from '../types';
import { modelColors, modelIcons } from '../types';

export const AlertSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  const handleModelChange = (model: AlertModel) => {
    const colors = modelColors[model];
    const icon = modelIcons[model];
    onUpdate({ ...component.props, model, ...colors, icon });
  };

  const handleColorReset = (
    colorType: 'backgroundColor' | 'textColor' | 'borderColor'
  ) => {
    const currentModel = component.props.model || 'success';
    const defaultColor = modelColors[currentModel][colorType];
    onUpdate({ ...component.props, [colorType]: defaultColor });
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Informações</h3>
        <div className="space-y-3">
          <div>
            <UILabel htmlFor="title" className="text-xs">
              Título
            </UILabel>
            <Input
              id="title"
              value={component.props.title || ''}
              onChange={(e) => onUpdate({ ...component.props, title: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <UILabel htmlFor="description" className="text-xs">
              Descrição
            </UILabel>
            <Textarea
              id="description"
              value={component.props.description || ''}
              onChange={(e) => onUpdate({ ...component.props, description: e.target.value })}
              className="mt-1"
            />
          </div>
        </div>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Estilo</h3>
        <div>
          <UILabel htmlFor="model" className="text-xs">
            Modelo
          </UILabel>
          <Select
            value={component.props.model || 'success'}
            onValueChange={(value: AlertModel) => handleModelChange(value)}
          >
            <SelectTrigger id="model" className="mt-1">
              <SelectValue placeholder="Selecione o modelo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="success">Sucesso</SelectItem>
              <SelectItem value="error">Erro</SelectItem>
              <SelectItem value="warning">Aviso</SelectItem>
              <SelectItem value="info">Informação</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Personalização</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <UILabel htmlFor="color" className="text-xs">
              Cor
            </UILabel>
            <div className="relative">
              <Input
                type="color"
                id="color"
                className="h-8 w-full p-1"
                value={component.props.backgroundColor || '#ffffff'}
                onChange={(e) => onUpdate({ ...component.props, backgroundColor: e.target.value })}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1/2 right-0 h-6 w-6 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => handleColorReset('backgroundColor')}
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="text-color" className="text-xs">
              Texto
            </UILabel>
            <div className="relative">
              <Input
                type="color"
                id="text-color"
                className="h-8 w-full p-1"
                value={component.props.textColor || '#000000'}
                onChange={(e) => onUpdate({ ...component.props, textColor: e.target.value })}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1/2 right-0 h-6 w-6 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => handleColorReset('textColor')}
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="border-color" className="text-xs">
              Borda
            </UILabel>
            <div className="relative">
              <Input
                type="color"
                id="border-color"
                className="h-8 w-full p-1"
                value={component.props.borderColor || '#000000'}
                onChange={(e) => onUpdate({ ...component.props, borderColor: e.target.value })}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1/2 right-0 h-6 w-6 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => handleColorReset('borderColor')}
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
