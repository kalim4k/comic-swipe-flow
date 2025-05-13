
import { useState, useEffect, useRef } from 'react';
import videoFeed, { VideoItem } from '@/data/videoFeed';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useSwipe } from '@/hooks/useSwipe';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface VideoFeedProps {
  onComplete?: () => void;
}

const VideoFeed: React.FC<VideoFeedProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentItem = videoFeed[currentIndex];
  const adShownRef = useRef(false);

  const handleNextVideo = () => {
    if (currentIndex < videoFeed.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Loop back to the first video when reaching the end
      setCurrentIndex(0);
    }
    
    // Trigger onComplete only once when reaching the last item 
    // and only if we haven't shown the ad yet
    if (currentIndex === videoFeed.length - 2 && onComplete && !adShownRef.current) {
      adShownRef.current = true;
      onComplete();
    }
  };

  const handlePrevVideo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      // Loop to the last video when at the beginning and going backwards
      setCurrentIndex(videoFeed.length - 1);
    }
  };

  const { swipeHandlers, swipeDistance, isSwiping } = useSwipe({
    onSwipeUp: handleNextVideo,
    onSwipeDown: handlePrevVideo,
    threshold: 100,
  });

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
    handleNextVideo();
  };

  const handleImageLoad = () => {
    // Show image for 3 seconds then move to the next item
    const timer = setTimeout(() => {
      handleNextVideo();
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

  const transformStyle = isSwiping 
    ? { transform: `translateY(${swipeDistance.y}px)`, transition: 'none' }
    : { transform: 'translateY(0)', transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)' };

  return (
    <div className="relative w-full h-full overflow-hidden" {...swipeHandlers}>
      <div 
        className="w-full h-full" 
        style={transformStyle}
      >
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

          {/* Swipe indicators */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-between h-3/4 pointer-events-none opacity-50">
            <ChevronUp className="w-10 h-10 text-white/70 animate-bounce-slight" />
            <ChevronDown className="w-10 h-10 text-white/70 animate-bounce-slight" />
          </div>
        </AspectRatio>
      </div>
    </div>
  );
};

export default VideoFeed;
