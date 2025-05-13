
import { useState } from 'react';
import ComicReader from '@/components/ComicReader';
import BottomNavigation from '@/components/BottomNavigation';
import VideoFeed from '@/components/VideoFeed';
import AmiraAd from '@/components/AmiraAd';

const Index = () => {
  const [showVideoFeed, setShowVideoFeed] = useState(true);
  const [showAmiraAd, setShowAmiraAd] = useState(false);
  const [showComicReader, setShowComicReader] = useState(false);
  const [videoFeedCompleted, setVideoFeedCompleted] = useState(false);

  const handleVideoFeedComplete = () => {
    // Uniquement afficher la pub Amira si elle n'a pas déjà été montrée
    if (!videoFeedCompleted) {
      setShowAmiraAd(true);
      setVideoFeedCompleted(true);
    }
  };

  const handleAmiraAdClose = () => {
    setShowAmiraAd(false);
    setShowComicReader(true);
    setShowVideoFeed(false);
  };

  // Permet de revenir au feed vidéo depuis le comic reader
  const handleBackToFeed = () => {
    setShowComicReader(false);
    setShowVideoFeed(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {showVideoFeed && (
          <div className="h-[calc(100vh-64px)]">
            <VideoFeed onComplete={handleVideoFeedComplete} />
          </div>
        )}
        {showComicReader && <ComicReader onBack={handleBackToFeed} />}
        {showAmiraAd && <AmiraAd onClose={handleAmiraAdClose} />}
      </main>
      <BottomNavigation />
    </div>
  );
};

export default Index;
