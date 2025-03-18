import { StrapiImage } from "@/components/ui/strapimage";
import { GalleryClient } from "@/components/portfolio-blocks/gallery-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import React from "react";
import { Calendar, Plus } from "lucide-react";

export interface Image {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
}

export interface PortfolioItem {
  id: number;
  heading: string;
  subHeading: string;
  date: string;
  category: string;
  image: Image[];
}

interface GalleryProps {
  items: PortfolioItem[];
}

interface PortfolioGridProps {
  items: PortfolioItem[];
  onItemClick: (item: PortfolioItem) => void;
}

const ITEMS_PER_PAGE = 6;

export function PortfolioGrid({ items, onItemClick }: PortfolioGridProps) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  
  const paginatedItems = React.useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return items.slice(start, end);
  }, [items, currentPage]);

  const getPageNumbers = () => {
    const pageNumbers: (number | 'ellipsis')[] = [];
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);

    // Always show first page
    pageNumbers.push(1);

    // Calculate range around current page
    let startPage = Math.max(2, currentPage - halfVisible);
    const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 2);

    // Adjust if we're near the end
    if (endPage - startPage < maxVisiblePages - 2) {
      startPage = Math.max(2, endPage - (maxVisiblePages - 2));
    }

    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pageNumbers.push('ellipsis');
    }

    // Add pages in range
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pageNumbers.push('ellipsis');
    }

    // Always show last page if more than 1 page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex flex-col gap-8">
        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8 border relative">
          <Plus className="absolute h-6 w-6 -top-3 -left-3 dark:text-white/20 text-black/20" />
          <Plus className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white/20 text-black/20 z-10" />
          <Plus className="absolute h-6 w-6 -top-3 -right-3 dark:text-white/20 text-black/20" />
          <Plus className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white/20 text-black/20 z-10" />
          {paginatedItems?.map((item) => (
            <Card 
              key={item.id} 
              className="group cursor-pointer overflow-hidden hover:shadow-lg transition-shadow duration-300 border"
              onClick={() => onItemClick(item)}
            >
              <div className="relative">
                {/* Image Container */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  <StrapiImage
                    src={item.image[0].url}
                    alt={item.image[0].alternativeText || item.heading}
                    width={800}
                    height={600}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    priority={false}
                    loading="lazy"
                    quality={85}
                  />
                  
                  {/* Image Overlay Elements */}
                  {item.image.length > 1 && (
                    <div className="absolute top-2 right-2 bg-gradient-to-b from-slate-300 to-white rounded-lg w-10 h-8 flex items-center justify-center shadow-sm">
                      <span className="text-sm font-medium text-foreground/80 dark:text-background/80">
                        +{item.image.length - 1}
                      </span>
                    </div>
                  )}
                  <div className="absolute top-2 left-2">
                    <span className="inline-flex items-center rounded-lg bg-gradient-to-b from-slate-300 to-white p-2 text-xs font-medium text-foreground/80 dark:text-background/80 border-1 border-neutral-100">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content Container */}
                <CardHeader className="p-6">
                  <CardTitle className="text-xl font-semibold tracking-tight line-clamp-1 mb-2">
                    {item.heading}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.subHeading}
                  </p>
                </CardHeader>
                <CardContent className="px-6 pb-2">
                  <div className="flex justify-start items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <time 
                      dateTime={item.date} 
                      className="text-sm text-muted-foreground"
                    >
                      {new Date(item.date).toLocaleDateString()}
                    </time>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
                
                {getPageNumbers().map((pageNum, idx) => (
                  <PaginationItem key={`${pageNum}-${idx}`}>
                    {pageNum === 'ellipsis' ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(pageNum as number);
                        }}
                        isActive={currentPage === pageNum}
                      >
                        {pageNum}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                    }}
                    className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </section>
  );
}

export function Gallery({ items }: GalleryProps) {
  return <GalleryClient items={items} />;
}

