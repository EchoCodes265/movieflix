interface VideoPlayerProps {
  videoKey: string;
}

export default function VideoPlayer({ videoKey }: VideoPlayerProps) {
  return (
    <div className="aspect-video w-full rounded-lg overflow-hidden">
      <iframe
        src={`https://www.youtube.com/embed/${videoKey}`}
        title="Trailer"
        className="w-full h-full"
        allowFullScreen
      />
    </div>
  );
}