
import { useState, useRef, useEffect } from 'react';
import { Heart, MessageSquare, Share, Pause, Play } from 'lucide-react';

interface Video {
  id: number;
  url: string;
  username: string;
  description: string;
  likes: number;
  comments: number;
  shares: number;
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
      
      {/* Overlay pour le contrôle play/pause */}
      <div className="absolute inset-0 flex items-center justify-center">
        {!isPlaying && (
          <button
            onClick={togglePlayPause}
            className="bg-black/30 rounded-full p-4 backdrop-blur-sm"
          >
            <Play size={32} className="text-white" />
          </button>
        )}
      </div>
      
      {/* Informations et contrôles */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <div className="max-w-[80%]">
          <p className="font-bold">{video.username}</p>
          <p className="text-sm text-gray-200 mb-2">{video.description}</p>
        </div>
      </div>
      
      {/* Boutons d'interaction */}
      <div className="absolute right-4 bottom-20 flex flex-col items-center space-y-6">
        <button onClick={toggleLike} className="flex flex-col items-center">
          <Heart size={30} className={`${liked ? 'text-red-500 fill-red-500' : 'text-white'}`} />
          <span className="text-xs mt-1">{liked ? video.likes + 1 : video.likes}</span>
        </button>
        
        <button className="flex flex-col items-center">
          <MessageSquare size={30} className="text-white" />
          <span className="text-xs mt-1">{video.comments}</span>
        </button>
        
        <button className="flex flex-col items-center">
          <Share size={30} className="text-white" />
          <span className="text-xs mt-1">{video.shares}</span>
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
