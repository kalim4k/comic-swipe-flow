
import BottomNavigation from '@/components/BottomNavigation';
import { Store } from 'lucide-react';
import comics from '@/data/comics';
import ComicGrid from '@/components/ComicGrid';

const StorePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-[#121212] to-black">
      {/* Header with animated gradient */}
      <header className="relative pt-8 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Gradient background with animated particles */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-black/70 to-blue-900/30"></div>
          
          {/* Animated particles */}
          <div className="absolute top-10 left-[10%] w-24 h-24 rounded-full bg-gradient-to-br from-comic-accent/40 to-blue-500/20 blur-2xl opacity-50 floating"></div>
          <div className="absolute top-20 right-[15%] w-32 h-32 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/20 blur-2xl opacity-40 floating-delayed"></div>
          <div className="absolute bottom-0 left-[30%] w-40 h-40 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-300/10 blur-3xl opacity-30 floating"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-comic-accent to-blue-500 flex items-center justify-center shadow-lg shadow-comic-accent/20">
              <Store className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-center text-white mb-3">
            <span className="bg-gradient-to-r from-comic-accent to-blue-400 bg-clip-text text-transparent">
              Boutique BD
            </span>
          </h1>
          
          <p className="text-center text-white/70 max-w-md mx-auto">
            Découvrez notre collection exclusive de bandes dessinées disponibles uniquement sur CRAZY BD
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Results count */}
          <div className="mb-6 text-white/70">
            <p>{comics.length} BD{comics.length !== 1 ? 's' : ''} disponible{comics.length !== 1 ? 's' : ''}</p>
          </div>
          
          {/* Comics grid - displaying all comics in a scrollable container */}
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
