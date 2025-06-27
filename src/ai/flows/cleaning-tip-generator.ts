'use server';

/**
 * @fileOverview Provides tailored cleaning tips based on user location and common allergens/pollutants.
 *
 * - generateCleaningTip - A function that generates cleaning tips based on location.
 * - CleaningTipInput - The input type for the generateCleaningTip function.
 * - CleaningTipOutput - The return type for the generateCleaningTip function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CleaningTipInputSchema = z.object({location: z.string().describe('The location of the user.')});
export type CleaningTipInput = z.infer<typeof CleaningTipInputSchema>;

const CleaningTipOutputSchema = z.object({
  cleaningTip: z.string().describe('A tailored cleaning tip based on the user location.'),
});
export type CleaningTipOutput = z.infer<typeof CleaningTipOutputSchema>;

export async function generateCleaningTip(input: CleaningTipInput): Promise<CleaningTipOutput> {
  return cleaningTipFlow(input);
}

const cleaningTipPrompt = ai.definePrompt({
  name: 'cleaningTipPrompt',
  input: {schema: CleaningTipInputSchema},
  output: {schema: CleaningTipOutputSchema},
  prompt: `You are a helpful cleaning assistant that provides cleaning tips based on the user's location.

  Location: {{{location}}}

  Provide a cleaning tip that is tailored to the user's location, taking into account common allergens and pollutants in the area.
  What is one unique cleaning tip that would be helpful for them to know?`,
});

const cleaningTipFlow = ai.defineFlow(
  {name: 'cleaningTipFlow', inputSchema: CleaningTipInputSchema, outputSchema: CleaningTipOutputSchema},
  async input => {
    const {output} = await cleaningTipPrompt(input);
    return output!;
  }
);
