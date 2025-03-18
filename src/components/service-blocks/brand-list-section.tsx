"use client";

import { useState } from "react";
import { StrapiImage } from "@/components/ui/strapimage";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BrandCategoriesSidebar } from "@/components/service-blocks/brand-sidebar";
import { useInView } from "react-intersection-observer";
import { Plus } from "lucide-react";

interface Image {
    id: number;
    documentId: string;
    url: string;
    alternativeText: string | null;
}

interface BrandProps {
    id: number;
    category: string;
    icon: string;
    image: Image[];
}

interface BrandListProps {
    heading: string;
    subHeading: string;
    brands: BrandProps[];
}

function BrandListSectionSkeleton() {
    return (
        <section className="container mx-auto px-4 py-16">
            <div className="flex flex-col gap-2 mb-12">
                <Skeleton className="h-10 w-3/4 md:w-1/2" />
                <Skeleton className="h-6 w-1/2" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                    <Skeleton key={i} className="h-40 w-full" />
                ))}
            </div>
        </section>
    )
}

function BrandListSectionContent({ data }: { readonly data: BrandListProps }) {
    const { heading, subHeading, brands } = data;
    const [activeCategory, setActiveCategory] = useState("all");
    const [isLoading, setIsLoading] = useState(false);
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    // Get unique categories
    const categories = Array.from(new Set(brands.map(brand => ({
        icon: brand.icon,
        category: brand.category
    }))));

    // Handle category change with loading state
    const handleCategoryChange = (category: string) => {
        setIsLoading(true);
        setActiveCategory(category);
        // Simulate a small delay to prevent flickering on fast connections
        setTimeout(() => setIsLoading(false), 300);
    };

    // Filter brands based on active category
    const filteredBrands = brands.filter(brand => 
        activeCategory === "all" || brand.category === activeCategory
    );

    // Get all unique images for the active category
    const allImages = filteredBrands.flatMap(brand => brand.image);
    const uniqueImages = activeCategory === "all"
        ? allImages.filter((image, index, self) =>
            index === self.findIndex((img) => img.url === image.url)
        )
        : allImages;

    // Skeleton grid for loading state
    const LoadingSkeleton = () => (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 min-h-min">
            {[...Array(9)].map((_, i) => (
                <div 
                    key={i}
                    className="relative aspect-square flex items-center justify-center p-4"
                >
                    <Skeleton className="w-full h-full rounded-md bg-neutral-100" />
                </div>
            ))}
        </div>
    );

    return (
        <section className="container mx-auto px-4 py-16" ref={ref}>
            {/* Header Section */}
            <div className="flex flex-col gap-2 items-start md:items-end mb-12">
                <p className="text-primary text-lg tracking-tight font-medium leading-none">{heading}</p>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{subHeading}</h2>
            </div>

            {/* Main Content Section */}
            <div className="flex flex-col lg:flex-row p-4 gap-6 border relative md:p-6">
                <Plus className="absolute h-6 w-6 -top-3 -left-3 dark:text-white/20 text-black/20" />
                <Plus className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white/20 text-black/20 z-10" />
                <Plus className="absolute h-6 w-6 -top-3 -right-3 dark:text-white/20 text-black/20" />
                <Plus className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white/20 text-black/20 z-10" />
                <BrandCategoriesSidebar
                    categories={categories}
                    activeCategory={activeCategory}
                    onCategoryChange={handleCategoryChange}
                />
                
                <div className="flex-1">
                    <Card className="w-full h-auto lg:h-[36rem] dark:bg-white">
                        <CardContent className="p-4 md:p-6 h-full">
                            <div className="h-full overflow-y-auto custom-scrollbar scroll-smooth transition-all duration-200 ease-in-out">
                                {isLoading ? (
                                    <LoadingSkeleton />
                                ) : (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 min-h-min pr-2">
                                        {uniqueImages.map((image, index) => (
                                            <div 
                                                key={`${image.id}-${image.documentId}`}
                                                className="relative aspect-square flex items-center justify-center p-4 group hover:scale-105 transition-all duration-200"
                                            >
                                                {inView && (
                                                    <StrapiImage 
                                                        src={image.url} 
                                                        alt={image.alternativeText || "Brand logo"}
                                                        width={240}
                                                        height={240}
                                                        priority={index < 8}
                                                        loading={index < 8 ? "eager" : "lazy"}
                                                        quality={90}
                                                        placeholder="blur"
                                                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVigAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKn"
                                                        className="object-contain w-full h-full lg:grayscale lg:hover:grayscale-0 transition-all duration-300 transform-gpu will-change-transform"
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}

export function BrandListSection({ data }: { readonly data: BrandListProps }) {
    return (
        <Suspense fallback={<BrandListSectionSkeleton />}>
            <BrandListSectionContent data={data} />
        </Suspense>
    )
}
