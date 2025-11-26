'use client';

import { Input } from '@/components/ui/input';
import { Label as UILabel } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import type { CanvasComponentData, ComponentProps } from '../types';

export const ImagemSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Conteúdo da Imagem</h3>
        <div className="space-y-3">
          <div>
            <UILabel htmlFor="imageUrl" className="text-xs">
              URL da Imagem
            </UILabel>
            <Input
              id="imageUrl"
              value={component.props.imageUrl || ''}
              onChange={(e) => onUpdate({ ...component.props, imageUrl: e.target.value })}
              className="mt-1"
              placeholder="https://example.com/imagem.png"
            />
          </div>
          <div>
            <UILabel htmlFor="altText" className="text-xs">
              Texto Alternativo
            </UILabel>
            <Input
              id="altText"
              value={component.props.altText || ''}
              onChange={(e) => onUpdate({ ...component.props, altText: e.target.value })}
              className="mt-1"
              placeholder="Descrição da imagem"
            />
          </div>
        </div>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Estilo</h3>
        <div className="space-y-4">
          <div>
            <UILabel htmlFor="borderRadius" className="text-xs">
              Arredondamento da Borda
            </UILabel>
            <Select
              value={component.props.borderRadius || 'md'}
              onValueChange={(value: 'none' | 'sm' | 'md' | 'lg' | 'full') =>
                onUpdate({ ...component.props, borderRadius: value })
              }
            >
              <SelectTrigger id="borderRadius" className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Nenhum</SelectItem>
                <SelectItem value="sm">Pequeno</SelectItem>
                <SelectItem value="md">Médio</SelectItem>
                <SelectItem value="lg">Grande</SelectItem>
                <SelectItem value="full">Total (Círculo)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <UILabel htmlFor="imageSize" className="text-xs">
              Tamanho da Imagem
            </UILabel>
            <Select
              value={component.props.imageSize || 'full'}
              onValueChange={(value: 'small' | 'medium' | 'large' | 'full') =>
                onUpdate({ ...component.props, imageSize: value })
              }
            >
              <SelectTrigger id="imageSize" className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Pequeno</SelectItem>
                <SelectItem value="medium">Médio</SelectItem>
                <SelectItem value="large">Grande</SelectItem>
                <SelectItem value="full">Largura Total</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>
    </div>
  );
};
