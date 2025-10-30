import { VideoListItem } from "@/components/video-list-item";
import { getCourseWithVideos } from "@/lib/data";
import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Course } from "@/lib/types";

interface CoursePageProps {
  params: {
    courseId: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function CoursePage({ params, searchParams }: CoursePageProps) {
  const { courseId } = params;
  const courseData = await getCourseWithVideos(courseId);

  if (!courseData) {
    notFound();
  }
  
  const course: Course = {
    ...courseData.course,
    id: courseId,
    videos: courseData.videos,
  };


  const progress = searchParams.progress ? (searchParams.progress as string).split(',') : [];
  
  // The first video is always unlocked.
  let isNextVideoLocked = false;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Link>
        </Button>
        <h1 className="font-headline text-4xl font-bold text-foreground">{course.title}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{course.description}</p>
      </div>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-headline text-2xl">Course Content</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2">
            {course.videos.map((video, index) => {
              const isUnlocked = index === 0 || progress.includes(course.videos[index - 1].id);
              
              const item = (
                <VideoListItem
                  key={video.id}
                  courseId={course.id}
                  video={video}
                  isUnlocked={isUnlocked}
                  progress={progress}
                  index={index + 1}
                />
              );
              
              return item;
            })}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
