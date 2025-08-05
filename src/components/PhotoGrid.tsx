import React from 'react';
import { PexelsPhoto, PexelsVideo } from '../types/pexels';
import { Play } from 'lucide-react';

interface PhotoGridProps {
  photos: PexelsPhoto[];
  videos: PexelsVideo[];
  loading: boolean;
  error: string | null;
  contentType: 'photos' | 'videos';
  onItemClick: (photo?: PexelsPhoto, video?: PexelsVideo) => void;
}

export const PhotoGrid: React.FC<PhotoGridProps> = ({
  photos,
  videos,
  loading,
  error,
  contentType,
  onItemClick,
}) => {
  if (loading && !photos.length && !videos.length) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <span className="text-white/40 text-sm font-light tracking-widest uppercase">···</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <span className="text-white/60 text-sm font-light tracking-wide">{error}</span>
      </div>
    );
  }

  if (photos.length === 0 && videos.length === 0) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <span className="text-white/60 text-sm font-light tracking-wide">No {contentType} found</span>
      </div>
    );
  }

  const items = contentType === 'videos'
    ? videos.map((video, index) => ({
      type: 'video' as const,
      id: video.id,
      index,
      element: (
        <video
          src={video.video_files.find((f) => f.quality === 'sd')?.link ||
            video.video_files[0]?.link}
          poster={video.image}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.02]"
        />
      ),
      creator: video.user.name,
      onClick: () => onItemClick(undefined, video),
    }))
    : photos.map((photo, index) => ({
      type: 'photo' as const,
      id: photo.id,
      index,
      element: (
        <img
          src={photo.src.large}
          alt={photo.alt}
          loading="lazy"
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.02]"
        />
      ),
      creator: photo.photographer,
      onClick: () => onItemClick(photo),
    }));

  return (
    <div className="w-screen -mx-4 px-0">
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-0">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={item.onClick}
            className="group relative break-inside-avoid cursor-pointer overflow-hidden"
            style={{
              marginBottom: '1px',
            }}
          >
            <div className="relative">
              {item.element}

              {/* Minimal overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

              {/* Clean typography overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-end justify-between">
                  <span className="text-white text-xs font-light tracking-wide">
                    {item.creator}
                  </span>
                  {item.type === 'video' && (
                    <div className="w-6 h-6 flex items-center justify-center">
                      <Play size={12} className="text-white/80" fill="currentColor" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
