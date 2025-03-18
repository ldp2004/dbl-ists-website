import { getPortfolioItems } from "@/data/loaders";
import { getPortfolioPageData } from "@/data/loaders";
import { Gallery } from "@/components/portfolio-blocks/gallery";
import { HeroSection } from "@/components/portfolio-blocks/hero-section";

// Add revalidation time (e.g., every hour)
export const revalidate = 3600;

export default async function PortfolioPage() {
  const { data } = await getPortfolioItems();
  const { data: pageData } = await getPortfolioPageData();

  return (
    <>
      <HeroSection data={pageData.blocks[0]} />
      <Gallery items={data} />
    </>
  );
}