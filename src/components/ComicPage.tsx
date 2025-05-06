
import React, { useState } from 'react';
import { cn } from "@/lib/utils";

interface ComicPageProps {
  image: string;
  secondImage?: string;
  title?: string;
  author?: string;
  className?: string;
  style?: React.CSSProperties;
  isActive: boolean;
  index: number;
}

const ComicPage: React.FC<ComicPageProps> = ({
  image,
  secondImage,
  title,
  author,
  className,
  style,
  isActive,
  index
}) => {
  // Add state for zoom level for each image
  const [firstImageZoom, setFirstImageZoom] = useState(1);
  const [secondImageZoom, setSecondImageZoom] = useState(1);
  
  // Track position for panning when zoomed
  const [firstImagePosition, setFirstImagePosition] = useState({ x: 0, y: 0 });
  const [secondImagePosition, setSecondImagePosition] = useState({ x: 0, y: 0 });

  // Handle pinch zoom gesture for the first image
  const handleFirstImageTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 2) return; // Only handle pinch gestures (2 fingers)
  };

  const handleFirstImageTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length !== 2) return;
    
    // Calculate distance between two touch points
    const touch1 = e.touches[0];
    const touch2 = e.touches[1];
    const distance = Math.hypot(
      touch2.clientX - touch1.clientX,
      touch2.clientY - touch1.clientY
    );
    
    // Use the distance to set zoom level (with limitations)
    const newZoom = Math.min(Math.max(distance / 150, 1), 3);
    setFirstImageZoom(newZoom);
  };

  const handleFirstImageTouchEnd = () => {
    // Reset zoom after a delay when completely finished
    setTimeout(() => {
      if (firstImageZoom > 1.5) {
        setFirstImageZoom(1);
        setFirstImagePosition({ x: 0, y: 0 });
      }
    }, 300);
  };

  // Similar handlers for second image
  const handleSecondImageTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 2) return;
  };

  const handleSecondImageTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length !== 2) return;
    
    const touch1 = e.touches[0];
    const touch2 = e.touches[1];
    const distance = Math.hypot(
      touch2.clientX - touch1.clientX,
      touch2.clientY - touch1.clientY
    );
    
    const newZoom = Math.min(Math.max(distance / 150, 1), 3);
    setSecondImageZoom(newZoom);
  };

  const handleSecondImageTouchEnd = () => {
    setTimeout(() => {
      if (secondImageZoom > 1.5) {
        setSecondImageZoom(1);
        setSecondImagePosition({ x: 0, y: 0 });
      }
    }, 300);
  };

  return <div className={cn("comic-page flex flex-col justify-between", className)} style={style} data-index={index}>
      {/* Top gradient decoration */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black/60 to-transparent z-10"></div>
      
      {/* Main images container with decorative elements - Added extra top margin (mt-16) */}
      <div className="relative flex-grow w-full my-4 mt-16">
        {/* Side decorative gradients */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute -left-16 top-1/2 -translate-y-1/2 w-32 h-96 bg-[radial-gradient(ellipse_at_center,rgba(0,204,255,0.15)_0%,transparent_70%)] blur-lg"></div>
          <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-32 h-96 bg-[radial-gradient(ellipse_at_center,rgba(0,204,255,0.15)_0%,transparent_70%)] blur-lg"></div>
        </div>
        
        {/* Subtle frame around the image */}
        <div className="absolute inset-0 m-1 border border-white/5 rounded-sm pointer-events-none z-0"></div>
        
        {/* Comic images container - vertical layout */}
        <div className="flex flex-col h-full w-full gap-4">
          {/* First image - with zoom functionality */}
          <div className="flex-1 h-full relative overflow-hidden" 
               onTouchStart={handleFirstImageTouchStart}
               onTouchMove={handleFirstImageTouchMove}
               onTouchEnd={handleFirstImageTouchEnd}>
            <img 
              src={image} 
              alt={title ? `${title} - top image` : `Comic page ${index * 2 + 1}`} 
              className="absolute inset-0 w-full h-full z-9 object-contain transform-gpu transition-transform" 
              style={{
                transform: `scale(${firstImageZoom}) translate(${firstImagePosition.x}px, ${firstImagePosition.y}px)`,
                transformOrigin: 'center',
              }}
            />
          </div>
          
          {/* Second image (if provided) - with zoom functionality */}
          {secondImage && (
            <div className="flex-1 h-full relative overflow-hidden"
                 onTouchStart={handleSecondImageTouchStart}
                 onTouchMove={handleSecondImageTouchMove}
                 onTouchEnd={handleSecondImageTouchEnd}>
              <img 
                src={secondImage} 
                alt={title ? `${title} - bottom image` : `Comic page ${index * 2 + 2}`} 
                className="absolute inset-0 w-full h-full object-contain z-10 transform-gpu transition-transform" 
                style={{
                  transform: `scale(${secondImageZoom}) translate(${secondImagePosition.x}px, ${secondImagePosition.y}px)`,
                  transformOrigin: 'center',
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Bottom overlay with title and author */}
      {(title || author) && <div className="relative px-4 py-3 bg-gradient-to-t from-black/90 to-transparent z-20">
          <div className="flex items-center justify-between">
            {title && <div>
                <h2 className="text-white text-lg font-medium mb-1">{title}</h2>
                {author && <p className="text-comic-accent text-sm font-light">@{author}</p>}
              </div>}
            
            {isActive && <div className="bg-comic-accent/20 backdrop-blur-sm rounded-full px-3 py-1 border border-comic-accent/30">
                <span className="text-white text-xs font-medium">{index + 1}</span>
              </div>}
          </div>
        </div>}
    </div>;
};

export default ComicPage;
