import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Box, Plus, Clock, MapPin, Mail, PhoneCall, Smartphone } from "lucide-react";
import { Suspense } from "react";
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
        case "CLOCK_ICON":
            return <Clock className={iconClasses} />;
        case "ADDRESS_ICON":
            return <MapPin className={iconClasses} />;
        case "PHONE_ICON":
            return <Smartphone className={iconClasses} />;
        case "EMAIL_ICON":
            return <Mail className={iconClasses} />;
        case "TELEPHONE_ICON":
            return <PhoneCall className={iconClasses} />;
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

                {/* Features grid */}
                <div className="border-x border-b relative w-full">
                    <Plus className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white/20 text-black/20" />
                    <Plus className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white/20 text-black/20" />
                    <div className="bg-neutral-100 dark:bg-neutral-900 grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="space-y-4">
                                <Skeleton className="h-8 w-8" /> {/* Icon */}
                                <Skeleton className="h-8 w-64" /> {/* Heading */}
                                <Skeleton className="h-20 w-full" /> {/* Content */}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Map section */}
                <div className="border-x border-b p-8 relative w-full">
                    <Plus className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white/20 text-black/20" />
                    <Plus className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white/20 text-black/20" />
                    <Skeleton className="h-[600px] w-full" />
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
                <div className="flex flex-col gap-2 border p-8 relative w-full">
                    <Plus className="absolute h-6 w-6 -top-3 -left-3 dark:text-white/20 text-black/20" />
                    <Plus className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white/20 text-black/20 z-10" />
                    <Plus className="absolute h-6 w-6 -top-3 -right-3 dark:text-white/20 text-black/20" />
                    <Plus className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white/20 text-black/20 z-10" />

                    <div className="flex flex-col gap-8">
                        {data.description.split('\\n').map((line, index) => (
                            <p key={index} className="text-muted-foreground text-justify">{line}</p>
                        ))}
                        <div className="flex flex-col items-end justify-end">
                            <h1 className="text-3xl font-semibold mb-2 tracking-tight text-foreground/90">
                                Book a <a href="mailto:sales@dbl-ists.com" className="text-primary relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100">demo!</a>
                            </h1>
                            <p className="text-muted-foreground max-w-sm text-right">Schedule a meeting with our team to learn more about our products and services. No additional fee required.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-neutral-100 dark:bg-neutral-900 grid grid-cols-1 lg:grid-cols-3 gap-4 border-x border-b relative">
                <Plus className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white/20 text-black/20" />
                <Plus className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white/20 text-black/20" />
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
            <div className="flex flex-col gap-2 items-start border-x border-b p-8 relative">
                <Plus className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white/20 text-black/20" />
                <Plus className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white/20 text-black/20" />
                <div className="w-full">
                    <iframe
                        title="DBL Information System Technology Specialist Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.5155382757252!2d120.98483031153917!3d14.73996048570367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b229e1a829ab%3A0xd8d19fe21e5df434!2sDBL%20Information%20System%20Technology%20Specialist!5e0!3m2!1sen!2sph!4v1739155615675!5m2!1sen!2sph"
                        className="h-[300px] md:h-[600px] w-full border-0 rounded-lg"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        aria-label="Google Maps showing DBL Information System Technology Specialist location"
                    />
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
