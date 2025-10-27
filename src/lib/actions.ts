
'use server';

import { generateQuizQuestions } from '@/ai/flows/generate-quiz-questions';
import { generateVideoSummary } from '@/ai/flows/generate-video-summary';
import { z } from 'zod';
import { getVideoById } from './data';
import type { QuizQuestion } from './types';

const summarySchema = z.object({
  summary: z.string(),
});

const quizSchema = z.object({
  questions: z.array(
    z.object({
      question: z.string(),
      options: z.array(z.string()).length(4),
      correctAnswerIndex: z.number().min(0).max(3),
    })
  ),
});

export type SummaryState = {
  summary?: string;
  error?: string;
  timestamp?: number;
};

export async function handleGenerateSummary(
  videoId: string,
  prevState: SummaryState,
): Promise<SummaryState> {
  const video = getVideoById(videoId);

  if (!video) {
    return { error: 'Video not found.', timestamp: Date.now() };
  }

  try {
    const result = await generateVideoSummary({
      videoUrl: `https://www.youtube.com/watch?v=${video.youtubeId}`,
    });
    
    const validatedResult = summarySchema.safeParse(result);
    if (!validatedResult.success) {
      console.error('AI summary validation error:', validatedResult.error);
      return { error: 'Failed to generate a valid summary. The AI returned an unexpected format.', timestamp: Date.now() };
    }

    return { summary: validatedResult.data.summary, timestamp: Date.now() };
  } catch (error) {
    console.error('Error generating summary:', error);
    return { error: 'An error occurred while generating the summary.', timestamp: Date.now() };
  }
}


export type QuizState = {
  questions?: QuizQuestion[];
  error?: string;
  timestamp?: number;
};

export async function handleGenerateQuiz(
  summary: string,
  prevState: QuizState,
): Promise<QuizState> {
  if (!summary) {
    return { error: 'Cannot generate quiz without video summary.', timestamp: Date.now() };
  }

  try {
    const result = await generateQuizQuestions({
      videoContent: summary,
      numberOfQuestions: 5,
    });
    
    const validatedResult = quizSchema.safeParse(result);

    if (!validatedResult.success) {
      console.error('AI quiz validation error:', validatedResult.error);
      return { error: 'Failed to generate a valid quiz. The AI returned an unexpected format.', timestamp: Date.now() };
    }

    return { questions: validatedResult.data.questions, timestamp: Date.now() };
  } catch (error) {
    console.error('Error generating quiz:', error);
    return { error: 'An error occurred while generating the quiz.', timestamp: Date.now() };
  }
}
