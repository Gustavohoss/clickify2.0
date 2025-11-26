'use client';

import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { CanvasComponentData } from '../types';
import { modelIcons } from '../types';

export const AlertCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const {
    title,
    description,
    backgroundColor,
    textColor,
    borderColor,
    model = 'success',
  } = component.props;
  const IconComponent = modelIcons[model];

  const style = {
    '--alert-bg': backgroundColor,
    '--alert-border': borderColor,
    '--alert-text': textColor,
  } as React.CSSProperties;

  return (
    <Alert style={style}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          {React.isValidElement(IconComponent)
            ? React.cloneElement(IconComponent as React.ReactElement, {
                className: 'h-5 w-5',
                style: { color: textColor },
              })
            : null}
        </div>
        <div className="flex-grow">
          <AlertTitle>{title || 'Título do Alerta'}</AlertTitle>
          <AlertDescription>
            {description || 'Esta é a descrição do alerta.'}
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
};
