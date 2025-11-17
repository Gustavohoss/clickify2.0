
'use client';

import { useEffect, useState } from 'react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where, limit } from 'firebase/firestore';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, BookOpen, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Lesson = {
  id: string;
  title: string;
};

type Module = {
  id: string;
  name: string;
  coverImageUrl?: string;
  lessons?: Lesson[];
};

type MemberArea = {
  id: string;
  name: string;
  slug: string;
  modules?: Module[];
};

export default function ModulePage() {
  const { slug, moduleId } = useParams() as { slug: string; moduleId: string };
  const router = useRouter();
  const firestore = useFirestore();

  const [area, setArea] = useState<MemberArea | null>(null);
  const [module, setModule] = useState<Module | null>(null);

  const areasQuery = useMemoFirebase(
    () =>
      firestore && slug
        ? query(collection(firestore, 'memberAreas'), where('slug', '==', slug), limit(1))
        : null,
    [firestore, slug]
  );

  const { data: memberAreas, isLoading } = useCollection<MemberArea>(areasQuery);

  useEffect(() => {
    if (memberAreas && memberAreas.length > 0) {
      const currentArea = memberAreas[0];
      setArea(currentArea);
      const currentModule = currentArea.modules?.find(m => m.id === moduleId);
      setModule(currentModule || null);
    }
  }, [memberAreas, moduleId]);
  
  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">Carregando...</div>;
  }

  if (!area || !module) {
    return <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">Módulo não encontrado.</div>;
  }

  return (
    <div className="w-full min-h-screen bg-[#1A202C] text-white">
      <header className="p-4 flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.push(`/membros/${slug}`)} className="gap-2">
            <ArrowLeft size={16} />
            Voltar
        </Button>
      </header>
      <main className="p-8 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="w-full md:w-1/3">
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-gray-800">
                    {module.coverImageUrl ? (
                    <Image
                        src={module.coverImageUrl}
                        alt={`Capa do ${module.name}`}
                        layout="fill"
                        objectFit="cover"
                    />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-gray-500">
                        <span>{module.name}</span>
                        </div>
                    )}
                </div>
            </div>
            <div className="w-full md:w-2/3">
                <h1 className="text-3xl font-bold">{module.name}</h1>
                <p className="text-gray-400 mt-2">
                    {module.lessons?.length || 0} aulas neste módulo.
                </p>

                <div className="mt-8 space-y-3">
                    {module.lessons && module.lessons.length > 0 ? (
                        module.lessons.map((lesson, index) => (
                            <button 
                                key={lesson.id}
                                onClick={() => router.push(`/membros/${slug}/aulas/${lesson.id}`)}
                                className="w-full text-left flex items-center gap-4 p-4 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                            >
                                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-sm font-bold text-gray-400">
                                    {index + 1}
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-medium">{lesson.title}</h3>
                                </div>
                                <CheckCircle className="h-5 w-5 text-green-500 opacity-50" />
                            </button>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-gray-700 py-16 text-center">
                            <BookOpen size={40} className="text-gray-600" />
                            <h3 className="text-lg font-semibold">Nenhum conteúdo aqui</h3>
                            <p className="text-gray-500">Ainda não há aulas neste módulo.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
