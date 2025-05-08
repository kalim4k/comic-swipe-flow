
import { ShoppingCart, FileText } from "lucide-react";
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
    if (comic.pdfPreview) {
      window.open(comic.pdfPreview, '_blank');
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
      </div>
      <div className="p-3 flex flex-col gap-2">
        <h3 className="text-gray-800 font-medium text-sm mb-1 line-clamp-2 h-10">
          {comic.title}
        </h3>
        <p className="text-base font-semibold text-orange-500">
          {comic.price.toLocaleString()} {comic.currency}
        </p>
        <div className="flex flex-col gap-2">
          <Button 
            className="bg-orange-500 hover:bg-orange-600 w-full flex gap-2 text-xs"
            size="sm"
            onClick={() => setIsDialogOpen(true)}
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
                <p className="text-xl font-bold text-orange-500">
                  {comic.price.toLocaleString()} {comic.currency}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button 
                  variant="outline" 
                  className="flex gap-2" 
                  onClick={handleViewPreview}
                >
                  <FileText size={16} />
                  Voir un extrait
                </Button>
                <Button className="bg-orange-500 hover:bg-orange-600 flex gap-2">
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
