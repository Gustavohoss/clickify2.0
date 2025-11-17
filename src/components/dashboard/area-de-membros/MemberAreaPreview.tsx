
'use client';

import Image from 'next/image';
import { Progress } from '@/components/ui/progress';

type Module = {
  id: string;
  name: string;
  coverImageUrl?: string;
  lessons?: { id: string }[];
};

type MemberArea = {
  name: string;
  headerImageUrl?: string;
  modules?: Module[];
};

type MemberAreaPreviewProps = {
  area: MemberArea;
};

export function MemberAreaPreview({ area }: MemberAreaPreviewProps) {
  const totalModules = area.modules?.length || 0;

  return (
    <div className="w-full h-full bg-gray-900 rounded-2xl border-4 border-gray-700 shadow-2xl overflow-hidden">
      <div className="w-full h-full bg-[#1A202C] text-white overflow-y-auto">
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {area.modules?.map(module => (
                <div key={module.id} className="group cursor-pointer">
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
                    <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                        {module.lessons?.length || 0} Aula{module.lessons?.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
