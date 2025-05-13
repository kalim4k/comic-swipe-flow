
import { useState, useEffect } from 'react';
import { useSwipe } from '@/hooks/useSwipe';

interface Emoji {
  id: number;
  emoji: string;
  x: number;
  y: number;
  opacity: number;
  scale: number;
  rotation: number;
  animationDelay: number;
}

const emojis = ['🔞', '🫦', '🍑', '🍒', '🍆', '🍌'];
const maxEmojis = 15;

const EmojiEffects: React.FC = () => {
  const [visibleEmojis, setVisibleEmojis] = useState<Emoji[]>([]);
  const [combo, setCombo] = useState(0);
  const [lastSwipeTime, setLastSwipeTime] = useState(0);
  const [showComboText, setShowComboText] = useState(false);
  
  const createEmoji = () => {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const scale = 0.8 + Math.random() * 1.2;
    const rotation = Math.random() * 360;
    const animationDelay = Math.random() * 0.5;
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    return {
      id: Date.now() + Math.random(),
      emoji,
      x,
      y,
      opacity: 1,
      scale,
      rotation,
      animationDelay,
    };
  };

  const handleSwipeAction = () => {
    const now = Date.now();
    
    // Check if this is a quick succession of swipes (combo)
    const isCombo = now - lastSwipeTime < 1500;
    setLastSwipeTime(now);
    
    if (isCombo) {
      const newCombo = combo + 1;
      setCombo(newCombo);
      
      // Show combo text
      if (newCombo > 1) {
        setShowComboText(true);
        setTimeout(() => setShowComboText(false), 1000);
      }
      
      // Vibrate on combo if supported
      if ('vibrate' in navigator) {
        try {
          navigator.vibrate(50);
        } catch (e) {
          console.log('Vibration not supported');
        }
      }
    } else {
      setCombo(1);
    }
    
    // Add emojis based on combo
    const newEmojisCount = Math.min(combo, 5);
    
    let newEmojis: Emoji[] = [];
    for (let i = 0; i < newEmojisCount; i++) {
      newEmojis.push(createEmoji());
    }
    
    setVisibleEmojis(prev => {
      const updated = [...prev, ...newEmojis];
      if (updated.length > maxEmojis) {
        return updated.slice(updated.length - maxEmojis);
      }
      return updated;
    });
  };
  
  const { swipeHandlers } = useSwipe({
    onSwipeUp: handleSwipeAction,
    onSwipeDown: handleSwipeAction,
    onSwipeLeft: handleSwipeAction,  
    onSwipeRight: handleSwipeAction,
    threshold: 50,
  });
  
  useEffect(() => {
    // Clean up old emojis
    const interval = setInterval(() => {
      setVisibleEmojis(emojis => 
        emojis.filter(e => {
          const age = Date.now() - e.id;
          return age < 3000; // Remove emojis after 3 seconds
        })
      );
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none z-10" 
      {...swipeHandlers}
    >
      {/* Floating emojis */}
      {visibleEmojis.map(emoji => (
        <div
          key={emoji.id}
          className="absolute floating"
          style={{
            left: `${emoji.x}%`,
            top: `${emoji.y}%`,
            opacity: emoji.opacity,
            transform: `scale(${emoji.scale}) rotate(${emoji.rotation}deg)`,
            fontSize: `${2 + (combo * 0.3)}rem`,
            animationDelay: `${emoji.animationDelay}s`,
            transition: 'all 0.3s ease-out',
            filter: combo > 2 ? 'drop-shadow(0 0 5px rgba(255, 105, 180, 0.5))' : 'none',
          }}
        >
          {emoji.emoji}
        </div>
      ))}
      
      {/* Combo counter */}
      {showComboText && combo > 1 && (
        <div 
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white px-6 py-3 rounded-full backdrop-blur-lg text-2xl font-bold animate-fade-in animate-glow"
          style={{
            boxShadow: '0 0 15px rgba(255, 105, 180, 0.5)'
          }}
        >
          {combo}x COMBO!
        </div>
      )}
    </div>
  );
};

export default EmojiEffects;
