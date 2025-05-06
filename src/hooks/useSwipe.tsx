
import { useState, useRef, useEffect, TouchEvent } from 'react';

interface SwipeHandlers {
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
}

export function useSwipe({ onSwipeUp, onSwipeDown, threshold = 100 }: SwipeHandlers) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const [swipeDistance, setSwipeDistance] = useState(0);
  const swipingRef = useRef(false);

  // Reset the distance when starting a new touch
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
    setTouchEnd(null);
    setDirection(null);
    swipingRef.current = true;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!touchStart || !swipingRef.current) return;
    
    const currentTouch = e.targetTouches[0].clientY;
    setTouchEnd(currentTouch);
    
    const distance = touchStart - currentTouch;
    setSwipeDistance(distance);
    
    if (distance > 0) {
      setDirection('up');
    } else {
      setDirection('down');
    }
    
    setIsSwiping(true);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || !swipingRef.current) return;
    
    const distance = touchStart - touchEnd;
    const isSignificantSwipe = Math.abs(distance) > threshold;
    
    if (isSignificantSwipe) {
      if (distance > 0 && onSwipeUp) {
        onSwipeUp();
      } else if (distance < 0 && onSwipeDown) {
        onSwipeDown();
      }
    }
    
    // Reset
    setTouchStart(null);
    setTouchEnd(null);
    setIsSwiping(false);
    setDirection(null);
    setSwipeDistance(0);
    swipingRef.current = false;
  };

  const swipeHandlers = {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  };

  return {
    swipeHandlers,
    isSwiping,
    direction,
    swipeDistance,
    swipePercentage: touchStart && touchEnd ? Math.min(Math.abs(swipeDistance) / threshold, 1) : 0,
  };
}
