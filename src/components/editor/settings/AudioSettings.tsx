'use client';

import { Input } from '@/components/ui/input';
import { Label as UILabel } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import type { CanvasComponentData, ComponentProps } from '../types';

export const AudioSettings = ({
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
            <UILabel htmlFor="sendTime" className="text-xs">
              Horário de Envio
            </UILabel>
            <Input
              id="sendTime"
              type="time"
              value={component.props.sendTime || ''}
              onChange={(e) => onUpdate({ ...component.props, sendTime: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <UILabel htmlFor="audioUrl" className="text-xs">
              URL do Áudio
            </UILabel>
            <Input
              id="audioUrl"
              value={component.props.audioUrl || ''}
              onChange={(e) => onUpdate({ ...component.props, audioUrl: e.target.value })}
              className="mt-1"
              placeholder="https://example.com/audio.mp3"
            />
          </div>
          <div>
            <UILabel htmlFor="avatarUrl" className="text-xs">
              URL do Avatar
            </UILabel>
            <Input
              id="avatarUrl"
              value={component.props.avatarUrl || ''}
              onChange={(e) => onUpdate({ ...component.props, avatarUrl: e.target.value })}
              className="mt-1"
              placeholder="https://..."
            />
          </div>
        </div>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Configurações</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <UILabel htmlFor="showAvatar">Mostrar Avatar</UILabel>
            <Switch
              id="showAvatar"
              checked={component.props.showAvatar}
              onCheckedChange={(checked) => onUpdate({ ...component.props, showAvatar: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <UILabel htmlFor="autoplay">Autoplay</UILabel>
            <Switch
              id="autoplay"
              checked={component.props.autoplay}
              onCheckedChange={(checked) => onUpdate({ ...component.props, autoplay: checked })}
            />
          </div>
        </div>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Personalização</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <UILabel htmlFor="bg-color" className="text-xs">
              Fundo
            </UILabel>
            <Input
              type="color"
              id="bg-color"
              className="h-8 w-full p-1"
              value={component.props.bgColor || '#005C4B'}
              onChange={(e) => onUpdate({ ...component.props, bgColor: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="progress-color" className="text-xs">
              Progresso
            </UILabel>
            <Input
              type="color"
              id="progress-color"
              className="h-8 w-full p-1"
              value={component.props.progressColor || '#00A884'}
              onChange={(e) => onUpdate({ ...component.props, progressColor: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="icon-color" className="text-xs">
              Ícones
            </UILabel>
            <Input
              type="color"
              id="icon-color"
              className="h-8 w-full p-1"
              value={component.props.iconColor || '#8696A0'}
              onChange={(e) => onUpdate({ ...component.props, iconColor: e.target.value })}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
