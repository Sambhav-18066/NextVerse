
'use server';

/**
 * @fileOverview A course generation AI agent.
 * 
 * - generateCourseFromTopic - A function that handles the course generation process.
 * - GenerateCourseInput - The input type for the generateCourseFromTopic function.
 * - GenerateCourseOutput - The return type for the generateCourseFromTopic function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateCourseInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate a course.'),
});
export type GenerateCourseInput = z.infer<typeof GenerateCourseInputSchema>;

const GenerateCourseOutputSchema = z.object({
  id: z.string().describe('A unique, URL-friendly identifier for the course (e.g., "intro-to-python").'),
  title: z.string().describe('The title of the course.'),
  description: z.string().describe('A brief description of the course content.'),
  subject: z.string().describe('The general subject area of the course (e.g., "Engineering", "Health Science", "Computer Science").'),
  image: z.string().describe('A placeholder image ID. For now, always use "future-of-ai-course".'),
  videos: z.array(
    z.object({
      id: z.string().describe('A unique, URL-friendly identifier for the video (e.g., "python-basics").'),
      title: z.string().describe('The title of the video lesson.'),
      youtubeId: z.string().describe('A placeholder YouTube video ID. For now, always use "iR2O2GPbB0E".'),
    })
  ).length(4).describe('An array of four video lessons for the course.'),
});
export type GenerateCourseOutput = z.infer<typeof GenerateCourseOutputSchema>;


export async function generateCourseFromTopic(input: GenerateCourseInput): Promise<GenerateCourseOutput> {
  return generateCourseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCoursePrompt',
  input: { schema: GenerateCourseInputSchema },
  output: { schema: GenerateCourseOutputSchema },
  prompt: `You are an expert curriculum developer for an online learning platform. Your task is to generate a complete course structure based on a given topic.

  The user wants a course about: {{{topic}}}

  Please generate a comprehensive course structure including:
  1.  A unique, URL-friendly course ID (e.g., "introduction-to-calculus").
  2.  A compelling course title.
  3.  A concise and engaging course description.
  4.  The general subject area (e.g., Engineering, Health Science, Art, etc.).
  5.  An array of exactly four video lessons. Each video should have:
      - A unique, URL-friendly video ID (e.g., "limits-and-continuity").
      - A descriptive title.
      - A placeholder YouTube ID.
  
  IMPORTANT: For now, for every video, you MUST use the placeholder YouTube ID "iR2O2GPbB0E". For the course image, you MUST use the placeholder ID "future-of-ai-course".

  Return the response in a valid JSON format that matches the output schema.
  `,
});


const generateCourseFlow = ai.defineFlow(
  {
    name: 'generateCourseFlow',
    inputSchema: GenerateCourseInputSchema,
    outputSchema: GenerateCourseOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
