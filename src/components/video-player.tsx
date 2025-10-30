interface VideoPlayerProps {
  youtubeId: string;
}

export function VideoPlayer({ youtubeId }: VideoPlayerProps) {
  return (
    <div className="aspect-video w-full bg-black rounded-lg overflow-hidden shadow-2xl">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=0&rel=0&modestbranding=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
