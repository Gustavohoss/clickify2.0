'use client';

import { Input } from '@/components/ui/input';
import { Label as UILabel } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Trash2, Grip, Star } from 'lucide-react';
import type { CanvasComponentData, ComponentProps } from '../types';
import { cn } from '@/lib/utils';

export const CartesianoSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  const data = component.props.chartData || [];

  const handleUpdateDataPoint = (
    id: number,
    key: 'name' | 'value' | 'indicatorLabel' | 'isFeatured',
    value: string | number | boolean
  ) => {
    const newData = data.map((item) => (item.id === id ? { ...item, [key]: value } : item));
    onUpdate({ ...component.props, chartData: newData });
  };

  const handleAddDataPoint = () => {
    const newPoint = {
      id: Date.now(),
      name: `Ponto ${data.length + 1}`,
      value: Math.floor(Math.random() * 100),
      indicatorLabel: '',
      isFeatured: false,
    };
    onUpdate({ ...component.props, chartData: [...data, newPoint] });
  };

  const handleDeleteDataPoint = (id: number) => {
    const newData = data.filter((item) => item.id !== id);
    onUpdate({ ...component.props, chartData: newData });
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Conteúdo</h3>
        <div>
          <UILabel htmlFor="chartTitle" className="text-xs">
            Título
          </UILabel>
          <Input
            id="chartTitle"
            value={component.props.chartTitle || 'Cartesiano'}
            onChange={(e) => onUpdate({ ...component.props, chartTitle: e.target.value })}
            className="mt-1"
          />
        </div>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Pontos de Dados</h3>
        <ScrollArea className="h-[25rem]">
          <div className="space-y-3 pr-4">
            {data.map((point) => (
              <Card key={point.id} className="relative bg-card p-3 space-y-3">
                <div className="absolute top-2 left-2 flex items-center justify-center text-muted-foreground">
                  <Grip className="h-4 w-4 cursor-grab" />
                </div>
                <div className="absolute top-2 right-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 shrink-0 text-muted-foreground hover:text-destructive"
                    onClick={() => handleDeleteDataPoint(point.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-8">
                  <Input
                    value={point.name}
                    onChange={(e) => handleUpdateDataPoint(point.id, 'name', e.target.value)}
                    className="h-9"
                    placeholder="Rótulo"
                  />
                  <Input
                    type="number"
                    value={point.value}
                    onChange={(e) => handleUpdateDataPoint(point.id, 'value', Number(e.target.value))}
                    className="h-9"
                    placeholder="Valor"
                  />
                </div>
                <div className="relative">
                   <button
                    onClick={() => handleUpdateDataPoint(point.id, 'isFeatured', !point.isFeatured)}
                    className={cn(
                        "absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors",
                        point.isFeatured && "text-yellow-400"
                    )}
                   >
                    <Star className={cn("h-4 w-4", point.isFeatured && "fill-current")} />
                   </button>
                  <Input
                    value={point.indicatorLabel}
                    onChange={(e) =>
                      handleUpdateDataPoint(point.id, 'indicatorLabel', e.target.value)
                    }
                    className="h-9 pl-8"
                    placeholder="Texto do indicador..."
                  />
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
        <Button variant="outline" className="mt-4 w-full" onClick={handleAddDataPoint}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Item
        </Button>
      </Card>
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Estilo</h3>
        <div className="space-y-4">
          <div>
            <UILabel htmlFor="chartColor" className="text-xs">
              Cor
            </UILabel>
            <Select
              value={`${component.props.gradientStartColor || ''}-${
                component.props.gradientEndColor || ''
              }`}
              onValueChange={(value) => {
                const [start, end] = value.split('-');
                onUpdate({ ...component.props, gradientStartColor: start, gradientEndColor: end });
              }}
            >
              <SelectTrigger id="chartColor" className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hsl(var(--primary))-hsl(var(--primary))">Tema</SelectItem>
                <SelectItem value="#16A34A-#EF4444">Verde para Vermelho</SelectItem>
                <SelectItem value="#EF4444-#16A34A">Vermelho para Verde</SelectItem>
                <SelectItem value="#A0AEC0-#A0AEC0">Cinza</SelectItem>
                <SelectItem value="#EF4444-#EF4444">Perigo</SelectItem>
                <SelectItem value="#10B981-#10B981">Sucesso</SelectItem>
                <SelectItem value="#F59E0B-#F59E0B">Atenção</SelectItem>
                <SelectItem value="#3B82F6-#3B82F6">Informativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <UILabel htmlFor="showArea">Mostrar área?</UILabel>
            <Switch
              id="showArea"
              checked={component.props.showArea}
              onCheckedChange={(checked) => onUpdate({ ...component.props, showArea: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <UILabel htmlFor="showGrid">Mostrar grade?</UILabel>
            <Switch
              id="showGrid"
              checked={component.props.showGrid}
              onCheckedChange={(checked) => onUpdate({ ...component.props, showGrid: checked })}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
