'use client';

import { Input } from '@/components/ui/input';
import { Label as UILabel } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import type { CanvasComponentData, ComponentProps } from '../types';

export const VideoSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Configuração do Vídeo</h3>
        <div className="space-y-3">
          <div>
            <UILabel htmlFor="videoUrl" className="text-xs">
              URL do Vídeo
            </UILabel>
            <Input
              id="videoUrl"
              value={component.props.videoUrl || ''}
              onChange={(e) => onUpdate({ ...component.props, videoUrl: e.target.value })}
              className="mt-1"
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </div>
        </div>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Opções de Reprodução</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <UILabel htmlFor="showControls">Mostrar Controles</UILabel>
            <Switch
              id="showControls"
              checked={component.props.showControls}
              onCheckedChange={(checked) => onUpdate({ ...component.props, showControls: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <UILabel htmlFor="autoplayVideo">Autoplay</UILabel>
            <Switch
              id="autoplayVideo"
              checked={component.props.autoplayVideo}
              onCheckedChange={(checked) =>
                onUpdate({ ...component.props, autoplayVideo: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <UILabel htmlFor="loopVideo">Loop</UILabel>
            <Switch
              id="loopVideo"
              checked={component.props.loopVideo}
              onCheckedChange={(checked) => onUpdate({ ...component.props, loopVideo: checked })}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
