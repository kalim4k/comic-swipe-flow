
import { useEffect, useState } from 'react';

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

const EmojiEffects: React.FC = () => {
  const [emojis, setEmojis] = useState<EmojiPosition[]>([]);
  const [lastScrollY, setLastScrollY] = useState(0);

  const createEmoji = () => {
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
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Only create emojis if user is actively scrolling (changed scroll position)
      if (Math.abs(currentScrollY - lastScrollY) > 5) {
        // Create between 1-3 emojis on scroll
        const count = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < count; i++) {
          // Add slight delay between emoji creation
          setTimeout(() => createEmoji(), i * 100);
        }
        
        // Create vibration effect if available
        if (navigator.vibrate) {
          navigator.vibrate(20);
        }
        
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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
};

export default EmojiEffects;
