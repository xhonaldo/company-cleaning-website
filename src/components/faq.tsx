'use client';

import type { FC } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'; // Assuming you have an Accordion component
import { content } from '@/lib/content';
import type { Language } from './landing-page'; // Assuming Language type is defined here

interface FaqProps {
  language: Language;
}

export const Faq: FC<FaqProps> = ({ language }) => {
  const faqContent = content[language].faq;

  return (
    <section id="faq" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {faqContent.title}
        </h2>
        <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
          {faqContent.items.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};