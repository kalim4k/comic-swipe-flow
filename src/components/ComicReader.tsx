
import { useState, useEffect } from 'react';
import { useSwipe } from '@/hooks/useSwipe';
import ComicPage from './ComicPage';
import { cn } from '@/lib/utils';

// Sample mock data for comics
const mockComicPages = [
  {
    id: 1,
    image: '/lovable-uploads/9d336dc6-1fec-4517-a07f-4939fb584285.png', // Using the uploaded image
    title: "La Cité Éternelle",
    author: "artiste_bd"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    title: "Le Secret de l'Ombre",
    author: "artiste_bd"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    title: "Code Mystérieux",
    author: "artiste_bd"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1486718448742-163732cd1544",
    title: "La Vague",
    author: "artiste_bd"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1439337153520-7082a56a81f4",
    title: "La Structure Finale",
    author: "artiste_bd"
  }
];

const ComicReader = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swipingDirection, setSwipingDirection] = useState<'up' | 'down' | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToNextPage = () => {
    if (isTransitioning) return;
    
    if (activeIndex < mockComicPages.length - 1) {
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

  const { swipeHandlers, direction, swipeDistance } = useSwipe({
    onSwipeUp: goToNextPage,
    onSwipeDown: goToPrevPage,
    threshold: 100,
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

  return (
    <div 
      className="comic-swipe-container bg-comic w-full h-full overflow-hidden"
      {...swipeHandlers}
    >
      {mockComicPages.map((page, index) => {
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
          transformStyle = { ...transformStyle, transform: 'translateY(100%)' };
        } else if (isPrev) {
          transformStyle = { ...transformStyle, transform: 'translateY(-100%)', opacity: 0 };
        }
        
        return (
          <ComicPage
            key={page.id}
            image={page.image}
            title={page.title}
            author={page.author}
            isActive={isCurrent}
            index={index}
            className={cn(
              "transition-all duration-400",
              animationClass,
              { "z-10": isCurrent, "z-0": !isCurrent }
            )}
            style={transformStyle}
          />
        );
      })}
    </div>
  );
};

export default ComicReader;
