
import { FC, CSSProperties } from 'react';
import { Star, User } from 'lucide-react';
import { Review } from '@/types/review';
import { formatRelativeTime } from '@/lib/date-utils';
import { Card } from '@/components/ui/card';

interface ReviewCardProps {
  review: Review;
  style?: CSSProperties;
}

const ReviewCard: FC<ReviewCardProps> = ({ review, style }) => {
  return (
    <div 
      className="animate-fade-in transition-all duration-500 ease-out"
      style={style}
    >
      <Card className={`
        p-4 rounded-xl backdrop-blur-sm border border-white/10
        ${review.isUserGenerated 
          ? 'bg-gradient-to-r from-pink-500/10 to-purple-500/10 border-pink-500/20' 
          : 'bg-white/5 border-white/10'}
      `}>
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center
              ${review.isUserGenerated 
                ? 'bg-gradient-to-br from-pink-500 to-purple-500' 
                : 'bg-gradient-to-br from-blue-500/80 to-purple-500/80'}
            `}>
              <User className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-white font-medium">{review.username}</p>
              <p className="text-white/50 text-xs">{formatRelativeTime(review.timestamp)}</p>
            </div>
          </div>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${
                  i < review.rating 
                    ? 'text-yellow-400 fill-yellow-400' 
                    : 'text-white/20'
                }`} 
              />
            ))}
          </div>
        </div>
        <p className="text-white/90 text-sm">{review.message}</p>
      </Card>
    </div>
  );
};

export default ReviewCard;
