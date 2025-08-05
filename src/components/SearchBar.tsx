import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearchPhotos: (query: string) => void;
  onSearchVideos: (query: string) => void;
  onCurated: () => void;
  onPopularVideos: () => void;
  contentType: 'photos' | 'videos';
  loading: boolean;
  floating?: boolean;
  onClose?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearchPhotos,
  onSearchVideos,
  onCurated,
  onPopularVideos,
  contentType,
  loading,
  floating = false,
  onClose,
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling
    const trimmed = query.trim();
    if (!trimmed) return;
    
    // Force a small delay to ensure state updates before search
    requestAnimationFrame(() => {
      contentType === 'photos' ? onSearchPhotos(trimmed) : onSearchVideos(trimmed);
    });
  };

  const SearchBarContent = (
    <>
      <form 
        onSubmit={handleSubmit} 
        className={`relative ${floating ? 'mb-4' : 'mb-6'}`}
      >
        <div className={`relative ${floating ? 'px-8' : 'px-0'}`}>
          {floating && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-white/50 p-1"
              aria-label="Close search"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          )}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${contentType}...`}
            disabled={loading}
            className="w-full py-3 text-sm sm:text-base bg-transparent text-white placeholder-white/50 border-0 border-b border-white/20 focus:border-white/60 focus:outline-none focus:ring-0 disabled:opacity-40 font-light tracking-wide"
            autoFocus={floating}
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-white/50 disabled:cursor-default disabled:text-white/20"
            aria-label="Search"
          >
            <Search size={18} strokeWidth={1.5} />
          </button>
        </div>
      </form>

      {/* Toggle Navigation - Only show in non-floating mode */}
      {!floating && (
        <div className="flex justify-center items-center gap-4 sm:gap-6 text-xs sm:text-sm font-light">
        <button
          onClick={onCurated}
          disabled={loading}
          className={`relative px-2 py-1 disabled:cursor-default ${
            contentType === 'photos'
              ? 'text-white before:opacity-100'
              : 'text-white/60 before:opacity-0'
          } ${loading ? 'opacity-40' : ''}
            before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-1 before:h-0.5 before:bg-white before:transition-opacity`}
          aria-label="View photos"
        >
          Photos
        </button>
        <div className="w-px h-4 bg-white/20"></div>
        <button
          onClick={onPopularVideos}
          disabled={loading}
          className={`relative px-2 py-1 disabled:cursor-default ${
            contentType === 'videos'
              ? 'text-white before:opacity-100'
              : 'text-white/60 before:opacity-0'
          } ${loading ? 'opacity-40' : ''}
            before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-1 before:h-0.5 before:bg-white before:transition-opacity`}
          aria-label="View videos"
        >
          Videos
        </button>
        {loading && (
          <span className="ml-2 text-white/40 text-xs font-normal tracking-normal">
            Loading...
          </span>
        )}
        </div>
      )}
    </>
  );

  if (floating) {
    return (
      <div 
        className="w-full"
        onClick={e => e.stopPropagation()} // Prevent click from closing the search
      >
        {SearchBarContent}
      </div>
    );
  }

  return <div className="w-full max-w-xl mx-auto mb-12">{SearchBarContent}</div>;
};
