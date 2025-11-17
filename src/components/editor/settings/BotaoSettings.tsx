'use client';

import { Input } from '@/components/ui/input';
import { Label as UILabel } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import type { CanvasComponentData, ComponentProps, Step } from '../types';

export const BotaoSettings = ({
  component,
  onUpdate,
  steps,
  activeStepId,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
  steps: Step[];
  activeStepId: number;
}) => {
  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Conteúdo</h3>
        <div className="space-y-3">
          <div>
            <UILabel htmlFor="text" className="text-xs">
              Texto do Botão
            </UILabel>
            <Input
              id="text"
              value={component.props.text || ''}
              onChange={(e) => onUpdate({ ...component.props, text: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <UILabel htmlFor="action" className="text-xs">
              Ação
            </UILabel>
            <Select
              value={component.props.action || 'next_step'}
              onValueChange={(value: 'next_step' | 'open_url' | 'go_to_step') =>
                onUpdate({ ...component.props, action: value })
              }
            >
              <SelectTrigger id="action" className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="next_step">Ir para próxima etapa</SelectItem>
                <SelectItem value="open_url">Abrir URL</SelectItem>
                <SelectItem value="go_to_step">Ir para etapa específica</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {component.props.action === 'open_url' && (
            <div>
              <UILabel htmlFor="url" className="text-xs">
                URL
              </UILabel>
              <Input
                id="url"
                value={component.props.url || ''}
                onChange={(e) => onUpdate({ ...component.props, url: e.target.value })}
                className="mt-1"
                placeholder="https://..."
              />
            </div>
          )}
          {component.props.action === 'go_to_step' && (
            <div>
              <UILabel htmlFor="stepId" className="text-xs">
                Etapa de Destino
              </UILabel>
              <Select
                value={component.props.stepId?.toString()}
                onValueChange={(value) =>
                  onUpdate({ ...component.props, stepId: parseInt(value) })
                }
              >
                <SelectTrigger id="stepId" className="mt-1">
                  <SelectValue placeholder="Selecione uma etapa" />
                </SelectTrigger>
                <SelectContent>
                  {steps
                    .filter((step) => step.id !== activeStepId)
                    .map((step) => (
                      <SelectItem key={step.id} value={step.id.toString()}>
                        {step.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Estilo</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <UILabel htmlFor="fullWidth">Largura Total</UILabel>
            <Switch
              id="fullWidth"
              checked={component.props.fullWidth}
              onCheckedChange={(checked) => onUpdate({ ...component.props, fullWidth: checked })}
            />
          </div>
          <div>
            <UILabel htmlFor="variant" className="text-xs">
              Modelo
            </UILabel>
            <Select
              value={component.props.variant || 'default'}
              onValueChange={(
                value: 'default' | 'destructive' | 'outline' | 'ghost' | 'link' | 'secondary'
              ) => onUpdate({ ...component.props, variant: value })}
            >
              <SelectTrigger id="variant" className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Padrão</SelectItem>
                <SelectItem value="destructive">Destrutivo</SelectItem>
                <SelectItem value="outline">Bordas</SelectItem>
                <SelectItem value="secondary">Relevo</SelectItem>
                <SelectItem value="ghost">Fantasma</SelectItem>
                <SelectItem value="link">Link</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Personalização</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <UILabel htmlFor="bg-color" className="text-xs">
              Cor do Fundo
            </UILabel>
            <Input
              type="color"
              id="bg-color"
              className="h-8 w-full p-1"
              value={component.props.backgroundColor || '#000000'}
              onChange={(e) => onUpdate({ ...component.props, backgroundColor: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="text-color" className="text-xs">
              Cor do Texto
            </UILabel>
            <Input
              type="color"
              id="text-color"
              className="h-8 w-full p-1"
              value={component.props.textColor || '#ffffff'}
              onChange={(e) => onUpdate({ ...component.props, textColor: e.target.value })}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
