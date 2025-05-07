
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Book, ArrowLeft } from 'lucide-react';
import comics from '@/data/comics';
import { useToast } from '@/hooks/use-toast';
import BottomNavigation from '@/components/BottomNavigation';

const ComicDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  
  // Find the comic by id
  const comic = comics.find(c => c.id === Number(id));
  
  if (!comic) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-[#121212] to-black text-white">
        <h1 className="text-2xl mb-4">BD non trouvée</h1>
        <Link to="/store">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Retour à la boutique
          </Button>
        </Link>
      </div>
    );
  }

  const handleOrder = () => {
    toast({
      title: "Commande en cours",
      description: `Votre commande pour "${comic.title}" a été prise en compte`,
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#121212] to-black pb-20">
      {/* Header */}
      <header className="relative pt-8 pb-6 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-black/70 to-blue-900/30"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <Link to="/store" className="inline-flex items-center text-white/70 hover:text-white mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Retour à la boutique
          </Link>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Comic cover */}
            <div className="w-full md:w-1/3">
              <div className="aspect-[2/3] relative rounded-lg overflow-hidden border border-white/10">
                <img 
                  src={comic.coverImage} 
                  alt={comic.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Comic details */}
            <div className="w-full md:w-2/3">
              <h1 className="text-3xl font-bold text-white mb-2">{comic.title}</h1>
              <p className="text-2xl font-semibold text-white/90 mb-6">
                <span className="bg-gradient-to-r from-comic-accent to-blue-400 bg-clip-text text-transparent">
                  {comic.price} {comic.currency}
                </span>
              </p>
              
              <Button 
                onClick={handleOrder} 
                size="lg"
                className="w-full md:w-auto bg-gradient-to-r from-comic-accent to-blue-500 hover:from-comic-accent-hover hover:to-blue-600 text-white"
              >
                <Book className="mr-2 h-5 w-5" /> Commander maintenant
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Preview images */}
      <main className="px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6 px-2">Extraits</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {comic.previewImages.map((image, index) => (
            <div 
              key={index} 
              className={`aspect-[2/3] rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                selectedImage === index ? 'border-comic-accent scale-105' : 'border-transparent hover:border-white/30'
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <img 
                src={image} 
                alt={`${comic.title} - extrait ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        
        {/* Selected preview enlarged */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
            <div className="relative max-w-2xl max-h-full">
              <img 
                src={comic.previewImages[selectedImage]} 
                alt={`${comic.title} - extrait ${selectedImage + 1}`}
                className="max-w-full max-h-[90vh] object-contain"
              />
              <button 
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 rounded-full p-2 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
              >
                X
              </button>
            </div>
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
};

export default ComicDetail;
