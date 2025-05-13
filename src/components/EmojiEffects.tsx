
import { useEffect, useState, useCallback, forwardRef, useImperativeHandle } from 'react';

interface EmojiPosition {
  id: number;
  emoji: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  opacity: number;
}

const EMOJIS = ["🔞", "🫦", "🍑", "🍒", "🍆", "🍌"];

export interface EmojiEffectsRef {
  triggerEmojis: (count?: number) => void;
}

const EmojiEffects = forwardRef<EmojiEffectsRef>((_, ref) => {
  const [emojis, setEmojis] = useState<EmojiPosition[]>([]);
  const [lastScrollY, setLastScrollY] = useState(0);

  const createEmoji = useCallback(() => {
    // Create a random position for the emoji
    const id = Date.now() + Math.random();
    const x = Math.random() * window.innerWidth * 0.8; // 80% of screen width
    const y = window.innerHeight - 100; // Start near the bottom
    const scale = 0.8 + Math.random() * 1.2;
    const rotation = -30 + Math.random() * 60; // Between -30 and 30 degrees
    const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

    const newEmoji = { id, emoji, x, y, scale, rotation, opacity: 1 };
    
    setEmojis(prev => [...prev, newEmoji]);

    // Remove emoji after animation completes
    setTimeout(() => {
      setEmojis(prev => prev.filter(e => e.id !== id));
    }, 3000);
  }, []);

  const triggerEmojis = useCallback((count = 3) => {
    // Create between 1 and count emojis
    const emojiCount = Math.floor(Math.random() * count) + 1;
    
    for (let i = 0; i < emojiCount; i++) {
      // Add slight delay between emoji creation
      setTimeout(() => createEmoji(), i * 100);
    }
    
    // Create vibration effect if available
    if (navigator.vibrate) {
      navigator.vibrate(20);
    }
  }, [createEmoji]);

  // Expose the triggerEmojis method via ref
  useImperativeHandle(ref, () => ({
    triggerEmojis
  }));

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Only create emojis if user is actively scrolling (changed scroll position)
      if (Math.abs(currentScrollY - lastScrollY) > 5) {
        triggerEmojis();
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, triggerEmojis]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {emojis.map(emoji => (
        <div 
          key={emoji.id}
          className="absolute emoji-float"
          style={{
            left: `${emoji.x}px`,
            bottom: `${emoji.y}px`,
            transform: `scale(${emoji.scale}) rotate(${emoji.rotation}deg)`,
            opacity: emoji.opacity,
            fontSize: '2.5rem',
          }}
        >
          {emoji.emoji}
        </div>
      ))}
    </div>
  );
});

EmojiEffects.displayName = 'EmojiEffects';

export default EmojiEffects;
