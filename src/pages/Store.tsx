
import BottomNavigation from '@/components/BottomNavigation';
import { Store } from 'lucide-react';

const StorePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-[#121212] to-black">
      <main className="flex-1 p-4">
        <div className="h-full flex flex-col items-center justify-center">
          <div className="text-center text-white max-w-md mx-auto p-6 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10 shadow-xl">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-comic-accent to-blue-500 flex items-center justify-center">
                <Store className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Boutique</h1>
              <div className="w-16 h-1 bg-gradient-to-r from-comic-accent to-blue-500 mx-auto my-4"></div>
            </div>
            <p className="text-gray-400 mb-8">Notre boutique est en cours de développement. De nouveaux chapitres et produits seront bientôt disponibles !</p>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="aspect-square bg-white/5 rounded-md animate-pulse"></div>
              <div className="aspect-square bg-white/5 rounded-md animate-pulse"></div>
              <div className="aspect-square bg-white/5 rounded-md animate-pulse"></div>
              <div className="aspect-square bg-white/5 rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
};

export default StorePage;
