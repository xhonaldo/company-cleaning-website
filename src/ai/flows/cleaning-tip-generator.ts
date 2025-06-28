'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const CleaningTipInputSchema = z.object({ location: z.string() });
export type CleaningTipInput = z.infer<typeof CleaningTipInputSchema>;

const CleaningTipOutputSchema = z.object({ cleaningTip: z.string() });
export type CleaningTipOutput = z.infer<typeof CleaningTipOutputSchema>;

const cleaningTipPrompt = ai.definePrompt({
  name: 'cleaningTipPrompt',
  input: { schema: CleaningTipInputSchema },
  output: { schema: CleaningTipOutputSchema },
  prompt: `You are a cleaning expert. Provide a helpful cleaning tip based on the following location:

Location: {{{location}}}

Tip:`,
});

const cleaningTipFlow = ai.defineFlow(
  { name: 'cleaningTipFlow', inputSchema: CleaningTipInputSchema, outputSchema: CleaningTipOutputSchema },
  async (input) => {
    const { output } = await cleaningTipPrompt(input);
    console.log("output", output)
    return output!;
  }
);

export async function generateCleaningTip(input: CleaningTipInput): Promise<CleaningTipOutput> {
  return cleaningTipFlow(input);
}
