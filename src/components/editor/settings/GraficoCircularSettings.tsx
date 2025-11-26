'use client';

import { Input } from '@/components/ui/input';
import { Label as UILabel } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import type { CanvasComponentData, ComponentProps } from '../types';

export const GraficoCircularSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  const props = component.props;

  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Conteúdo</h3>
        <div className="space-y-3">
          <div>
            <UILabel htmlFor="title" className="text-xs">
              Título
            </UILabel>
            <Input
              id="title"
              value={props.title || ''}
              onChange={(e) => onUpdate({ ...props, title: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <UILabel htmlFor="value" className="text-xs">
              Valor ({props.value || 0}%)
            </UILabel>
            <Slider
              id="value"
              min={0}
              max={100}
              step={1}
              value={[props.value || 0]}
              onValueChange={(value) => onUpdate({ ...props, value: value[0] })}
              className="mt-2"
            />
          </div>
        </div>
      </Card>
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Cores</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <UILabel htmlFor="progressColor" className="text-xs">Progresso</UILabel>
            <Input type="color" id="progressColor" className="h-8 w-full p-1" value={props.progressColor || '#EC4899'} onChange={(e) => onUpdate({ ...props, progressColor: e.target.value })} />
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="trackColor" className="text-xs">Fundo da Barra</UILabel>
            <Input type="color" id="trackColor" className="h-8 w-full p-1" value={props.trackColor || '#E5E7EB'} onChange={(e) => onUpdate({ ...props, trackColor: e.target.value })} />
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="textColor" className="text-xs">Texto</UILabel>
            <Input type="color" id="textColor" className="h-8 w-full p-1" value={props.textColor || '#111827'} onChange={(e) => onUpdate({ ...props, textColor: e.target.value })} />
          </div>
        </div>
      </Card>
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Cores do Cartão</h3>
         <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
                <UILabel htmlFor="cardBackgroundColor" className="text-xs">Fundo</UILabel>
                <Input type="color" id="cardBackgroundColor" className="h-8 w-full p-1" value={props.cardBackgroundColor || '#FFFFFF'} onChange={(e) => onUpdate({ ...props, cardBackgroundColor: e.target.value })} />
            </div>
            <div className="space-y-1">
                <UILabel htmlFor="cardBorderColor" className="text-xs">Borda</UILabel>
                <Input type="color" id="cardBorderColor" className="h-8 w-full p-1" value={props.cardBorderColor || '#F3F4F6'} onChange={(e) => onUpdate({ ...props, cardBorderColor: e.target.value })} />
            </div>
        </div>
      </Card>
    </div>
  );
};