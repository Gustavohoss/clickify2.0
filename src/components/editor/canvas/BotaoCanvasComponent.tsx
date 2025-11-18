'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { CanvasComponentData } from '../types';

export const BotaoCanvasComponent = ({ component, onClick }: { component: CanvasComponentData, onClick?: () => void }) => {
  const {
    text = 'Continuar',
    fullWidth = true,
    variant = 'default',
    backgroundColor,
    textColor,
  } = component.props;

  return (
    <Button
      variant={variant}
      className={cn(fullWidth && 'w-full')}
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};
