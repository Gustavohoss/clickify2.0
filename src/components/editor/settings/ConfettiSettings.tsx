'use client';

import confetti from 'canvas-confetti';
import { Slider } from '@/components/ui/slider';
import { Label as UILabel } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { CanvasComponentData, ComponentProps } from '../types';

export const ConfettiSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Configuração do Efeito</h3>
        <div className="space-y-4">
          <div>
            <UILabel htmlFor="particleCount" className="text-xs">
              Quantidade de Partículas
            </UILabel>
            <Slider
              id="particleCount"
              min={10}
              max={500}
              step={10}
              value={[component.props.particleCount || 200]}
              onValueChange={(value) => onUpdate({ ...component.props, particleCount: value[0] })}
              className="mt-2"
            />
          </div>
          <div>
            <UILabel htmlFor="spread" className="text-xs">
              Espalhamento (Spread)
            </UILabel>
            <Slider
              id="spread"
              min={10}
              max={360}
              step={1}
              value={[component.props.spread || 70]}
              onValueChange={(value) => onUpdate({ ...component.props, spread: value[0] })}
              className="mt-2"
            />
          </div>
          <div>
            <UILabel className="text-xs">Origem da Explosão</UILabel>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div>
                <UILabel htmlFor="originX" className="text-xs">
                  Eixo X (%)
                </UILabel>
                <Slider
                  id="originX"
                  min={0}
                  max={1}
                  step={0.1}
                  value={[component.props.originX || 0.5]}
                  onValueChange={(value) => onUpdate({ ...component.props, originX: value[0] })}
                  className="mt-1"
                />
              </div>
              <div>
                <UILabel htmlFor="originY" className="text-xs">
                  Eixo Y (%)
                </UILabel>
                <Slider
                  id="originY"
                  min={0}
                  max={1}
                  step={0.1}
                  value={[component.props.originY || 0.6]}
                  onValueChange={(value) => onUpdate({ ...component.props, originY: value[0] })}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
          <Button
            className="w-full"
            variant="outline"
            onClick={() => {
              confetti({
                particleCount: component.props.particleCount,
                spread: component.props.spread,
                origin: { x: component.props.originX, y: component.props.originY },
              });
            }}
          >
            Testar Efeito
          </Button>
        </div>
      </Card>
    </div>
  );
};
