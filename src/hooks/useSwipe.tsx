
import { useState, useRef, TouchEvent } from 'react';

interface SwipeHandlers {
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
}

export function useSwipe({ onSwipeUp, onSwipeDown, onSwipeLeft, onSwipeRight, threshold = 100 }: SwipeHandlers) {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [direction, setDirection] = useState<'up' | 'down' | 'left' | 'right' | null>(null);
  const [swipeDistance, setSwipeDistance] = useState({ x: 0, y: 0 });
  const swipingRef = useRef(false);
  const isTransitioningRef = useRef(false);

  // Reset the distance when starting a new touch
  const handleTouchStart = (e: TouchEvent) => {
    // If currently in a transition, ignore new touch events
    if (isTransitioningRef.current) return;
    
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
    setTouchEnd(null);
    setDirection(null);
    swipingRef.current = true;
  };

  const handleTouchMove = (e: TouchEvent) => {
    // If no touch start or not swiping or in transition, ignore
    if (!touchStart || !swipingRef.current || isTransitioningRef.current) return;
    
    const currentTouch = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    };
    
    setTouchEnd(currentTouch);
    
    const distance = {
      x: touchStart.x - currentTouch.x,
      y: touchStart.y - currentTouch.y
    };
    
    setSwipeDistance(distance);
    
    // Determine the primary direction of the swipe
    const absX = Math.abs(distance.x);
    const absY = Math.abs(distance.y);
    
    if (absX > absY) {
      // Horizontal swipe is dominant
      if (distance.x > 0) {
        setDirection('left');
      } else {
        setDirection('right');
      }
    } else {
      // Vertical swipe is dominant
      if (distance.y > 0) {
        setDirection('up');
      } else {
        setDirection('down');
      }
    }
    
    setIsSwiping(true);
  };

  const handleTouchEnd = () => {
    // If no touch start or no touch end or not swiping or in transition, ignore
    if (!touchStart || !touchEnd || !swipingRef.current || isTransitioningRef.current) return;
    
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const absX = Math.abs(distanceX);
    const absY = Math.abs(distanceY);
    
    let isSignificantSwipe = false;
    let swipeHandler = null;
    
    // Determine which direction had the most significant movement
    if (absX > absY) {
      isSignificantSwipe = absX > threshold;
      if (isSignificantSwipe) {
        swipeHandler = distanceX > 0 ? onSwipeLeft : onSwipeRight;
      }
    } else {
      isSignificantSwipe = absY > threshold;
      if (isSignificantSwipe) {
        swipeHandler = distanceY > 0 ? onSwipeUp : onSwipeDown;
      }
    }
    
    if (isSignificantSwipe && swipeHandler) {
      isTransitioningRef.current = true; // Mark as transitioning to prevent overlaps
      
      swipeHandler();
      // Reset transitioning state after animation completes
      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 420); // Slightly longer than animation duration to ensure completion
    } else {
      isTransitioningRef.current = false; // Not a significant swipe, reset immediately
    }
    
    // Reset swipe state
    setTouchStart(null);
    setTouchEnd(null);
    setIsSwiping(false);
    setDirection(null);
    setSwipeDistance({ x: 0, y: 0 });
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
    swipePercentage: touchStart && touchEnd ? 
      Math.min(Math.max(Math.abs(swipeDistance.x), Math.abs(swipeDistance.y)) / threshold, 1) : 0,
  };
}
