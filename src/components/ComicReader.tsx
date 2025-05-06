import { useState, useEffect } from 'react';
import { useSwipe } from '@/hooks/useSwipe';
import ComicPage from './ComicPage';
import { cn } from '@/lib/utils';
import comicPages from '@/data/comicPages';
import { ChevronDown, ChevronUp } from 'lucide-react';
const ComicReader = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swipingDirection, setSwipingDirection] = useState<'up' | 'down' | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showNavigationHints, setShowNavigationHints] = useState(true);

  // Hide navigation hints after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNavigationHints(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  const goToNextPage = () => {
    if (isTransitioning) return;
    if (activeIndex < comicPages.length - 1) {
      setSwipingDirection('up');
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex(prev => prev + 1);
        setIsTransitioning(false);
        setSwipingDirection(null);
      }, 400); // Match this to animation duration
    }
  };
  const goToPrevPage = () => {
    if (isTransitioning) return;
    if (activeIndex > 0) {
      setSwipingDirection('down');
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex(prev => prev - 1);
        setIsTransitioning(false);
        setSwipingDirection(null);
      }, 400); // Match this to animation duration
    }
  };
  const {
    swipeHandlers,
    direction,
    swipeDistance
  } = useSwipe({
    onSwipeUp: goToNextPage,
    onSwipeDown: goToPrevPage,
    threshold: 100
  });

  // For keyboard navigation (accessibility and testing)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        goToPrevPage();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        goToNextPage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, isTransitioning]);

  // Calculate progress percentage
  const progressPercentage = (activeIndex + 1) / comicPages.length * 100;
  return <div className="relative flex flex-col h-full w-full bg-gradient-to-b from-black via-comic to-black overflow-hidden">
      {/* Header with title and progress */}
      <div className="absolute top-0 left-0 w-full z-20 bg-gradient-to-b from-black/80 to-transparent pt-4 pb-8 px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white tracking-wider">
            <span className="bg-gradient-to-r from-comic-accent to-blue-400 bg-clip-text text-transparent">CRAZY BD</span>
          </h1>
          <div className="flex flex-col items-end">
            <span className="text-xs text-white/70 mb-1">
              {activeIndex + 1} / {comicPages.length}
            </span>
            <div className="w-24 h-1 bg-gray-800 rounded overflow-hidden">
              <div className="h-full bg-gradient-to-r from-comic-accent to-blue-400 transition-all duration-300" style={{
              width: `${progressPercentage}%`
            }} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Main comic container */}
      <div className="comic-swipe-container relative w-full h-full overflow-hidden" {...swipeHandlers}>
        {/* Patterns for top and bottom empty spaces */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-1/4 bg-[radial-gradient(circle_at_center,rgba(0,204,255,0.1)_0%,transparent_70%)]"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-[radial-gradient(circle_at_center,rgba(0,204,255,0.1)_0%,transparent_70%)]"></div>
        </div>

        {comicPages.map((page, index) => {
        // Logic for current, previous, and next pages
        const isCurrent = index === activeIndex;
        const isPrev = index === activeIndex - 1;
        const isNext = index === activeIndex + 1;

        // Only render current, prev, and next pages for performance
        if (!isCurrent && !isPrev && !isNext) return null;

        // Determine animation classes based on swipe direction
        let animationClass = '';
        let transformStyle = {};
        if (swipingDirection === 'up' && isCurrent) {
          animationClass = 'animate-swipe-up';
        } else if (swipingDirection === 'up' && isNext) {
          animationClass = 'animate-swipe-in animate-zoom-in-slight';
        } else if (swipingDirection === 'down' && isCurrent) {
          animationClass = 'animate-swipe-in animate-zoom-in-slight';
        } else if (swipingDirection === 'down' && isPrev) {
          animationClass = 'animate-swipe-up transform rotate-180';
        }

        // Apply dynamic transform based on current swipe
        if (direction && isCurrent && Math.abs(swipeDistance) > 0) {
          const translateY = direction === 'up' ? -swipeDistance : -swipeDistance;
          const opacity = 1 - Math.min(Math.abs(swipeDistance) / 300, 0.6);
          transformStyle = {
            transform: `translateY(${translateY}px)`,
            opacity
          };
        }

        // Position non-active pages
        if (isNext) {
          transformStyle = {
            ...transformStyle,
            transform: 'translateY(100%)'
          };
        } else if (isPrev) {
          transformStyle = {
            ...transformStyle,
            transform: 'translateY(-100%)',
            opacity: 0
          };
        }
        return <ComicPage key={page.id} image={page.image} title={page.title} author={page.author} isActive={isCurrent} index={index} className={cn("transition-all duration-400", animationClass, {
          "z-10": isCurrent,
          "z-0": !isCurrent
        })} style={transformStyle} />;
      })}

        {/* Navigation Hints */}
        {showNavigationHints && <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none z-30 opacity-70 animate-fade-in">
            <div className="flex flex-col items-center gap-16">
              <div className="flex flex-col items-center gap-2 text-white">
                <ChevronUp size={36} className="animate-bounce" />
                <span className="text-xs font-medium">Glissez vers le haut</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-white">
                <span className="text-xs font-medium">Glissez vers le bas</span>
                <ChevronDown size={36} className="animate-bounce" />
              </div>
            </div>
          </div>}

        {/* Bottom indicator for next page */}
        {activeIndex < comicPages.length - 1 && <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/60 gap-1 animate-pulse">
            <ChevronDown size={20} />
            <span className="text-xs">Suivant</span>
          </div>}
        
        {/* Top indicator for previous page */}
        {activeIndex > 0 && <div className="absolute top-20 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/60 gap-1 animate-pulse">
            <span className="text-xs">Précédent</span>
            <ChevronUp size={20} />
          </div>}
      </div>
    </div>;
};
export default ComicReader;