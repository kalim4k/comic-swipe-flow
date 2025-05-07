
import { useState } from 'react';
import BottomNavigation from '@/components/BottomNavigation';
import { Store, Search } from 'lucide-react';
import comics from '@/data/comics';
import ComicGrid from '@/components/ComicGrid';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';

const StorePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState<string>('all');

  // Filter comics based on search query and price filter
  const filteredComics = comics.filter(comic => {
    const matchesSearch = comic.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (priceFilter === 'all') return matchesSearch;
    if (priceFilter === 'under1000') return matchesSearch && comic.price < 1000;
    if (priceFilter === '1000to1500') return matchesSearch && comic.price >= 1000 && comic.price <= 1500;
    if (priceFilter === 'over1500') return matchesSearch && comic.price > 1500;
    
    return matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-[#121212] to-black">
      {/* Header with animated gradient */}
      <header className="relative pt-8 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Gradient background with animated particles */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-black/70 to-blue-900/30"></div>
          
          {/* Animated particles */}
          <div className="absolute top-10 left-[10%] w-24 h-24 rounded-full bg-gradient-to-br from-comic-accent/40 to-blue-500/20 blur-2xl opacity-50 floating"></div>
          <div className="absolute top-20 right-[15%] w-32 h-32 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/20 blur-2xl opacity-40 floating-delayed"></div>
          <div className="absolute bottom-0 left-[30%] w-40 h-40 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-300/10 blur-3xl opacity-30 floating"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-comic-accent to-blue-500 flex items-center justify-center shadow-lg shadow-comic-accent/20">
              <Store className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-center text-white mb-3">
            <span className="bg-gradient-to-r from-comic-accent to-blue-400 bg-clip-text text-transparent">
              Boutique BD
            </span>
          </h1>
          
          <p className="text-center text-white/70 max-w-md mx-auto">
            Découvrez notre collection exclusive de bandes dessinées disponibles uniquement sur CRAZY BD
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Search and filters */}
          <div className="mb-8 bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Search input */}
              <div className="relative flex-1 w-full">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-white/50" />
                </div>
                <input
                  type="text"
                  placeholder="Rechercher une BD..."
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-comic-accent/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Filter dropdown */}
              <div>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10">
                        Prix: {priceFilter === 'all' ? 'Tous' : 
                               priceFilter === 'under1000' ? 'Moins de 1000 FCFA' :
                               priceFilter === '1000to1500' ? '1000-1500 FCFA' :
                               'Plus de 1500 FCFA'}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid gap-1 p-2 w-48 bg-black/80 backdrop-blur-sm border border-white/10 rounded-md">
                          <li>
                            <Button 
                              variant="ghost" 
                              className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10"
                              onClick={() => setPriceFilter('all')}
                            >
                              Tous les prix
                            </Button>
                          </li>
                          <li>
                            <Button 
                              variant="ghost" 
                              className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10"
                              onClick={() => setPriceFilter('under1000')}
                            >
                              Moins de 1000 FCFA
                            </Button>
                          </li>
                          <li>
                            <Button 
                              variant="ghost" 
                              className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10"
                              onClick={() => setPriceFilter('1000to1500')}
                            >
                              1000-1500 FCFA
                            </Button>
                          </li>
                          <li>
                            <Button 
                              variant="ghost" 
                              className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10"
                              onClick={() => setPriceFilter('over1500')}
                            >
                              Plus de 1500 FCFA
                            </Button>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </div>
          </div>
          
          {/* Results count */}
          <div className="mb-6 text-white/70">
            <p>{filteredComics.length} BD{filteredComics.length !== 1 ? 's' : ''} trouvée{filteredComics.length !== 1 ? 's' : ''}</p>
          </div>
          
          {/* Comics grid - now displaying all comics in a scrollable container */}
          <div className="overflow-y-auto">
            {filteredComics.length > 0 ? (
              <ComicGrid comics={filteredComics} />
            ) : (
              <div className="text-center py-12">
                <p className="text-white/60 text-lg">Aucune BD trouvée avec ces critères</p>
                <Button 
                  className="mt-4 bg-gradient-to-r from-comic-accent to-blue-500 hover:from-comic-accent-hover hover:to-blue-600"
                  onClick={() => {
                    setSearchQuery('');
                    setPriceFilter('all');
                  }}
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default StorePage;
