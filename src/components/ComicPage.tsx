
import React from 'react';
import { cn } from '@/lib/utils';

interface ComicPageProps {
  image: string;
  title?: string;
  author?: string;
  isActive: boolean;
  index: number;
  currentPage: number;
  direction: 'left' | 'right' | null;
  isTransitioning: boolean;
}

const ComicPage: React.FC<ComicPageProps> = ({
  image,
  title,
  author,
  isActive,
  index,
  currentPage,
  direction,
  isTransitioning,
}) => {
  const getTransformStyle = () => {
    if (!isActive && index < currentPage) {
      return 'translateX(-100%)';
    } else if (!isActive && index > currentPage) {
      return 'translateX(100%)';
    } else if (isActive && isTransitioning && direction === 'left') {
      return 'translateX(-20%)';
    } else if (isActive && isTransitioning && direction === 'right') {
      return 'translateX(20%)';
    }
    return 'translateX(0)';
  };

  return (
    <div
      className={cn(
        "comic-page",
        isActive ? "z-10" : "z-0"
      )}
      style={{
        transform: getTransformStyle(),
        opacity: isActive ? 1 : 0
      }}
    >
      <div className="h-full w-full flex flex-col relative">
        <img
          src={image}
          alt={title || `Comic page ${index + 1}`}
          className="w-full h-full object-contain"
        />
        
        {(title || author) && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            {title && <h2 className="text-white text-xl font-bold">{title}</h2>}
            {author && <p className="text-white/70 text-sm">{author}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComicPage;
