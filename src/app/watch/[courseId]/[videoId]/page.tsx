import { WatchPageClient } from "@/components/watch-page-client";
import { getCourseWithVideos, getVideoFromCourse } from "@/lib/data";
import type { Course } from "@/lib/types";
import { notFound } from "next/navigation";

interface WatchPageProps {
  params: {
    courseId: string;
    videoId: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function WatchPage({ params, searchParams }: WatchPageProps) {
  const courseData = await getCourseWithVideos(params.courseId);
  const video = await getVideoFromCourse(params.courseId, params.videoId);

  if (!courseData || !video) {
    notFound();
  }

  const course: Course = {
    id: params.courseId,
    ...courseData.course,
    videos: courseData.videos,
  };

  const videoIndex = course.videos.findIndex(v => v.id === video.id);
  const nextVideo = videoIndex !== -1 && videoIndex < course.videos.length - 1
    ? course.videos[videoIndex + 1]
    : undefined;
  
  const progress = searchParams.progress ? (searchParams.progress as string).split(',') : [];

  // Check if the video is unlocked
  const isUnlocked = videoIndex === 0 || progress.includes(course.videos[videoIndex - 1]?.id);

  if (!isUnlocked) {
     // Or redirect to the course page with a message
     notFound();
  }

  return (
    <WatchPageClient 
      course={course} 
      video={video}
      nextVideo={nextVideo}
      initialProgress={progress}
    />
  );
}
