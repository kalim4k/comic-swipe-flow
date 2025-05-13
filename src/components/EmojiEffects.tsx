
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

  const createEmoji = () => {
    // Create a random position for the emoji
    const id = Date.now() + Math.random();
    const x = Math.random() * (window.innerWidth - 50);
    const y = window.innerHeight - 50; // Position at bottom of screen
    const scale = 0.8 + Math.random() * 1.2;
    const rotation = -20 + Math.random() * 40;
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
      // Create between 1-3 emojis on scroll
      const count = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < count; i++) {
        setTimeout(() => createEmoji(), i * 100);
      }
      
      // Create vibration effect if available
      if (navigator.vibrate) {
        navigator.vibrate(20);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {emojis.map(emoji => (
        <div 
          key={emoji.id}
          className="absolute emoji-float"
          style={{
            left: `${emoji.x}px`,
            top: `${emoji.y}px`,
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
