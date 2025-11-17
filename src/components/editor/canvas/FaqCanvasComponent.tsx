'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { CanvasComponentData } from '../types';
import { WavingHandIcon } from './WavingHandIcon';

export const FaqCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const faqItems = component.props.faqItems || [];
  const { faqBackgroundColor, faqBorderColor, faqTextColor } = component.props;

  if (faqItems.length === 0) {
    return (
      <div className="border-0 bg-transparent p-6 text-center shadow-none">
        <div className="mb-4 flex justify-center">
          <WavingHandIcon />
        </div>
        <h3 className="text-lg font-bold text-black">FAQ</h3>
        <p className="mt-1 text-gray-500">Adicione perguntas para começar.</p>
      </div>
    );
  }

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full rounded-lg"
      style={{
        backgroundColor: faqBackgroundColor,
        borderColor: faqBorderColor,
        borderWidth: faqBorderColor ? '1px' : '',
      }}
    >
      {faqItems.map((item, index) => (
        <AccordionItem
          value={`item-${index}`}
          key={item.id}
          className="border-b"
          style={{ borderColor: faqBorderColor }}
        >
          <AccordionTrigger className="text-black" style={{ color: faqTextColor }}>
            {item.question}
          </AccordionTrigger>
          <AccordionContent
            className="text-gray-600"
            style={{ color: faqTextColor || '#4b5563' }}
          >
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
