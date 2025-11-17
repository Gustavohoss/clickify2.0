'use client';

import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Mic, Pause, Play, CheckCheck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import type { CanvasComponentData } from '../types';

export const AudioCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const {
    audioUrl = '',
    avatarUrl = 'https://picsum.photos/seed/audio-avatar/40/40',
    showAvatar = true,
    autoplay = false,
    bgColor = '#005C4B',
    progressColor = '#00A884',
    iconColor = '#8696A0',
  } = component.props;

  const [playerRef, setPlayerRef] = useState<ReactPlayer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (autoplay && isReady) {
      setIsPlaying(true);
    }
  }, [autoplay, isReady]);

  const togglePlayPause = () => {
    if (isReady) {
      setIsPlaying(!isPlaying);
    }
  };

  const handleSliderChange = (value: number[]) => {
    const seekTime = value[0];
    setPlayedSeconds(seekTime);
    playerRef?.seekTo(seekTime, 'seconds');
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div
      className="flex w-full max-w-sm items-center gap-2 rounded-lg p-2"
      style={{ backgroundColor: bgColor }}
    >
      {hasMounted && (
        <ReactPlayer
          ref={setPlayerRef}
          url={audioUrl}
          playing={isPlaying}
          onReady={() => setIsReady(true)}
          onDuration={setDuration}
          onProgress={(state) => setPlayedSeconds(state.playedSeconds)}
          onEnded={() => setIsPlaying(false)}
          width="0"
          height="0"
        />
      )}
      {showAvatar && (
        <div className="relative">
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatarUrl} alt="Avatar" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div
            className="absolute bottom-[-2px] right-[-2px] rounded-full p-0.5"
            style={{ backgroundColor: bgColor }}
          >
            <Mic className="h-3 w-3" style={{ color: progressColor }} />
          </div>
        </div>
      )}
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 flex-shrink-0"
        onClick={togglePlayPause}
        disabled={!audioUrl || !isReady}
      >
        {isPlaying ? (
          <Pause className="h-6 w-6" style={{ color: iconColor }} />
        ) : (
          <Play className="h-6 w-6" style={{ color: iconColor }} />
        )}
      </Button>
      <div className="flex flex-grow flex-col justify-center">
        <Slider
          value={[playedSeconds]}
          max={duration || 100}
          step={0.1}
          onValueChange={handleSliderChange}
          disabled={!isReady}
          className="w-full [&>span:first-child]:h-1 [&>span:first-child>span]:bg-transparent"
          style={
            {
              '--slider-track': progressColor,
              '--slider-thumb': progressColor,
              '--slider-track-bg': 'white',
            } as React.CSSProperties
          }
        />
        <div className="mt-1 flex justify-between text-xs" style={{ color: iconColor }}>
          <span>{formatTime(playedSeconds)}</span>
          <div className="flex items-center gap-1">
            <span>{formatTime(duration)}</span>
            <CheckCheck className="h-4 w-4" style={{ color: progressColor }} />
          </div>
        </div>
      </div>
    </div>
  );
};
