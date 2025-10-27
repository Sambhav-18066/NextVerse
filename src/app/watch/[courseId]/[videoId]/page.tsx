import { WatchPageClient } from "@/components/watch-page-client";
import { getCourseById, getNextVideo, getVideoById } from "@/lib/data";
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

export default function WatchPage({ params, searchParams }: WatchPageProps) {
  const course = getCourseById(params.courseId);
  const video = getVideoById(params.videoId);
  const nextVideo = getNextVideo(params.courseId, params.videoId);

  if (!course || !video) {
    notFound();
  }
  
  const progress = searchParams.progress ? (searchParams.progress as string).split(',') : [];

  // Check if the video is unlocked
  const videoIndex = course.videos.findIndex(v => v.id === video.id);
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
