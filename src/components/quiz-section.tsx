'use client';

import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { handleGenerateQuiz, type QuizState } from '@/lib/actions';
import { useEffect, useState, useActionState } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { QuizQuestion, Video } from '@/lib/types';
import { ArrowRight, BrainCircuit, CheckCircle, Loader2, Sparkles, XCircle } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { useRouter } from 'next/navigation';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';

interface QuizSectionProps {
  videoId: string;
  summary?: string;
  nextVideo?: Video;
  courseId: string;
  onQuizPassed: () => void;
  currentProgress: string[];
  isQuizPassed: boolean;
}

function GenerateButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating Quiz...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Quiz
        </>
      )}
    </Button>
  );
}

export function QuizSection({ videoId, summary, nextVideo, courseId, onQuizPassed, currentProgress, isQuizPassed }: QuizSectionProps) {
  const initialState: QuizState = {};
  const [state, formAction] = useActionState(handleGenerateQuiz.bind(null, summary || ''), initialState);
  const { toast } = useToast();
  
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);

  const router = useRouter();

  useEffect(() => {
    if (state.questions) {
      setQuestions(state.questions);
      // Reset quiz state for new questions
      setCurrentQuestionIndex(0);
      setSelectedAnswers([]);
      setQuizFinished(false);
      setScore(0);
    }
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Quiz Generation Failed',
        description: state.error,
      });
    }
  }, [state, toast]);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Finish quiz
      let correctAnswers = 0;
      questions.forEach((q, i) => {
        if (q.correctAnswerIndex === selectedAnswers[i]) {
          correctAnswers++;
        }
      });
      const finalScore = (correctAnswers / questions.length) * 100;
      setScore(finalScore);
      setQuizFinished(true);
      if (finalScore >= 75) {
        onQuizPassed();
      }
    }
  };
  
  const handleNextVideo = () => {
    if (!nextVideo) return;
    const newProgress = [...currentProgress, videoId];
    router.push(`/watch/${courseId}/${nextVideo.id}?progress=${newProgress.join(',')}`);
  };

  const handleRetry = () => {
    setQuestions([]);
    setQuizFinished(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setScore(0);
  }
  
  if (isQuizPassed && nextVideo) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CheckCircle className="text-green-500" /> Quiz Passed!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p>Great job! You are ready for the next lesson.</p>
          <Button onClick={handleNextVideo} className="w-full bg-accent hover:bg-accent/90">
            Next Video <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  if (isQuizPassed && !nextVideo) {
    return (
       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CheckCircle className="text-green-500" /> Course Complete!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p>Congratulations! You have completed all videos in this course.</p>
          <Button asChild className="w-full">
            <Link href="/">Back to Courses</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (quizFinished) {
    const passed = score >= 75;
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz Results</CardTitle>
          <CardDescription>Your score: {score.toFixed(0)}%</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {passed ? (
            <div className="text-center text-green-600 space-y-2">
              <CheckCircle className="h-12 w-12 mx-auto" />
              <p className="font-bold">Congratulations! You passed.</p>
              {nextVideo && <p>You have unlocked the next video.</p>}
            </div>
          ) : (
            <div className="text-center text-destructive space-y-2">
              <XCircle className="h-12 w-12 mx-auto" />
              <p className="font-bold">Needs Improvement</p>
              <p>You need a score of 75% or higher to pass.</p>
            </div>
          )}

          <div className="space-y-4">
            {questions.map((q, qIndex) => {
              const selectedAnswerIndex = selectedAnswers[qIndex];
              const isCorrect = q.correctAnswerIndex === selectedAnswerIndex;

              return (
                <div key={qIndex} className="p-4 border rounded-lg">
                  <p className="font-semibold mb-2">{q.question}</p>
                  <div className="space-y-2">
                    {q.options.map((option, oIndex) => {
                      const isSelected = selectedAnswerIndex === oIndex;
                      const isTheCorrectAnswer = q.correctAnswerIndex === oIndex;

                      return (
                        <div
                          key={oIndex}
                          className={cn(
                            "flex items-center space-x-2 p-2 rounded-md text-sm",
                            isSelected && !isCorrect && "bg-destructive/20 text-destructive-foreground",
                            isTheCorrectAnswer && "bg-green-500/20 text-green-700"
                          )}
                        >
                          {isSelected ? (
                             isCorrect ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-red-600" />
                          ) : <div className="h-4 w-4" />}
                          <span className={cn(isTheCorrectAnswer && "font-bold")}>{option}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {!passed && (
            <Button onClick={handleRetry} variant="outline" className="w-full">
              Try Again with a New Quiz
            </Button>
          )}

        </CardContent>
      </Card>
    );
  }

  if (questions.length > 0) {
    const question = questions[currentQuestionIndex];
    return (
      <Card>
        <CardHeader>
          <CardTitle>Question {currentQuestionIndex + 1}/{questions.length}</CardTitle>
          <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="mt-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="font-semibold text-lg">{question.question}</p>
          <RadioGroup 
            onValueChange={(value) => handleAnswerSelect(parseInt(value))} 
            value={selectedAnswers[currentQuestionIndex]?.toString()}
            className="space-y-2"
          >
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 rounded-md border has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">{option}</Label>
              </div>
            ))}
          </RadioGroup>
          <Button onClick={handleNextQuestion} disabled={selectedAnswers[currentQuestionIndex] === undefined} className="w-full">
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><BrainCircuit className="text-primary"/> Interactive Quiz</CardTitle>
        <CardDescription>
          Test your knowledge after reviewing the summary.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <div className="space-y-4">
            {!summary ? (
              <p className="text-sm text-muted-foreground text-center p-4 border border-dashed rounded-md">
                Please generate the video summary first to enable quiz generation.
              </p>
            ) : (
              <GenerateButton />
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
