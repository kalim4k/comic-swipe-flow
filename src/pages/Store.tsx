
import BottomNavigation from '@/components/BottomNavigation';

const Store = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-4">
        <div className="h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-2xl font-bold mb-4">Boutique</h1>
            <p className="text-gray-400">La boutique est en cours de développement...</p>
          </div>
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
};

export default Store;
