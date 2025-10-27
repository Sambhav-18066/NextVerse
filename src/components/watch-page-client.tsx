'use client';

import type { Course, Video } from "@/lib/types";
import { ArrowLeft, BookText, Bot, BrainCircuit } from "lucide-react";
import Link from "next/link";
import { VideoPlayer } from "./video-player";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { SummarySection } from "./summary-section";
import { useState } from "react";
import { QuizSection } from "./quiz-section";
import { ModelViewer } from "./model-viewer";
import { Button } from "./ui/button";

interface WatchPageClientProps {
  course: Course;
  video: Video;
  nextVideo?: Video;
  initialProgress: string[];
}

export function WatchPageClient({ course, video, nextVideo, initialProgress }: WatchPageClientProps) {
  const [summary, setSummary] = useState<string | undefined>();
  const [isQuizPassed, setIsQuizPassed] = useState(false);

  const progressQuery = initialProgress.length > 0 ? `?progress=${initialProgress.join(',')}` : '';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button asChild variant="ghost" className="mb-4">
          <Link href={`/courses/${course.id}${progressQuery}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to {course.title}
          </Link>
        </Button>
        <h1 className="font-headline text-3xl md:text-4xl font-bold text-foreground">{video.title}</h1>
        <p className="text-muted-foreground mt-1">Part of: {course.title}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <VideoPlayer youtubeId={video.youtubeId} />
        </div>

        <div className="lg:col-span-1">
          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-primary/10">
              <TabsTrigger value="summary"><Bot className="mr-1 h-4 w-4" />Summary</TabsTrigger>
              <TabsTrigger value="quiz"><BrainCircuit className="mr-1 h-4 w-4" />Quiz</TabsTrigger>
              <TabsTrigger value="3d-model"><BookText className="mr-1 h-4 w-4" />3D Model</TabsTrigger>
            </TabsList>
            <TabsContent value="summary">
              <SummarySection videoId={video.id} courseId={course.id} onSummaryGenerated={setSummary} />
            </TabsContent>
            <TabsContent value="quiz">
              <QuizSection 
                videoId={video.id}
                courseId={course.id}
                summary={summary}
                nextVideo={nextVideo}
                onQuizPassed={() => setIsQuizPassed(true)}
                currentProgress={initialProgress}
                isQuizPassed={isQuizPassed}
              />
            </TabsContent>
            <TabsContent value="3d-model">
              <ModelViewer courseId={course.id} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
