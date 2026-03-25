import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import ScrollToTop from './components/ScrollToTop';
import SettingsModal from './components/SettingsModal';
import { SearchBar } from './components/SearchBar';
import { PhotoGrid } from './components/PhotoGrid';
import { Modal } from './components/Modal';
import { usePexels } from './hooks/usePexels';
import { PexelsPhoto, PexelsVideo } from './types/pexels';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { CookiePolicy } from './pages/CookiePolicy';
import { UsageGuidelines } from './pages/UsageGuidelines';
import { AttributionInfo } from './pages/AttributionInfo';
import { Support } from './pages/Support';

// Main Gallery Component
interface GalleryProps {
  onOpenSettings: () => void;
}

const Gallery = ({ onOpenSettings }: GalleryProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showFloatingSearch, setShowFloatingSearch] = useState(false);
  const lastScrollY = useRef(0);
  const { settings } = useSettings();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 200) {
        setIsScrolled(true);

        if (currentScrollY > lastScrollY.current + 100) {
          setShowFloatingSearch(true);
        } else if (lastScrollY.current > currentScrollY + 10) {
          setShowFloatingSearch(false);
        }
      } else {
        setIsScrolled(false);
        setShowFloatingSearch(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    photos,
    videos,
    loading,
    error,
    contentType,
    searchPhotos,
    searchVideos,
    getCuratedPhotos,
    getPopularVideos,
    loadMore,
    hasMore,
  } = usePexels();

  const [selectedPhoto, setSelectedPhoto] = useState<PexelsPhoto>();
  const [selectedVideo, setSelectedVideo] = useState<PexelsVideo>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (location.pathname === '/') {
      getCuratedPhotos();
    }
  }, [location.pathname]);

  const handleItemClick = (photo?: PexelsPhoto, video?: PexelsVideo) => {
    setSelectedPhoto(photo);
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(undefined);
    setSelectedVideo(undefined);
  };

  const navigateTo = (page: string) => {
    navigate(`/${page}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#3f3f3f] text-white font-sans antialiased relative">
      {/* Floating Search Bar */}
      <AnimatePresence>
        {isScrolled && settings.showFloatingSearch && showFloatingSearch && (
          <div className="fixed inset-0 z-30 flex justify-center pointer-events-none" onClick={() => setShowFloatingSearch(false)}>
              <motion.div
              className="absolute top-32 max-w-2xl w-[calc(100%-2rem)] sm:w-auto cursor-move pointer-events-auto"
              style={{ left: '50%', willChange: 'transform' }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              drag
              dragMomentum={false}
              dragConstraints={{
                top: -100,
                left: -200,
                right: 200,
                bottom: 300,
              }}
              dragElastic={0.1}
              whileDrag={{ scale: 1.02, rotate: 1 }}
              onDragStart={() => {
                document.body.style.userSelect = 'none';
                document.body.style.webkitUserSelect = 'none';
              }}
              onDragEnd={() => {
                document.body.style.userSelect = 'auto';
                document.body.style.webkitUserSelect = 'auto';
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-black/90 backdrop-blur-md rounded-lg shadow-2xl border border-white/20 overflow-hidden">
                <SearchBar
                  onSearchPhotos={(query) => {
                    searchPhotos(query);
                    setShowFloatingSearch(false);
                  }}
                  onSearchVideos={(query) => {
                    searchVideos(query);
                    setShowFloatingSearch(false);
                  }}
                  onCurated={() => {
                    getCuratedPhotos();
                    setShowFloatingSearch(false);
                  }}
                  onPopularVideos={() => {
                    getPopularVideos();
                    setShowFloatingSearch(false);
                  }}
                  contentType={contentType}
                  loading={loading}
                  floating
                  onClose={() => setShowFloatingSearch(false)}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main className="flex-grow relative pt-12 pb-12 md:pt-16">
        {/* Main Search bar - fade out when scrolled */}
        <div
          className={`relative z-10 px-4 mb-8 transition-all duration-300 ease-out ${
            isScrolled ? 'opacity-0 -translate-y-2 pointer-events-none' : 'opacity-100'
          }`}
        >
          <SearchBar
            onSearchPhotos={searchPhotos}
            onSearchVideos={searchVideos}
            onCurated={getCuratedPhotos}
            onPopularVideos={getPopularVideos}
            contentType={contentType}
            loading={loading}
          />
        </div>

        {/* Content grid */}
        <div className="relative px-4">
          <div
            className={`transition-opacity duration-500 ease-in-out ${loading && !photos.length && !videos.length ? 'opacity-0' : 'opacity-100'
              }`}
          >
            <PhotoGrid
              photos={photos}
              videos={videos}
              loading={loading}
              error={error}
              contentType={contentType}
              onItemClick={handleItemClick}
            />
          </div>

          {/* Load More - positioned over grid */}
          <div className="relative z-10 text-center py-16 flex justify-center gap-4">
            {hasMore && (photos.length > 0 || videos.length > 0) && (
              <button
                onClick={loadMore}
                disabled={loading}
                className="text-white/90 hover:text-white text-sm font-light tracking-wide uppercase transition-colors duration-300 disabled:text-white/40 disabled:cursor-default focus:outline-none bg-[#3f3f3f]/80 backdrop-blur-sm px-6 py-2 rounded-full"
              >
                {loading ? '···' : 'More'}
              </button>
            )}
            <button
              onClick={() => contentType === 'photos' ? getCuratedPhotos() : getPopularVideos()}
              disabled={loading}
              className="text-white/90 hover:text-white text-sm font-light tracking-wide uppercase transition-colors duration-300 disabled:text-white/40 disabled:cursor-default focus:outline-none bg-[#3f3f3f]/80 backdrop-blur-sm px-6 py-2 rounded-full"
            >
              Refresh
            </button>
          </div>
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        photo={selectedPhoto}
        video={selectedVideo}
        contentType={contentType}
      />

      <footer className="bg-black/80 backdrop-blur-sm pt-16 pb-12 px-4 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-10">
            {/* Legal */}
            <div>
              <h3 className="text-white/90 font-normal mb-3 text-xs tracking-wider uppercase">Legal</h3>
              <div className="space-y-2.5">
                <button
                  onClick={() => navigateTo('privacy')}
                  className="block text-white/50 hover:text-white text-xs font-light transition-colors duration-200 text-left"
                >
                  Privacy
                </button>
                <button
                  onClick={() => navigateTo('terms')}
                  className="block text-white/50 hover:text-white text-xs font-light transition-colors duration-200 text-left"
                >
                  Terms
                </button>
                <button
                  onClick={() => navigateTo('cookies')}
                  className="block text-white/50 hover:text-white text-xs font-light transition-colors duration-200 text-left"
                >
                  Cookies
                </button>
              </div>
            </div>

            {/* Content */}
            <div>
              <h3 className="text-white/90 font-normal mb-3 text-xs tracking-wider uppercase">Content</h3>
              <div className="space-y-2.5">
                <a
                  href="https://www.pexels.com/license/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white/50 hover:text-white text-xs font-light transition-colors duration-200"
                >
                  License
                </a>
                <button
                  onClick={() => navigateTo('usage')}
                  className="block text-white/50 hover:text-white text-xs font-light transition-colors duration-200 text-left"
                >
                  Guidelines
                </button>
                <button
                  onClick={() => navigateTo('attribution')}
                  className="block text-white/50 hover:text-white text-xs font-light transition-colors duration-200 text-left"
                >
                  Attribution
                </button>
              </div>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-white/90 font-normal mb-3 text-xs tracking-wider uppercase">Resources</h3>
              <div className="space-y-2.5">

                <button
                  onClick={() => navigateTo('support')}
                  className="block text-white/50 hover:text-white text-xs font-light transition-colors duration-200 text-left"
                >
                  Support
                </button>
              </div>
            </div>

            {/* Software Production */}
            <div>
              <h3 className="text-white/90 font-normal mb-3 text-xs tracking-wider uppercase">Software</h3>
              <div className="space-y-2.5">
                <a
                  href="https://github.com/bniladridas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white/50 hover:text-white text-xs font-light transition-colors duration-200"
                >
                  Projects
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
              {/* Copyright */}
              <div className="text-white/40 text-xs font-light">
                © {new Date().getFullYear()}
              </div>

              {/* Settings */}
              <div className="flex items-center space-x-6">
                <button
                  onClick={onOpenSettings}
                  className="text-white/40 hover:text-white text-xs font-light transition-colors duration-200 flex items-center group"
                >
                  <svg className="w-3.5 h-3.5 mr-1.5 group-hover:rotate-45 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  </svg>
                  Preferences
                </button>

                <span className="text-white/10">|</span>

                {/* Attribution */}
                <a
                  href="https://www.pexels.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white text-xs font-light transition-colors duration-200"
                >
                  Powered by Pexels
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const AppContent = () => {
  const { settings, updateSettings } = useSettings();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Handle settings change from modal
  const handleSettingsChange = (newSettings: {
    showScrollToTop: boolean;
    showFloatingSearch: boolean;
  }) => {
    updateSettings(newSettings);
  };

  return (
    <>
      {settings.showScrollToTop && <ScrollToTop />}
      <Routes>
        <Route
          path="/"
          element={<Gallery onOpenSettings={() => setIsSettingsOpen(true)} />}
        />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="/usage" element={<UsageGuidelines />} />
        <Route path="/attribution" element={<AttributionInfo />} />
        <Route path="/support" element={<Support />} />
      </Routes>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSettingsChange={handleSettingsChange}
      />
    </>
  );
};

function App() {
  return (
    <Router>
      <SettingsProvider>
        <AppContent />
      </SettingsProvider>
    </Router>
  );
}

export default App;
