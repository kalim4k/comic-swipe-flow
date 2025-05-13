import { useState, useEffect } from 'react';
import ComicPage from '@/components/ComicPage';
import { ScrollArea } from '@/components/ui/scroll-area';
import StorePromoAd from './StorePromoAd';
import { Button } from './ui/button';
import { ChevronLeft } from 'lucide-react';

interface ComicReaderProps {
  onBack?: () => void;
}

const ComicReader: React.FC<ComicReaderProps> = ({ onBack }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showPromo, setShowPromo] = useState(false);

  useEffect(() => {
    // Show promo ad after the 3rd page
    if (currentPage === 3) {
      setShowPromo(true);
    } else {
      setShowPromo(false);
    }
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(1, prevPage - 1));
  };

  const closePromo = () => {
    setShowPromo(false);
  };
  
  // Si le composant a une fonction onBack, ajouter un bouton de retour
  return (
    <div className="h-[calc(100vh-64px)]">
      {onBack && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 left-2 z-10 bg-black/30 hover:bg-black/50 text-white"
          onClick={onBack}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      )}
      
      <ScrollArea className="h-full">
        <div className="flex flex-col items-center py-8">
          <ComicPage pageNumber={currentPage} />
          <div className="flex justify-between w-full max-w-md mt-4 px-4">
            <Button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </Button>
            <Button onClick={handleNextPage}>Next</Button>
          </div>
        </div>
      </ScrollArea>
      
      {showPromo && <StorePromoAd onClose={closePromo} variant="mid-chapter" />}
    </div>
  );
};

export default ComicReader;
