'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import type { CanvasComponentData } from '../types';
import { WavingHandIcon } from './WavingHandIcon';

export const MarquiseCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const { marquiseItems = [], speed = 20, direction = 'left', pauseOnHover = true } =
    component.props;

  if (marquiseItems.length === 0) {
    return (
      <div className="border-0 bg-transparent p-6 text-center shadow-none">
        <div className="mb-4 flex justify-center">
          <WavingHandIcon />
        </div>
        <h3 className="text-lg font-bold text-black">Marquise</h3>
        <p className="mt-1 text-gray-500">Adicione itens para começar</p>
      </div>
    );
  }

  const animationName = `scroll-${direction}`;
  const animationDuration = `${marquiseItems.length * (60 / speed)}s`;

  const marquiseGroup = (
    <div
      className={cn(
        'flex shrink-0 items-center justify-around [animation-play-state:running]',
        pauseOnHover && 'group-hover:[animation-play-state:paused]'
      )}
      style={{
        animation: `${animationName} ${animationDuration} linear infinite`,
      }}
    >
      {marquiseItems.map((item, index) => (
        <div key={index} className="relative w-[300px] max-w-full shrink-0 px-4">
          <div className="relative rounded-lg border border-black/10 bg-white p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border">
                <AvatarImage src={item.avatarUrl} alt={item.name} />
                <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-black">{item.name}</p>
                <p className="text-sm text-gray-500">{item.handle}</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-700">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
      <div className="group flex w-full overflow-hidden">
        {marquiseGroup}
        {marquiseGroup}
      </div>
    </>
  );
};
