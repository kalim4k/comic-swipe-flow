
import { useState } from 'react';
import VideoPlayer from '@/components/VideoPlayer';
import { useSwipe } from '@/hooks/useSwipe';
import { Home, Users, MessageSquare, User } from 'lucide-react';

// Données de démonstration pour les vidéos
const mockVideos = [
  {
    id: 1,
    url: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-waking-up-in-the-morning-42726-large.mp4",
    username: "katias",
    verified: true,
    description: "Write and take a dose of me..🔥",
    likes: 150,
    comments: 56,
    shares: 78,
    userAvatar: "https://i.pravatar.cc/150?img=1",
    tags: ["legalteen"]
  },
  {
    id: 2,
    url: "https://assets.mixkit.co/videos/preview/mixkit-woman-modeling-for-the-camera-at-home-703-large.mp4",
    username: "SexyScarlett1990",
    verified: true,
    description: "Milfs Hit Differently! Fansly, ... see more",
    likes: 220,
    comments: 98,
    shares: 65,
    userAvatar: "https://i.pravatar.cc/150?img=2",
    tags: ["curvy"]
  },
  {
    id: 3,
    url: "https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4",
    username: "beach_lover",
    verified: true,
    description: "Summer vibes only 🌊☀️ #beach #summer",
    likes: 876,
    comments: 132,
    shares: 245,
    userAvatar: "https://i.pravatar.cc/150?img=3",
    tags: ["beach", "summer", "vacation"]
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
        {/* Tabs en haut pour "Following" et "For You" */}
        <div className="absolute top-0 left-0 right-0 z-10 flex justify-center py-2">
          <div className="flex space-x-8 text-sm">
            <div className="text-gray-400">Following</div>
            <div className="font-bold">For You</div>
          </div>
        </div>
        
        {/* Afficher la vidéo actuelle */}
        <VideoPlayer video={mockVideos[currentVideoIndex]} />
      </div>
      
      {/* Navigation du bas TikTok */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-around items-center py-3 bg-black">
        <button className="flex flex-col items-center text-white">
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </button>
        <button className="flex flex-col items-center text-gray-400">
          <Users size={24} />
          <span className="text-xs mt-1">Friends</span>
        </button>
        <button className="flex flex-col items-center">
          <div className="w-12 h-8 bg-black flex items-center justify-center rounded-md relative">
            <div className="absolute inset-0 flex">
              <div className="w-1/2 bg-cyan-500"></div>
              <div className="w-1/2 bg-pink-500"></div>
            </div>
            <span className="text-3xl text-white relative z-10">+</span>
          </div>
        </button>
        <button className="flex flex-col items-center text-gray-400">
          <MessageSquare size={24} />
          <span className="text-xs mt-1">Inbox</span>
        </button>
        <button className="flex flex-col items-center text-gray-400">
          <User size={24} />
          <span className="text-xs mt-1">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default VideoPage;
