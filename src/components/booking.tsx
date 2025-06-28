'use client';

import type { FC } from 'react';
import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { bookCleaningAction } from '@/lib/actions';
import { content } from '@/lib/content';
import type { Language } from './landing-page';

interface BookingProps {
  language: Language;
}

const initialState = {
  message: undefined,
  errors: undefined,
  success: false,
};

function SubmitButton({ text, loadingText }: { text: string, loadingText: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full mt-4">
      {pending ? loadingText : text}
    </Button>
  );
}

export const Booking: FC<BookingProps> = ({ language }) => {
  const { toast } = useToast();
  const [state, formAction] = useFormState(bookCleaningAction, initialState);
  const bookingContent = content[language].booking;
  const servicesContent = content[language].services;

  useEffect(() => {
    if (state.success) {
      toast({
        title: 'Success!',
        description: state.message,
      });
    } else if (state.message) {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <Card id="request-for-service" className="shadow-lg">
      <CardHeader>
        <CardTitle>{servicesContent.title}</CardTitle>
        <CardDescription>{servicesContent.items.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div>
            <Input name="name" placeholder={bookingContent.name} aria-label="Name" />
            {state?.errors?.name && <p className="text-sm text-destructive mt-1">{state.errors.name[0]}</p>}
          </div>
          <div>
            <Input name="phone" placeholder={bookingContent.phone} aria-label="Phone Number" />
            {state?.errors?.phone && <p className="text-sm text-destructive mt-1">{state.errors.phone[0]}</p>}
          </div>
          <div>
            <Input name="email" type="email" placeholder={bookingContent.email} aria-label="Email" />
            {state?.errors?.email && <p className="text-sm text-destructive mt-1">{state.errors.email[0]}</p>}
          </div>
          <div>
            <Select name="service">
              <SelectTrigger aria-label="Service">
                <SelectValue placeholder={bookingContent.selectService} />
              </SelectTrigger>
              <SelectContent>
                {servicesContent.items.map((service, index) => (
                  <SelectItem key={index} value={service.title}>{service.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {state?.errors?.service && <p className="text-sm text-destructive mt-1">{state.errors.service[0]}</p>}
          </div>
          <div>
            <Textarea name="message" placeholder={bookingContent.messagePlaceholder} aria-label="Message" />
            {state?.errors?.message && <p className="text-sm text-destructive mt-1">{state.errors.message[0]}</p>}
          </div>
          <SubmitButton text={bookingContent.button} loadingText={bookingContent.buttonLoading} />
        </form>
      </CardContent>
    </Card>
  );
};
