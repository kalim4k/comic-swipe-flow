
import { Comic } from '@/data/comics';
import ComicCard from './ComicCard';

interface ComicGridProps {
  comics: Comic[];
}

const ComicGrid = ({ comics }: ComicGridProps) => {
  return (
    <div>
      <div className="flex flex-col gap-6">
        {comics.map((comic) => (
          <ComicCard key={comic.id} comic={comic} />
        ))}
      </div>
    </div>
  );
};

export default ComicGrid;
