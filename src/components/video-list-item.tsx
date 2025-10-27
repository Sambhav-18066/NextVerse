import type { Video } from "@/lib/types";
import { Lock, PlayCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

interface VideoListItemProps {
  courseId: string;
  video: Video;
  isUnlocked: boolean;
  progress: string[];
  index: number;
}

export function VideoListItem({ courseId, video, isUnlocked, progress, index }: VideoListItemProps) {
  const progressQuery = progress.length > 0 ? `?progress=${progress.join(',')}` : '';

  const content = (
    <div
      className={cn(
        "flex items-center gap-4 rounded-lg p-4 transition-colors",
        isUnlocked
          ? "bg-card hover:bg-secondary/80 cursor-pointer"
          : "bg-muted cursor-not-allowed opacity-60"
      )}
    >
      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary font-bold">
        {index}
      </div>
      <div className="flex-grow">
        <h3 className="font-semibold text-foreground">{video.title}</h3>
      </div>
      {isUnlocked ? (
        <PlayCircle className="h-6 w-6 text-primary shrink-0" />
      ) : (
        <Lock className="h-6 w-6 text-muted-foreground shrink-0" />
      )}
    </div>
  );

  return (
    <li>
      {isUnlocked ? (
        <Link href={`/watch/${courseId}/${video.id}${progressQuery}`} className="block">
          {content}
        </Link>
      ) : (
        <div title="Complete previous video to unlock">{content}</div>
      )}
    </li>
  );
}
