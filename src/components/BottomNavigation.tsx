
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { List, ShoppingCart, MessageSquare, Video } from 'lucide-react';

const BottomNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    {
      name: 'Feed',
      path: '/',
      icon: List
    },
    {
      name: 'Boutique',
      path: '/store',
      icon: ShoppingCart
    },
    {
      name: 'Vidéo',
      path: '/video',
      icon: Video
    },
    {
      name: 'Message',
      path: '/messages',
      icon: MessageSquare
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-around items-center py-3 px-1 bg-black/80 backdrop-blur-md border-t border-white/10 z-50">
      {navItems.map((item) => {
        const isActive = currentPath === item.path;
        
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center p-2 rounded-lg transition-all duration-300",
              isActive 
                ? "text-comic-accent" 
                : "text-gray-400 hover:text-gray-200"
            )}
          >
            <item.icon size={24} className={cn(
              "mb-1 transition-transform duration-300",
              isActive && "transform scale-110"
            )} />
            <span className={cn(
              "text-xs font-medium",
              isActive && "font-semibold"
            )}>
              {item.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNavigation;
