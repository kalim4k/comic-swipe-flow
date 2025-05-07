
import BottomNavigation from '@/components/BottomNavigation';
import { Store, ShoppingCart } from 'lucide-react';
import comics from '@/data/comics';
import ComicGrid from '@/components/ComicGrid';

const StorePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-gray-50 p-4 border-b border-gray-200">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="w-8"></div> {/* Empty space for balance */}
          <h1 className="text-lg font-semibold text-center text-gray-800">Boutique BD</h1>
          <div className="flex items-center">
            <div className="text-gray-600 mr-4">
              <ShoppingCart size={20} />
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 px-4 py-4 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Comics grid - displaying all comics in a grid layout */}
          <div className="overflow-y-auto">
            <ComicGrid comics={comics} />
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default StorePage;
