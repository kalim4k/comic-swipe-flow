
import { Comic } from '@/data/comics';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Book } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ComicCardProps {
  comic: Comic;
}

const ComicCard = ({ comic }: ComicCardProps) => {
  return (
    <Card className="overflow-hidden bg-black/30 border border-white/10 backdrop-blur-sm rounded-xl relative group">
      <div className="flex flex-col md:flex-row">
        {/* Cover image */}
        <div className="relative aspect-[2/3] w-full md:w-1/3">
          <img 
            src={comic.coverImage} 
            alt={comic.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Content */}
        <div className="p-4 flex flex-col justify-between w-full md:w-2/3">
          <div>
            <h3 className="text-white font-bold text-xl mb-2">{comic.title}</h3>
            <p className="text-white/70 text-lg font-semibold mb-4">{comic.price} {comic.currency}</p>
          </div>
          
          <Link to={`/comic/${comic.id}`}>
            <Button 
              className="w-full bg-gradient-to-r from-comic-accent to-blue-500 hover:from-comic-accent-hover hover:to-blue-600 text-white"
            >
              <Book className="mr-2 h-4 w-4" /> Voir les extraits
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default ComicCard;
