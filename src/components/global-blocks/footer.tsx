import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "../ui/toggle-theme";
import { memo, useMemo } from "react";

interface ExternalLink {
  id: number;
  text: string;
  url: string;
  isExternal: boolean;
}

interface FooterProps {
  data: {
    logoText: {
      id: number,
      text: string,
      url: string,
    },
    footerText: string,
    externalLink: ExternalLink[],
  };
}

function selectSocialIcon(url: string) {
  if (url.includes("facebook")) return <FacebookIcon className="h-6 w-6" />;
  return null;
}

function formatExternalUrl(url: string): string {
  const isValidUrl = url.startsWith('http://') || url.startsWith('https://');
  return isValidUrl ? url : `https://${url}`;
}

const Footer = memo(function Footer({ data }: Readonly<FooterProps>) {
  const { logoText, externalLink, footerText } = data;

  const InfoText = useMemo(() => [
    {
      type: "address",
      content: "76 P. Faustino Street, William Ville, Punturin, Valenzuela City, Philippines",
      href: undefined
    },
    {
      type: "mobile-1",
      content: "+63 922 803 7220",
      href: "tel:+639228037220"
    },
    {
      type: "mobile-2",
      content: "+63 917 880 3757",
      href: "tel:+639178803757"
    },
    {
      type: "telephone-1",
      content: "(02) 8990 7902",
      href: "tel:+63289907902"
    },
    {
      type: "telephone-2",
      content: "(02) 8706 3846",
      href: "tel:+63287063846"
    },
    {
      type: "telephone-3",
      content: "(02) 8775 2971",
      href: "tel:+63287752971"
    },
    {
      type: "email-1",
      content: "clerk@dbl-ists.com",
      href: "mailto:clerk@dbl-ists.com"
    },
    {
      type: "email-2",
      content: "sales@dbl-ists.com",
      href: "mailto:sales@dbl-ists.com"
    }
  ], []);

  return (
    <div className="container mx-auto px-4 py-4 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between gap-6 py-6 items-start md:items-center">
          <div>
            <Logo logoText={logoText.text} />
          </div>
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center h-[32px]">
            <p className="text-sm text-foreground/60">{footerText}</p>
            <ModeToggle />
          </div>
      </div>
      <Separator className="container my-8" />
      <div className="py-4 flex flex-col items-left gap-6">
        <div className="text-sm text-foreground/60 max-w-2xs min-h-[20px] leading-[20px] break-words">
          {InfoText[0].content}
        </div>
        <div className="flex flex-col gap-2 w-fit">
          {InfoText.slice(1, 3).map((info) => (
            <a 
              key={info.type}
              href={info.href}
              className="text-sm text-foreground/60 hover:text-foreground transition-colors duration-300"
            >
              {info.content}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-2 w-fit">
          {InfoText.slice(3, 6).map((info) => (
            <a 
              key={info.type}
              href={info.href}
              className="text-sm text-foreground/60 hover:text-foreground transition-colors duration-300"
            >
              {info.content}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-2 w-fit">
          {InfoText.slice(6).map((info) => (
            <a 
              key={info.type}
              href={info.href}
              className="text-sm text-foreground/60 hover:text-foreground transition-colors duration-300"
            >
              {info.content}
            </a>
          ))}
        </div>
        <Separator className="w-full max-w-[100px]" />
          <div className="flex gap-6">
              {externalLink.map((link) => {
                const url = link.isExternal ? formatExternalUrl(link.url) : link.url;
                return (
                  <Link
                    className="text-foreground/60 hover:text-foreground transition-colors duration-300 h-[24px] w-[24px] flex items-center justify-center"
                    href={url}
                    key={link.id}
                    {...(link.isExternal && {
                      target: "_blank",
                      rel: "noopener noreferrer"
                    })}
                  >
                    {selectSocialIcon(link.url)}
                    <span className="sr-only">Visit us at {link.text}</span>
                  </Link>
                );
              })}
            </div>
      </div>
    </div>
  );
});

export { Footer };

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
        // Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free. Copyright 2025 Fonticons, Inc.
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 320 512"
      fill="currentColor"
    >
      <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
    </svg>
  );
}