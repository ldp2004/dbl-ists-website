'use client';

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import { TextRoll }  from "@/components/ui/text-roll"

const NotFound: React.FC = () => {
  return (
    <div className="container flex h-screen w-full flex-col items-center justify-center gap-8 overflow-hidden">
      <div className="flex flex-col items-center text-center gap-8">
        <AlertCircle className="h-12 w-12 text-destructive" aria-hidden="true" />
        <TextRoll className='text-4xl text-foreground dark:text-foreground'>
            404 Not Found
        </TextRoll>
        <p className="text-sm max-w-md text-muted-foreground">
          The page you are looking for doesn&apos;t exist or has been moved. Please go back to the homepage.
        </p>
      </div>
      <Button asChild variant="default" size="lg" aria-label="Go back home" className='bg-gradient-to-b from-primary to-blue-700 hover:bg-gradient-to-b hover:from-blue-400 hover:to-blue-700 hover:text-white transition-colors duration-300 text-white/80 border-1 border-blue-700'>
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  )
}

export default NotFound