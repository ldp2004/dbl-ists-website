/**
 * Design System Layout Template
 * This file serves as a reference for consistent spacing and layout patterns across the application.
 */

export const spacing = {
  // Section spacing
  section: {
    py: 'py-16', // Vertical padding for sections
    px: 'px-4',  // Horizontal padding for container
    gap: 'gap-6', // Default gap between major section elements
  },
  
  // Header/Navigation spacing
  header: {
    py: 'py-4',
    px: 'px-4',
    gap: 'gap-6',
    itemGap: 'gap-4', // For smaller elements like navigation items
  },
  
  // Content spacing
  content: {
    stack: {
      gap: 'gap-6',     // Large stacked elements
      gapSmall: 'gap-4', // Small stacked elements
      gapTight: 'gap-2', // Tight stacked elements
    },
    grid: {
      gap: 'gap-6',
    }
  },
  
  // Component spacing
  component: {
    card: {
      padding: 'p-6',
      gap: 'gap-4',
    },
    section: {
      titleStack: 'gap-2',    // Gap between title elements
      contentStack: 'gap-6',  // Gap between major content blocks
    }
  }
} as const;

export const layout = {
  container: 'container mx-auto',
  grid: {
    default: 'grid',
    cols1: 'grid-cols-1',
    cols2: 'md:grid-cols-2',
    cols3: 'lg:grid-cols-3',
  },
  flex: {
    default: 'flex',
    col: 'flex-col',
    row: 'flex-row',
    center: 'items-center',
    between: 'justify-between',
  }
} as const; 