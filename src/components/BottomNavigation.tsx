
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { List, ShoppingCart, MessageSquare, Download } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const BottomNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isInstallDialogOpen, setIsInstallDialogOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  // Écouter l'événement beforeinstallprompt
  useState(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the default browser install prompt
      e.preventDefault();
      // Store the event for later use
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  });

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      const choiceResult = await deferredPrompt.userChoice;
      
      // Reset the deferred prompt variable
      setDeferredPrompt(null);
      
      // Close the dialog after installation attempt
      setIsInstallDialogOpen(false);
    }
  };

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
      name: 'Message',
      path: '/messages',
      icon: MessageSquare
    }
  ];

  return (
    <>
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
        
        {/* Bouton Télécharger */}
        <button
          onClick={() => setIsInstallDialogOpen(true)}
          className="flex flex-col items-center p-2 rounded-lg transition-all duration-300 text-gray-400 hover:text-gray-200"
        >
          <Download size={24} className="mb-1 transition-transform duration-300" />
          <span className="text-xs font-medium">Télécharger</span>
        </button>
      </div>

      {/* Dialog d'installation */}
      <Dialog open={isInstallDialogOpen} onOpenChange={setIsInstallDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Installer l'application</DialogTitle>
            <DialogDescription>
              Ajoutez notre application à votre écran d'accueil pour y accéder rapidement.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <p className="text-sm text-muted-foreground">
              En installant cette application, vous pourrez y accéder directement depuis votre écran d'accueil, sans avoir à ouvrir votre navigateur.
            </p>
            <div className="flex justify-center">
              <Button onClick={handleInstallClick} className="bg-comic-accent hover:bg-comic-accent/90">
                <Download className="mr-2 h-4 w-4" />
                Installer l'application
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BottomNavigation;
