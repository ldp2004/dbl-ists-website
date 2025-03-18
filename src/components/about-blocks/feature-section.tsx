import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Box, Plus, Target, Telescope } from "lucide-react";
import { CORE_VAL } from "@/components/about-blocks/core-values";
import { Suspense } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
interface FeatureProps {
    id: number;
    heading: string;
    subHeading: string;
    icon: string;
}
  
interface FeatureSectionProps {
    id: number;
    __component: string;
    title: string;
    description: string;
    feature: FeatureProps[];
}

function getIcon(name: string, showFallback: boolean = true) {
    const iconClasses = "w-8 h-8 mb-4 text-slate-300";
    
    switch (name) {
        case "DEFAULT_ICON":
            return <Box className={iconClasses} />;
        case "TARGET_ICON":
            return <Target className={iconClasses} />;
        case "TELESCOPE_ICON":
            return <Telescope className={iconClasses} />;
        default:
            return showFallback ? <Box className={iconClasses} /> : null;
    }
}

function FeatureSectionSkeleton() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="flex flex-col w-full space-y-8">
                {/* Title and description section */}
                <div className="space-y-8">
                    <Skeleton className="h-8 w-1/3" />
                    
                    <div className="border p-8 relative w-full">
                        <Plus className="absolute h-6 w-6 -top-3 -left-3 dark:text-white/20 text-black/20" />
                        <Plus className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white/20 text-black/20 z-10" />
                        <Plus className="absolute h-6 w-6 -top-3 -right-3 dark:text-white/20 text-black/20" />
                        <Plus className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white/20 text-black/20 z-10" />
                        <div className="space-y-4">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                            <Skeleton className="h-4 w-4/5" />
                        </div>
                    </div>
                </div>
                
                {/* Features grid skeleton */}
                <div className="border-x border-b relative w-full">
                    <Plus className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white/20 text-black/20" />
                    <Plus className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white/20 text-black/20" />
                    <div className="bg-neutral-100 dark:bg-neutral-900 grid grid-cols-1 lg:grid-rows-2 gap-8 p-8">
                        {[1, 2].map((i) => (
                            <div key={i} className="space-y-4">
                                <Skeleton className="h-8 w-8" /> {/* Icon */}
                                <Skeleton className="h-8 w-64" /> {/* Heading */}
                                <Skeleton className="h-20 w-full" /> {/* Content */}
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Core values skeleton */}
                <div className="border-x border-b p-8 relative w-full">
                    <Plus className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white/20 text-black/20" />
                    <Plus className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white/20 text-black/20" />
                    <div className="space-y-8">
                        <Skeleton className="h-8 w-1/3" />
                        <div className="space-y-8">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="space-y-4">
                                    <Skeleton className="h-8 w-64" />
                                    <Skeleton className="h-20 w-full" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Contact section skeleton */}
                <div className="border-x border-b p-8 relative w-full">
                    <Plus className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white/20 text-black/20" />
                    <Plus className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white/20 text-black/20" />
                    <div className="space-y-4">
                        <Skeleton className="h-8 w-64" />
                        <Skeleton className="h-8 w-48" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function FeatureSectionContent({ data }: { readonly data: FeatureSectionProps }) {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="flex flex-col gap-2 items-start">
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-10">{data.title}</h2>
                <div className="flex flex-col gap-2 border p-8 relative">
                    <Plus className="absolute h-6 w-6 -top-3 -left-3 dark:text-white/20 text-black/20" />
                    <Plus className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white/20 text-black/20 z-10" />
                    <Plus className="absolute h-6 w-6 -top-3 -right-3 dark:text-white/20 text-black/20" />
                    <Plus className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white/20 text-black/20 z-10" />
                    {data.description.split('\\n').map((line, index) => (
                        <p key={index} className="text-muted-foreground text-justify">{line}</p>
                    ))}
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-8 border-x border-b relative">
                <Plus className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white/20 text-black/20" />
                <Plus className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white/20 text-black/20" />

                <div className="bg-neutral-100 dark:bg-neutral-900">
                {data.feature.map((item) => (
                    <Card key={item.id} className="bg-transparent border-none shadow-none">
                        <CardHeader>
                            {getIcon(item.icon)}    
                            <div>
                                <CardTitle className="text-2xl font-semibold mb-2 tracking-tight text-foreground/90">{item.heading}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{item.subHeading}</p>
                        </CardContent>
                    </Card>
                ))}
                </div>
            </div>
            <div className="flex flex-col gap-2 items-start border-x border-b p-8 relative">
                <Plus className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white/20 text-black/20" />
                <Plus className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white/20 text-black/20" />
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-10">Our Core Values</h2>
                <div className="flex flex-col gap-8">
                    {CORE_VAL.map((item) => (
                        <div key={item.id} className="flex flex-col gap-0">
                            <h3 className="text-xl font-semibold mb-2 tracking-tight text-foreground/90">{item.heading}</h3>
                            <p className="text-muted-foreground">{item.subHeading}</p>
                        </div>
                    ))} 
                </div>
            </div>
            <div className="flex flex-col gap-2 items-start border-x border-b p-8 relative">
                <Plus className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white/20 text-black/20" />
                <Plus className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white/20 text-black/20" />
                <p className="text-muted-foreground">
                    Looking for our contact information?<br />
                    <Link href="/contact" className="text-primary underline dark:text-white/80 hover:text-blue-400 dark:hover:text-white transition-colors">Click here</Link> to get in touch.
                </p>
            </div>
        </div>
    );
}

export function FeatureSection({ data }: { readonly data: FeatureSectionProps }) {
    return (
        <Suspense fallback={<FeatureSectionSkeleton />}>
            <FeatureSectionContent data={data} />
        </Suspense>
    );
}
