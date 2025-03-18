"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { PortfolioGrid } from "@/components/portfolio-blocks/gallery"
import type { PortfolioItem, Image } from "@/components/portfolio-blocks/gallery"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { X, Search, FileX, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StrapiImage } from "@/components/ui/strapimage"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface ImageCarouselProps {
  images: Image[]
  title: string
}

function ImageCarousel({ images, title }: ImageCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  if (!images?.length) return null

  return (
    <div className="relative w-full">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={image.id} className="basis-full">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-muted">
                <StrapiImage
                  src={image.url}
                  alt={image.alternativeText || `${title} - Image ${index + 1}`}
                  width={1200}
                  height={675}
                  className="object-contain w-full h-full"
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  quality={90}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVigAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKn"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full border-0 bg-background/80 backdrop-blur-sm hover:bg-background/90" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full border-0 bg-background/80 backdrop-blur-sm hover:bg-background/90" />
      </Carousel>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm text-sm font-medium">
        {current + 1} / {images.length}
      </div>
    </div>
  )
}

interface GalleryFiltersProps {
  categories: string[]
  onSearchChange: (search: string) => void
  onCategoryChange: (category: string) => void
  onDateChange: (dateRange: DateRange | undefined) => void
  selectedCategory: string
  selectedDate: DateRange | undefined
}

function formatDateRange(dateRange: DateRange | undefined): string {
  if (!dateRange?.from) return "Pick a date range"
  
  if (!dateRange.to || dateRange.from.getTime() === dateRange.to.getTime()) {
    return format(dateRange.from, "LLL dd, y")
  }
  
  return `${format(dateRange.from, "LLL dd, y")} - ${format(dateRange.to, "LLL dd, y")}`
}

function GalleryFilters({
  categories,
  onSearchChange,
  onCategoryChange,
  onDateChange,
  selectedCategory,
  selectedDate,
}: GalleryFiltersProps) {
  return (
    <div className="container px-4 md:px-6">
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:space-x-4">
        <div className="w-full">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by name..."
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 h-10 md:h-9 w-full bg-background"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 md:flex md:gap-4 md:flex-1 md:justify-end">
          <div className="w-full md:w-[180px]">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-10 md:h-9 justify-between bg-background"
                >
                  <span className="line-clamp-1 flex-1 text-left">
                    {selectedCategory || "All Categories"}
                  </span>
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[var(--radix-dropdown-menu-trigger-width)]">
                <DropdownMenuItem
                  onClick={() => onCategoryChange("")}
                  className={cn(
                    "flex items-center",
                    selectedCategory === "" && "bg-accent"
                  )}
                >
                  All Categories
                </DropdownMenuItem>
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className={cn(
                      "flex items-center",
                      selectedCategory === category && "bg-accent"
                    )}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="w-full md:w-3xs">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant="outline"
                  className={cn(
                    "w-full h-10 md:h-9 justify-start text-left font-normal bg-background",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                  <span className="flex-1 line-clamp-1">
                    {formatDateRange(selectedDate)}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent 
                className="w-auto p-0" 
                align="end"
                sideOffset={8}
              >
                <div className="p-3 border-b">
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Select dates</h4>
                    <p className="text-xs text-muted-foreground">
                      Choose a start and end date
                    </p>
                  </div>
                </div>
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={selectedDate?.from}
                  selected={selectedDate}
                  onSelect={onDateChange}
                  numberOfMonths={1}
                  className="rounded-b-md"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}

interface GalleryClientProps {
  items: PortfolioItem[]
}

function NoResults() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <FileX className="h-12 w-12 text-neutral-300 mb-4" />
      <h3 className="text-lg font-semibold mb-2">No results found</h3>
      <p className="text-sm text-muted-foreground max-w-[500px]">
        No items match your current filters. Try adjusting your search terms, category selection, or date range.
      </p>
    </div>
  )
}

export function GalleryClient({ items }: GalleryClientProps) {
  const [search, setSearch] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("")
  const [selectedDate, setSelectedDate] = React.useState<DateRange>()
  const [selectedItem, setSelectedItem] = React.useState<PortfolioItem | null>(null)

  // Get unique categories from items
  const categories = React.useMemo(() => {
    const uniqueCategories = new Set(items.map((item) => item.category))
    return Array.from(uniqueCategories)
  }, [items])

  // Filter items based on search, category, and date range
  const filteredItems = React.useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = search === "" || 
        item.heading.toLowerCase().includes(search.toLowerCase()) ||
        item.subHeading.toLowerCase().includes(search.toLowerCase())
      
      const matchesCategory = selectedCategory === "" || 
        item.category === selectedCategory

      const itemDate = new Date(item.date)
      const matchesDate = !selectedDate?.from || (() => {
        const startDate = selectedDate.from
        const endDate = selectedDate.to || selectedDate.from
        
        // Reset time part for accurate date comparison
        const compareDate = new Date(itemDate.getFullYear(), itemDate.getMonth(), itemDate.getDate())
        const compareStart = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
        const compareEnd = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())
        
        return compareDate >= compareStart && compareDate <= compareEnd
      })()

      return matchesSearch && matchesCategory && matchesDate
    })
  }, [items, search, selectedCategory, selectedDate])

  return (
    <>
      <GalleryFilters
        categories={categories}
        onSearchChange={setSearch}
        onCategoryChange={setSelectedCategory}
        onDateChange={setSelectedDate}
        selectedCategory={selectedCategory}
        selectedDate={selectedDate}
      />
      {filteredItems.length > 0 ? (
        <PortfolioGrid 
          items={filteredItems} 
          onItemClick={(item) => setSelectedItem(item)}
        />
      ) : (
        <NoResults />
      )}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-[95vw] w-full lg:max-w-5xl p-4 gap-0 overflow-hidden bg-background rounded-lg lg:rounded-xl border-0 lg:border" hideCloseButton>
          <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b">
            <div className="relative flex items-start justify-between p-4">
              <DialogHeader className="flex-1 text-left">
                <DialogTitle className="text-xl font-semibold leading-none">{selectedItem?.heading}</DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground mt-1.5">
                  {selectedItem?.subHeading}
                </DialogDescription>
              </DialogHeader>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 shrink-0 rounded-full absolute right-4 top-0"
                onClick={() => setSelectedItem(null)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </div>
          <div className="px-4 py-6 md:p-6">
            {selectedItem && (
              <ImageCarousel 
                images={selectedItem.image} 
                title={selectedItem.heading}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
} 