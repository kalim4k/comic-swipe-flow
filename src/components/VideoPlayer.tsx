
import { useState, useRef, useEffect } from 'react';
import { Heart, MessageSquare, Share, Pause, Play, Link, MoreHorizontal, VolumeX } from 'lucide-react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

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
  const [isMuted, setIsMuted] = useState(false);
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

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
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
      {/* Logo "F" en haut à gauche */}
      <div className="absolute top-4 left-4 z-10">
        <div className="text-white text-2xl font-bold opacity-80">F</div>
      </div>
      
      {/* "For You" en haut au centre avec flèche */}
      <div className="absolute top-4 left-0 right-0 z-10 flex justify-center">
        <div className="text-white text-lg font-medium flex items-center">
          For You <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      {/* Badge LIVE en haut à droite */}
      <div className="absolute top-4 right-4 z-10">
        <Badge variant="outline" className="bg-transparent border border-white text-white px-2 uppercase">
          LIVE
        </Badge>
      </div>
      
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
      
      {/* Boutons d'interaction à droite */}
      <div className="absolute right-4 bottom-28 flex flex-col items-center space-y-6">
        {/* Bouton Like */}
        <button onClick={toggleLike} className="flex flex-col items-center">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${liked ? 'animate-pulse' : ''}`}>
            <Heart size={32} className={`${liked ? 'text-pink-500 fill-pink-500' : 'text-white'}`} />
          </div>
          <span className="text-white text-sm mt-1 font-medium">{liked ? video.likes + 1 : video.likes}</span>
        </button>
        
        {/* Bouton Commentaires */}
        <button className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full flex items-center justify-center">
            <MessageSquare size={30} className="text-white" />
          </div>
          <span className="text-white text-sm mt-1 font-medium">{video.comments}</span>
        </button>
        
        {/* Bouton Partager (lien) */}
        <button className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full flex items-center justify-center">
            <Link size={30} className="text-white" />
          </div>
          <span className="text-white text-sm mt-1 font-medium"></span>
        </button>
        
        {/* Bouton Mute */}
        <button onClick={toggleMute} className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full flex items-center justify-center">
            <VolumeX size={30} className="text-white" />
          </div>
          <span className="text-white text-sm mt-1 font-medium">Mute</span>
        </button>
        
        {/* Avatar LIVE animé */}
        <div className="relative">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-pink-500 animate-pulse">
            <img src="https://i.pravatar.cc/150?img=5" alt="Live user" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-pink-500 text-white text-xs font-bold rounded-sm px-1">
            LIVE
          </div>
        </div>
      </div>
      
      {/* Informations utilisateur et description en bas */}
      <div className="absolute bottom-4 left-4 right-16">
        {/* Nom d'utilisateur et bouton suivre */}
        <div className="flex items-center mb-2">
          <Avatar className="h-10 w-10 mr-3 border-2 border-white">
            <AvatarImage src={video.userAvatar || "https://i.pravatar.cc/150"} />
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center">
              <span className="text-white font-bold">{video.username}</span>
              {video.verified && <span className="ml-1 text-pink-500">✓</span>}
            </div>
          </div>
          <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-1 rounded-full text-sm font-medium border border-white/30">
            Follow
          </button>
        </div>
        
        {/* Description */}
        <p className="text-white text-sm mb-2 line-clamp-2">
          {video.description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {video.tags?.map((tag, i) => (
            <Badge key={i} variant="outline" className="bg-black/30 backdrop-blur-sm text-white border-0">
              #{tag}
            </Badge>
          ))}
        </div>
        
        {/* Bouton plus d'options */}
        <div className="absolute bottom-2 right-0">
          <button className="text-white">
            <MoreHorizontal size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
