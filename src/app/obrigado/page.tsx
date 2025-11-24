'use client';

import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function ObrigadoPage() {
  const [hasMounted, setHasMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleContinueClick = () => {
    router.push('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          Obrigado!
        </h1>
        <p className="text-lg text-gray-300">
          Assista ao vídeo abaixo para os próximos passos.
        </p>
        
        <div className="aspect-video w-full overflow-hidden rounded-lg shadow-2xl shadow-primary/20 border-2 border-primary/30 bg-black">
          {hasMounted && (
            <ReactPlayer
              url="https://www.youtube.com/watch?v=HWjCStB6k4o"
              width="100%"
              height="100%"
              controls={true}
            />
          )}
        </div>

        <Button 
          onClick={handleContinueClick} 
          size="lg" 
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg w-full max-w-sm"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
