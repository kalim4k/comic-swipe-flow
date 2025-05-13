
import { useState, useEffect, useRef } from 'react';
import videoFeed, { VideoItem } from '@/data/videoFeed';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useSwipe } from '@/hooks/useSwipe';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { EmojiEffectsRef } from './EmojiEffects';

interface VideoFeedProps {
  onComplete?: () => void;
  emojiRef?: React.RefObject<EmojiEffectsRef>;
}

const VideoFeed: React.FC<VideoFeedProps> = ({ onComplete, emojiRef }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentItem = videoFeed[currentIndex];

  const handleNextVideo = () => {
    // Trigger emoji effect when changing videos
    if (emojiRef?.current) {
      emojiRef.current.triggerEmojis(5); // More emojis for video change
    }

    if (currentIndex < videoFeed.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (onComplete) {
      onComplete();
    }
  };

  const handlePrevVideo = () => {
    // Trigger emoji effect when changing videos
    if (emojiRef?.current) {
      emojiRef.current.triggerEmojis(3);
    }

    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
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

  // Trigger emojis periodically while watching videos
  useEffect(() => {
    if (currentItem.type === 'video' && isPlaying) {
      const intervalId = setInterval(() => {
        if (emojiRef?.current && Math.random() < 0.3) { // 30% chance of emojis periodically
          emojiRef.current.triggerEmojis(2);
        }
      }, 4000); // Every 4 seconds

      return () => clearInterval(intervalId);
    }
  }, [currentIndex, isPlaying, emojiRef]);

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
    
    // Trigger emojis on click
    if (emojiRef?.current) {
      emojiRef.current.triggerEmojis(4);
    }
    
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
    ? { transform: `translateY(${swipeDistance}px)`, transition: 'none' }
    : { transform: 'translateY(0)', transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)' };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div 
        className="w-full h-full" 
        style={transformStyle}
        {...swipeHandlers}
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
              onClick={() => {
                // Trigger emojis on image click
                if (emojiRef?.current) {
                  emojiRef.current.triggerEmojis(4);
                }
              }}
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
