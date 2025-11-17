'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label as UILabel } from '@/components/ui/label';
import type { Step } from '../types';

export const StepSettings = ({
  step,
  onUpdateStep,
}: {
  step: Step;
  onUpdateStep: (id: number, name: string) => void;
  steps: Step[];
}) => {
  const [stepName, setStepName] = useState(step.name);

  useEffect(() => {
    setStepName(step.name);
  }, [step]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStepName(e.target.value);
  };

  const handleNameBlur = () => {
    if (stepName.trim() === '') {
      setStepName(step.name); // revert if empty
    } else {
      onUpdateStep(step.id, stepName);
    }
  };

  return (
    <>
      <div>
        <h3 className="text-sm font-medium text-muted-foreground">Título da Etapa</h3>
        <Input
          value={stepName}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          className="mt-2 text-base"
        />
      </div>
      <Separator />
      <div>
        <h3 className="text-sm font-medium text-muted-foreground">Header</h3>
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <UILabel htmlFor="show-logo">Mostrar Logo</UILabel>
            <Switch id="show-logo" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <UILabel htmlFor="show-progress">Mostrar Progresso</UILabel>
            <Switch id="show-progress" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <UILabel htmlFor="allow-back">Permitir Voltar</UILabel>
            <Switch id="allow-back" defaultChecked />
          </div>
        </div>
      </div>
    </>
  );
};
