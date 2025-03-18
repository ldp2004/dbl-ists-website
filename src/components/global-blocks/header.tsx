import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { MobileNavigation } from "@/components/global-blocks/mobile-navigation";

interface NavLink {
    id: number;
    text: string;
    url: string;
}

interface HeaderProps {
  data: {
    logoText: {
      id: number;
      text: string;
      url: string;
    }
    ctaButton: {
      id: number;
      text: string;
      url: string;
    }
    navLink: NavLink[];
  }
}

export function Header({ data }: Readonly<HeaderProps>) {
  const { logoText, ctaButton, navLink } = data;

  return (
    <header className="max-w-full flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 sticky top-0 z-40 bg-background border-b max-h-[80px]">
      <Logo logoText={logoText.text}/>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        <nav className="flex items-center gap-6">
          {navLink.map((link) => (
              <Link 
                  href={link.url} 
                  key={link.id}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                  {link.text}
              </Link>
          ))}
        </nav>
        <Button
          asChild
          className="bg-gradient-to-b from-primary to-blue-700 hover:bg-gradient-to-b hover:from-blue-400 hover:to-blue-700 hover:text-white transition-colors duration-300 text-white/80 border-1 border-blue-700"
        >
          <Link href={ctaButton.url}>{ctaButton.text}</Link>
        </Button>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation navLinks={navLink} ctaButton={ctaButton} />
    </header>
  );
}