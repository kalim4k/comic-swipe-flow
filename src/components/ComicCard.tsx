
import { Comic } from '@/data/comics';
import { Card } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ComicCardProps {
  comic: Comic;
}

const ComicCard = ({ comic }: ComicCardProps) => {
  return (
    <Link to={`/comic/${comic.id}`}>
      <Card className="overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
        {/* Cover image */}
        <div className="relative aspect-square w-full">
          <img 
            src={comic.coverImage} 
            alt={comic.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Content */}
        <div className="p-3 flex flex-col flex-1">
          <h3 className="text-gray-700 font-medium text-sm line-clamp-2 mb-2">{comic.title}</h3>
          <div className="mt-auto flex items-center justify-between">
            <p className="text-orange-500 font-semibold">{comic.price} {comic.currency}</p>
            <div className="text-orange-500">
              <ShoppingCart size={16} />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ComicCard;
