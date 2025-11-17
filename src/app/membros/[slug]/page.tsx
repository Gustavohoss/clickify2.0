'use client';

import { useEffect, useState } from 'react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where, limit } from 'firebase/firestore';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { Play } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import ReactPlayer from 'react-player/lazy';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

type Lesson = {
  id: string;
  title: string;
  videoUrl?: string;
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
  headerImageUrl?: string;
  modules?: Module[];
};

export default function MemberAreaPublicPage() {
  const { slug } = useParams() as { slug: string };
  const router = useRouter();
  const firestore = useFirestore();

  const [area, setArea] = useState<MemberArea | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<{ lesson: Lesson; module: Module } | null>(null);

  const areasQuery = useMemoFirebase(
    () => (firestore && slug ? query(collection(firestore, 'memberAreas'), where('slug', '==', slug), limit(1)) : null),
    [firestore, slug]
  );

  const { data: memberAreas, isLoading } = useCollection<MemberArea>(areasQuery);

  useEffect(() => {
    if (memberAreas && memberAreas.length > 0) {
      setArea(memberAreas[0]);
    }
  }, [memberAreas]);

  const handleModuleClick = (module: Module) => {
    if (!area || !module.lessons || module.lessons.length === 0) return;
    const firstLesson = module.lessons[0];
    setSelectedLesson({ lesson: firstLesson, module });
  };

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">Carregando área de membros...</div>;
  }

  if (!area) {
    return <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">Área de membros não encontrada.</div>;
  }
  
  const totalModules = area.modules?.length || 0;

  return (
    <div className="w-full h-screen bg-[#1A202C] text-white overflow-y-auto">
      <div className="relative h-60 w-full">
        {area.headerImageUrl ? (
          <Image
            src={area.headerImageUrl}
            alt="Header"
            layout="fill"
            objectFit="cover"
            className="opacity-50"
          />
        ) : (
          <div className="bg-gray-800 h-full w-full" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A202C] to-transparent" />
      </div>

      <div className="p-8 -mt-20 relative z-10">
        <h1 className="text-3xl font-bold">{area.name}</h1>
        <p className="text-gray-400 mt-1">{totalModules} Módulo{totalModules !== 1 ? 's' : ''}</p>

        <div className="mt-4 flex items-center gap-4">
          <Progress value={0} className="w-32 bg-gray-700 [&>div]:bg-green-500" />
          <span className="text-gray-400 text-sm">0%</span>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">Meus cursos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            {area.modules?.map(module => (
              <div key={module.id} className="group cursor-pointer" onClick={() => handleModuleClick(module)}>
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-gray-800 transition-transform group-hover:scale-105">
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
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                    {module.lessons?.length || 0} Aula{module.lessons?.length !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Dialog open={!!selectedLesson} onOpenChange={(isOpen) => !isOpen && setSelectedLesson(null)}>
        <DialogContent className="max-w-4xl w-full p-0 bg-[#1A202C] border-gray-700 shadow-2xl text-white flex flex-col h-[80vh]">
           {selectedLesson && (
            <>
              <DialogHeader className='p-4 border-b border-gray-700'>
                <DialogTitle>{selectedLesson.lesson.title}</DialogTitle>
                <DialogDescription className='text-gray-400'>{selectedLesson.module.name}</DialogDescription>
              </DialogHeader>
              <div className="flex-1 relative bg-black">
                {selectedLesson.lesson.videoUrl ? (
                  <ReactPlayer
                    url={selectedLesson.lesson.videoUrl}
                    width="100%"
                    height="100%"
                    controls
                    playing
                    key={selectedLesson.lesson.id}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <p>Vídeo não disponível.</p>
                  </div>
                )}
              </div>
              <footer className="bg-[#2D3748] p-4 flex justify-between items-center border-t border-gray-700">
                  <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                           <AvatarImage src={''} />
                           <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div>
                          <p className="text-xs text-gray-400">Modulo {selectedLesson.module.name}</p>
                          <h3 className="font-semibold">{selectedLesson.lesson.title}</h3>
                      </div>
                  </div>
                  <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-gray-500 fill-current" />
                      ))}
                  </div>
              </footer>
            </>
           )}
        </DialogContent>
      </Dialog>

    </div>
  );
}
