'use client';

import React from 'react';
import type { CanvasComponentData, ArgumentItem } from '../types';
import { WavingHandIcon } from './WavingHandIcon';

export const ArgumentoCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const items = component.props.items || [];
  const layout = component.props.layout || 'list';

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center text-black bg-white rounded-lg border border-gray-200">
        <div className="mb-2">
          <WavingHandIcon />
        </div>
        <h3 className="text-base font-bold">Argumento</h3>
        <p className="mt-1 text-sm text-gray-500">Lorem ipsum dollor sit amet</p>
      </div>
    );
  }

  const layoutClasses: { [key: string]: string } = {
    list: 'space-y-4',
    '2-cols': 'grid md:grid-cols-2 gap-4',
    '3-cols': 'grid md:grid-cols-3 gap-4',
    '4-cols': 'grid md:grid-cols-4 gap-4',
  };

  return (
    <div className={layoutClasses[layout]}>
      {items.map((item: ArgumentItem) => (
        <div key={item.id} className="flex items-start gap-4 text-black">
          <div className="text-2xl mt-1">{item.icon}</div>
          <div>
            <h4 className="font-bold">{item.title}</h4>
            <div className="text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: item.description }} />
          </div>
        </div>
      ))}
    </div>
  );
};
