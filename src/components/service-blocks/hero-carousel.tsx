"use client"

import { useState, useEffect } from "react";
import { StrapiImage } from "@/components/ui/strapimage";
import { 
    Carousel, 
    CarouselContent, 
    CarouselItem, 
    CarouselPrevious, 
    CarouselNext,
    type CarouselApi
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

// Types
export interface Image {
    id: number;
    documentId: string;
    url: string;
    alternativeText: string | null;
}

export interface HeroMedia {
    id: number;
    heading: string;
    subHeading: string;
    date: string;
    image: Image;
}

interface CarouselPaginationProps { 
    totalSlides: number; 
    activeIndex: number; 
    onDotClick: (index: number) => void;
}

interface HeroCarouselProps {
    heroMedia: HeroMedia[];
}

// Carousel Pagination Component
function CarouselPagination({ 
    totalSlides, 
    activeIndex, 
    onDotClick 
}: CarouselPaginationProps) {
    return (
        <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                    key={index}
                    className={cn(
                        "h-2 w-2 rounded-full transition-all",
                        activeIndex === index ? "bg-primary w-4" : "bg-gray-300"
                    )}
                    onClick={() => onDotClick(index)}
                    aria-label={`Go to slide ${index + 1}`}
                />
            ))}
        </div>
    );
}

// Main Hero Carousel Component
export function HeroCarousel({ heroMedia }: HeroCarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [api, setApi] = useState<CarouselApi | null>(null);
    
    // Create a ref for the autoplay plugin to prevent it from being recreated on each render
    const plugin = Autoplay({ delay: 10000 });

    useEffect(() => {
        if (!api) return;
        
        const onSelect = () => {
            setActiveIndex(api.selectedScrollSnap());
        };
        
        api.on("select", onSelect);
        return () => {
            api.off("select", onSelect);
        };
    }, [api]);

    const handleDotClick = (index: number) => {
        if (api) api.scrollTo(index);
    };

    return (
        <div className="relative">
            <Carousel 
                setApi={setApi} 
                className="w-full" 
                opts={{
                    loop: true,
                    align: "start"
                }}
                plugins={[plugin]}
            >
                <div className="relative p-0 sm:p-8 sm:border">
                    <Plus className="absolute h-6 w-6 -top-3 -left-3 dark:text-white/20 text-black/20 hidden sm:block" />
                    <Plus className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white/20 text-black/20 z-10 hidden sm:block" />
                    <Plus className="absolute h-6 w-6 -top-3 -right-3 dark:text-white/20 text-black/20 hidden sm:block" />
                    <Plus className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white/20 text-black/20 z-10 hidden sm:block" />
                    <CarouselContent>
                    {heroMedia.map((media, index) => (
                        <CarouselItem key={media.id}>
                            <div className="relative rounded-xl overflow-hidden flex flex-col bg-card border border-neutral-200 dark:border-neutral-800 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.075)] h-full">
                                {/* Image container */}
                                <div className="aspect-[16/9] w-full relative">
                                    <StrapiImage
                                        src={media.image.url}
                                        alt={media.image.alternativeText || `Hero Media ${index + 1}`}
                                        width={1600}
                                        height={900}
                                        priority={index === 0}
                                        loading={index === 0 ? "eager" : "lazy"}
                                        quality={85}
                                        placeholder="blur"
                                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVigAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKn"
                                        className="object-contain md:object-cover w-full h-full absolute inset-0"
                                    />
                                </div>
                                
                                {/* Content section below the image with fixed height */}
                                <div className="p-3 sm:p-4 md:p-6 text-gray-900 dark:text-white h-32 sm:h-36 md:h-40 overflow-hidden">
                                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight line-clamp-1">{media.heading}</h2>
                                    <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 line-clamp-2">{media.subHeading}</p>
                                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-2">{media.date}</p>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                    </CarouselContent>
                </div>
                <CarouselPrevious className="left-4 top-1/2 -translate-y-1/2 bg-transparent hover:bg-transparent text-transparent border-transparent z-10" />
                <CarouselNext className="right-4 top-1/2 -translate-y-1/2 bg-transparent hover:bg-transparent text-transparent border-transparent z-10" />
            </Carousel>
            <CarouselPagination 
                totalSlides={heroMedia.length} 
                activeIndex={activeIndex} 
                onDotClick={handleDotClick} 
            />
        </div>
    );
} 