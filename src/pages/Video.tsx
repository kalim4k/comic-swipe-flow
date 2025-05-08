
import { useState } from 'react';
import BottomNavigation from '@/components/BottomNavigation';
import VideoPlayer from '@/components/VideoPlayer';
import { useSwipe } from '@/hooks/useSwipe';
import { ChevronUp } from 'lucide-react';

// Données de démonstration pour les vidéos
const mockVideos = [
  {
    id: 1,
    url: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-waking-up-in-the-morning-42726-large.mp4",
    username: "@user1",
    description: "Bonjour à tous! #matin #réveil",
    likes: 1234,
    comments: 56,
    shares: 78
  },
  {
    id: 2,
    url: "https://assets.mixkit.co/videos/preview/mixkit-top-aerial-shot-of-seashore-with-rocks-1090-large.mp4",
    username: "@voyageur",
    description: "Vue magnifique sur l'océan! #voyage #nature",
    likes: 4321,
    comments: 98,
    shares: 65
  },
  {
    id: 3,
    url: "https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4",
    username: "@plage",
    description: "Le son des vagues est si relaxant #plage #détente",
    likes: 876,
    comments: 32,
    shares: 45
  }
];

const VideoPage = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  
  const goToNextVideo = () => {
    if (currentVideoIndex < mockVideos.length - 1) {
      setCurrentVideoIndex(prevIndex => prevIndex + 1);
    }
  };
  
  const goToPrevVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(prevIndex => prevIndex - 1);
    }
  };

  const { swipeHandlers } = useSwipe({
    onSwipeUp: goToNextVideo,
    onSwipeDown: goToPrevVideo,
    threshold: 50,
  });

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <div 
        {...swipeHandlers} 
        className="relative flex-1 w-full h-full overflow-hidden"
      >
        {/* Afficher la vidéo actuelle */}
        <VideoPlayer video={mockVideos[currentVideoIndex]} />
        
        {/* Indicateur de défilement si ce n'est pas la dernière vidéo */}
        {currentVideoIndex < mockVideos.length - 1 && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronUp size={24} className="text-white/70" />
            <p className="text-xs text-white/70">Glissez vers le haut</p>
          </div>
        )}
      </div>
      <BottomNavigation />
    </div>
  );
};

export default VideoPage;
