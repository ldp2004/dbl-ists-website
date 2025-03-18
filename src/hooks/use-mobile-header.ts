"use client";

import { useState, useEffect } from "react";

interface UseMobileHeaderReturn {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  isMobile: boolean;
}

/**
 * Custom hook to handle mobile header functionality
 * Manages sheet state and detects viewport size
 */
export function useMobileHeader(): UseMobileHeaderReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);


  // Handle resize events to determine if mobile view
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on initial load
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Clean up event listener
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Close sheet when pressing escape key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen]);

  return { isOpen, setIsOpen, isMobile };
} 