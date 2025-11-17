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

  const renderLink = (link: any) => {
    if (link.enabled) {
      return (
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold underline"
        >
          {link.text}
        </a>
      );
    }
    return <span className="font-bold underline cursor-default">{link.text}</span>;
  };

  return (
    <p
      className={cn('w-full', `text-${termosTextAlign}`, fontSizeClasses[termosFontSize])}
      style={{ color: termosTextColor }}
    >
      {mainText}{' '}
      {links.map((link: any, index: number) => (
        <React.Fragment key={link.id}>
          {renderLink(link)}
          {index < links.length - 2 ? ', ' : index === links.length - 2 ? ' e ' : ''}
        </React.Fragment>
      ))}
    </p>
  );
};
