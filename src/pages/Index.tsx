
import { useState, useRef } from 'react';
import ComicReader from '@/components/ComicReader';
import BottomNavigation from '@/components/BottomNavigation';
import VideoFeed from '@/components/VideoFeed';
import AmiraAd from '@/components/AmiraAd';
import EmojiEffects, { EmojiEffectsRef } from '@/components/EmojiEffects';

const Index = () => {
  const [showVideoFeed, setShowVideoFeed] = useState(true);
  const [showAmiraAd, setShowAmiraAd] = useState(false);
  const [showComicReader, setShowComicReader] = useState(false);
  
  // Create a reference to the emoji effects
  const emojiRef = useRef<EmojiEffectsRef>(null);

  const handleVideoFeedComplete = () => {
    // Trigger extra emojis when transitioning to ad
    if (emojiRef.current) {
      emojiRef.current.triggerEmojis(8);
    }
    setShowAmiraAd(true);
    setShowVideoFeed(false);
  };

  const handleAmiraAdClose = () => {
    // Trigger extra emojis when transitioning to comic
    if (emojiRef.current) {
      emojiRef.current.triggerEmojis(8);
    }
    setShowAmiraAd(false);
    setShowComicReader(true);
  };

  // Add a test button to manually trigger emojis (for debugging)
  const triggerTestEmojis = () => {
    if (emojiRef.current) {
      emojiRef.current.triggerEmojis(10);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <EmojiEffects ref={emojiRef} />
      
      <main className="flex-1 overflow-y-auto">
        {showVideoFeed && (
          <div className="h-[calc(100vh-64px)]">
            <VideoFeed onComplete={handleVideoFeedComplete} emojiRef={emojiRef} />
          </div>
        )}
        {showAmiraAd && <AmiraAd onClose={handleAmiraAdClose} />}
        {showComicReader && <ComicReader />}
      </main>
      
      <BottomNavigation />
      
      {/* Debug button - can be removed in production */}
      <button 
        onClick={triggerTestEmojis} 
        className="fixed bottom-20 right-4 z-50 bg-black/50 text-white p-2 rounded-full"
        aria-label="Test emoji effects"
      >
        🎉
      </button>
    </div>
  );
};

export default Index;
