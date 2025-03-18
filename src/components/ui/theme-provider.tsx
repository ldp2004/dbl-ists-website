"use client"

import * as React from "react"
import dynamic from 'next/dynamic'
import { ThemeProvider as NextThemesProvider } from "next-themes"

const ThemeProviderComponent = ({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) => {
  return (
    <NextThemesProvider 
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="theme"
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

export const ThemeProvider = dynamic(() => Promise.resolve(ThemeProviderComponent), {
  ssr: false,
})
