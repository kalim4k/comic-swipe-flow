
import { ShoppingCart, FileText, BookOpen } from "lucide-react";
import { Button } from "./ui/button";
import { ComicBook } from "@/data/comicBooks";
import { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";

interface ComicCardProps {
  comic: ComicBook;
}

const ComicCard = ({ comic }: ComicCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewPreview = () => {
    setIsDialogOpen(true);
    // Only open the PDF in a new tab if user clicks the preview button inside the dialog
  };

  const handleOpenPdf = () => {
    if (comic.pdfPreview) {
      window.open(comic.pdfPreview, '_blank');
    }
  };

  const handlePurchase = () => {
    if (comic.purchaseLink) {
      window.open(comic.purchaseLink, '_blank');
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-lg overflow-hidden shadow-md border border-gray-100">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={comic.coverImage} 
          alt={comic.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs px-2 py-1 rounded-bl-lg font-medium">
          {comic.episodes} épisode{comic.episodes > 1 ? 's' : ''}
        </div>
      </div>
      <div className="p-3 flex flex-col gap-2">
        <h3 className="text-gray-800 font-medium text-sm mb-1 line-clamp-2 h-10">
          {comic.title}
        </h3>
        <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
          <BookOpen size={14} />
          <span>{comic.episodes} épisode{comic.episodes > 1 ? 's' : ''}</span>
        </div>
        <p className="text-base font-semibold text-orange-500">
          {comic.price.toLocaleString()} {comic.currency}
        </p>
        <div className="flex flex-col gap-2">
          <Button 
            className="bg-orange-500 hover:bg-orange-600 w-full flex gap-2 text-xs"
            size="sm"
            onClick={handlePurchase}
          >
            <ShoppingCart size={16} />
            ACHETER
          </Button>
          <Button 
            variant="outline" 
            className="w-full flex gap-2 text-xs border-orange-500 text-orange-500 hover:bg-orange-50"
            size="sm"
            onClick={handleViewPreview}
          >
            <FileText size={16} />
            VOIR UN EXTRAIT
          </Button>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{comic.title}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="flex flex-col items-center">
                <img
                  src={comic.coverImage}
                  alt={comic.title}
                  className="rounded-md max-h-60 object-contain mb-4"
                />
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-5 w-5 text-orange-500" />
                  <span className="text-sm font-medium">{comic.episodes} épisode{comic.episodes > 1 ? 's' : ''}</span>
                </div>
                <p className="text-xl font-bold text-orange-500">
                  {comic.price.toLocaleString()} {comic.currency}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button 
                  variant="outline" 
                  className="flex gap-2" 
                  onClick={handleOpenPdf}
                >
                  <FileText size={16} />
                  Voir un extrait
                </Button>
                <Button 
                  className="bg-orange-500 hover:bg-orange-600 flex gap-2"
                  onClick={handlePurchase}
                >
                  <ShoppingCart size={16} />
                  Acheter
                </Button>
              </div>
            </div>
            <DialogFooter className="sm:justify-center">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Fermer
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ComicCard;
