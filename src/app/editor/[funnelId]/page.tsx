'use client';

import React, { Suspense, useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useDebouncedCallback } from 'use-debounce';
import { StandardFunnelEditor } from '@/components/editor/StandardFunnelEditor';
import { TypebotEditor } from '@/components/editor/TypebotEditor';
import type { Funnel, Step } from '@/components/editor/types';


function FunnelEditorContent() {
  const { funnelId } = useParams() as { funnelId: string };
  const firestore = useFirestore();

  const funnelRef = useMemoFirebase(
    () => (funnelId ? doc(firestore, 'funnels', funnelId) : null),
    [firestore, funnelId]
  );
  const { data: funnelData, isLoading } = useDoc<Omit<Funnel, 'id'>>(funnelRef);

  const [funnel, setFunnel] = useState<Funnel | null>(null);
  
  const debouncedUpdateFunnel = useDebouncedCallback((updatedFunnel: Funnel) => {
    if (funnelRef) {
      const funnelToSave = JSON.parse(JSON.stringify(updatedFunnel));
      
      funnelToSave.steps.forEach((step: Step) => {
        step.components.forEach((component: any) => {
          if (component.props && component.props.icon) {
            delete component.props.icon;
          }
        });
      });
      
      const { id, ...rest } = funnelToSave;
      updateDoc(funnelRef, rest);
    }
  }, 500);

  useEffect(() => {
    if (funnel) {
      debouncedUpdateFunnel(funnel);
    }
  }, [funnel, debouncedUpdateFunnel]);

  useEffect(() => {
    if (funnelData) {
      const initialFunnel: Funnel = {
        id: funnelId,
        name: funnelData.name,
        type: funnelData.type,
        userId: funnelData.userId,
        steps: funnelData.steps || [{ id: Date.now(), name: 'Etapa 1', components: [] }],
      };
      setFunnel(initialFunnel);
    }
  }, [funnelData, funnelId]);

  if (isLoading || !funnel) {
    return (
      <div className="flex h-screen items-center justify-center">
        Carregando editor...
      </div>
    );
  }

  if (funnel.type === 'typebot') {
    return <TypebotEditor funnel={funnel} setFunnel={setFunnel} debouncedUpdateFunnel={debouncedUpdateFunnel} />;
  }

  return <StandardFunnelEditor 
    funnel={funnel}
    setFunnel={setFunnel}
    debouncedUpdateFunnel={debouncedUpdateFunnel}
  />;
}

export default function EditorPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <FunnelEditorContent />
    </Suspense>
  );
}
