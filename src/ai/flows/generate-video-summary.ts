'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a summary of a video.
 *
 * It includes:
 * - generateVideoSummary: A function to generate a video summary.
 * - GenerateVideoSummaryInput: The input type for the generateVideoSummary function.
 * - GenerateVideoSummaryOutput: The output type for the generateVideoSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateVideoSummaryInputSchema = z.object({
  videoUrl: z.string().describe('The URL of the video to summarize.'),
});
export type GenerateVideoSummaryInput = z.infer<typeof GenerateVideoSummaryInputSchema>;

const GenerateVideoSummaryOutputSchema = z.object({
  summary: z.string().describe('A summary of the key points in the video.'),
});
export type GenerateVideoSummaryOutput = z.infer<typeof GenerateVideoSummaryOutputSchema>;

export async function generateVideoSummary(input: GenerateVideoSummaryInput): Promise<GenerateVideoSummaryOutput> {
  return generateVideoSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateVideoSummaryPrompt',
  input: {schema: GenerateVideoSummaryInputSchema},
  output: {schema: GenerateVideoSummaryOutputSchema},
  prompt: `You are an AI expert in video summarization. Please summarize the key points of the video at the following URL: {{{videoUrl}}}. Provide a concise and informative summary. Focus on extracting the core concepts and main ideas presented in the video.`,
});

const generateVideoSummaryFlow = ai.defineFlow(
  {
    name: 'generateVideoSummaryFlow',
    inputSchema: GenerateVideoSummaryInputSchema,
    outputSchema: GenerateVideoSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
