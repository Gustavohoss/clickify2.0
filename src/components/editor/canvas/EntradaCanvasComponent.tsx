'use client';

import { Input } from '@/components/ui/input';
import { Label as UILabel } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { CanvasComponentData } from '../types';

export const EntradaCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const {
    label = 'Seu e-mail',
    placeholder = 'Digite aqui...',
    inputType = 'text',
    required = false,
    textAlign = 'left',
    fontSize = 'base',
    padding = 'base',
    backgroundColor,
    textColor,
    borderColor,
  } = component.props;

  const fontSizeClasses: { [key: string]: string } = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
  };

  const paddingClasses: { [key: string]: string } = {
    sm: 'h-8 px-2 py-1',
    base: 'h-10 px-3 py-2',
    lg: 'h-12 px-4 py-3',
  };

  return (
    <div className="w-full space-y-2">
      <UILabel htmlFor={`input-${component.id}`} className="text-black">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </UILabel>
      <Input
        id={`input-${component.id}`}
        type={inputType}
        placeholder={placeholder}
        className={cn(
          `text-${textAlign}`,
          'border-gray-300 bg-white text-black',
          fontSizeClasses[fontSize],
          paddingClasses[padding]
        )}
        style={{
          backgroundColor,
          color: textColor,
          borderColor,
        }}
      />
    </div>
  );
};
