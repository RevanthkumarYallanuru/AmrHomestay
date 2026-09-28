import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
  threshold?: number;
  onClick?: () => void;
}

export function LazyImage({
  src,
  alt,
  className = '',
  placeholderClassName = '',
  threshold = 0.1,
  onClick,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div 
      className={`relative overflow-hidden ${placeholderClassName}`} 
      ref={imgRef}
      onClick={onClick}
    >
      {/* Placeholder/Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
      )}
      
      {/* Actual Image */}
      {isInView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={src}
            alt={alt}
            className={className}
            onLoad={() => setIsLoaded(true)}
            loading="lazy"
          />
        </motion.div>
      )}
    </div>
  );
}

// Gallery-specific lazy image with lightbox support
interface GalleryImageProps extends LazyImageProps {
  showOverlay?: boolean;
}

export function GalleryImage({ showOverlay = true, ...props }: GalleryImageProps) {
  return (
    <div className="cursor-pointer group">
      <LazyImage
        {...props}
        className={`${props.className} transition-transform duration-500 group-hover:scale-105`}
      />
    </div>
  );
}

// Preload critical images
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

// Preload multiple images
export async function preloadImages(sources: string[]): Promise<void> {
  await Promise.all(sources.map(preloadImage));
}
