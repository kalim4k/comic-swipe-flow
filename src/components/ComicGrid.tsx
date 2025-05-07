
import { useState } from 'react';
import { Comic } from '@/data/comics';
import ComicCard from './ComicCard';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

interface ComicGridProps {
  comics: Comic[];
  itemsPerPage?: number;
}

const ComicGrid = ({ comics, itemsPerPage = 6 }: ComicGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Calculate total pages
  const totalPages = Math.ceil(comics.length / itemsPerPage);
  
  // Get current comics
  const indexOfLastComic = currentPage * itemsPerPage;
  const indexOfFirstComic = indexOfLastComic - itemsPerPage;
  const currentComics = comics.slice(indexOfFirstComic, indexOfLastComic);
  
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  
  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  
  return (
    <div>
      <div className="flex flex-col gap-6">
        {currentComics.map((comic) => (
          <ComicCard key={comic.id} comic={comic} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={prevPage} 
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            
            {pageNumbers.map(number => (
              <PaginationItem key={number}>
                <PaginationLink 
                  isActive={currentPage === number}
                  onClick={() => paginate(number)}
                >
                  {number}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                onClick={nextPage} 
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default ComicGrid;
