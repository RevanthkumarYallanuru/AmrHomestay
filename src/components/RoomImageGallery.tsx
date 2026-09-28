import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RoomImageGalleryProps {
  images: string[];
  roomName: string;
  onImageClick?: (index: number) => void;
}

// Image Skeleton Loader Component
function ImageSkeleton() {
  return (
    <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
  );
}

// Blur Placeholder Component
function BlurPlaceholder() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 blur-xl opacity-50" />
  );
}

export function RoomImageGallery({ images, roomName, onImageClick }: RoomImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  const [loadedImages, setLoadedImages] = useState<boolean[]>(new Array(images.length).fill(false));
  const [failedImages, setFailedImages] = useState<boolean[]>(new Array(images.length).fill(false));
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-play carousel
  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, images.length]);

  const goToPrevious = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setAutoPlay(false);
    setCurrentIndex(index);
    onImageClick?.(index);
  };

  const handleImageLoad = (index: number) => {
    const newLoadedImages = [...loadedImages];
    newLoadedImages[index] = true;
    setLoadedImages(newLoadedImages);
  };

  const handleImageError = (index: number) => {
    const newFailedImages = [...failedImages];
    newFailedImages[index] = true;
    setFailedImages(newFailedImages);
    // Mark as loaded anyway so we can show error state
    handleImageLoad(index);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrevious();
    }
  };

  // Preload adjacent images and all images on component mount
  useEffect(() => {
    const preloadImage = (index: number) => {
      if (index >= 0 && index < images.length) {
        const img = new Image();
        img.onload = () => handleImageLoad(index);
        img.onerror = () => handleImageError(index);
        img.src = images[index];
      }
    };

    // Preload current image immediately
    preloadImage(currentIndex);
    
    // Preload next and previous images
    preloadImage((currentIndex + 1) % images.length);
    preloadImage(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
    
    // Also preload remaining images with a slight delay to prevent blocking
    const timer = setTimeout(() => {
      for (let i = 0; i < images.length; i++) {
        if (i !== currentIndex) {
          preloadImage(i);
        }
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [currentIndex, images, loadedImages]);

  return (
    <div className="space-y-4">
      {/* Main Image Container */}
      <div
        ref={containerRef}
        className="relative bg-secondary rounded-2xl overflow-hidden aspect-square lg:aspect-auto lg:h-[600px] group cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Loading Skeleton */}
        {!loadedImages[currentIndex] && (
          <div className="absolute inset-0 z-0">
            <ImageSkeleton />
          </div>
        )}

        {/* Main Image */}
        <AnimatePresence mode="wait">
          {!failedImages[currentIndex] ? (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <img
                src={images[currentIndex]}
                alt={`${roomName} - Image ${currentIndex + 1}`}
                className="w-full h-full object-cover cursor-zoom-in select-none"
                onClick={() => setShowZoom(true)}
                onLoad={() => handleImageLoad(currentIndex)}
                onError={() => handleImageError(currentIndex)}
                loading="eager"
                decoding="async"
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex items-center justify-center bg-gray-100"
            >
              <div className="text-center">
                <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">Image failed to load</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Image Counter Badge */}
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium z-20">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Navigation Buttons - Desktop */}
        {images.length > 1 && (
          <>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-lg"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-black" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-lg"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-black" />
            </motion.button>
          </>
        )}

        {/* Zoom Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowZoom(true)}
          className="absolute bottom-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-lg"
          aria-label="Zoom image"
        >
          <ZoomIn className="w-5 h-5 text-black" />
        </motion.button>

        {/* Auto-play Indicator */}
        {autoPlay && images.length > 1 && (
          <div className="absolute bottom-4 left-4 z-20">
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white text-xs">Auto-play</span>
            </div>
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="space-y-3">
          {/* Thumbnail Gallery */}
          <div className="flex gap-2 overflow-x-auto pb-2 scroll-smooth">
            {images.map((image, index) => (
              <motion.button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentIndex
                    ? 'border-[#b8860b] ring-2 ring-[#b8860b]/50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                aria-label={`View image ${index + 1}`}
              >
                {/* Thumbnail Skeleton */}
                {!loadedImages[index] && (
                  <div className="absolute inset-0 z-0">
                    <ImageSkeleton />
                  </div>
                )}

                {/* Thumbnail Image */}
                {!failedImages[index] ? (
                  <img
                    src={image}
                    alt={`${roomName} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    onLoad={() => handleImageLoad(index)}
                    onError={() => handleImageError(index)}
                    loading="eager"
                    decoding="async"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 text-gray-400" />
                  </div>
                )}

                {/* Selected Overlay */}
                {index === currentIndex && (
                  <motion.div
                    layoutId="thumbnail-highlight"
                    className="absolute inset-0 bg-[#b8860b]/20"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Keyboard Navigation Info */}
          <p className="text-xs text-muted-foreground text-center hidden sm:block">
            💡 Tip: Swipe on mobile or use arrow buttons to navigate
          </p>
        </div>
      )}

      {/* Zoom Modal */}
      <AnimatePresence>
        {showZoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowZoom(false)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          >
            <motion.button
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              className="relative w-full h-full max-w-4xl max-h-4xl"
              onClick={() => setShowZoom(false)}
            >
              <img
                src={images[currentIndex]}
                alt={`${roomName} - Zoomed`}
                className="w-full h-full object-contain rounded-lg"
                loading="eager"
                decoding="async"
              />
            </motion.button>

            {/* Close hint */}
            <div className="absolute bottom-4 left-4 right-4 text-center text-white text-sm">
              Click anywhere to close
            </div>

            {/* Navigation in zoom */}
            {images.length > 1 && (
              <>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-3 text-white transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-3 text-white transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
