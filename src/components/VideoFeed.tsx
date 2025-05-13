
import { useState, useEffect, useRef } from 'react';
import videoFeed, { VideoItem } from '@/data/videoFeed';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface VideoFeedProps {
  onComplete?: () => void;
}

const VideoFeed: React.FC<VideoFeedProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentItem = videoFeed[currentIndex];

  useEffect(() => {
    // Auto-play videos when they are loaded
    if (currentItem.type === 'video' && videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(error => {
            console.error('Video play error:', error);
            setIsPlaying(false);
          });
      }
    }
  }, [currentIndex, currentItem]);

  const handleVideoEnd = () => {
    if (currentIndex < videoFeed.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // All videos finished, notify parent component
      if (onComplete) {
        onComplete();
      }
    }
  };

  const handleImageLoad = () => {
    // Show image for 3 seconds then move to the next item
    const timer = setTimeout(() => {
      handleVideoEnd();
    }, 3000);
    
    return () => clearTimeout(timer);
  };

  const handleVideoClick = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  if (!currentItem) return null;

  return (
    <div className="relative w-full">
      <AspectRatio ratio={9/16} className="bg-black overflow-hidden rounded-lg shadow-lg">
        {currentItem.type === 'video' ? (
          <video
            ref={videoRef}
            className={cn(
              "w-full h-full object-cover",
              isPlaying ? "" : "opacity-80"
            )}
            src={currentItem.url}
            onEnded={handleVideoEnd}
            onClick={handleVideoClick}
            playsInline
            muted
          />
        ) : (
          <img
            src={currentItem.url}
            className="w-full h-full object-contain"
            onLoad={handleImageLoad}
            alt="Feed content"
          />
        )}

        {/* Video controls overlay */}
        {currentItem.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {!isPlaying && (
              <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            )}
          </div>
        )}

        {/* Progress indicator */}
        <div className="absolute top-2 left-2 right-2 flex gap-1">
          {videoFeed.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full flex-1 ${
                i < currentIndex
                  ? "bg-white"
                  : i === currentIndex
                  ? "bg-white/80 animate-pulse"
                  : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </AspectRatio>
    </div>
  );
};

export default VideoFeed;
