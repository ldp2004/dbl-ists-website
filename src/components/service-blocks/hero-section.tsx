import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { HeroCarousel, type HeroMedia } from "@/components/service-blocks/hero-carousel";

interface Link {
    id: number;
    url: string;
    text: string;
}

interface HeroSectionProps {
    id: number;
    documentId: string;
    __component: string;
    heading: string;
    subHeading: string;
    link: Link;
    heroMedia: HeroMedia[];
}

function HeroSectionContent({ data }: { readonly data: HeroSectionProps }) {
    const { heading, subHeading, link, heroMedia } = data;

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="flex flex-col gap-2 items-start mb-12">
                <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{heading}</h1>
                <p className="text-muted-foreground">{subHeading}</p>
            </div>

            {/* CTA Button */}
            <Button
                asChild
                size="lg"
                className="bg-gradient-to-b from-primary to-blue-700 hover:bg-gradient-to-b hover:from-blue-400 hover:to-blue-700 hover:text-white transition-colors duration-300 text-white/80 border-1 border-blue-700 mb-12"
            >
                <Link href={link.url} prefetch={false}>{link.text}</Link>
            </Button>
            
            {/* Hero Media Carousel - Client Component */}
            <HeroCarousel heroMedia={heroMedia} />
        </div>
    )
}

function HeroSectionSkeleton() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="flex flex-col w-full space-y-8">
                {/* Title and description */}
                <div className="space-y-4">
                    <Skeleton className="h-8 w-2/3" />
                    <Skeleton className="h-4 w-1/2" />
                </div>

                {/* CTA Button */}
                <div>
                    <Skeleton className="h-12 w-40" />
                </div>
                
                {/* Hero Media Carousel */}
                <div className="space-y-4">
                    <Skeleton className="aspect-[16/9] w-full rounded-lg" />
                    <div className="flex justify-center gap-2">
                        {[1, 2, 3].map((i) => (
                            <Skeleton key={i} className="h-2 w-2 rounded-full" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function HeroSection({ data }: { readonly data: HeroSectionProps }) {
    return (
        <Suspense fallback={<HeroSectionSkeleton />}>
            <HeroSectionContent data={data} />
        </Suspense>
    )
}

