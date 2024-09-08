'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { getMovies, getTVShows } from '../services/media';
import {
  CircularProgress,
  Tabs,
  Tab,
  Box,
  Grid,
  Typography,
} from '@mui/material';
import { Movie, ResponseData, TVShow } from '@/types/type';
import MediaCard from '@/components/MediaCard';
import { addToLikedList, removeFromLikedList } from '@/services/me';
import { useAuth } from '@/context/authContext';

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [tvShows, setTVShows] = useState<TVShow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [hasMore, setHasMore] = useState(true);
  const [activeTab, setActiveTab] = useState<'movies' | 'tvShows'>('movies');

  const { likedList, setLikedListItem } = useAuth();

  const fetchMediaData = useCallback(async () => {
    if (!hasMore) return;
    setLoading(true);

    try {
      let mediaData: ResponseData<Movie | TVShow>;

      if (activeTab === 'movies') {
        mediaData = await getMovies(page);
        setMovies((prevMovies) => [...prevMovies, ...mediaData.data]);
        setTotalPages(mediaData.totalPages);
      } else {
        mediaData = await getTVShows(page);
        setTVShows((prevTVShows) => [...prevTVShows, ...mediaData.data]);
        setTotalPages(mediaData.totalPages);
      }

      setHasMore(page < mediaData.totalPages);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'An unknown error occurred'
      );
    } finally {
      setLoading(false);
    }
  }, [activeTab, page, totalPages]);

  useEffect(() => {
    fetchMediaData();
  }, [fetchMediaData]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight &&
      hasMore &&
      !loading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasMore, loading]);

  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: 'movies' | 'tvShows'
  ) => {
    setActiveTab(newValue);
    setPage(1);
    setMovies([]);
    setTVShows([]);
    setHasMore(true);
    fetchMediaData();
  };

  const toggleFavorite = async (mediaId: string, isMovie: boolean) => {
    try {
      if (likedList.includes(mediaId)) {
        let response = await removeFromLikedList(mediaId);
        if (response.success) {
          let newArray = likedList.filter((item) => item !== mediaId);
          setLikedListItem(newArray);
        }
      } else {
        let response = await addToLikedList(
          mediaId,
          isMovie ? 'movie' : 'tvshow'
        );
        if (response.success) {
          setLikedListItem([...likedList, mediaId]);
        }
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'An error occurred while updating favorites'
      );
    }
  };

  return (
    <Box>
      <Box sx={{ mt: 2 }}>
        <Tabs value={activeTab} onChange={handleTabChange} variant='fullWidth'>
          <Tab label='Movies' value='movies' />
          <Tab label='TV Shows' value='tvShows' />
        </Tabs>

        {error && <Typography color='error'>{error}</Typography>}

        <Grid container spacing={2} sx={{ mt: 2 }}>
          {activeTab === 'movies' &&
            movies.map((movie, index) => (
              <Grid item xs={12} sm={6} md={4} key={movie._id + index}>
                <MediaCard
                  media={movie}
                  onToggleFavorite={() => toggleFavorite(movie._id, true)}
                  isFavorite={likedList.includes(movie._id)}
                />
              </Grid>
            ))}
          {activeTab === 'tvShows' &&
            tvShows.map((tvShow, index) => (
              <Grid item xs={12} sm={6} md={4} key={tvShow._id + index}>
                <MediaCard
                  media={tvShow}
                  onToggleFavorite={() => toggleFavorite(tvShow._id, false)}
                  isFavorite={likedList.includes(tvShow._id)}
                />
              </Grid>
            ))}
        </Grid>

        {loading && (
          <Box textAlign='center' mt={2}>
            <CircularProgress />
          </Box>
        )}
        {!hasMore && (
          <Typography textAlign='center' mt={2}>
            No more items to load.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
