import { getServicePageData } from "@/data/loaders";
import { HeroSection } from "@/components/service-blocks/hero-section";
import { ServicesSection } from "@/components/service-blocks/services-section"
import { BrandListSection } from "@/components/service-blocks/brand-list-section"

// Add revalidation time (e.g., every hour)
export const revalidate = 3600;

export default async function Contact() {
  const strapiData = await getServicePageData();
  const { blocks } = strapiData?.data || [];
  return <main className="scroll-smooth">{blocks.map(blockRenderer)}</main>;
}

const blockComponents = {
  "layout.hero-section": HeroSection,
  "layout.services-section": ServicesSection,
  "layout.brand-list-section": BrandListSection,
};

/*eslint-disable @typescript-eslint/no-explicit-any*/
function blockRenderer(block: any) {
  const Component = blockComponents[block.__component as keyof typeof blockComponents];
  return Component ? <Component key={block.id} data={block} /> : null;
}

