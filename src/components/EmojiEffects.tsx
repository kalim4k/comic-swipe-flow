
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

interface EmojiEffectsProps {
  scrollCount: number;
}

interface EmojiState {
  id: number;
  emoji: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
  opacity: number;
  duration: number;
  delay: number;
}

const EMOJIS = ["🔞", "🫦", "🍑", "🍒", "🍆", "🍌"];

const EmojiEffects: React.FC<EmojiEffectsProps> = ({ scrollCount }) => {
  const [emojis, setEmojis] = useState<EmojiState[]>([]);
  const [combo, setCombo] = useState(0);
  const [lastScrollTime, setLastScrollTime] = useState(Date.now());

  // Créer un nouvel emoji avec une position et animation aléatoire
  const createRandomEmoji = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    return {
      id: Date.now() + Math.random(),
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      x: Math.random() * (windowWidth - 50),
      y: Math.random() * (windowHeight - 100) + 50,
      size: Math.random() * 30 + 20, // entre 20px et 50px
      rotation: Math.random() * 360,
      opacity: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 2 + 2, // entre 2s et 4s
      delay: Math.random() * 0.5,
    };
  };

  // Effet de vibration pour la dopamine
  const triggerHapticFeedback = () => {
    if (navigator.vibrate) {
      const intensity = Math.min(combo, 5);
      const pattern = Array(intensity).fill(50);
      navigator.vibrate(pattern);
    }
  };

  // Gérer la logique de combo
  useEffect(() => {
    if (scrollCount > 0) {
      const now = Date.now();
      const timeDiff = now - lastScrollTime;
      
      // Si l'utilisateur scrolle rapidement (moins de 1.5 secondes entre les scrolls)
      if (timeDiff < 1500) {
        setCombo(prev => prev + 1);
      } else {
        setCombo(1);
      }
      
      setLastScrollTime(now);
      
      // Créer plus d'émojis en fonction du niveau de combo
      const numEmojis = Math.min(combo + 1, 6);
      const newEmojis = Array(numEmojis)
        .fill(null)
        .map(() => createRandomEmoji());
      
      setEmojis(prev => [...prev, ...newEmojis]);
      triggerHapticFeedback();
      
      // Nettoyer les anciens émojis après 5 secondes
      setTimeout(() => {
        setEmojis(prev => prev.filter(emoji => emoji.id !== newEmojis[0]?.id));
      }, 5000);
    }
  }, [scrollCount]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <>
      {emojis.map(emoji => (
        <div
          key={emoji.id}
          className="fixed pointer-events-none z-50 emoji-float"
          style={{
            left: `${emoji.x}px`,
            top: `${emoji.y}px`,
            fontSize: `${emoji.size}px`,
            transform: `rotate(${emoji.rotation}deg)`,
            opacity: emoji.opacity,
            animationDuration: `${emoji.duration}s`,
            animationDelay: `${emoji.delay}s`,
            textShadow: combo >= 3 ? "0 0 10px rgba(255,105,180,0.8)" : "none",
            filter: combo >= 5 ? "drop-shadow(0 0 10px rgba(255,105,180,0.8))" : "none",
          }}
        >
          {emoji.emoji}
        </div>
      ))}
      
      {combo > 1 && (
        <div 
          className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full animate-bounce-slight"
          style={{
            opacity: Math.min((combo * 0.1) + 0.5, 1),
            transform: `translateX(-50%) scale(${1 + (combo * 0.05)})`,
            boxShadow: `0 0 ${combo * 2}px rgba(255,105,180,0.7)`,
          }}
        >
          Combo x{combo} 🔥
        </div>
      )}
    </>,
    document.body
  );
};

export default EmojiEffects;
