
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
  const [adShown, setAdShown] = useState(false);

  const handleVideoFeedComplete = () => {
    if (!adShown) {
      setShowAmiraAd(true);
      setAdShown(true);
    }
  };

  const handleAmiraAdClose = () => {
    setShowAmiraAd(false);
    // Permettre à l'utilisateur de continuer à scroller
  };

  const handleScroll = () => {
    setScrollCount(prev => prev + 1);
    
    // Montrer la pub après quelques scrolls si ce n'est pas déjà fait
    if (scrollCount > 3 && !adShown && !showAmiraAd) {
      handleVideoFeedComplete();
    }
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
