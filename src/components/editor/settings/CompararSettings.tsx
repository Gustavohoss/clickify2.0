'use client';

import { Input } from '@/components/ui/input';
import { Label as UILabel } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import type { CanvasComponentData, ComponentProps } from '../types';

export const CompararSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Conteúdo</h3>
        <div className="space-y-3">
          <div>
            <UILabel htmlFor="beforeImageUrl" className="text-xs">
              URL da Imagem Antes
            </UILabel>
            <Input
              id="beforeImageUrl"
              value={component.props.beforeImageUrl || ''}
              onChange={(e) => onUpdate({ ...component.props, beforeImageUrl: e.target.value })}
              className="mt-1"
              placeholder="https://..."
            />
          </div>
          <div>
            <UILabel htmlFor="afterImageUrl" className="text-xs">
              URL da Imagem Depois
            </UILabel>
            <Input
              id="afterImageUrl"
              value={component.props.afterImageUrl || ''}
              onChange={(e) => onUpdate({ ...component.props, afterImageUrl: e.target.value })}
              className="mt-1"
              placeholder="https://..."
            />
          </div>
        </div>
      </Card>
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Personalização</h3>
        <div className="space-y-4">
          <div>
            <UILabel htmlFor="sliderPosition" className="text-xs">
              Posição Inicial do Slider (%)
            </UILabel>
            <Slider
              id="sliderPosition"
              min={0}
              max={100}
              step={1}
              value={[component.props.sliderPosition || 50]}
              onValueChange={(value) =>
                onUpdate({ ...component.props, sliderPosition: value[0] })
              }
              className="mt-2"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <UILabel htmlFor="sliderColor" className="text-xs">
                Cor da Barra
              </UILabel>
              <Input
                type="color"
                id="sliderColor"
                className="h-8 w-full p-1"
                value={component.props.sliderColor || '#FFFFFF'}
                onChange={(e) => onUpdate({ ...component.props, sliderColor: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <UILabel htmlFor="sliderIconColor" className="text-xs">
                Cor do Ícone
              </UILabel>
              <Input
                type="color"
                id="sliderIconColor"
                className="h-8 w-full p-1"
                value={component.props.sliderIconColor || '#000000'}
                onChange={(e) => onUpdate({ ...component.props, sliderIconColor: e.target.value })}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
