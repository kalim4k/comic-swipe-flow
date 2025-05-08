
import { useState } from 'react';
import BottomNavigation from '@/components/BottomNavigation';
import VideoPlayer from '@/components/VideoPlayer';
import { useSwipe } from '@/hooks/useSwipe';
import { ChevronUp, ChevronDown } from 'lucide-react';

// Données de démonstration pour les vidéos
const mockVideos = [
  {
    id: 1,
    url: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-waking-up-in-the-morning-42726-large.mp4",
    username: "@katias",
    verified: true,
    description: "Bonjour à tous! #matin #réveil",
    likes: 150,
    comments: 56,
    shares: 78,
    userAvatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: 2,
    url: "https://assets.mixkit.co/videos/preview/mixkit-top-aerial-shot-of-seashore-with-rocks-1090-large.mp4",
    username: "@voyageur",
    verified: false,
    description: "Vue magnifique sur l'océan! #voyage #nature",
    likes: 220,
    comments: 98,
    shares: 65,
    userAvatar: "https://i.pravatar.cc/150?img=2"
  },
  {
    id: 3,
    url: "https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4",
    username: "@plage",
    verified: true,
    description: "Le son des vagues est si relaxant #plage #détente",
    likes: 876,
    comments: 32,
    shares: 45,
    userAvatar: "https://i.pravatar.cc/150?img=3"
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
      {/* En-tête "Pour Vous" */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-center pt-2 pb-2">
        <div className="text-white text-lg font-medium">Pour Vous <ChevronDown size={16} className="inline ml-1" /></div>
      </div>
      
      <div 
        {...swipeHandlers} 
        className="relative flex-1 w-full h-full overflow-hidden"
      >
        {/* Afficher la vidéo actuelle */}
        <VideoPlayer video={mockVideos[currentVideoIndex]} />
        
        {/* Indicateur de défilement */}
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          {currentVideoIndex > 0 && (
            <div className="animate-bounce mb-1 opacity-70">
              <ChevronDown size={20} className="text-white" />
            </div>
          )}
          {currentVideoIndex < mockVideos.length - 1 && (
            <div className="animate-bounce mt-1 opacity-70">
              <ChevronUp size={20} className="text-white" />
            </div>
          )}
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default VideoPage;
