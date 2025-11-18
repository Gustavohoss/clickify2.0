
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useParams } from 'next/navigation';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { Funnel, Step } from '@/components/editor/types.tsx';
import { CanvasComponent } from '@/components/editor/canvas/CanvasComponent';

function FunnelPublicContent() {
  const { funnelId } = useParams() as { funnelId: string };
  const firestore = useFirestore();

  const funnelRef = useMemoFirebase(
    () => (funnelId ? doc(firestore, 'funnels', funnelId) : null),
    [firestore, funnelId]
  );
  const { data: funnelData, isLoading } = useDoc<Omit<Funnel, 'id'>>(funnelRef);

  const [activeStepIndex, setActiveStepIndex] = useState(0);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Carregando funil...
      </div>
    );
  }

  if (!funnelData) {
    return (
      <div className="flex h-screen items-center justify-center">
        Funil não encontrado.
      </div>
    );
  }

  const steps = funnelData.steps as Step[];
  const activeStep = steps?.[activeStepIndex];

  if (!activeStep) {
    return (
        <div className="flex h-screen items-center justify-center">
            Nenhuma etapa encontrada neste funil.
        </div>
    );
  }

  const handleNextStep = () => {
    if (activeStepIndex < steps.length - 1) {
      setActiveStepIndex(activeStepIndex + 1);
    } else {
      console.log('Fim do funil');
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-background">
      <div className="mx-auto w-full max-w-sm space-y-4">
        {activeStep.components.map((comp) => (
          <CanvasComponent
            key={comp.id}
            component={comp}
            isSelected={false}
            onClick={() => {}}
            onDuplicate={() => {}}
            onDelete={() => {}}
            onOptionClick={handleNextStep}
          />
        ))}
      </div>
    </main>
  );
}

export default function FunnelPublicPage() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <FunnelPublicContent />
        </Suspense>
    )
}

    