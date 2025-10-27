'use client';

import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { handleGenerateSummary, type SummaryState } from '@/lib/actions';
import { Bot, Loader2, Sparkles } from 'lucide-react';
import { useEffect, useActionState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface SummarySectionProps {
  videoId: string;
  courseId: string;
  onSummaryGenerated: (summary: string) => void;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-primary hover:bg-primary/90">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Summary
        </>
      )}
    </Button>
  );
}

export function SummarySection({ videoId, courseId, onSummaryGenerated }: SummarySectionProps) {
  const initialState: SummaryState = {};
  const [state, formAction] = useActionState(handleGenerateSummary.bind(null, videoId, courseId), initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.summary) {
      onSummaryGenerated(state.summary);
    }
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Summary Generation Failed',
        description: state.error,
      });
    }
  }, [state, onSummaryGenerated, toast]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Bot className="text-primary"/> AI Video Summary</CardTitle>
        <CardDescription>
          Get the key points from the video in seconds.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {state.summary ? (
          <div className="prose prose-sm max-w-none text-foreground bg-primary/5 p-4 rounded-md">
            <p>{state.summary}</p>
          </div>
        ) : (
          <form action={formAction} className="space-y-4">
            <p className="text-sm text-muted-foreground">Click the button below to generate an AI-powered summary of the video content.</p>
            <SubmitButton />
          </form>
        )}
      </CardContent>
    </Card>
  );
}
