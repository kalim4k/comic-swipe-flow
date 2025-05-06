
import BottomNavigation from '@/components/BottomNavigation';
import { MessageCircle } from 'lucide-react';

const Messages = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-[#121212] to-black">
      <main className="flex-1 p-4">
        <div className="h-full flex flex-col items-center justify-center">
          <div className="text-center text-white max-w-md mx-auto p-6 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10 shadow-xl">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Messages</h1>
              <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto my-4"></div>
            </div>
            <p className="text-gray-400 mb-8">La messagerie est en cours de développement. Revenez bientôt pour échanger avec d'autres fans de BD !</p>
            
            <div className="mt-8 space-y-4">
              <div className="h-12 w-full bg-white/5 rounded-md animate-pulse"></div>
              <div className="h-12 w-full bg-white/5 rounded-md animate-pulse"></div>
              <div className="h-12 w-3/4 mx-auto bg-white/5 rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
};

export default Messages;
