import { useState } from 'react';
import { createClient } from 'pexels';
import { PexelsPhoto, PexelsVideo } from '../types/pexels';

const client = createClient(import.meta.env.VITE_PEXELS_API_KEY!);

export const usePexels = () => {
  const [photos, setPhotos] = useState<PexelsPhoto[]>([]);
  const [videos, setVideos] = useState<PexelsVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contentType, setContentType] = useState<'photos' | 'videos'>('photos');
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const resetState = () => {
    setPhotos([]);
    setVideos([]);
    setCurrentPage(1);
    setQuery(null);
    setHasMore(true);
  };

  const searchPhotos = async (q: string) => {
    setLoading(true);
    setError(null);
    setContentType('photos');
    setVideos([]); // Clear videos when switching to photos
    setCurrentPage(1);
    setQuery(q);
    setHasMore(true);
    try {
      const res = await client.photos.search({
        query: q,
        per_page: 60,
        page: 1
      }) as any;
      setPhotos(res.photos);
      setHasMore(res.photos.length === 60);
    } catch (err) {
      setError('Failed to fetch photos');
    } finally {
      setLoading(false);
    }
  };

  const searchVideos = async (q: string) => {
    setLoading(true);
    setError(null);
    setContentType('videos');
    setPhotos([]); // Clear photos when switching to videos
    setCurrentPage(1);
    setQuery(q);
    setHasMore(true);
    try {
      const res = await client.videos.search({
        query: q,
        per_page: 24, // Optimized for faster initial loading
        page: 1
      }) as any;
      setVideos(res.videos);
      setHasMore(res.videos.length === 24);
    } catch (err) {
      setError('Failed to fetch videos');
    } finally {
      setLoading(false);
    }
  };

  const getCuratedPhotos = async () => {
    setLoading(true);
    setError(null);
    setContentType('photos');
    setVideos([]); // Clear videos when switching to photos
    setCurrentPage(1);
    setQuery(null);
    setHasMore(true);
    try {
      const res = await client.photos.curated({
        per_page: 60,
        page: Math.floor(Math.random() * 10) + 1 // Random page to get different photos
      }) as any;
      setPhotos(res.photos);
      setHasMore(res.photos.length === 60);
    } catch (err) {
      setError('Failed to fetch curated photos');
    } finally {
      setLoading(false);
    }
  };

  const getPopularVideos = async () => {
    setLoading(true);
    setError(null);
    setContentType('videos');
    setPhotos([]); // Clear photos when switching to videos
    setCurrentPage(1);
    setQuery(null);
    setHasMore(true);
    try {
      const res = await client.videos.popular({
        per_page: 24,
        page: Math.floor(Math.random() * 10) + 1 // Random page to get different videos
      }) as any;
      setVideos(res.videos);
      setHasMore(res.videos.length === 24);
    } catch (err) {
      setError('Failed to fetch popular videos');
    } finally {
      setLoading(false);
    }
  };

  const getPhotoById = async (id: number) => {
    setLoading(true);
    setError(null);
    setContentType('photos');
    try {
      const photo = await client.photos.show({ id }) as any;
      setPhotos([photo]);
      setVideos([]);
    } catch (err) {
      setError('Failed to fetch photo');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    const nextPage = currentPage + 1;
    // Optimized batch sizes for faster loading
    const photosPerPage = 60;
    const videosPerPage = 12; // Reduced for much faster video loading

    try {
      let res: any;
      if (contentType === 'photos') {
        if (query) {
          res = await client.photos.search({
            query: query,
            per_page: photosPerPage,
            page: nextPage
          }) as any;
          setPhotos(prev => [...prev, ...res.photos]);
          setHasMore(res.photos.length === photosPerPage);
        } else {
          res = await client.photos.curated({
            per_page: photosPerPage,
            page: nextPage
          }) as any;
          setPhotos(prev => [...prev, ...res.photos]);
          setHasMore(res.photos.length === photosPerPage);
        }
      } else {
        // Optimized video loading with immediate UI update
        const videoPromise = query 
          ? client.videos.search({
              query: query,
              per_page: videosPerPage,
              page: nextPage
            })
          : client.videos.popular({
              per_page: videosPerPage,
              page: nextPage
            });

        res = await videoPromise as any;
        setVideos(prev => [...prev, ...res.videos]);
        setHasMore(res.videos.length === videosPerPage);
      }

      setCurrentPage(nextPage);
    } catch (err) {
      setError('Failed to load more content');
    } finally {
      setLoading(false);
    }
  };



  return {
    photos,
    videos,
    loading,
    error,
    contentType,
    searchPhotos,
    searchVideos,
    getCuratedPhotos,
    getPopularVideos,
    getPhotoById,
    loadMore,
    hasMore,
    resetState
  };
};
