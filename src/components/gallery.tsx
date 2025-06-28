'use client';

import type { FC } from 'react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { content } from '@/lib/content';
import type { Language } from './landing-page';

interface GalleryProps {
  language: Language;
}

const galleryImages = [
  {
    src: "/assets/1.jpg",
    alt: "A sparkling clean kitchen",
    hint: "clean kitchen"
  },
  {
    src: "/assets/2.jpg",
    alt: "A tidy and organized office space",
    hint: "organized office"
  },
  {
    src: "/assets/3.jpg",
    alt: "A pristine and shiny bathroom",
    hint: "sparkling bathroom"
  },
  {
    src: "/assets/4.jpg",
    alt: "A living room with gleaming floors",
    hint: "gleaming floors"
  },
  {
    src: "/assets/6.jpg",
    alt: "A bedroom with fresh linens",
    hint: "fresh bedroom"
  },
];

export const Gallery: FC<GalleryProps> = ({ language }) => {
  const galleryContent = content[language].gallery;

  return (
    <section id="gallery" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{galleryContent.title}</h2>
        <Carousel className="w-full max-w-4xl mx-auto" opts={{ loop: true }}>
          <CarouselContent>
            {galleryImages.map((image, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-video items-center justify-center p-0 overflow-hidden rounded-lg">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                        data-ai-hint={image.hint}
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};
