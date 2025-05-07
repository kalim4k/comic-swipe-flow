
import { Comic } from '@/data/comics';
import ComicCard from './ComicCard';

interface ComicGridProps {
  comics: Comic[];
}

const ComicGrid = ({ comics }: ComicGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {comics.map((comic) => (
        <ComicCard key={comic.id} comic={comic} />
      ))}
    </div>
  );
};

export default ComicGrid;
