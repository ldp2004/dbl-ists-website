import Link from "next/link";
import Image from "next/image";


interface LogoProps {
    logoText?: string,
}

export function Logo({ 
    logoText = "DBL ISTS Inc.",
 }: Readonly<LogoProps>) {
    return (
        <Link href="/">
            <Image 
                src="/dbl.svg" 
                alt={logoText} 
                width={200} 
                height={120} 
                priority={true}
            />
        </Link>
    )
}
