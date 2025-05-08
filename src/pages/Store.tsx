
import BottomNavigation from '@/components/BottomNavigation';
import { Store as StoreIcon } from 'lucide-react';
import ComicCard from '@/components/ComicCard';
import comicBooks from '@/data/comicBooks';

const StorePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 overflow-y-auto pb-16">
      <main className="flex-1 p-4 pb-24 max-w-screen-lg mx-auto">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-comic-accent to-blue-500 flex items-center justify-center">
            <StoreIcon className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-center mb-2">Boutique</h1>
          <div className="w-16 h-1 bg-gradient-to-r from-comic-accent to-blue-500 mx-auto mb-8"></div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {comicBooks.map((comic) => (
            <ComicCard key={comic.id} comic={comic} />
          ))}
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
};

export default StorePage;
