import { useState, useEffect, useCallback } from 'react';
import { useSettings } from '../context/SettingsContext';

const ScrollToTop = () => {
  const { settings } = useSettings();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    setIsVisible(window.pageYOffset > 300);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (settings.showScrollToTop) {
      toggleVisibility();
      window.addEventListener('scroll', toggleVisibility, { passive: true });
      return () => {
        window.removeEventListener('scroll', toggleVisibility);
      };
    } else {
      window.removeEventListener('scroll', toggleVisibility);
      setIsVisible(false);
    }
  }, [settings.showScrollToTop, toggleVisibility]);

  if (!settings.showScrollToTop || !isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-50 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-full shadow-lg border border-white/10 transition-all duration-200"
    >
      ↑
    </button>
  );
};

export default ScrollToTop;
