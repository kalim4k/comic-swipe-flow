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
  const [adShownOnce, setAdShownOnce] = useState(false);

  const handleVideoFeedComplete = () => {
    // Only show the ad if it hasn't been shown before
    if (!adShownOnce) {
      setShowAmiraAd(true);
      setAdShownOnce(true);
    }
  };

  const handleAmiraAdClose = () => {
    setShowAmiraAd(false);
    // Instead of showing the comic reader, we keep showing the video feed
    setShowVideoFeed(true);
  };

  const handleNavigateToComic = () => {
    setShowVideoFeed(false);
    setShowComicReader(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 relative">
        {showVideoFeed && !showComicReader && (
          <div className="h-[calc(100vh-64px)]">
            <VideoFeed onComplete={handleVideoFeedComplete} />
            <EmojiEffects />
          </div>
        )}
        {showComicReader && <ComicReader onBack={() => {
          setShowComicReader(false);
          setShowVideoFeed(true);
        }} />}
        {showAmiraAd && <AmiraAd onClose={handleAmiraAdClose} />}
      </main>
      <BottomNavigation onComicClick={handleNavigateToComic} />
    </div>
  );
};

export default Index;
