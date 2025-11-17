'use client';

import { Slider } from '@/components/ui/slider';
import { Label as UILabel } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import type { CanvasComponentData, ComponentProps } from '../types';

export const EspacadorSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Ajustes</h3>
        <div className="space-y-2">
          <UILabel htmlFor="height" className="text-xs">
            Altura ({component.props.height || 50}px)
          </UILabel>
          <Slider
            id="height"
            min={10}
            max={300}
            step={1}
            value={[component.props.height || 50]}
            onValueChange={(value) => onUpdate({ ...component.props, height: value[0] })}
            className="mt-2"
          />
        </div>
      </Card>
    </div>
  );
};
