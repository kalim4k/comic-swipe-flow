
import { useState } from 'react';
import ComicReader from '@/components/ComicReader';
import BottomNavigation from '@/components/BottomNavigation';
import VideoFeed from '@/components/VideoFeed';
import AmiraAd from '@/components/AmiraAd';
import EmojiEffects from '@/components/EmojiEffects';

const Index = () => {
  const [showVideoFeed, setShowVideoFeed] = useState(true);
  const [showAmiraAd, setShowAmiraAd] = useState(false);
  const [showComicReader, setShowComicReader] = useState(false);
  const [scrollCount, setScrollCount] = useState(0);

  const handleVideoFeedComplete = () => {
    setShowAmiraAd(true);
  };

  const handleAmiraAdClose = () => {
    setShowAmiraAd(false);
    // Ne changeons pas à ComicReader pour permettre de continuer le scrolling
  };

  const handleScroll = () => {
    setScrollCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 relative">
        {showVideoFeed && (
          <div className="h-[calc(100vh-64px)]">
            <VideoFeed onComplete={handleVideoFeedComplete} onScroll={handleScroll} />
          </div>
        )}
        {showComicReader && <ComicReader />}
        {showAmiraAd && <AmiraAd onClose={handleAmiraAdClose} />}
        <EmojiEffects scrollCount={scrollCount} />
      </main>
      <BottomNavigation />
    </div>
  );
};

export default Index;
