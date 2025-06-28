'use client';

import type { FC } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { Star, StarHalf, Quote } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { content } from '@/lib/content';
import type { Language } from './landing-page';
import { useEffect, useMemo } from 'react';

interface TestimonialsProps {
  language: Language;
}

export const Testimonials: FC<TestimonialsProps> = ({ language }) => {
  const testimonialsContent = content[language].testimonials;

  const randomizedTestimonials = useMemo(() => {
    const shuffled = [...testimonialsContent.items].sort(() => 0.5 - Math.random());
    return shuffled;
  }, [testimonialsContent.items]);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      '(min-width: 768px)': {
        slides: { perView: 2, spacing: 16 },
      },
      '(min-width: 1024px)': {
        slides: { perView: 3, spacing: 16 },
      },
    },
  });

  useEffect(() => {
    if (!instanceRef.current) return;

    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 3000);

    return () => clearInterval(interval);
  }, [instanceRef]);

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        
        {/* Average Rating */}
        <div className="flex flex-col items-center mb-10">
          <p className="text-lg font-medium mb-1 text-muted-foreground">Average Rating</p>
          <div className="flex items-center">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            <StarHalf className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="ml-2 text-sm text-muted-foreground">4.5 / 5</span>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
          {testimonialsContent.title}
        </h2>

        <div ref={sliderRef} className="keen-slider">
          {randomizedTestimonials.map((testimonial, index) => (
            <div key={index} className="keen-slider__slide">
              <Card className="flex flex-col h-full border border-border bg-card rounded-xl p-6">
                <CardHeader className="flex justify-center pb-4">
                  <Quote className="w-8 h-8 text-primary" />
                </CardHeader>
                <CardContent className="flex-grow text-center">
                  <p className="italic text-base text-muted-foreground leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col items-center mt-4">
                  <div className="flex items-center mb-2">
                    {Array(4)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                    <StarHalf className="w-4 h-4 text-yellow-400 fill-current" />
                  </div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
