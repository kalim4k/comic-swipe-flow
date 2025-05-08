
import { useState, useRef, useEffect } from 'react';
import { Heart, MessageSquare, Share, Pause, Play, Link, MoreHorizontal } from 'lucide-react';

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

  const extractHashtags = (text: string) => {
    const regex = /#[a-zA-Z0-9_]+/g;
    return text.split(' ').map((word, index) => {
      if (word.match(regex)) {
        return (
          <span key={index} className="text-comic-accent">
            {word}{' '}
          </span>
        );
      }
      return word + ' ';
    });
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

      {/* Badge LIVE en haut à droite */}
      <div className="absolute top-4 right-4">
        <div className="bg-pink-600 text-white px-3 py-0.5 rounded text-xs font-semibold">
          LIVE
        </div>
      </div>
      
      {/* Informations et contrôles */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-20">
        <div className="max-w-[80%]">
          <div className="flex items-center mb-2">
            <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden bg-gray-500 mr-3">
              {video.userAvatar && (
                <img src={video.userAvatar} alt={video.username} className="w-full h-full object-cover" />
              )}
            </div>
            <div>
              <div className="flex items-center">
                <p className="font-bold">{video.username}</p>
                {video.verified && <span className="ml-1 text-comic-accent text-xs">✓</span>}
              </div>
              <button className="bg-comic-accent text-white text-xs px-3 py-1 rounded-full">
                Follow
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-200 mb-4">{extractHashtags(video.description)}</p>
        </div>
      </div>
      
      {/* Boutons d'interaction à droite */}
      <div className="absolute right-4 bottom-24 flex flex-col items-center space-y-6">
        {/* Avatar utilisateur dans un cercle avec bordure */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
            {video.userAvatar && (
              <img src={video.userAvatar} alt={video.username} className="w-full h-full object-cover" />
            )}
          </div>
          <div className="bg-comic-accent text-white rounded-full w-5 h-5 flex items-center justify-center text-xs absolute -bottom-1">+</div>
        </div>
        
        {/* Bouton Like */}
        <button onClick={toggleLike} className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center">
            <Heart size={28} className={`${liked ? 'text-red-500 fill-red-500' : 'text-white'}`} />
          </div>
          <span className="text-xs mt-1">{liked ? video.likes + 1 : video.likes}</span>
        </button>
        
        {/* Bouton Commentaires */}
        <button className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center">
            <MessageSquare size={26} className="text-white" />
          </div>
          <span className="text-xs mt-1">{video.comments}</span>
        </button>
        
        {/* Bouton Partager */}
        <button className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center">
            <Share size={26} className="text-white" />
          </div>
          <span className="text-xs mt-1">{video.shares}</span>
        </button>
        
        {/* Bouton Lien */}
        <button className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center">
            <Link size={24} className="text-white" />
          </div>
        </button>
        
        {/* Icon de petit profil animé (simulation du live) */}
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-600 animate-pulse">
          <img src="https://i.pravatar.cc/150?img=5" alt="Live user" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Bouton "..." pour plus d'options */}
      <div className="absolute right-4 bottom-4">
        <button className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center">
          <MoreHorizontal size={20} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
