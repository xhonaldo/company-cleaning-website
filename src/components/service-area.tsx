'use client';

import type { FC } from 'react';
import Image from 'next/image';
import { content } from '@/lib/content';
import type { Language } from './landing-page';

interface ServiceAreaProps {
  language: Language;
}

export const ServiceArea: FC<ServiceAreaProps> = ({ language }) => {
  const serviceAreaContent = content[language].serviceArea;
  
  return (
    <section id="service-area" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{serviceAreaContent.title}</h2>
        <p className="max-w-3xl mx-auto text-muted-foreground mb-8">{serviceAreaContent.description}</p>
        <div className="max-w-4xl mx-auto rounded-lg overflow-hidden shadow-xl">
          <Image 
            src="https://placehold.co/1200x600.png"
            alt="Map of Germany"
            width={1200}
            height={600}
            className="w-full h-auto"
            data-ai-hint="map Germany"
          />
        </div>
      </div>
    </section>
  );
};
