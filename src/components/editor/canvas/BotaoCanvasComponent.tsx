'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { CanvasComponentData } from '../types';
import { useRouter } from 'next/navigation';

interface BotaoCanvasComponentProps {
  component: CanvasComponentData;
  onNextStep?: () => void;
  onGoToStep?: (stepId: number) => void;
}

export const BotaoCanvasComponent = ({ component, onNextStep, onGoToStep }: BotaoCanvasComponentProps) => {
  const router = useRouter();
  const {
    text = 'Continuar',
    fullWidth = true,
    variant = 'default',
    backgroundColor,
    textColor,
    action = 'next_step',
    url,
    stepId,
  } = component.props;

  const handleClick = () => {
    switch (action) {
      case 'next_step':
        onNextStep?.();
        break;
      case 'open_url':
        if (url) {
          window.open(url, '_blank');
        }
        break;
      case 'go_to_step':
        if (stepId && onGoToStep) {
          onGoToStep(stepId);
        }
        break;
      default:
        onNextStep?.();
        break;
    }
  };

  return (
    <Button
      variant={variant}
      className={cn(fullWidth && 'w-full')}
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
      }}
      onClick={handleClick}
    >
      {text}
    </Button>
  );
};
