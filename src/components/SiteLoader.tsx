import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SiteLoaderProps {
  onLoadComplete?: () => void;
  duration?: number;
}

export function SiteLoader({ onLoadComplete, duration = 2500 }: SiteLoaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, duration / 10);

    // Hide loader after duration
    const timer = setTimeout(() => {
      setIsVisible(false);
      onLoadComplete?.();
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [duration, onLoadComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-[#1a2e1a] flex flex-col items-center justify-center"
        >
          {/* Animated V Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Outer ring animation */}
            <motion.div
              className="absolute inset-0 w-32 h-32 -m-4"
              style={{ 
                border: '2px solid rgba(184, 134, 11, 0.3)',
                borderRadius: '50%',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
            
            {/* Pulsing glow */}
            <motion.div
              className="absolute inset-0 w-24 h-24 rounded-2xl bg-[#b8860b]/20"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            
            {/* V Logo Container */}
            <motion.div
              className="relative w-24 h-24 rounded-2xl bg-[#b8860b] flex items-center justify-center shadow-2xl"
              animate={{ 
                boxShadow: [
                  '0 0 20px rgba(184, 134, 11, 0.4)',
                  '0 0 40px rgba(184, 134, 11, 0.6)',
                  '0 0 20px rgba(184, 134, 11, 0.4)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {/* The A */}
              <motion.span
                className="text-white font-serif font-bold text-5xl"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                A
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Hotel Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 text-center"
          >
            <h1 className="font-serif text-3xl text-white tracking-wide">AMR</h1>
            <p className="text-white/50 text-sm tracking-[0.3em] uppercase mt-1">Home Stay</p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 200 }}
            transition={{ delay: 0.7, duration: 0.3 }}
            className="mt-8 h-0.5 bg-white/10 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-[#b8860b]"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>

          {/* Loading Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-4 text-white/40 text-sm"
          >
            Loading your experience...
          </motion.p>

          {/* Decorative Elements */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-[#b8860b]/50"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
