'use client';

import type { FC } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getCleaningTipAction } from '@/lib/actions';
import { content } from '@/lib/content';
import type { Language } from './landing-page';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface AiCleanTipProps {
  language: Language;
}

const initialState = {
  tip: undefined,
  message: undefined,
  errors: undefined,
};

function SubmitButton({ text, loadingText }: { text: string; loadingText: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
      {pending ? loadingText : text}
    </Button>
  );
}

export const AiCleanTip: FC<AiCleanTipProps> = ({ language }) => {
  const { toast } = useToast();
  const [state, formAction] = useFormState(getCleaningTipAction, initialState);
  const tipContent = content[language].aiCleanTip;

  useEffect(() => {
    if (state?.message && state.message !== 'Success') {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-primary" />
          {tipContent.title}
        </CardTitle>
        <CardDescription>{tipContent.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div>
            <Input
              name="location"
              placeholder={tipContent.placeholder}
              aria-label="Location for cleaning tip"
            />
            {state?.errors?.location && (
              <p className="text-sm text-destructive mt-1">{state.errors.location[0]}</p>
            )}
          </div>
          <SubmitButton text={tipContent.button} loadingText={tipContent.loading} />
        </form>
        {state?.tip && (
          <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-primary-foreground font-medium text-card-foreground">{state.tip}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
