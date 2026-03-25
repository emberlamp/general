import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { PexelsPhoto, PexelsVideo } from '../types/pexels';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  photo?: PexelsPhoto;
  video?: PexelsVideo;
  contentType: 'photos' | 'videos';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  photo,
  video,
  contentType,
}) => {
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setDownloading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleDownload = async (url: string, filename: string) => {
    setDownloading(true);
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
    }
    setDownloading(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="absolute inset-0 bg-black/80" />
      
      <div className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/10 rounded-full hover:bg-white/20 transition text-white"
        >
          ✕
        </button>

        <div className="flex-1 flex items-center justify-center min-h-0">
          {contentType === 'photos' && photo && (
            <img
              src={photo.src.large2x || photo.src.large}
              alt={photo.alt}
              className="max-w-full max-h-[90vh] object-contain"
            />
          )}
          {contentType === 'videos' && video && (
            <video
              src={
                video.video_files.find((f) => f.quality === 'hd')?.link ||
                video.video_files[0]?.link
              }
              poster={video.image}
              controls
              autoPlay
              className="max-w-full max-h-[90vh] object-contain rounded"
            />
          )}
        </div>

        {contentType === 'photos' && photo && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <button
              onClick={() => handleDownload(photo.src.original, `pexels-${photo.id}.jpg`)}
              disabled={downloading}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-white text-sm transition disabled:opacity-50"
            >
              <Download size={16} />
              {downloading ? 'Downloading...' : 'Download'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
