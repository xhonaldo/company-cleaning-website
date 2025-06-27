'use client';

import type { FC, Dispatch, SetStateAction } from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { content } from '@/lib/content';
import type { Language } from './landing-page';
import { cn } from '@/lib/utils';

interface HeaderProps {
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
}

export const Header: FC<HeaderProps> = ({ language, setLanguage }) => {
  const navContent = content[language].nav;

  const navLinks = [
    { href: '#services', label: navContent.services },
    { href: '#gallery', label: navContent.gallery },
    { href: '#testimonials', label: navContent.testimonials },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <a href="#" className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">BlitzBlank</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-primary">
              {link.label}
            </a>
          ))}
          <Button asChild>
            <a href="#booking">{navContent.contact}</a>
          </Button>
        </nav>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage('en')}
            className={cn('font-semibold', language === 'en' ? 'text-primary' : 'text-muted-foreground')}
          >
            EN
          </Button>
          <span className="text-muted-foreground">/</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage('de')}
            className={cn('font-semibold', language === 'de' ? 'text-primary' : 'text-muted-foreground')}
          >
            DE
          </Button>
        </div>
      </div>
    </header>
  );
};
