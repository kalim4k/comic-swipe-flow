
import { useState } from 'react';
import ComicReader from '@/components/ComicReader';
import BottomNavigation from '@/components/BottomNavigation';
import VideoFeed from '@/components/VideoFeed';
import AmiraAd from '@/components/AmiraAd';

const Index = () => {
  const [showVideoFeed, setShowVideoFeed] = useState(true);
  const [showAmiraAd, setShowAmiraAd] = useState(false);
  const [showComicReader, setShowComicReader] = useState(false);

  const handleVideoFeedComplete = () => {
    setShowAmiraAd(true);
  };

  const handleAmiraAdClose = () => {
    setShowAmiraAd(false);
    setShowComicReader(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {showVideoFeed && !showComicReader && (
          <VideoFeed onComplete={handleVideoFeedComplete} />
        )}
        {showComicReader && <ComicReader />}
        {showAmiraAd && <AmiraAd onClose={handleAmiraAdClose} />}
      </main>
      <BottomNavigation />
    </div>
  );
};

export default Index;
