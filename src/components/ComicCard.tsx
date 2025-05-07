
import { useState } from 'react';
import { Comic } from '@/data/comics';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Book, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ComicCardProps {
  comic: Comic;
}

const ComicCard = ({ comic }: ComicCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = () => {
    toast({
      title: "Ajouté au panier",
      description: `${comic.title} a été ajouté à votre panier`,
      duration: 3000,
    });
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Retiré des favoris" : "Ajouté aux favoris",
      description: `${comic.title} a été ${isFavorite ? "retiré de" : "ajouté à"} votre liste de favoris`,
      duration: 3000,
    });
  };

  return (
    <Card 
      className="overflow-hidden bg-black/30 border border-white/10 backdrop-blur-sm rounded-xl relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        {/* Cover image with gradient overlay */}
        <img 
          src={comic.coverImage} 
          alt={comic.title} 
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
        
        {/* Title and price overlay at bottom */}
        <div className="absolute bottom-0 left-0 w-full p-4 z-20">
          <h3 className="text-white font-bold truncate text-lg">{comic.title}</h3>
          <div className="flex items-center justify-between mt-1">
            <span className="text-white/90 font-semibold">{comic.price} {comic.currency}</span>
          </div>
        </div>

        {/* Preview panel that appears on hover */}
        <div className={`absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col p-4 transform transition-all duration-300 z-30 
          ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-white font-bold text-lg">{comic.title}</h3>
            <button 
              onClick={toggleFavorite}
              className={`p-1.5 rounded-full ${isFavorite ? 'bg-red-500/30 text-red-500' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
          
          <p className="text-white/70 text-sm mb-3">
            <span className="bg-gradient-to-r from-comic-accent to-blue-400 bg-clip-text text-transparent">
              Aperçu du manga
            </span>
          </p>
          
          {/* Preview images grid */}
          <div className="grid grid-cols-2 gap-1 flex-1 overflow-hidden mb-3">
            {comic.previewImages.slice(0, 4).map((image, index) => (
              <div key={index} className="aspect-[2/3] overflow-hidden rounded-md">
                <img 
                  src={image} 
                  alt={`Preview ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          
          <div className="mt-auto">
            <span className="block text-center text-white/90 font-semibold mb-2">{comic.price} {comic.currency}</span>
            <Button 
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-comic-accent to-blue-500 hover:from-comic-accent-hover hover:to-blue-600 text-white"
            >
              <Book className="mr-2 h-4 w-4" /> Acheter maintenant
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ComicCard;
