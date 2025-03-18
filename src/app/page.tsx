import { getHomePageData } from "@/data/loaders";
import { HeroSection } from "@/components/home-blocks/hero-section";
import { FeatureSection } from "@/components/home-blocks/benefits";
import { FeatureListSection } from "@/components/home-blocks/services-list";



// Add revalidation time (e.g., every hour)
export const revalidate = 3600;

export default async function Home() {
  const strapiData = await getHomePageData();
  const { blocks } = strapiData?.data || [];
  return <main className="scroll-smooth overflow-x-hidden">{blocks.map(blockRenderer)}</main>;
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