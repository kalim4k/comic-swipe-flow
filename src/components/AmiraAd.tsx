
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Book, Image, X } from 'lucide-react';

interface AmiraAdProps {
  onClose?: () => void;
}

const AmiraAd: React.FC<AmiraAdProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-40 overflow-y-auto bg-gradient-to-b from-indigo-900/90 via-black/95 to-purple-900/90">
      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          className="fixed top-4 right-4 z-50 rounded-full bg-black/40 p-2 text-white/80 hover:bg-black/60 hover:text-white transition-colors"
          aria-label="Fermer"
        >
          <X className="h-6 w-6" />
        </button>
      )}
      
      {/* Top decorative elements */}
      <div className="absolute top-0 left-0 w-full h-40 opacity-70 bg-gradient-to-b from-pink-400/40 to-transparent"></div>
      
      {/* Floating particles */}
      <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 blur-xl opacity-20 floating"></div>
      <div className="absolute top-40 right-10 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 blur-xl opacity-30 floating-delayed"></div>
      <div className="absolute bottom-20 left-20 w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-300 blur-xl opacity-25 floating"></div>
      
      {/* Main content - moved from fixed positioning to scrollable */}
      <div className="min-h-screen flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md px-6 py-10 rounded-2xl bg-gradient-to-b from-black/60 to-black/20 backdrop-blur-sm border border-white/10 text-white text-center shadow-2xl">
          <div className="mb-6 animate-bounce-slight">
            <Book className="h-16 w-16 mx-auto mb-2 text-pink-400" />
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                AMIRA
              </span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto my-4"></div>
          </div>
          
          <h3 className="text-xl font-semibold mb-4">Découvrez notre nouvelle BD exclusive</h3>
          
          <p className="text-white/80 mb-8">
            Une histoire captivante qui vous transportera dans un monde fantastique.
            Disponible dès maintenant !
          </p>
          
          <div className="space-y-4">
            <Link to="/store" onClick={onClose}>
              <Button className="w-full py-6 text-lg font-medium bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 border-0 shadow-lg shadow-pink-500/20">
                <Image className="mr-2 h-5 w-5" />
                Télécharger la BD d'AMIRA
              </Button>
            </Link>
            
            <button 
              onClick={onClose} 
              className="block w-full text-sm text-white/50 hover:text-white mt-4 transition-colors"
            >
              Continuer la navigation
            </button>
          </div>
        </div>
      </div>
      
      {/* Indication to scroll down */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center animate-bounce-slight pb-4">
        <div className="text-white/70 text-sm flex flex-col items-center">
          <span>Défiler vers le bas</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 w-full h-32 opacity-50 bg-gradient-to-t from-purple-400/20 to-transparent"></div>
    </div>
  );
};

export default AmiraAd;
