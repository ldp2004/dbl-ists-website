import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { getGlobalData, getGlobalPageMetadata } from "@/data/loaders";
import { Header } from "@/components/global-blocks/header";
import { Footer } from "@/components/global-blocks/footer";
import { ThemeProvider } from "@/components/ui/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetBrains-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getGlobalPageMetadata();

  return {
    title: metadata?.data?.title ?? "DBL ISTS Inc. — Your partner in modernization.",
    description: metadata?.data?.description ?? "Helping businesses modernize their technology stack",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalData = await getGlobalData();
  
  // Default data for header and footer in case it's not available
  const headerData = globalData?.data?.attributes?.header || {
    logoText: { text: "DBL ISTS Inc." },
    navLink: [
      { id: 1, text: 'Home', url: '/' },
      { id: 2, text: 'Services', url: '/services' },
      { id: 3, text: 'Portfolio', url: '/portfolio' },
      { id: 4, text: 'About', url: '/about' },
    ],
    ctaButton: { text: "Contact Us", url: "/contact" }
  };
  
  const footerData = globalData?.data?.attributes?.footer || {
    logoText: { text: "DBL ISTS Inc." },
    externalLink: [],
    footerText: "© 2024 DBL ISTS Inc. All rights reserved."
  };
  
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetBrainsMono.variable} antialiased`}>
        <ThemeProvider>
          <Header data={headerData}/>
          {children}
          <Footer data={footerData}/>
        </ThemeProvider>
      </body>
    </html>
  );
}
