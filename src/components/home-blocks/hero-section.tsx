import Link from "next/link";
import { StrapiImage } from "@/components/ui/strapimage";
import { Button } from "@/components/ui/button";
import * as motion from "motion/react-client";

interface Image {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
}

interface Link {
  id: number;
  url: string;
  text: string;
}

interface HeroSectionProps {
  id: number;
  documentId: string;
  __component: string;
  heading: string;
  subHeading: string;
  image: Image;
  link: Link;
}

// Animation variants for staggered fade-up effect
const STAGGER_ANIMATION_VARIANTS = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring",
      damping: 25,
      stiffness: 100
    } 
  },
};

export function HeroSection({ data }: { readonly data: HeroSectionProps }) {
  const { heading, subHeading, image, link } = data;

  return (
    <header className="relative min-h-[80vh] overflow-hidden bg-primary">
      <StrapiImage
        alt={image.alternativeText ?? "Hero image"}
        className="absolute inset-0 object-cover w-full h-full"
        src={image.url}
        height={1080}
        width={1920}
        priority
        loading="eager"
        quality={75}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4dHRsdHR4dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDAR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      />
      <motion.div 
        initial="hidden"
        animate="show"
        viewport={{ once: true }}
        variants={STAGGER_ANIMATION_VARIANTS}
        className="container relative z-10 flex flex-col items-start justify-center min-h-[80vh] py-16 md:py-24 gap-6 text-primary-foreground overflow-hidden"
      >
        <div className="flex flex-col gap-4 max-w-full">
          <motion.h1 
            className="font-semibold tracking-tight text-4xl bg-gradient-to-br from-white to-neutral-200 text-transparent bg-clip-text sm:text-5xl md:text-6xl max-w-2xl"
            variants={FADE_UP_ANIMATION_VARIANTS}
          >
            {heading}
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-xl text-primary-foreground/90"
            variants={FADE_UP_ANIMATION_VARIANTS}
          >
            {subHeading}
          </motion.p>
        </div>
        <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-b from-slate-300 to-white hover:bg-gradient-to-b hover:from-slate-100 hover:to-white hover:text-foreground dark:text-background/80 dark:hover:text-background transition-colors duration-300 text-foreground/80 border-1 border-slate-300"
          >
            <Link href={link.url} prefetch={false}>{link.text}</Link>
          </Button>
        </motion.div>
      </motion.div>
    </header>
  );
}