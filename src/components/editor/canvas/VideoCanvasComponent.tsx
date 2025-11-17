'use client';

import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Video } from 'lucide-react';
import type { CanvasComponentData } from '../types';

export const VideoCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const { videoUrl = '', showControls = true, autoplayVideo = false, loopVideo = false } =
    component.props;
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!videoUrl) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-md border-2 border-dashed bg-gray-100">
        <div className="text-center text-gray-500">
          <Video className="mx-auto h-12 w-12" />
          <p className="mt-2 text-sm font-semibold text-black">Adicione um vídeo</p>
          <p className="mt-1 text-xs text-gray-500">Insira uma URL nas configurações.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-md">
      {hasMounted && (
        <ReactPlayer
          url={videoUrl}
          width="100%"
          height="100%"
          controls={showControls}
          playing={autoplayVideo}
          loop={loopVideo}
          className="absolute top-0 left-0"
        />
      )}
    </div>
  );
};
