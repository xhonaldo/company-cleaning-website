'use client';

import type { FC } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { content } from '@/lib/content';
import type { Language } from './landing-page';

interface HeroProps {
  language: Language;
}

export const Hero: FC<HeroProps> = ({ language }) => {
  const heroContent = content[language].hero;

  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center text-center text-white">
      <Image
        src="/assets/5.jpg"
        alt="Clean and bright living room"
        layout="fill"
        objectFit="cover"
        className="brightness-50"
        data-ai-hint="bright clean home"
      />
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 animate-fade-in-up">
          {heroContent.headline}
        </h1>
        <p className="text-lg md:text-xl text-neutral-200 mb-8 max-w-2xl mx-auto">
          {heroContent.subheading}
        </p>
        <Button size="lg" asChild>
          <a href="#booking">{heroContent.button}</a>
        </Button>
      </div>
    </section>
  );
};
