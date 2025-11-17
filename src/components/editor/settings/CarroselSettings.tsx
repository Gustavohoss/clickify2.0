'use client';

import { Input } from '@/components/ui/input';
import { Label as UILabel } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Trash2 } from 'lucide-react';
import type { CanvasComponentData, ComponentProps, CarouselItemData } from '../types';

export const CarroselSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  const slides = component.props.slides || [];

  const handleUpdateSlide = (slideId: number, newValues: Partial<CarouselItemData>) => {
    const newSlides = slides.map((slide) =>
      slide.id === slideId ? { ...slide, ...newValues } : slide
    );
    onUpdate({ ...component.props, slides: newSlides });
  };

  const handleAddSlide = () => {
    const newSlide: CarouselItemData = {
      id: Date.now(),
      imageUrl: `https://picsum.photos/seed/${Date.now()}/400/300`,
      caption: 'Nova Legenda',
    };
    onUpdate({ ...component.props, slides: [...slides, newSlide] });
  };

  const handleDeleteSlide = (slideId: number) => {
    const newSlides = slides.filter((slide) => slide.id !== slideId);
    onUpdate({ ...component.props, slides: newSlides });
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Slides</h3>
        <ScrollArea className="h-[40rem]">
          <div className="space-y-4 pr-4">
            {slides.map((slide) => (
              <Card key={slide.id} className="relative bg-card p-3 space-y-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-1 h-7 w-7 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => handleDeleteSlide(slide.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <div className="space-y-2">
                  <div>
                    <UILabel htmlFor={`imageUrl-${slide.id}`} className="text-xs">
                      URL da Imagem
                    </UILabel>
                    <Input
                      id={`imageUrl-${slide.id}`}
                      value={slide.imageUrl}
                      onChange={(e) => handleUpdateSlide(slide.id, { imageUrl: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <UILabel htmlFor={`caption-${slide.id}`} className="text-xs">
                      Legenda
                    </UILabel>
                    <Input
                      id={`caption-${slide.id}`}
                      value={slide.caption}
                      onChange={(e) => handleUpdateSlide(slide.id, { caption: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
        <Button variant="outline" className="mt-4 w-full" onClick={handleAddSlide}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Slide
        </Button>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Interação</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <UILabel htmlFor="loop">Loop</UILabel>
            <Switch
              id="loop"
              checked={component.props.loop}
              onCheckedChange={(checked) => onUpdate({ ...component.props, loop: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <UILabel htmlFor="autoplayCarousel">Autoplay</UILabel>
            <Switch
              id="autoplayCarousel"
              checked={component.props.autoplayCarousel}
              onCheckedChange={(checked) =>
                onUpdate({ ...component.props, autoplayCarousel: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <UILabel htmlFor="showPagination">Paginação</UILabel>
            <Switch
              id="showPagination"
              checked={component.props.showPagination}
              onCheckedChange={(checked) =>
                onUpdate({ ...component.props, showPagination: checked })
              }
            />
          </div>
          <div>
            <UILabel htmlFor="autoplayDelay" className="text-xs">
              Delay do Autoplay
            </UILabel>
            <Input
              id="autoplayDelay"
              type="number"
              value={component.props.autoplayDelay || 2}
              onChange={(e) =>
                onUpdate({ ...component.props, autoplayDelay: Number(e.target.value) })
              }
              className="mt-1"
            />
          </div>
        </div>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Personalização</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <UILabel htmlFor="arrowColor" className="text-xs">
              Cor
            </UILabel>
            <Input
              type="color"
              id="arrowColor"
              className="h-8 w-full p-1"
              value={component.props.arrowColor || '#000000'}
              onChange={(e) => onUpdate({ ...component.props, arrowColor: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="arrowTextColor" className="text-xs">
              Texto
            </UILabel>
            <Input
              type="color"
              id="arrowTextColor"
              className="h-8 w-full p-1"
              value={component.props.arrowTextColor || '#ffffff'}
              onChange={(e) => onUpdate({ ...component.props, arrowTextColor: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="arrowBorderColor" className="text-xs">
              Borda
            </UILabel>
            <Input
              type="color"
              id="arrowBorderColor"
              className="h-8 w-full p-1"
              value={component.props.arrowBorderColor || '#DDDDDD'}
              onChange={(e) => onUpdate({ ...component.props, arrowBorderColor: e.target.value })}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
