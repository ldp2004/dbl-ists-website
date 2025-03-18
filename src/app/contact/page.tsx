import { getContactPageData } from "@/data/loaders";
import { FeatureSection } from "@/components/contact-blocks/feature-section";

// Add revalidation time (e.g., every hour)
export const revalidate = 3600;

export default async function Contact() {
  const strapiData = await getContactPageData();
  const { blocks } = strapiData?.data || [];
  return <main className="scroll-smooth">{blocks.map(blockRenderer)}</main>;
}

const blockComponents = {
  "layout.feature-section": FeatureSection,
};

/*eslint-disable @typescript-eslint/no-explicit-any*/
function blockRenderer(block: any) {
  const Component = blockComponents[block.__component as keyof typeof blockComponents];
  return Component ? <Component key={block.id} data={block} /> : null;
}

