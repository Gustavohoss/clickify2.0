'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'next/navigation';
import { initializeFirebase } from '@/firebase';
import { getFirestore, collection, query, where, limit, getDocs, doc, getDoc } from 'firebase/firestore';
import type { Funnel, CanvasBlock, ButtonItem, ImageChoice } from './types.tsx';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar.tsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowRight, ArrowLeft, Video, Phone, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import { TypingIndicator } from './typebot/ui/TypingIndicator.tsx';
import { staticShowcaseFunnels } from '@/lib/showcase-funnels-data';

type PreviewMessageType = {
  id: number;
  sender: 'bot' | 'user';
  content: string;
  isTyping?: boolean;
};

const PreviewButtons = ({ buttons, onButtonClick, sender }: { buttons: ButtonItem[], onButtonClick: (buttonIndex: number) => void, sender: 'bot' | 'user' }) => {
    return (
        <div className={cn("flex gap-2 my-2 flex-wrap", sender === 'user' ? 'justify-end' : 'justify-start')}>
            {buttons.map((button, index) => (
                <Button
                    key={index}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={() => onButtonClick(index)}
                >
                    {button.text}
                </Button>
            ))}
        </div>
    );
};

const PreviewImageChoices = ({ choices, onImageClick }: { choices: ImageChoice[], onImageClick: (choiceIndex: number) => void }) => {
    return (
        <div className="flex flex-col items-end gap-2 my-2">
            {choices.map((choice, index) => (
                <button
                    key={index}
                    className="w-48 rounded-lg overflow-hidden border-2 border-transparent hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    onClick={() => onImageClick(index)}
                >
                    <div className="relative aspect-video">
                        <Image
                            src={choice.imageUrl}
                            alt={`Choice ${index + 1}`}
                            layout="fill"
                            objectFit="cover"
                        />
                         <div className="absolute bottom-0 w-full h-1/4 bg-orange-500/80 backdrop-blur-sm" />
                    </div>
                </button>
            ))}
        </div>
    );
};

const WhatsAppCheck = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 16 15" width="16" height="15" className={cn("text-blue-400", className)}>
        <path fill="currentColor" d="M10.91 3.316l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.516.002l-.41.383a.365.365 0 0 0 .003.512l3.238 3.238a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" />
        <path fill="currentColor" d="M15.263 3.316l-.478-.372a.365.365 0 0 0-.51.063l-6.272 8.048a.32.32 0 0 1-.484.033l-.78-.78a.365.365 0 0 0-.513.512l1.218 1.218a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" />
    </svg>
);

const PreviewMessageItem = React.memo(({ message }: { message: PreviewMessageType }) => {
    if (message.sender === 'bot') {
      return (
        <div className="flex items-start gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://s3.typebot.io/public/workspaces/cm8gbxl5b000ba3ncy4y16grd/typebots/cmi0sldz2000djl043bd6dtvj/blocks/e8vsn1pelzr1o22gyvomkn6l?v=1763544631191" alt="Bot" />
            <AvatarFallback>C</AvatarFallback>
          </Avatar>
          <div className="bg-[#202c33] rounded-lg rounded-tl-none p-3 max-w-[80%] text-white">
            {message.isTyping ? <TypingIndicator /> : <div dangerouslySetInnerHTML={{ __html: message.content }} />}
          </div>
        </div>
      );
    }
    return (
      <div className="flex justify-end">
        <div className="bg-[#005c4b] text-white rounded-lg rounded-br-none p-3 max-w-[80%]">
          <p className="text-sm">{message.content}</p>
        </div>
      </div>
    );
});
PreviewMessageItem.displayName = 'PreviewMessageItem';

const TypebotPreviewHeader = ({ name, avatarUrl }: { name: string; avatarUrl: string }) => (
    <div className="flex items-center p-2 bg-[#202c33] shrink-0">
        <Button variant="ghost" size="icon" className="h-10 w-10 text-white"><ArrowLeft /></Button>
        <Avatar className="h-10 w-10">
            <AvatarImage src={avatarUrl} alt={name}/>
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="ml-3">
            <div className="flex items-center gap-1.5">
                <p className="font-medium text-white">{name}</p>
                <WhatsAppCheck className="w-4 h-3.5" />
            </div>
            <p className="text-xs text-white/70">Online</p>
        </div>
        <div className="flex-grow" />
        <Button variant="ghost" size="icon" className="h-10 w-10 text-white"><Video /></Button>
        <Button variant="ghost" size="icon" className="h-10 w-10 text-white"><Phone /></Button>
        <Button variant="ghost" size="icon" className="h-10 w-10 text-white"><MoreHorizontal /></Button>
    </div>
);

type FlowState = {
  type: 'process';
  groupId: number;
  childIndex: number;
} | {
  type: 'wait_for_input';
  block: CanvasBlock;
} | {
  type: 'end';
};

export function TypebotPublicViewer({ funnelId }: { funnelId?: string }) {
    const params = useParams() as { funnelId?: string };
    const resolvedFunnelId = funnelId || params.funnelId;
    
    const [funnel, setFunnel] = useState<Funnel | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const [previewMessages, setPreviewMessages] = useState<PreviewMessageType[]>([]);
    const [userInput, setUserInput] = useState('');
    const [flowState, setFlowState] = useState<FlowState | null>(null);
    
    const previewVariablesRef = useRef<{ [key: string]: any }>({});
    
    useEffect(() => {
        const fetchFunnelData = async () => {
            if (!resolvedFunnelId) return;
            setIsLoading(true);
            try {
                // Check static funnels first
                const staticFunnel = staticShowcaseFunnels.find(f => f.id === resolvedFunnelId);
                if (staticFunnel && staticFunnel.funnelData) {
                    setFunnel(staticFunnel.funnelData);
                    return;
                }

                // If not static, fetch from Firestore
                const { firestore } = initializeFirebase();
                const funnelRef = doc(firestore, 'funnels', resolvedFunnelId);
                const funnelDoc = await getDoc(funnelRef);
                
                if (funnelDoc.exists()) {
                    setFunnel({ id: funnelDoc.id, ...funnelDoc.data() } as Funnel);
                }
            } catch (error) {
                console.error("Error fetching funnel:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchFunnelData();
    }, [resolvedFunnelId]);
    
    useEffect(() => {
      if (funnel) {
        setPreviewMessages([]);
        previewVariablesRef.current = {};
        const connections = (funnel as any)?.connections || [];
        const startConnection = connections.find((c: any) => c.from === 'start');
        if (startConnection) {
          setFlowState({ type: 'process', groupId: startConnection.to, childIndex: 0 });
        } else {
          setFlowState({ type: 'end' });
        }
      }
    }, [funnel]);

    useEffect(() => {
      if (flowState?.type !== 'process' || !funnel) {
        return;
      }
      
      const canvasBlocks = (funnel.steps as CanvasBlock[]) || [];
      const connections = (funnel as any)?.connections || [];

      let currentGroupId = flowState.groupId;
      let currentChildIndex = flowState.childIndex;
      let processing = true;

      const processNext = async () => {
        while (processing) {
          const currentGroup = canvasBlocks.find(b => b.id === currentGroupId);
          if (!currentGroup || !currentGroup.children || currentChildIndex >= currentGroup.children.length) {
            // End of group, find next connection
            const nextConnection = connections.find((c: any) => c.from === currentGroupId && c.buttonIndex === undefined);
            if (nextConnection) {
              currentGroupId = nextConnection.to;
              currentChildIndex = 0;
              continue; // Loop to process the new group
            } else {
              setFlowState({ type: 'end' });
              processing = false;
              return;
            }
          }

          const child = currentGroup.children[currentChildIndex];

          if (child.type.startsWith('input-')) {
            setFlowState({ type: 'wait_for_input', block: child });
            processing = false;
            return;
          }

          if (child.type === 'logic-wait') {
            const typingId = Date.now();
            setPreviewMessages(prev => [...prev, { id: typingId, sender: 'bot', isTyping: true, content: '' }]);
            if (child.props?.duration) {
              await new Promise(resolve => setTimeout(resolve, child.props.duration * 1000));
            }
            setPreviewMessages(prev => prev.filter(m => m.id !== typingId));
          } else if (child.props?.content) {
            const interpolatedContent = (child.props.content as string).replace(/{{\s*(\w+)\s*}}/g, (_, key) => {
              return previewVariablesRef.current[key] || `{{${key}}}`;
            });
            setPreviewMessages(prev => [...prev, { id: Date.now(), sender: 'bot', content: interpolatedContent }]);
          }
          currentChildIndex++;
        }
      };
      
      processNext().then(() => {
         if (processing) { // If loop finished without waiting for input
             setFlowState({ type: 'process', groupId: currentGroupId, childIndex: currentChildIndex });
         }
      });

    }, [flowState, funnel]);
    
    const continueFlow = (fromBlockId: number, buttonIndex?: number) => {
      const connections = (funnel as any)?.connections || [];
      const parentGroup = ((funnel?.steps || []) as CanvasBlock[]).find(g => g.children?.some(c => c.id === fromBlockId));

      let nextConnection;
      if (buttonIndex !== undefined) {
        nextConnection = connections.find((c:any) => c.from === fromBlockId && c.buttonIndex === buttonIndex);
      } else if (parentGroup) {
        const childIndex = parentGroup.children?.findIndex(c => c.id === fromBlockId) ?? -1;
        if (childIndex !== -1 && childIndex + 1 < (parentGroup.children?.length ?? 0)) {
           setFlowState({ type: 'process', groupId: parentGroup.id, childIndex: childIndex + 1 });
           return;
        }
        nextConnection = connections.find((c:any) => c.from === parentGroup.id && c.buttonIndex === undefined);
      }

      if (nextConnection) {
        setFlowState({ type: 'process', groupId: nextConnection.to, childIndex: 0 });
      } else {
        setFlowState({ type: 'end' });
      }
    };


    const handleUserButtonClick = (buttonIndex: number) => {
        if (flowState?.type !== 'wait_for_input') return;
        const waitingBlock = flowState.block;
        const clickedButton = waitingBlock.props.buttons[buttonIndex];
        if (!clickedButton) return;
        setPreviewMessages((prev) => [ ...prev, { id: Date.now(), sender: 'user', content: clickedButton.text }]);
        setFlowState(null); // Clear waiting state
        continueFlow(waitingBlock.id, buttonIndex);
    };
  
    const handleImageChoiceClick = (choiceIndex: number) => {
        if (flowState?.type !== 'wait_for_input') return;
        const waitingBlock = flowState.block;
        setFlowState(null);
        continueFlow(waitingBlock.id, choiceIndex);
    }

    const handleUserInput = () => {
        if (userInput.trim() === '' || flowState?.type !== 'wait_for_input') return;
        const waitingBlock = flowState.block;

        setPreviewMessages((prev) => [ ...prev, { id: Date.now(), sender: 'user', content: userInput }]);
        
        if (waitingBlock.props.variable) {
            previewVariablesRef.current[waitingBlock.props.variable] = userInput;
        }

        setUserInput('');
        setFlowState(null);
        continueFlow(waitingBlock.id);
    };

    if (isLoading) {
        return <div className="flex h-full w-full items-center justify-center bg-[#111821] text-white">Carregando Funil...</div>;
    }

    if (!funnel) {
         return <div className="flex h-full w-full items-center justify-center bg-[#111821] text-white">Este funil não está disponível no momento.</div>;
    }

    const {
        headerName = "Clickify",
        headerAvatarUrl = "https://s3.typebot.io/public/workspaces/cm8gbxl5b000ba3ncy4y16grd/typebots/cmi0sldz2000djl043bd6dtvj/blocks/e8vsn1pelzr1o22gyvomkn6l?v=1763544631191",
        backgroundColor = "#111821",
        backgroundImageUrl = "",
    } = funnel.props || {};

    const backgroundStyle = {
        backgroundColor,
        backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };
    
    const waitingBlock = flowState?.type === 'wait_for_input' ? flowState.block : null;

    return (
        <div className="flex h-full w-full flex-col" style={backgroundStyle}>
            <TypebotPreviewHeader name={headerName} avatarUrl={headerAvatarUrl} />
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4 max-w-2xl mx-auto w-full">
                    {previewMessages.map((message) => (
                        <PreviewMessageItem key={message.id} message={message} />
                    ))}
                </div>
            </ScrollArea>
            <div className="p-4 bg-transparent">
                <div className="max-w-2xl mx-auto w-full">
                    {waitingBlock?.type === 'input-buttons' ? (
                        <PreviewButtons buttons={waitingBlock.props.buttons || []} onButtonClick={handleUserButtonClick} sender="user" />
                    ) : waitingBlock?.type === 'input-pic' ? (
                        <PreviewImageChoices choices={waitingBlock.props.choices || []} onImageClick={handleImageChoiceClick} />
                    ) : (
                        <form onSubmit={(e) => { e.preventDefault(); handleUserInput(); }} className="flex items-center gap-2">
                            <Input placeholder="Digite sua resposta..." className="bg-[#2a3942] text-white border-[#3f3f46] focus:border-green-500 focus-visible:ring-0 placeholder:text-gray-500" value={userInput} onChange={(e) => setUserInput(e.target.value)} disabled={!waitingBlock} />
                            <Button type="submit" size="icon" className="h-10 w-10 bg-green-500 hover:bg-green-600 flex-shrink-0" disabled={!waitingBlock}>
                                <ArrowRight size={16} className="text-white" />
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
