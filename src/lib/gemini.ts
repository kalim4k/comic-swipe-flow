
import { Review } from '@/types/review';

// Comic book titles to reference in reviews
const comicTitles = [
  "Clarice",
  "Mon beau père à la maison",
  "Big Black Cock",
  "Un désire fou pour mon père",
  "Sœur grâce",
  "A l'aide maman",
  "Caroline",
  "Miranda",
  "Madison",
  "La grand mère partie 2"
];

// List of predefined usernames for generated reviews
const usernames = [
  "ComicFan42", "MangaLover", "BD_Addict", "LecteurPassionné", 
  "Fan2BD", "GraphicNovel", "BDphile", "LectriceBD", 
  "AmateurDeMangas", "CollectionBD", "ComicBookLover", "BDFrancophone"
];

// List of potential review templates
const reviewTemplates = [
  "J'ai adoré {title}! L'histoire est captivante et les illustrations sont magnifiques.",
  "Wow, {title} est vraiment incroyable. Je recommande fortement!",
  "Les personnages de {title} sont si bien développés. Une lecture passionnante!",
  "{title} m'a vraiment surpris. Je ne m'attendais pas à une telle qualité!",
  "J'ai dévoré {title} en une soirée. Impossible de le lâcher!",
  "L'intrigue de {title} est fascinante du début à la fin.",
  "Les dessins dans {title} sont d'un autre niveau! Superbe travail artistique.",
  "{title} mérite tous les éloges. Une BD exceptionnelle!",
  "Je suis impatient de découvrir la suite de {title}.",
  "Un chef-d'œuvre! {title} restera dans mes favoris pour longtemps.",
  "Je viens de terminer {title} et je suis sans voix. Quelle histoire!",
  "L'auteur de {title} a un talent incroyable pour créer des émotions.",
  "{title} offre une expérience de lecture unique. À ne pas manquer!",
  "Cette BD ({title}) m'a fait passer par toutes les émotions possibles!",
  "Les dialogues dans {title} sont brillamment écrits. Très réaliste!"
];

// Add more positive adjectives and phrases
const positiveAdjectives = [
  "incroyable", "magnifique", "excellent", "passionnant", "brillant",
  "captivant", "extraordinaire", "fantastique", "remarquable", "superbe"
];

// Function to generate a review without using the actual API
export const generateReviewWithGemini = async (): Promise<Review> => {
  try {
    // In a production app, we would make an API call to Google Gemini here
    // Since we're simulating, we'll generate a review locally
    
    const randomTitle = comicTitles[Math.floor(Math.random() * comicTitles.length)];
    const randomTemplate = reviewTemplates[Math.floor(Math.random() * reviewTemplates.length)];
    const randomUsername = usernames[Math.floor(Math.random() * usernames.length)];
    const randomRating = Math.floor(Math.random() * 3) + 3; // Ratings between 3-5 stars
    
    // Replace placeholder with comic title
    let message = randomTemplate.replace('{title}', randomTitle);
    
    // Add a random adjective occasionally
    if (Math.random() > 0.7) {
      const randomAdjective = positiveAdjectives[Math.floor(Math.random() * positiveAdjectives.length)];
      message += ` C'est vraiment ${randomAdjective}!`;
    }
    
    // Create a date slightly in the past (within last hour)
    const timestamp = new Date(Date.now() - Math.random() * 3600000).toISOString();
    
    return {
      id: `gemini-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      username: randomUsername,
      message,
      rating: randomRating,
      timestamp,
      isUserGenerated: false
    };
  } catch (error) {
    console.error('Error generating review:', error);
    throw error;
  }
};

/**
 * For demonstration purposes, we're using local generation.
 * In a real application, you would make an API call to Google Gemini like this:
 */
/*
export const generateReviewWithGeminiApi = async (): Promise<Review> => {
  const API_KEY = "AIzaSyBzZxx3l7GLH5od_7cQ7QhHaKYs-EW9VKg";
  const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
  
  try {
    const randomTitle = comicTitles[Math.floor(Math.random() * comicTitles.length)];
    const randomUsername = usernames[Math.floor(Math.random() * usernames.length)];
    const randomRating = Math.floor(Math.random() * 3) + 3; // Ratings between 3-5 stars
    
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Generate a short positive review (less than 30 words) in French for a comic book titled "${randomTitle}". 
            Make it sound authentic and enthusiastic. Don't use quotation marks or specify that it's a review.`
          }]
        }]
      })
    });
    
    const data = await response.json();
    const message = data.candidates[0].content.parts[0].text;
    
    return {
      id: `gemini-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      username: randomUsername,
      message,
      rating: randomRating,
      timestamp: new Date().toISOString(),
      isUserGenerated: false
    };
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
};
*/
