import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress"; 
import { cn } from "@/lib/utils";

// Step types
type Step = 
  | 'welcome'
  | 'intro'
  | 'age'
  | 'clickProgress'
  | 'country'
  | 'comicsQuestion'
  | 'comicPreference'
  | 'bodyPreference'
  | 'final';

// African countries list
const africanCountries = [
  "Bénin", "Burkina Faso", "Cameroun", "Côte d'Ivoire", "Congo", 
  "Gabon", "Ghana", "Guinée", "Mali", "Niger", "Nigeria", 
  "République Centrafricaine", "Sénégal", "Tchad", "Togo"
];

// Age brackets
const ageBrackets = [
  "18-25 ans",
  "26-35 ans",
  "36-45 ans",
  "46+ ans"
];

// Ad links for the click progression
const adLinks = [
  "https://www.profitableratecpm.com/t7bwwufze?key=a6ddcb1a7d4c7d75c656937f3e87c741",
  "https://www.profitableratecpm.com/t9jb9smf?key=40443693c17abb2135e9b6e3738db2dd",
  "https://www.profitableratecpm.com/jbk2360sj?key=7fc034a14e94a1e760dfc819dc5eb505",
  "https://www.profitableratecpm.com/a5g3pzk5?key=13957d2a449284399821dbab142c2ec6",
  "https://www.profitableratecpm.com/zd6q3225?key=c8d4677f36e39b6fab42a81040613a03",
  "https://www.profitableratecpm.com/u561dm0rb?key=8ffe49bb9342d0127cd4bf43681ac0b9",
  "https://www.profitableratecpm.com/jt5q78fu?key=a58f4867bee88a53189c4f17d4b1dfb8",
  "https://www.profitableratecpm.com/ak0s2iupss?key=98aad472f5da172c09580b4a6cbd0e42",
  "https://www.profitableratecpm.com/rsc7zk825d?key=edf05e922bd1026733b9de1b4068df54",
  "https://www.profitableratecpm.com/p2m4f8zsc?key=269eca63707c776ca6faca0374841b7e",
  "https://www.profitableratecpm.com/vewrtwrh?key=fa97f8fb83c89e737e3ea98882acbf2d",
  "https://www.profitableratecpm.com/nmepdad6?key=c2a2f37f5dbface753f82621b887da3d"
];

const CamXTG = () => {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const [selectedAge, setSelectedAge] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [clickCount, setClickCount] = useState<number>(0);
  const totalClicks = 10;
  
  // Function to navigate to the next step
  const goToNextStep = (next: Step) => {
    // Smooth scroll to top when changing steps
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Add a small delay for better transition feel
    setTimeout(() => {
      setCurrentStep(next);
    }, 300);
  };
  
  // Function to handle the ad click button
  const handleAdClick = () => {
    // Open the ad link in a new tab
    const nextLinkIndex = clickCount % adLinks.length;
    window.open(adLinks[nextLinkIndex], '_blank');
    
    // Increment the click counter
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    // If we reached the required clicks, enable the continue button
    // (The button enablement is handled in the render)
  };
  
  // Calculate progress percentage
  const progressPercentage = Math.min((clickCount / totalClicks) * 100, 100);
  
  // Content for each step
  const renderStepContent = () => {
    switch (currentStep) {
      case 'welcome':
        return (
          <div className="animate-fade-in flex flex-col items-center text-center gap-8">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
              Bienvenus sur Cam X
            </h1>
            
            <p className="text-lg text-gray-200">
              Vous avez été invité par la créatrice "Amira" sur TikTok
            </p>
            
            <div className="relative w-full max-w-md rounded-2xl overflow-hidden my-4 shadow-lg shadow-purple-500/20">
              <img 
                src="https://orawin.fun/wp-content/uploads/2025/05/photo_2025-05-20_11-07-52.jpg" 
                alt="Amira" 
                className="w-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
            
            <p className="text-xl font-medium text-gray-100">
              Vous souhaitez continuer ?
            </p>
            
            <div className="flex gap-4 w-full justify-center mt-4">
              <Button
                variant="default"
                className="w-32 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
                onClick={() => goToNextStep('intro')}
              >
                OUI
              </Button>
              
              <Button
                variant="outline"
                className="w-32 border-purple-500 text-purple-300 hover:bg-purple-900/20"
                onClick={() => goToNextStep('intro')}
              >
                NON
              </Button>
            </div>
          </div>
        );
        
      case 'intro':
        return (
          <div className="animate-fade-in flex flex-col items-center text-center gap-8">
            <div className="relative w-full max-w-md overflow-hidden rounded-2xl my-4 shadow-lg shadow-purple-500/20">
              <img 
                src="https://orawin.fun/wp-content/uploads/2025/05/photo_2025-05-20_11-07-50.jpg" 
                alt="Amira modèle" 
                className="w-full object-cover rounded-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <p className="text-2xl font-bold text-white">Amira</p>
              </div>
            </div>
            
            <Button
              className="mt-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
              onClick={() => goToNextStep('age')}
            >
              Continuer
            </Button>
          </div>
        );
        
      case 'age':
        return (
          <div className="animate-fade-in flex flex-col items-center text-center gap-8">
            <h2 className="text-2xl font-bold text-white">
              Quel est votre âge ?
            </h2>
            
            <div className="w-full max-w-md space-y-4">
              <RadioGroup value={selectedAge} onValueChange={setSelectedAge} className="gap-3">
                {ageBrackets.map((age) => (
                  <div key={age} className="flex items-center">
                    <Card className={cn(
                      "w-full cursor-pointer transition-all duration-200 hover:bg-purple-900/20",
                      selectedAge === age ? "border-2 border-purple-500 bg-purple-900/20" : "bg-gray-900/50"
                    )}>
                      <CardContent className="flex items-center p-4">
                        <RadioGroupItem id={`age-${age}`} value={age} className="mr-4" />
                        <Label htmlFor={`age-${age}`} className="w-full cursor-pointer text-lg">
                          {age}
                        </Label>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <Button
              className="mt-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
              disabled={!selectedAge}
              onClick={() => goToNextStep('clickProgress')}
            >
              Continuer
            </Button>
          </div>
        );
        
      case 'clickProgress':
        return (
          <div className="animate-fade-in flex flex-col items-center text-center gap-8">
            <div className="relative w-full max-w-md rounded-2xl overflow-hidden my-4 shadow-lg shadow-purple-500/20">
              <img 
                src="https://orawin.fun/wp-content/uploads/2025/05/photo_2025-05-20_11-07-50.jpg" 
                alt="Amira modèle" 
                className="w-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
            
            <h2 className="text-2xl font-bold text-white">
              Cliquez pour débloquer le contenu
            </h2>
            
            <div className="w-full max-w-md space-y-4">
              <p className="text-gray-300">
                Progression: {Math.round(progressPercentage)}%
              </p>
              
              <Progress 
                value={progressPercentage} 
                className="h-3 bg-gray-800" 
              />
              
              <Button
                onClick={handleAdClick}
                className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white py-6 text-lg font-bold animate-pulse"
              >
                CLIQUE ICI POUR VOIR PLUS
              </Button>
              
              {clickCount >= totalClicks && (
                <Button
                  className="w-full mt-6 bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white"
                  onClick={() => goToNextStep('country')}
                >
                  Continuer
                </Button>
              )}
              
              <p className="text-sm text-gray-400 mt-2">
                {clickCount < totalClicks 
                  ? `${totalClicks - clickCount} clics restants pour continuer` 
                  : "Vous pouvez maintenant continuer!"}
              </p>
            </div>
          </div>
        );
        
      case 'country':
        return (
          <div className="animate-fade-in flex flex-col items-center text-center gap-8">
            <div className="relative w-full max-w-md rounded-2xl overflow-hidden my-4 shadow-lg shadow-purple-500/20">
              <img 
                src="https://orawin.fun/wp-content/uploads/2025/05/photo_2025-05-20_11-07-40.jpg" 
                alt="Amira modèle" 
                className="w-full object-cover rounded-2xl"
              />
            </div>
            
            <h2 className="text-2xl font-bold text-white">
              Quel est votre pays ?
            </h2>
            
            <div className="w-full max-w-md space-y-4 max-h-80 overflow-y-auto pr-2 scrollbar-hide">
              <RadioGroup value={selectedCountry} onValueChange={setSelectedCountry} className="gap-3">
                {africanCountries.map((country) => (
                  <div key={country} className="flex items-center">
                    <Card className={cn(
                      "w-full cursor-pointer transition-all duration-200 hover:bg-purple-900/20",
                      selectedCountry === country ? "border-2 border-purple-500 bg-purple-900/20" : "bg-gray-900/50"
                    )}>
                      <CardContent className="flex items-center p-4">
                        <RadioGroupItem id={`country-${country}`} value={country} className="mr-4" />
                        <Label htmlFor={`country-${country}`} className="w-full cursor-pointer text-lg">
                          {country}
                        </Label>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <Button
              className="mt-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
              disabled={!selectedCountry}
              onClick={() => goToNextStep('comicsQuestion')}
            >
              Continuer
            </Button>
          </div>
        );
        
      case 'comicsQuestion':
        return (
          <div className="animate-fade-in flex flex-col items-center text-center gap-8">
            <h2 className="text-2xl font-bold text-white">
              Vous aimez les BD porno ?
            </h2>
            
            <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
              <div className="relative rounded-lg overflow-hidden aspect-[3/4] shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-[1.02]">
                <img 
                  src="https://orawin.fun/wp-content/uploads/2025/05/001-17.jpg"
                  alt="BD Cover" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative rounded-lg overflow-hidden aspect-[3/4] shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-[1.02]">
                <img 
                  src="https://orawin.fun/wp-content/uploads/2025/05/001-14.jpg"
                  alt="BD Cover" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative rounded-lg overflow-hidden aspect-[3/4] shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-[1.02]">
                <img 
                  src="https://orawin.fun/wp-content/uploads/2025/05/001-13.jpg"
                  alt="BD Cover" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative rounded-lg overflow-hidden aspect-[3/4] shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-[1.02]">
                <img 
                  src="https://orawin.fun/wp-content/uploads/2025/05/000-1.jpg"
                  alt="BD Cover" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="flex gap-4 w-full justify-center mt-4">
              <Button
                variant="default"
                className="w-32 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
                onClick={() => goToNextStep('comicPreference')}
              >
                OUI
              </Button>
              
              <Button
                variant="outline"
                className="w-32 border-purple-500 text-purple-300 hover:bg-purple-900/20"
                onClick={() => goToNextStep('comicPreference')}
              >
                NON
              </Button>
            </div>
          </div>
        );
        
      case 'comicPreference':
        return (
          <div className="animate-fade-in flex flex-col items-center text-center gap-8">
            <h2 className="text-2xl font-bold text-white">
              Que préférez vous entre ces deux BD ?
            </h2>
            
            <div className="flex flex-row gap-6 w-full max-w-lg justify-center">
              <div 
                className="relative rounded-lg overflow-hidden aspect-[3/4] w-full max-w-[200px] shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-[1.05] cursor-pointer"
                onClick={() => goToNextStep('bodyPreference')}
              >
                <img 
                  src="https://orawin.fun/wp-content/uploads/2025/05/000-1.jpg"
                  alt="BD Cover 1" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <Button variant="secondary" className="bg-black/60 text-white">
                    Choisir
                  </Button>
                </div>
              </div>
              
              <div 
                className="relative rounded-lg overflow-hidden aspect-[3/4] w-full max-w-[200px] shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-[1.05] cursor-pointer"
                onClick={() => goToNextStep('bodyPreference')}
              >
                <img 
                  src="https://orawin.fun/wp-content/uploads/2025/05/001-13.jpg"
                  alt="BD Cover 2" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <Button variant="secondary" className="bg-black/60 text-white">
                    Choisir
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'bodyPreference':
        return (
          <div className="animate-fade-in flex flex-col items-center text-center gap-8">
            <h2 className="text-2xl font-bold text-white">
              Vous préférez des grosses fesses ou des gros seins ?
            </h2>
            
            <div className="flex flex-row gap-6 w-full max-w-lg justify-center">
              <div 
                className="relative rounded-lg overflow-hidden w-full max-w-[200px] shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-[1.05] cursor-pointer"
                onClick={() => goToNextStep('final')}
              >
                <img 
                  src="https://orawin.fun/wp-content/uploads/2025/05/photo_2025-05-20_11-37-35.jpg"
                  alt="Fesses" 
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center p-4">
                  <p className="text-xl font-bold text-white">Fesses</p>
                </div>
                <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <Button variant="secondary" className="bg-black/60 text-white">
                    Choisir
                  </Button>
                </div>
              </div>
              
              <div 
                className="relative rounded-lg overflow-hidden w-full max-w-[200px] shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-[1.05] cursor-pointer"
                onClick={() => goToNextStep('final')}
              >
                <img 
                  src="https://orawin.fun/wp-content/uploads/2025/05/photo_2025-05-20_11-39-03.jpg"
                  alt="Seins" 
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center p-4">
                  <p className="text-xl font-bold text-white">Seins</p>
                </div>
                <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <Button variant="secondary" className="bg-black/60 text-white">
                    Choisir
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'final':
        return (
          <div className="animate-fade-in flex flex-col items-center text-center gap-8">
            <div className="relative w-full max-w-md rounded-2xl overflow-hidden my-4 shadow-lg shadow-purple-500/20">
              <img 
                src="https://orawin.fun/wp-content/uploads/2025/05/photo_2025-05-20_11-07-50.jpg" 
                alt="Amira modèle" 
                className="w-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
            
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
              Parfait !
            </h2>
            
            <p className="text-lg text-gray-200 max-w-md">
              Voici les BD chaudes préparées spécialement pour vous. 
              Téléchargez-les dès maintenant !
            </p>
            
            <a 
              href="https://chyijmmr.mychariow.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4"
            >
              <Button
                className="text-lg p-6 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white shadow-lg hover:shadow-purple-500/40 transition-all duration-300 animate-pulse"
              >
                Télécharger maintenant
              </Button>
            </a>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f1a] to-[#1a1028] text-white">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiM1MDUwNzAiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')] opacity-10 pointer-events-none" />
      
      <main className="container mx-auto px-4 py-12 min-h-screen max-w-3xl flex flex-col items-center justify-center">
        {renderStepContent()}
      </main>
      
      {/* Modern orbs/glowing elements for futuristic effect */}
      <div className="fixed top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-[100px] -z-10" />
      <div className="fixed bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-blue-500/10 blur-[100px] -z-10" />
    </div>
  );
};

export default CamXTG;
