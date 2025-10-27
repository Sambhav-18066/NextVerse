'use server';

/**
 * @fileOverview A quiz question generator AI agent.
 *
 * - generateQuizQuestions - A function that handles the quiz question generation process.
 * - GenerateQuizQuestionsInput - The input type for the generateQuizQuestions function.
 * - GenerateQuizQuestionsOutput - The return type for the generateQuizQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuizQuestionsInputSchema = z.object({
  videoContent: z
    .string()
    .describe(
      'The transcript or summary of the video content for which quiz questions need to be generated.'
    ),
  numberOfQuestions: z
    .number()
    .int()
    .min(1)
    .max(10)
    .describe('The number of quiz questions to generate.'),
});
export type GenerateQuizQuestionsInput = z.infer<
  typeof GenerateQuizQuestionsInputSchema
>;

const GenerateQuizQuestionsOutputSchema = z.object({
  questions: z.array(
    z.object({
      question: z.string().describe('The quiz question.'),
      options: z
        .array(z.string().describe('The answer option.'))
        .length(4)
        .describe('Four answer options for the question.'),
      correctAnswerIndex: z
        .number()
        .int()
        .min(0)
        .max(3)
        .describe('The index of the correct answer in the options array.'),
    })
  ).describe('An array of quiz questions with options and correct answers.'),
});
export type GenerateQuizQuestionsOutput = z.infer<
  typeof GenerateQuizQuestionsOutputSchema
>;

export async function generateQuizQuestions(
  input: GenerateQuizQuestionsInput
): Promise<GenerateQuizQuestionsOutput> {
  return generateQuizQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuizQuestionsPrompt',
  input: {schema: GenerateQuizQuestionsInputSchema},
  output: {schema: GenerateQuizQuestionsOutputSchema},
  prompt: `You are an expert teacher generating quizzes for students based on video content.

  Generate {{numberOfQuestions}} quiz questions based on the following video content.

  Video Content: {{{videoContent}}}

  Each question should have four answer options, and clearly indicate the index of the correct answer.
  Ensure that the questions are relevant to the video content and test the student's understanding of the key concepts.

  The response should be in JSON format. The "questions" field should be an array of question objects. Each question object should have a "question" field, an "options" field (an array of four strings), and a "correctAnswerIndex" field (an integer between 0 and 3 indicating the index of the correct answer in the options array).
`,
});

const generateQuizQuestionsFlow = ai.defineFlow(
  {
    name: 'generateQuizQuestionsFlow',
    inputSchema: GenerateQuizQuestionsInputSchema,
    outputSchema: GenerateQuizQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
