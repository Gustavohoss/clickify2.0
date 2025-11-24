'use client';

import React, { Suspense } from 'react';
import Head from 'next/head';
import { useParams } from 'next/navigation';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { Funnel } from '@/components/editor/types';

import { TypebotPublicViewer } from '@/components/editor/TypebotPublicViewer';
import { QuizPublicViewer } from '@/components/editor/QuizPublicViewer';

function FunnelPublicContent() {
  const { funnelId } = useParams() as { funnelId: string };
  const firestore = useFirestore();

  const funnelRef = useMemoFirebase(
    () => (funnelId ? doc(firestore, 'funnels', funnelId) : null),
    [firestore, funnelId]
  );

  const { data: funnel, isLoading } = useDoc<Funnel>(funnelRef);

  if (isLoading) {
    return <div className="flex h-screen w-screen items-center justify-center bg-gray-900 text-white">Carregando Funil...</div>;
  }
  
  if (!funnel || !funnel.isPublished) {
    return <div className="flex h-screen w-screen items-center justify-center bg-gray-900 text-white">Funil não encontrado ou não está publicado.</div>;
  }

  return (
    <>
      <Head>
        <title>{funnel.name || 'Funil'}</title>
      </Head>
      {funnel.type === 'typebot' ? <TypebotPublicViewer /> : <QuizPublicViewer funnel={funnel} />}
    </>
  );
}

export default function FunnelPublicPage() {
  return (
    <Suspense fallback={<div className="flex h-screen w-screen items-center justify-center bg-gray-900 text-white">Carregando Funil...</div>}>
      <FunnelPublicContent />
    </Suspense>
  );
}
