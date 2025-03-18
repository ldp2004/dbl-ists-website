import { Box, Fingerprint, FileLock2, Cpu, Database, EthernetPort, LayoutDashboard, MessageCircle, Leaf } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

interface ServicesProps {
    id: number;
    heading: string;
    subHeading: string;
    body: string;
    icon: string;
}
  
interface ServicesSectionProps {
    id: number;
    __component: string;
    title: string;
    description: string;
    services: ServicesProps[];
}

function getIcon(name: string, showFallback: boolean = true) {
    const iconClasses = "w-8 h-8 mb-4 text-slate-300";
    
    switch (name) {
        case "SECURITY_ICON":
            return <Fingerprint className={iconClasses} />;
        case "CYBERSECURITY_ICON":
            return <FileLock2 className={iconClasses} />;
        case "HARDWARE_ICON":
            return <Cpu className={iconClasses} />;
        case "SERVER_ICON":
            return <Database className={iconClasses} />;
        case "NETWORK_ICON":
            return <EthernetPort className={iconClasses} />;
        case "MANAGEMENT_ICON":
            return <LayoutDashboard className={iconClasses} />;
        case "COMMUNICATION_ICON":
            return <MessageCircle className={iconClasses} />;
        case "SUSTAINABLE_ICON":
            return <Leaf className={iconClasses} />;
        default:
            return showFallback ? <Box className={iconClasses} /> : null;
    }
}

function ServicesListSkeleton() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col w-full space-y-8">
        {/* Title section */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="border">
              <CardHeader>
                <Skeleton className="h-8 w-8 mb-4" /> {/* Icon */}
                <div className="space-y-2">
                  <Skeleton className="h-8 w-64" /> {/* Title */}
                  <Skeleton className="h-4 w-48" /> {/* Subtitle */}
                </div>
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
    </div>
  );
}

function ServicesListContent({ data }: { readonly data: ServicesSectionProps }) {
    const { title, description, services } = data;

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="flex flex-col gap-2 items-start mb-12">
                <p className="text-primary text-18 tracking-tight font-medium leading-none">{title}</p>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{description}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <Card key={service.id}>
                        <CardHeader>
                            {getIcon(service.icon)}
                            <CardTitle className="text-2xl font-semibold tracking-tight bg-gradient-to-b from-slate-400 to-foreground/90 dark:from-foreground/90 dark:to-slate-500 bg-clip-text text-transparent">{service.heading}</CardTitle>
                            <p className="text-muted-foreground/60 mb-2">{service.subHeading}</p>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{service.body}</p>
                        </CardContent>
                    </Card>
                ))}     
            </div>
        </div>
    )
}

export function ServicesSection({ data }: { readonly data: ServicesSectionProps }) {
    return (
        <Suspense fallback={<ServicesListSkeleton />}>
            <ServicesListContent data={data} />
        </Suspense>
    )
}
