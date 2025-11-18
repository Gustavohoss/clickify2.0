
'use client';

import * as React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const ColorPicker = ({ label, color, onChange }: { label: string, color: string, onChange: (color: string) => void }) => (
  <div className="space-y-2">
    <Label className="text-sm text-muted-foreground">{label}</Label>
    <div className="relative h-10 w-full rounded-md border border-input overflow-hidden">
      <Input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div className="h-full w-full" style={{ backgroundColor: color }} />
    </div>
  </div>
);

const ColorsContent = ({
  primaryColor, setPrimaryColor,
  backgroundColor, setBackgroundColor,
  titleColor, setTitleColor,
  textColor, setTextColor,
  interactiveTextColor, setInteractiveTextColor
}: {
  primaryColor: string, setPrimaryColor: (c: string) => void,
  backgroundColor: string, setBackgroundColor: (c: string) => void,
  titleColor: string, setTitleColor: (c: string) => void,
  textColor: string, setTextColor: (c: string) => void,
  interactiveTextColor: string, setInteractiveTextColor: (c: string) => void
}) => {

    return (
        <Card className="border-none bg-transparent p-4 shadow-none">
            <div className="space-y-4">
            <ColorPicker label="Primária" color={primaryColor} onChange={setPrimaryColor} />
            <ColorPicker label="Fundo" color={backgroundColor} onChange={setBackgroundColor} />
            <ColorPicker label="Títulos" color={titleColor} onChange={setTitleColor} />
            <ColorPicker label="Textos" color={textColor} onChange={setTextColor} />
            <ColorPicker label="Textos Interativos" color={interactiveTextColor} onChange={setInteractiveTextColor} />
            </div>
        </Card>
    );
}

interface DesignSettingsProps {
    primaryColor: string;
    setPrimaryColor: (color: string) => void;
    backgroundColor: string;
    setBackgroundColor: (color: string) => void;
    titleColor: string;
    setTitleColor: (color: string) => void;
    textColor: string;
    setTextColor: (color: string) => void;
    interactiveTextColor: string;
    setInteractiveTextColor: (color: string) => void;
}

export const DesignSettings: React.FC<DesignSettingsProps> = (props) => {
  const settings = [
    { title: 'GERAL', content: 'Configurações gerais em breve.' },
    { title: 'HEADER', content: 'Configurações de header em breve.' },
    { title: 'CORES', content: <ColorsContent {...props} /> },
    { title: 'TIPOGRAFIA', content: 'Configurações de tipografia em breve.' },
    { title: 'ANIMAÇÃO', content: 'Configurações de animação em breve.' },
  ];

  return (
    <div className="w-full">
       <Accordion type="single" collapsible className="w-full">
         {settings.map((setting) => (
            <AccordionItem value={setting.title} key={setting.title}>
                <AccordionTrigger className="py-4 px-2 text-sm font-semibold uppercase text-foreground hover:no-underline [&>svg]:hidden">
                  {setting.title}
                </AccordionTrigger>
                <AccordionContent className="p-0">
                  {typeof setting.content === 'string' ? (
                     <p className="p-4 text-sm text-muted-foreground">{setting.content}</p>
                  ) : (
                    setting.content
                  )}
                </AccordionContent>
            </AccordionItem>
         ))}
      </Accordion>
    </div>
  );
};
