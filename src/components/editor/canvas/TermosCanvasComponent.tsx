'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import type { CanvasComponentData } from '../types';

export const TermosCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const {
    mainText = 'Ao clicar em alguma das opções, você concorda com os',
    links = [],
    termosTextColor = '#6B7280',
    termosFontSize = 'sm',
    termosTextAlign = 'center',
  } = component.props;

  const fontSizeClasses: { [key: string]: string } = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
  };

  return (
    <p
      className={cn('w-full', `text-${termosTextAlign}`, fontSizeClasses[termosFontSize])}
      style={{ color: termosTextColor }}
    >
      {mainText}{' '}
      {links.map((link, index) => (
        <React.Fragment key={link.id}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline"
          >
            {link.text}
          </a>
          {index < links.length - 2 ? ', ' : index === links.length - 2 ? ' e ' : ''}
        </React.Fragment>
      ))}
    </p>
  );
};
