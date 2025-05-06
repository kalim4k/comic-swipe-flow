
import ComicReader from '@/components/ComicReader';
import BottomNavigation from '@/components/BottomNavigation';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <ComicReader />
      </main>
      <BottomNavigation />
    </div>
  );
};

export default Index;
