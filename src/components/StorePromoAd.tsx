
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Book, Image, Store, Gift, Star } from 'lucide-react';

interface StorePromoAdProps {
  onClose: () => void;
  variant?: 'end-chapter' | 'mid-chapter'; // Add variant prop
}

const StorePromoAd: React.FC<StorePromoAdProps> = ({ onClose, variant = 'end-chapter' }) => {
  // Different content based on variant
  const isEndChapter = variant === 'end-chapter';
  
  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-md animate-fade-in ${
      isEndChapter 
        ? 'bg-gradient-to-b from-purple-900/90 via-black/95 to-blue-900/90' 
        : 'bg-gradient-to-br from-blue-900/90 via-black/95 to-purple-600/90'
    }`}>
      {/* Top decorative elements */}
      <div className={`absolute top-0 left-0 w-full h-40 opacity-70 ${
        isEndChapter
          ? 'bg-gradient-to-b from-comic-accent/40 to-transparent'
          : 'bg-gradient-to-b from-blue-400/40 to-transparent'
      }`}></div>
      
      {/* Floating particles - different for each variant */}
      {isEndChapter ? (
        <>
          <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-gradient-to-br from-comic-accent to-blue-400 blur-xl opacity-20 floating"></div>
          <div className="absolute top-40 right-10 w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 blur-xl opacity-30 floating-delayed"></div>
          <div className="absolute bottom-20 left-20 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-300 blur-xl opacity-25 floating"></div>
        </>
      ) : (
        <>
          <div className="absolute top-40 left-20 w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 blur-xl opacity-30 floating"></div>
          <div className="absolute top-60 right-40 w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 blur-xl opacity-25 floating-delayed"></div>
          <div className="absolute bottom-40 left-40 w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 blur-xl opacity-20 floating"></div>
          <div className="absolute bottom-20 right-20 w-12 h-12 rounded-full bg-gradient-to-br from-blue-300 to-indigo-400 blur-xl opacity-35 floating-delayed"></div>
        </>
      )}

      {/* Main content - different design for each variant */}
      {isEndChapter ? (
        // End chapter design (original)
        <div className="w-full max-w-md px-6 py-10 rounded-2xl bg-gradient-to-b from-black/60 to-black/20 backdrop-blur-sm border border-white/10 text-white text-center shadow-2xl">
          <div className="mb-6 animate-bounce-slight">
            <Book className="h-16 w-16 mx-auto mb-2 text-comic-accent" />
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              <span className="bg-gradient-to-r from-comic-accent to-blue-400 bg-clip-text text-transparent">
                CRAZY BD
              </span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-comic-accent to-blue-400 mx-auto my-4"></div>
          </div>
          
          <h3 className="text-xl font-semibold mb-4">Vous avez atteint la fin du chapitre</h3>
          
          <p className="text-white/80 mb-8">
            Découvrez la suite de l'histoire et bien plus dans notre boutique exclusive.
          </p>
          
          <div className="space-y-4">
            <Link to="/store" onClick={onClose}>
              <Button className="w-full py-6 text-lg font-medium bg-gradient-to-r from-comic-accent to-blue-500 hover:from-comic-accent-hover hover:to-blue-600 border-0 shadow-lg shadow-comic-accent/20">
                <Image className="mr-2 h-5 w-5" />
                Visiter la boutique
              </Button>
            </Link>
            
            <button 
              onClick={onClose} 
              className="block w-full text-sm text-white/50 hover:text-white mt-4 transition-colors"
            >
              Continuer la lecture
            </button>
          </div>
        </div>
      ) : (
        // Mid-chapter design (new)
        <div className="w-full max-w-md px-6 py-10 rounded-2xl bg-gradient-to-br from-blue-900/50 to-indigo-800/40 backdrop-blur-sm border border-white/10 text-white text-center shadow-2xl">
          <div className="mb-6 animate-pulse">
            <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 flex items-center justify-center">
              <Store className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                OFFRE SPÉCIALE
              </span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 mx-auto my-4"></div>
          </div>
          
          <div className="mb-6 flex items-center justify-center space-x-1">
            <Star className="h-6 w-6 text-yellow-400 animate-pulse" />
            <Star className="h-6 w-6 text-yellow-400 animate-pulse" />
            <Star className="h-7 w-7 text-yellow-400 animate-pulse" />
            <Star className="h-6 w-6 text-yellow-400 animate-pulse" />
            <Star className="h-6 w-6 text-yellow-400 animate-pulse" />
          </div>
          
          <h3 className="text-xl font-semibold mb-3">Nouveaux Produits Disponibles</h3>
          
          <p className="text-white/80 mb-6">
            Découvrez notre collection exclusive d'articles BD dans notre boutique!
          </p>
          
          <div className="space-y-4">
            <Link to="/store" onClick={onClose}>
              <Button className="w-full py-5 text-lg font-medium bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 border-0 shadow-lg shadow-blue-500/20">
                <Gift className="mr-2 h-5 w-5" />
                Explorer la boutique
              </Button>
            </Link>
            
            <button 
              onClick={onClose} 
              className="block w-full text-sm text-white/50 hover:text-white mt-3 transition-colors"
            >
              Continuer ma lecture
            </button>
          </div>
        </div>
      )}
      
      {/* Bottom decoration */}
      <div className={`absolute bottom-0 left-0 w-full h-32 opacity-50 ${
        isEndChapter
          ? 'bg-gradient-to-t from-comic-accent/20 to-transparent'
          : 'bg-gradient-to-t from-blue-400/20 to-transparent'
      }`}></div>
    </div>
  );
};

export default StorePromoAd;
