
import React from 'react';
import { cn } from "@/lib/utils";

interface ComicPageProps {
  image: string;
  title?: string;
  author?: string;
  className?: string;
  style?: React.CSSProperties;
  isActive: boolean;
  index: number;
}

const ComicPage: React.FC<ComicPageProps> = ({
  image,
  title,
  author,
  className,
  style,
  isActive,
  index
}) => {
  return (
    <div
      className={cn(
        "comic-page flex flex-col justify-between",
        className
      )}
      style={style}
      data-index={index}
    >
      {/* Main image that takes up most of the screen */}
      <div className="relative flex-grow w-full">
        <img
          src={image}
          alt={title || `Comic page ${index + 1}`}
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>

      {/* Bottom overlay with title and author */}
      {(title || author) && (
        <div className="relative px-4 py-3 bg-gradient-to-t from-black/80 to-transparent">
          {title && (
            <h2 className="text-white text-lg font-medium mb-1">{title}</h2>
          )}
          {author && (
            <p className="text-white/70 text-sm">@{author}</p>
          )}
        </div>
      )}

      {/* Only show page indicator when active */}
      {isActive && (
        <div className="absolute top-4 right-4 bg-black/50 rounded-full px-3 py-1.5 text-xs text-white font-medium">
          {index + 1}
        </div>
      )}
    </div>
  );
};

export default ComicPage;
