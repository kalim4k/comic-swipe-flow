
import { useState, useRef, TouchEvent } from 'react';

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
  const isTransitioningRef = useRef(false);

  // Reset the distance when starting a new touch
  const handleTouchStart = (e: TouchEvent) => {
    // If currently in a transition, ignore new touch events
    if (isTransitioningRef.current) return;
    
    setTouchStart(e.targetTouches[0].clientY);
    setTouchEnd(null);
    setDirection(null);
    swipingRef.current = true;
  };

  const handleTouchMove = (e: TouchEvent) => {
    // If no touch start or not swiping or in transition, ignore
    if (!touchStart || !swipingRef.current || isTransitioningRef.current) return;
    
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
    // If no touch start or no touch end or not swiping or in transition, ignore
    if (!touchStart || !touchEnd || !swipingRef.current || isTransitioningRef.current) return;
    
    const distance = touchStart - touchEnd;
    const isSignificantSwipe = Math.abs(distance) > threshold;
    
    if (isSignificantSwipe) {
      isTransitioningRef.current = true; // Mark as transitioning to prevent overlaps
      
      if (distance > 0 && onSwipeUp) {
        onSwipeUp();
        // Reset transitioning state after animation completes
        setTimeout(() => {
          isTransitioningRef.current = false;
        }, 420); // Slightly longer than animation duration to ensure completion
      } else if (distance < 0 && onSwipeDown) {
        onSwipeDown();
        // Reset transitioning state after animation completes
        setTimeout(() => {
          isTransitioningRef.current = false;
        }, 420); // Slightly longer than animation duration to ensure completion
      } else {
        isTransitioningRef.current = false; // No action taken, reset immediately
      }
    } else {
      isTransitioningRef.current = false; // Not a significant swipe, reset immediately
    }
    
    // Reset swipe state
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
