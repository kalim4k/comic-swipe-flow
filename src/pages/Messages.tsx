import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Star, Send, User } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import ReviewCard from '@/components/ReviewCard';
import { Review } from '@/types/review';
import { generateReviewWithGemini } from '@/lib/gemini';
const Messages = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isGenerating, setIsGenerating] = useState(true);
  const reviewsContainerRef = useRef<HTMLDivElement>(null);
  const {
    toast
  } = useToast();

  // Auto-scroll to the latest review
  useEffect(() => {
    if (reviewsContainerRef.current) {
      reviewsContainerRef.current.scrollTop = 0;
    }
  }, [reviews]);

  // Generate fake reviews with Gemini API
  useEffect(() => {
    if (!isGenerating) return;
    const generateReview = async () => {
      try {
        const generatedReview = await generateReviewWithGemini();
        if (generatedReview) {
          setReviews(prev => [generatedReview, ...prev.slice(0, 19)]);
        }
      } catch (error) {
        console.error('Error generating review:', error);
      }
    };
    const interval = setInterval(generateReview, 3000);
    return () => clearInterval(interval);
  }, [isGenerating]);
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !message.trim() || rating === 0) {
      toast({
        title: "Information manquante",
        description: "Veuillez remplir tous les champs et noter avec des étoiles",
        variant: "destructive"
      });
      return;
    }
    const newReview: Review = {
      id: `user-${Date.now()}`,
      username,
      message,
      rating,
      timestamp: new Date().toISOString(),
      isUserGenerated: true
    };
    setReviews(prev => [newReview, ...prev.slice(0, 19)]);
    setUsername('');
    setMessage('');
    setRating(0);
    toast({
      title: "Avis envoyé!",
      description: "Merci pour votre avis sur nos BD!"
    });
  };
  const handleRatingHover = (index: number) => {
    setHoverRating(index);
  };
  const handleRatingClick = (index: number) => {
    setRating(index);
  };
  const toggleGeneration = () => {
    setIsGenerating(!isGenerating);
    toast({
      title: isGenerating ? "Génération désactivée" : "Génération activée",
      description: isGenerating ? "Les avis générés automatiquement sont maintenant désactivés" : "Les avis générés automatiquement sont maintenant activés"
    });
  };
  return <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-[#121212] to-black">
      <main className="flex-1 p-4 overflow-hidden">
        <div className="flex flex-col h-full space-y-6">
          {/* Header */}
          <div className="text-center text-white">
            <div className="mb-2">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold">Avis des Lecteurs</h1>
              <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto my-4"></div>
            </div>
          </div>

          {/* Review submission form */}
          <div className="w-full max-w-md mx-auto animate-fade-in">
            <form onSubmit={handleSubmitReview} className="p-6 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10 shadow-xl">
              <h2 className="text-white text-xl font-semibold mb-4">Partagez votre avis</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center mb-1">
                    <User className="h-4 w-4 text-pink-500 mr-2" />
                    <span className="text-sm text-white/70">Nom d'utilisateur</span>
                  </div>
                  <Input value={username} onChange={e => setUsername(e.target.value)} className="bg-white/5 border-white/10 text-white" placeholder="Votre nom" />
                </div>
                
                <div>
                  <div className="flex items-center mb-1">
                    <Star className="h-4 w-4 text-pink-500 mr-2" />
                    <span className="text-sm text-white/70">Note</span>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(index => <button key={index} type="button" className="text-2xl transition-all duration-200" onMouseEnter={() => handleRatingHover(index)} onMouseLeave={() => handleRatingHover(0)} onClick={() => handleRatingClick(index)}>
                        <Star className={`h-8 w-8 ${(hoverRating || rating) >= index ? 'text-yellow-400 fill-yellow-400' : 'text-white/30'} transition-all duration-200 ${(hoverRating || rating) >= index ? 'scale-110' : 'scale-100'}`} />
                      </button>)}
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center mb-1">
                    <MessageCircle className="h-4 w-4 text-pink-500 mr-2" />
                    <span className="text-sm text-white/70">Votre avis</span>
                  </div>
                  <Textarea value={message} onChange={e => setMessage(e.target.value)} className="bg-white/5 border-white/10 text-white resize-none min-h-24" placeholder="Partagez votre experience avec nos BD..." />
                </div>
                
                <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white">
                  <Send className="h-4 w-4 mr-2" />
                  Envoyer mon avis
                </Button>
              </div>
            </form>

            
          </div>

          {/* Reviews list */}
          <div className="flex-1 min-h-0 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"></div>
            
            <div ref={reviewsContainerRef} className="h-full overflow-y-auto px-4 py-6 space-y-4">
              {reviews.map((review, index) => <ReviewCard key={review.id} review={review} style={{
              animationDelay: `${index * 0.1}s`
            }} />)}

              {reviews.length === 0 && <div className="text-center text-white/50 py-8">
                  Aucun avis pour le moment. Soyez le premier à partager votre expérience!
                </div>}
            </div>
          </div>
        </div>
      </main>
      <BottomNavigation />
    </div>;
};
export default Messages;