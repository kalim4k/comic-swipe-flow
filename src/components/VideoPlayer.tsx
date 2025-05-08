
import { useState, useRef, useEffect } from 'react';
import { Heart, MessageSquare, Share } from 'lucide-react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

interface Video {
  id: number;
  url: string;
  username: string;
  verified?: boolean;
  description: string;
  likes: number;
  comments: number;
  shares: number;
  userAvatar?: string;
  tags?: string[];
}

interface VideoPlayerProps {
  video: Video;
}

const VideoPlayer = ({ video }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Démarrer la vidéo automatiquement
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      // Réinitialiser la vidéo et la jouer
      videoElement.currentTime = 0;
      videoElement.play().catch(error => {
        console.error("Erreur de lecture auto:", error);
      });
      setIsPlaying(true);
    }
    
    return () => {
      if (videoElement) {
        videoElement.pause();
      }
    };
  }, [video]);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(error => {
          console.error("Erreur lors de la lecture:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="relative w-full h-full">
      {/* Vidéo plein écran */}
      <video
        ref={videoRef}
        src={video.url}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        loop
        onClick={togglePlayPause}
      />
      
      {/* Boutons d'interaction à droite */}
      <div className="absolute right-2 bottom-24 flex flex-col items-center space-y-5">
        {/* Bouton Like */}
        <button onClick={toggleLike} className="flex flex-col items-center">
          <div className="w-10 h-10 flex items-center justify-center">
            <Heart size={28} className={liked ? "fill-red-500 text-red-500" : "text-white"} />
          </div>
          <span className="text-white text-xs">{liked ? video.likes + 1 : video.likes}</span>
        </button>
        
        {/* Bouton Commentaires */}
        <button className="flex flex-col items-center">
          <div className="w-10 h-10 flex items-center justify-center">
            <MessageSquare size={28} className="text-white" />
          </div>
          <span className="text-white text-xs">{video.comments}</span>
        </button>
        
        {/* Bouton Partager */}
        <button className="flex flex-col items-center">
          <div className="w-10 h-10 flex items-center justify-center">
            <Share size={28} className="text-white" />
          </div>
          <span className="text-white text-xs">{video.shares}</span>
        </button>
        
        {/* Disque rotatif (avatar) */}
        <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden animate-spin-slow">
          <img 
            src={video.userAvatar || "https://i.pravatar.cc/150"} 
            alt={video.username} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      {/* Informations utilisateur et description en bas */}
      <div className="absolute bottom-20 left-3 right-16">
        {/* Nom d'utilisateur */}
        <div className="mb-2">
          <span className="text-white font-bold">@{video.username}</span>
        </div>
        
        {/* Description */}
        <p className="text-white text-sm mb-4">
          {video.description}
        </p>
      </div>
    </div>
  );
};

export default VideoPlayer;
