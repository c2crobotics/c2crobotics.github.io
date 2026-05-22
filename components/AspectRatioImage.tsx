"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

interface AspectRatioImageProps {
  src: string;
  alt: string;
  naturalWidth?: number;
  naturalHeight?: number;
  className?: string;
  quality?: number;
  priority?: boolean;
  onClick?: () => void;
}

export default function AspectRatioImage({
  src,
  alt,
  naturalWidth,
  naturalHeight,
  className = "",
  quality = 75,
  priority = false,
  onClick,
}: AspectRatioImageProps) {
  const [inView, setInView] = useState(priority);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(
    naturalWidth && naturalHeight ? { width: naturalWidth, height: naturalHeight } : null
  );
  const [imageLoaded, setImageLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) return;
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.unobserve(node);
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [priority]);

  useEffect(() => {
    if (!inView || dimensions) return;

    const probe = new window.Image();
    probe.onload = () => {
      if (probe.naturalWidth > 0 && probe.naturalHeight > 0) {
        setDimensions({ width: probe.naturalWidth, height: probe.naturalHeight });
      }
    };
    probe.src = src;
  }, [src, inView, dimensions]);

  return (
    <div
      ref={containerRef}
      className={`group relative w-full overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gray-100 cursor-pointer ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.();
      }}
    >
      {(!inView || !dimensions) && (
        <div className="w-full min-h-40 bg-gray-200 animate-pulse" aria-hidden />
      )}

      {inView && dimensions && (
        <Image
          src={src}
          alt={alt}
          width={dimensions.width}
          height={dimensions.height}
          className={`w-full h-auto block transition-transform duration-300 group-hover:scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          quality={quality}
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          onLoad={() => setImageLoaded(true)}
        />
      )}

      {inView && dimensions && !imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" aria-hidden />
      )}

      {imageLoaded && (
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
