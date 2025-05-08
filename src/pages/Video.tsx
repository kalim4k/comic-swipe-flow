
import { useState } from 'react';
import BottomNavigation from '@/components/BottomNavigation';
import VideoPlayer from '@/components/VideoPlayer';
import { useSwipe } from '@/hooks/useSwipe';

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
        {/* Afficher la vidéo actuelle */}
        <VideoPlayer video={mockVideos[currentVideoIndex]} />
      </div>
      
      {/* Navigation du bas personnalisée pour TikTok */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-around items-center py-3 px-4 bg-black/90 border-t border-gray-800 z-50">
        <button className="flex flex-col items-center">
          <svg viewBox="0 0 48 48" width="32" height="32" fill="currentColor" className="text-white">
            <path d="M24.9128 8.78049C25.9561 7.73719 27.4435 7.17969 28.9995 7.32M21.0002 16.0995H28.9995V24.0002" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" strokeWidth="3"></path>
            <path fillRule="evenodd" clipRule="evenodd" d="M1 24C1 11.8497 10.8497 2 23 2C35.1503 2 45 11.8497 45 24C45 36.1503 35.1503 46 23 46C10.8497 46 1 36.1503 1 24ZM8.5 24C8.5 32.0081 14.9919 38.5 23 38.5C31.0081 38.5 37.5 32.0081 37.5 24C37.5 15.9919 31.0081 9.5 23 9.5C14.9919 9.5 8.5 15.9919 8.5 24Z" fill="currentColor"></path>
          </svg>
        </button>
        <button className="flex flex-col items-center">
          <svg width="32" height="32" viewBox="0 0 48 48" fill="currentColor" className="text-white">
            <path fillRule="evenodd" clipRule="evenodd" d="M22 10C15.3726 10 10 15.3726 10 22C10 28.6274 15.3726 34 22 34C28.6274 34 34 28.6274 34 22C34 15.3726 28.6274 10 22 10ZM6 22C6 13.1634 13.1634 6 22 6C30.8366 6 38 13.1634 38 22C38 25.6974 36.7458 29.1019 34.6397 31.8113L43.3809 40.5565C43.7712 40.947 43.7712 41.5801 43.3807 41.9705L41.9665 43.3847C41.5759 43.7753 40.9426 43.7752 40.5521 43.3846L31.8113 34.6397C29.1019 36.7458 25.6974 38 22 38C13.1634 38 6 30.8366 6 22Z"></path>
          </svg>
        </button>
        <button className="flex flex-col items-center bg-gray-800 rounded-full p-1">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 15V8H8V15H2L16 29L30 15H24V8H23" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className="flex flex-col items-center">
          <svg width="32" height="32" viewBox="0 0 48 48" fill="currentColor" className="text-white">
            <path fillRule="evenodd" clipRule="evenodd" d="M16.5 4C16.5 2.61929 17.6193 1.5 19 1.5H29C30.3807 1.5 31.5 2.61929 31.5 4V44C31.5 45.3807 30.3807 46.5 29 46.5H19C17.6193 46.5 16.5 45.3807 16.5 44V4ZM4 16C4 14.6193 5.11929 13.5 6.5 13.5H9.5C10.8807 13.5 12 14.6193 12 16V44C12 45.3807 10.8807 46.5 9.5 46.5H6.5C5.11929 46.5 4 45.3807 4 44V16ZM38.5 13.5H41.5C42.8807 13.5 44 14.6193 44 16V44C44 45.3807 42.8807 46.5 41.5 46.5H38.5C37.1193 46.5 36 45.3807 36 44V16C36 14.6193 37.1193 13.5 38.5 13.5Z"></path>
          </svg>
        </button>
        <button className="flex flex-col items-center">
          <svg width="32" height="32" viewBox="0 0 48 48" fill="currentColor" className="text-white">
            <path fillRule="evenodd" clipRule="evenodd" d="M24 46C36.1503 46 46 36.1503 46 24C46 11.8497 36.1503 2 24 2C11.8497 2 2 11.8497 2 24C2 36.1503 11.8497 46 24 46ZM24.5 11C24.5 10.4477 24.0523 10 23.5 10C22.9477 10 22.5 10.4477 22.5 11V23H11C10.4477 23 10 23.4477 10 24C10 24.5523 10.4477 25 11 25H23.5V37C23.5 37.5523 23.9477 38 24.5 38C25.0523 38 25.5 37.5523 25.5 37V25H37C37.5523 25 38 24.5523 38 24C38 23.4477 37.5523 23 37 23H25.5V11Z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default VideoPage;
