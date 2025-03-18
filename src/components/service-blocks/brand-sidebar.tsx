import { Box, Cpu, Database, EthernetPort, FileLock2, Fingerprint, Headphones, Layers, Leaf, MessageCircle } from "lucide-react";

interface CategoryProps {
    icon: string;
    label: string;
    isActive: boolean;
    onClick: () => void;
}

function getIcon(name: string, showFallback: boolean = true) {
    const iconClasses = "w-4 h-4 text-muted-foreground";
    
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
        case "COMMUNICATION_ICON":
            return <MessageCircle className={iconClasses} />;
        case "HEADPHONES_ICON":
            return <Headphones className={iconClasses} />;
        case "STACK_ICON":
            return <Layers className={iconClasses} />;
        case "SUSTAINABLE_ICON":
            return <Leaf className={iconClasses} />;
        default:
            return showFallback ? <Box className={iconClasses} /> : null;
    }
}

function CategoryItem({ icon, label, isActive, onClick }: CategoryProps) {
    return (
        <button
            onClick={onClick}
            className={`
                flex items-center gap-3 p-3 text-sm transition-colors rounded-lg
                hover:bg-accent whitespace-nowrap
                lg:w-full lg:whitespace-normal lg:p-4
                ${isActive 
                    ? 'bg-accent text-foreground font-medium' 
                    : 'text-muted-foreground hover:text-foreground/80'}
            `}
        >
            {getIcon(icon)}
            <span className="text-sm font-medium">{label}</span>
        </button>
    );
}

export function BrandCategoriesSidebar({ 
    categories, 
    activeCategory, 
    onCategoryChange 
}: { 
    categories: { icon: string; category: string }[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}) {
    return (
        <div className="flex lg:flex-col gap-2 overflow-x-auto scrollbar-hide pb-2 lg:pb-0">
            <div className="flex lg:flex-col gap-1 min-w-max lg:min-w-full">
                <CategoryItem
                    icon="Box"
                    label="All"
                    isActive={activeCategory === "all"}
                    onClick={() => onCategoryChange("all")}
                />
                {categories.map((cat) => (
                    <CategoryItem
                        key={cat.category}
                        icon={cat.icon}
                        label={cat.category}
                        isActive={activeCategory === cat.category}
                        onClick={() => onCategoryChange(cat.category)}
                    />
                ))}
            </div>
        </div>
    );
} 