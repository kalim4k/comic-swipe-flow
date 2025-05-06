
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

interface MessagePromoAdProps {
  onClose: () => void;
}

const MessagePromoAd: React.FC<MessagePromoAdProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-blue-900/90 via-black/95 to-purple-900/90 backdrop-blur-md animate-fade-in">
      {/* Top decorative elements */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-pink-500/40 to-transparent opacity-70"></div>
      
      {/* Floating particles */}
      <div className="absolute top-20 right-10 w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 blur-xl opacity-20 floating"></div>
      <div className="absolute top-40 left-10 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 blur-xl opacity-30 floating-delayed"></div>
      <div className="absolute bottom-20 right-20 w-14 h-14 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 blur-xl opacity-25 floating"></div>

      {/* Main content */}
      <div className="w-full max-w-md px-6 py-10 rounded-2xl bg-gradient-to-b from-black/60 to-black/20 backdrop-blur-sm border border-white/10 text-white text-center shadow-2xl">
        <div className="mb-6 animate-bounce-slight">
          <MessageSquare className="h-16 w-16 mx-auto mb-2 text-pink-500" />
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            <span className="bg-gradient-to-r from-pink-500 to-purple-400 bg-clip-text text-transparent">
              MESSAGES
            </span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-purple-400 mx-auto my-4"></div>
        </div>
        
        <h3 className="text-xl font-semibold mb-4">Communiquez avec d'autres fans!</h3>
        
        <p className="text-white/80 mb-8">
          Rejoignez la communauté et partagez vos impressions sur vos BD préférées.
        </p>
        
        <div className="space-y-4">
          <Link to="/messages" onClick={onClose}>
            <Button className="w-full py-6 text-lg font-medium bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 border-0 shadow-lg shadow-pink-500/20">
              <MessageSquare className="mr-2 h-5 w-5" />
              Ouvrir la messagerie
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
      
      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-pink-500/20 to-transparent opacity-50"></div>
    </div>
  );
};

export default MessagePromoAd;
