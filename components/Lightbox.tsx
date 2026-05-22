"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface LightboxProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

export default function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(initialIndex);
  const [direction, setDirection] = useState(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const preloaded = useRef<Set<string>>(new Set());

  useEffect(() => {
    const urlsToPreload = [
      images[current],
      images[(current + 1) % images.length],
      images[(current - 1 + images.length) % images.length],
    ];
    urlsToPreload.forEach((url) => {
      if (!preloaded.current.has(url)) {
        const img = new window.Image();
        img.src = url;
        preloaded.current.add(url);
      }
    });
  }, [current, images]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev, onClose]);

  // Touch gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    const distance = touchStart - touchEnd;
    if (Math.abs(distance) > 50) {
      if (distance > 0) next();
      else prev();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir * 300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir * -300, opacity: 0 }),
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
        onClick={onClose}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 text-white text-2xl sm:text-3xl z-20 hover:text-gray-300"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="relative w-full max-w-6xl mx-4 flex items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="text-white text-5xl sm:text-6xl lg:text-7xl hover:text-gray-300 transition-colors z-10 shrink-0 px-1 sm:px-2"
            aria-label="Previous"
          >
            ‹
          </button>

          {/* Image container */}
          <div
            className="relative flex-1 h-[90vh] max-h-[90vh] mx-2 sm:mx-4"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Image
                  src={images[current]}
                  alt={`Enlarged view ${current + 1}`}
                  width={1200}
                  height={800}
                  className="max-w-full max-h-full object-contain"
                  quality={75}
                  priority
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white text-xs sm:text-sm opacity-70 whitespace-nowrap">
              <span className="sm:hidden">Swipe or tap arrows</span>
              <span className="hidden sm:inline">
                Use arrow keys or click arrows
              </span>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="text-white text-5xl sm:text-6xl lg:text-7xl hover:text-gray-300 transition-colors z-10 shrink-0 px-1 sm:px-2"
            aria-label="Next"
          >
            ›
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}