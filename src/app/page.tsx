import { getHomePageData } from "@/data/loaders";
import { HeroSection } from "@/components/home-blocks/hero-section";
import { FeatureSection } from "@/components/home-blocks/benefits";
import { FeatureListSection } from "@/components/home-blocks/services-list";



// Add revalidation time (e.g., every hour)
export const revalidate = 3600;

export default async function Home() {
  try {
    const strapiData = await getHomePageData();
    const { blocks } = strapiData?.data || { blocks: [] };
    return <main className="scroll-smooth overflow-x-hidden">{blocks.map(blockRenderer)}</main>;
  } catch (error) {
    console.error("Error fetching home page data:", error);
    // Return a fallback UI
    return (
      <main className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Site</h1>
        <p className="text-gray-600 mb-8">We&apos;re experiencing some issues loading content</p>
        <p className="text-sm">Please ensure your Strapi backend is running at {process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}</p>
      </main>
    );
  }
}

const blockComponents = {
  "layout.hero-section": HeroSection,
  "layout.feature-list-section": FeatureListSection,
  "layout.feature-section": FeatureSection,
};

/*eslint-disable @typescript-eslint/no-explicit-any*/
function blockRenderer(block: any) {
  const Component = blockComponents[block.__component as keyof typeof blockComponents];
  return Component ? <Component key={block.id} data={block} /> : null;
}