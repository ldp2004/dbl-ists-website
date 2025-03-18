import { Box, FileLock2, Fingerprint, FolderTree, EthernetPort, MessageCircle, Cpu } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import Link from "next/link";

interface FeatureProps {
    id: number;
    heading: string;
    subHeading: string;
    icon: string;
}
  
interface FeatureListSectionProps {
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
        case "WORKFLOW_ICON":
            return <FolderTree className={iconClasses} />;
        case "SECURE_ICON":
            return <Fingerprint className={iconClasses} />;
        case "CYBER_ICON":
            return <FileLock2 className={iconClasses} />;
        case "COMMUNICATION_ICON":
            return <MessageCircle className={iconClasses} />;
        case "CONNECTION_ICON":
            return <EthernetPort className={iconClasses} />;
        case "HARDWARE_ICON":
            return <Cpu className={iconClasses} />;
        default:
            return showFallback ? <Box className={iconClasses} /> : null;
    }
}

function FeatureListSkeleton() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col gap-2 items-center mb-12">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-10 w-96" />
        <Skeleton className="h-5 w-[480px]" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="h-8 w-8 mb-4" />
              <div>
                <Skeleton className="h-8 w-48 mb-2" />
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3 mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function FeatureListContent({ data }: { readonly data: FeatureListSectionProps }) {
  // Simulate loading delay
  const { title, description, feature } = data;
  
  return (
    <div className="container mx-auto px-4 py-16 overflow-hidden">
      <div className="flex flex-col gap-2 items-center mb-12">
        <p className="text-primary text-18 tracking-tight font-medium leading-none">Services</p>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center">{title}</h2>
        <p className="text-muted-foreground text-center">{description}. Learn more <Link href="/services" className="text-primary underline dark:text-white/80 hover:text-blue-400 dark:hover:text-white transition-colors">here</Link>.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feature.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              {getIcon(item.icon)}
              <div>
                <CardTitle className="text-2xl font-semibold mb-2 tracking-tight bg-gradient-to-b from-slate-400 to-foreground/90 dark:from-foreground/90 dark:to-slate-500 bg-clip-text text-transparent">{item.heading}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{item.subHeading}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function FeatureListSection({ data }: { readonly data: FeatureListSectionProps }) {
  return (
    <Suspense fallback={<FeatureListSkeleton />}>
      <FeatureListContent data={data} />
    </Suspense>
  );
}