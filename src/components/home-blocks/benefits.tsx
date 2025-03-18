import { Box, PhilippinePeso, Headphones, Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
// Predefine image dimensions for better CLS
const LOGO_DIMENSIONS = {
  default: { height: 120, width: 120 },
  wide: { height: 120, width: 240 }
} as const;

// Statistics
const STATS = [
  { value: '25+', label: 'Years of Experience' },
  { value: '20+', label: 'Active Company Clients' },
  { value: '100+', label: 'Projects Completed' },
  { value: '10,000+', label: 'Hours of Support' },
] as const;

// Optimize image loading by defining image data statically
const BRAND_LOGOS = [
  { src: '/logos/Dahua_logo.svg', alt: 'Dahua', ...LOGO_DIMENSIONS.default },
  { src: '/logos/Hikvision_logo.svg', alt: 'Hikvision', ...LOGO_DIMENSIONS.wide },
  { src: '/logos/ESET_logo.svg', alt: 'ESET', ...LOGO_DIMENSIONS.default },
  { src: '/logos/Ruijie_logo.svg', alt: 'Ruijie', ...LOGO_DIMENSIONS.default },
  { src: '/logos/Synology_logo.svg', alt: 'Synology', ...LOGO_DIMENSIONS.default },
  { src: '/logos/Dell_logo.svg', alt: 'Dell', ...LOGO_DIMENSIONS.wide },
] as const;

function getIcon(name: string, showFallback: boolean = true) {
    const iconClasses = "w-8 h-8 mb-4 text-slate-300";
    
    switch (name) {
      case "PESO_ICON":
        return <PhilippinePeso className={iconClasses} />;
      case "HEADPHONES_ICON":
        return <Headphones className={iconClasses} />;
      case "STACK_ICON":
        return <Layers className={iconClasses} />;
      default:
        return showFallback ? <Box className={iconClasses} /> : null;
    }
  }
  
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

function FeatureSectionSkeleton() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col w-full space-y-8">
        {/* Title section */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left card skeleton */}
          <Card className="border">
            <CardHeader>
              <Skeleton className="h-8 w-8 mb-4" /> {/* Icon */}
              <Skeleton className="h-8 w-64" /> {/* Title */}
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-[120px] w-full" />
                  ))}
                </div>
              </div>
              <Skeleton className="h-4 w-48" />
            </CardContent>
          </Card>

          {/* Right column cards */}
          <div className="space-y-8">
            {[1, 2].map((i) => (
              <Card key={i} className="border">
                <CardHeader>
                  <Skeleton className="h-8 w-8 mb-4" /> {/* Icon */}
                  <Skeleton className="h-8 w-64" /> {/* Title */}
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/5" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats section */}
        <div className="border-t pt-8 mt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center space-y-4">
                <Skeleton className="h-8 w-24 mx-auto" /> {/* Value */}
                <Skeleton className="h-4 w-32 mx-auto" /> {/* Label */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureSectionContent({ data }: { readonly data: FeatureSectionProps }) {
  const { title, feature } = data;
    
  const leftFeature = feature[0];
  const rightFeatures = feature.slice(1);

  return (
    <div className="container mx-auto px-4 py-16 overflow-hidden">
      <div className="flex flex-col gap-2 items-left mb-12">
        <p className="text-primary text-18 tracking-tight font-medium leading-none">Benefits</p>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{title}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {leftFeature && (
          <Card>
            <CardHeader>
              {getIcon(leftFeature.icon)}
              <CardTitle className="text-2xl font-semibold mb-2 tracking-tight bg-gradient-to-b from-slate-400 to-foreground/90 dark:from-foreground/90 dark:to-slate-500 bg-clip-text text-transparent">{leftFeature.heading}</CardTitle>
            </CardHeader>
            <CardContent className="h-full flex flex-col">
              <div className="space-y-12 flex-1">
                <p className="text-muted-foreground">{leftFeature.subHeading}</p>
                <div className="overflow-hidden">
                  <InfiniteSlider gap={24} reverse>
                    {BRAND_LOGOS.map((logo) => (
                      <Image
                        key={logo.alt}
                        src={logo.src}
                        alt={logo.alt}
                        height={logo.height}
                        width={logo.width}
                        loading="eager"
                        priority={true}
                        className="object-contain transition-all dark:brightness-0 dark:invert"
                      />
                    ))}
                  </InfiniteSlider>
                </div>
              </div>
              <p className="text-muted-foreground/60 mt-auto pt-6">More brands can be found <Link href="/services" className="text-primary underline dark:text-white/80 hover:text-blue-400 dark:hover:text-white transition-colors">here</Link>.</p>
            </CardContent>
          </Card>
        )}

        <div className="space-y-6">
          {rightFeatures.map((feature) => (
            <Card key={feature.id}>
              <CardHeader>
                {getIcon(feature.icon)}
                <CardTitle className="text-2xl font-semibold mb-2 tracking-tight bg-gradient-to-b from-slate-400 to-foreground/90 dark:from-foreground/90 dark:to-slate-500 bg-clip-text text-transparent">{feature.heading}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.subHeading}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 items-center mt-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {STATS.map((stat) => (
            <div key={stat.value} className="flex flex-col items-center justify-center text-center">
              <p className="text-4xl md:text-6xl font-semibold tracking-tight leading-none bg-gradient-to-b from-yellow-300 to-yellow-700 bg-clip-text text-transparent mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground/60">{stat.label}</p>
            </div>
          ))}
        </div>
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