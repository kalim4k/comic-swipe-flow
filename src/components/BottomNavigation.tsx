
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ShoppingBag, MessageCircle, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavigationProps {
  onComicClick?: () => void;
}

const BottomNavigation: FC<BottomNavigationProps> = ({ onComicClick }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-50">
      <div className="grid grid-cols-4 h-16 max-w-md mx-auto">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center justify-center text-gray-400 hover:text-primary transition-colors",
              isActive ? "text-primary" : ""
            )
          }
        >
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Accueil</span>
        </NavLink>
        <NavLink
          to="/store"
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center justify-center text-gray-400 hover:text-primary transition-colors",
              isActive ? "text-primary" : ""
            )
          }
        >
          <ShoppingBag className="h-6 w-6" />
          <span className="text-xs mt-1">Boutique</span>
        </NavLink>
        <NavLink
          to="/messages"
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center justify-center text-gray-400 hover:text-primary transition-colors",
              isActive ? "text-primary" : ""
            )
          }
        >
          <MessageCircle className="h-6 w-6" />
          <span className="text-xs mt-1">Messages</span>
        </NavLink>
        <button
          onClick={onComicClick}
          className="flex flex-col items-center justify-center text-gray-400 hover:text-primary transition-colors"
        >
          <BookOpen className="h-6 w-6" />
          <span className="text-xs mt-1">BD</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNavigation;
