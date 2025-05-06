
import React, { useState } from 'react';
import { Heart, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PostActionsProps {
  initialLikes?: number;
  className?: string;
  onLike?: (isLiked: boolean) => void;
  onComment?: () => void;
}

const PostActions: React.FC<PostActionsProps> = ({
  initialLikes = 689,
  className,
  onLike,
  onComment
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prevLikes => isLiked ? prevLikes - 1 : prevLikes + 1);
    if (onLike) onLike(!isLiked);
  };

  const handleComment = () => {
    if (onComment) onComment();
  };

  return (
    <div className={cn("bg-black px-4 py-3", className)}>
      <div className="flex items-center gap-4">
        <button 
          onClick={handleLike}
          className="flex items-center gap-1"
        >
          <Heart 
            className={cn(
              "h-6 w-6", 
              isLiked ? "fill-red-500 text-red-500" : "text-white"
            )} 
          />
        </button>
        <button 
          onClick={handleComment}
          className="flex items-center gap-1"
        >
          <MessageSquare className="h-6 w-6 text-white" />
        </button>
      </div>
      
      <div className="mt-2">
        <p className="font-semibold text-white">{likes} j'aime</p>
        <p className="text-white">
          <span className="font-semibold">marcus</span>
          <span className="text-gray-300 ml-2">Il y a quelques minutes</span>
        </p>
        <p className="text-gray-400 text-sm mt-1">Ajouter un commentaire...</p>
      </div>
    </div>
  );
};

export default PostActions;
