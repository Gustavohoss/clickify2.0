
'use client';

import { useEffect, useState, useMemo } from 'react';
import { useCollection, useFirestore, useMemoFirebase, useUser } from '@/firebase';
import { collection, query, where, limit } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import ReactPlayer from 'react-player/lazy';

type Lesson = {
  id: string;
  title: string;
  videoUrl?: string;
};

type Module = {
  id: string;
  name: string;
  lessons?: Lesson[];
};

type MemberArea = {
  id: string;
  name: string;
  slug: string;
  modules?: Module[];
};

export default function LessonPage() {
  const { slug, lessonId } = useParams() as { slug: string; lessonId: string };
  const firestore = useFirestore();
  const { user } = useUser();

  const [area, setArea] = useState<MemberArea | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  
  const areasQuery = useMemoFirebase(
    () => (firestore && slug ? query(collection(firestore, 'memberAreas'), where('slug', '==', slug), limit(1)) : null),
    [firestore, slug]
  );
  
  const { data: memberAreas, isLoading } = useCollection<MemberArea>(areasQuery);

  useEffect(() => {
    if (memberAreas && memberAreas.length > 0) {
      const currentArea = memberAreas[0];
      setArea(currentArea);

      if (currentArea.modules) {
        for (const module of currentArea.modules) {
          const lesson = module.lessons?.find(l => l.id === lessonId);
          if (lesson) {
            setCurrentLesson(lesson);
            setCurrentModule(module);
            break;
          }
        }
      }
    }
  }, [memberAreas, lessonId]);

  if (isLoading || !area) {
    return <div className="flex h-full items-center justify-center bg-gray-900 text-white">Carregando...</div>;
  }
  
  if (!currentLesson) {
    return <div className="flex h-full items-center justify-center bg-gray-900 text-white">Aula não encontrada.</div>;
  }

  return (
    <>
      <div className="flex-1 relative">
          {currentLesson.videoUrl ? (
              <ReactPlayer
                  url={currentLesson.videoUrl}
                  width="100%"
                  height="100%"
                  controls
                  playing
                  key={lessonId}
              />
          ) : (
              <div className="w-full h-full flex items-center justify-center bg-black">
                  <p>Vídeo não disponível.</p>
              </div>
          )}
      </div>
      <footer className="bg-[#2D3748] p-4 flex justify-between items-center border-t border-gray-700">
          <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                  <AvatarImage src={user?.photoURL || ''} />
                  <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                  <p className="text-xs text-gray-400">Modulo {currentModule?.name}</p>
                  <h3 className="font-semibold">{currentLesson.title}</h3>
              </div>
          </div>
          <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-gray-500 fill-current" />
              ))}
          </div>
      </footer>
    </>
  );
}
