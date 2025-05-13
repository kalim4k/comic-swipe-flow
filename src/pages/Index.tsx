
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

  const handleVideoFeedComplete = () => {
    setShowAmiraAd(true);
    setShowVideoFeed(false);
  };

  const handleAmiraAdClose = () => {
    setShowAmiraAd(false);
    setShowComicReader(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <EmojiEffects />
      <main className="flex-1 overflow-y-auto">
        {showVideoFeed && (
          <div className="h-[calc(100vh-64px)]">
            <VideoFeed onComplete={handleVideoFeedComplete} />
          </div>
        )}
        {showAmiraAd && <AmiraAd onClose={handleAmiraAdClose} />}
        {showComicReader && <ComicReader />}
      </main>
      <BottomNavigation />
    </div>
  );
};

export default Index;
