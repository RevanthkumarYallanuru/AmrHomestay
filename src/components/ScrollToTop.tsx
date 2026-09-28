import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Smooth scroll to top on route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return null;
}

// Hook version for more control
export function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);
}

// Utility function to scroll to top programmatically
export function scrollToTop(smooth = true) {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: smooth ? 'smooth' : 'auto',
  });
}

// Scroll to element by ID
export function scrollToElement(elementId: string, offset = 80) {
  const element = document.getElementById(elementId);
  if (element) {
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({
      top,
      behavior: 'smooth',
    });
  }
}
