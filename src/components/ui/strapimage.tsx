import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";

interface StrapiImageProps {
  src: string;
  alt: string;
  height: number;
  width: number;
  className?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
}

export function StrapiImage({
  src,
  alt,
  height,
  width,
  className,
  priority,
  loading,
  quality,
  placeholder,
  blurDataURL,
}: Readonly<StrapiImageProps>) {
  const imageUrl = getStrapiMedia(src);
  if (!imageUrl) return null;

  return (
    <Image
      src={imageUrl}
      alt={alt}
      height={height}
      width={width}
      className={className}
      priority={priority}
      loading={loading}
      quality={quality}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
    />
  );
}