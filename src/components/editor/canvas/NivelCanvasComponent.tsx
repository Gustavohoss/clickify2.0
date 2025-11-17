'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Slider } from '@/components/ui/slider';
import type { CanvasComponentData } from '../types';

export const NivelCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const {
    title = 'Nível',
    subtitle = 'Lorem ipsum',
    value = 75,
    tooltipText = 'Você está aqui',
    showTooltip = true,
    nivelTrackColor = '#E5E7EB',
    nivelProgressColor = '#111827',
    nivelThumbColor = '#FFFFFF',
    tooltipColor = '#111827',
    tooltipTextColor = '#FFFFFF',
  } = component.props;

  const labels = ['Baixo', 'Médio', 'Alto'];
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipWidth, setTooltipWidth] = useState(0);

  useEffect(() => {
    if (tooltipRef.current) {
      setTooltipWidth(tooltipRef.current.offsetWidth);
    }
  }, [tooltipText]);

  return (
    <div className="mx-auto w-full max-w-md p-4">
      <div className="mb-1 flex items-end justify-between">
        <div>
          <h4 className="font-bold text-black">{title}</h4>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <span className="font-semibold text-gray-600">{value}%</span>
      </div>
      <div className="relative">
        <Slider
          value={[value]}
          max={100}
          step={1}
          disabled
          className="w-full"
          style={
            {
              '--slider-track': nivelProgressColor,
              '--slider-thumb': nivelThumbColor,
              '--slider-track-bg': nivelTrackColor,
            } as React.CSSProperties
          }
        />
        {showTooltip && (
          <div
            ref={tooltipRef}
            className="absolute bottom-full mb-3"
            style={{
              left: `${value}%`,
              transform: `translateX(calc(-50% + ${tooltipWidth * ((50 - value) / 100)}px))`,
            }}
          >
            <div
              className="relative rounded-md px-3 py-1 text-sm"
              style={{ backgroundColor: tooltipColor, color: tooltipTextColor }}
            >
              {tooltipText}
              <div
                className="absolute top-full left-1/2 h-0 w-0 -translate-x-1/2 border-x-8 border-x-transparent border-t-[8px]"
                style={{ borderTopColor: tooltipColor }}
              />
            </div>
          </div>
        )}
      </div>
      <div className="mt-1 flex justify-between text-sm text-gray-500">
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
};
