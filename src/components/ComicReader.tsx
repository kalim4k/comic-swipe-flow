
import React, { useState, useEffect } from 'react';
import { useSwipe } from '@/hooks/useSwipe';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import ComicPage from './ComicPage';
import comicPages from '@/data/comicPages';
import { ArrowLeft } from 'lucide-react';

interface ComicReaderProps {
  onBack?: () => void;
}

const ComicReader: React.FC<ComicReaderProps> = ({ onBack }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const handleNextPage = () => {
    if (isTransitioning || currentPage >= comicPages.length - 1) return;
    setDirection('left');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(prev => Math.min(prev + 1, comicPages.length - 1));
      setIsTransitioning(false);
    }, 300);
  };

  const handlePrevPage = () => {
    if (isTransitioning || currentPage <= 0) return;
    setDirection('right');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(prev => Math.max(prev - 1, 0));
      setIsTransitioning(false);
    }, 300);
  };

  const { swipeHandlers } = useSwipe({
    onSwipeLeft: handleNextPage,
    onSwipeRight: handlePrevPage,
    threshold: 50
  });

  return (
    <div className="relative h-screen bg-comic overflow-hidden">
      {/* Back button */}
      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-4 left-4 z-50 bg-black/50 p-2 rounded-full text-white"
        >
          <ArrowLeft size={24} />
        </button>
      )}
      
      <div 
        className="comic-swipe-container"
        {...swipeHandlers}
      >
        {comicPages.map((page, index) => (
          <ComicPage
            key={page.id}
            image={page.image}
            title={page.title}
            author={page.author}
            isActive={currentPage === index}
            index={index}
            currentPage={currentPage}
            direction={direction}
            isTransitioning={isTransitioning}
          />
        ))}
      </div>

      {/* Page navigation controls */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-between px-6">
        <button 
          onClick={handlePrevPage}
          className={cn(
            "p-3 rounded-full bg-black/30 text-white",
            currentPage === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-black/50"
          )}
          disabled={currentPage === 0}
        >
          <ChevronLeft size={24} />
        </button>
        <div className="text-white font-medium">
          {currentPage + 1} / {comicPages.length}
        </div>
        <button 
          onClick={handleNextPage}
          className={cn(
            "p-3 rounded-full bg-black/30 text-white",
            currentPage === comicPages.length - 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-black/50"
          )}
          disabled={currentPage === comicPages.length - 1}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default ComicReader;
