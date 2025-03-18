import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface HeroSectionProps {
    id: number;
    documentId: string;
    __component: string;
    heading: string;
    subHeading: string;
}

function HeroSectionContent({ data }: { readonly data: HeroSectionProps }) {
    const { heading, subHeading } = data;

    return (
        <div className="container mx-auto px-4 pt-16">
            <div className="flex flex-col gap-2 items-start mb-12">
                <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{heading}</h1>
                <p className="text-muted-foreground">{subHeading}</p>
            </div>
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

