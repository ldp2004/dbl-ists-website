"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useMobileHeader } from "@/hooks/use-mobile-header";
import { MobileSheet } from "@/components/ui/mobile-sheet";

interface NavLink {
  id: number;
  text: string;
  url: string;
}

interface MobileNavigationProps {
  navLinks: NavLink[];
  ctaButton: {
    id: number;
    text: string;
    url: string;
  };
}

export function MobileNavigation({ navLinks, ctaButton }: Readonly<MobileNavigationProps>) {
  const { isOpen, setIsOpen } = useMobileHeader();

  return (
    <div className="md:hidden">
      <Button 
        variant="ghost" 
        size="icon" 
        aria-label="Menu" 
        className="relative"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Mobile Navigation Sheet */}
      <MobileSheet 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Menu"
      >
        <nav className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link 
              href={link.url} 
              key={link.id}
              className="text-base font-medium text-foreground py-3 transition-colors hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              {link.text}
            </Link>
          ))}
          <Button
            asChild
            className="mt-4 bg-gradient-to-b from-primary to-blue-700 hover:bg-gradient-to-b hover:from-blue-400 hover:to-blue-700 hover:text-white transition-colors duration-300 text-white/80 border-1 border-blue-700"
          >
            <Link href={ctaButton.url} onClick={() => setIsOpen(false)}>
              {ctaButton.text}
            </Link>
          </Button>
        </nav>
      </MobileSheet>
    </div>
  );
} 