'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { Box, Grid, Typography, CircularProgress } from '@mui/material';
import MediaCard from '@/components/MediaCard';
import { getMyLikedList, removeFromLikedList } from '@/services/me';
import { useAuth } from '@/context/authContext';

const MyListPage: React.FC = () => {
  const [likedItems, setLikedItems] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [hasMore, setHasMore] = useState(true);
  const { likedList, setLikedListItem } = useAuth();

  const fetchLikedItems = useCallback(async () => {
    if (!hasMore) return;
    setLoading(true);

    try {
      const data = await getMyLikedList(page);
      setLikedItems((prevItems: any) => [...prevItems, ...data.data]);
      setTotalPages(data.totalPages);
      setHasMore(page < data.totalPages);
    } catch (error) {
      setError('Failed to load your list.');
    } finally {
      setLoading(false);
    }
  }, [page, hasMore, totalPages]);

  useEffect(() => {
    fetchLikedItems();
  }, [fetchLikedItems]);

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

  const handleRemoveFromList = async (mediaId: string) => {
    try {
      const response = await removeFromLikedList(mediaId);
      if (response.success) {
        console.log('prevItems', likedItems);
        console.log(mediaId);
        let newLikedItems = likedItems.filter(
          (item: any) => item._id !== mediaId
        );
        setLikedItems(newLikedItems);
        let newArray = likedList.filter((item) => item !== mediaId);
        setLikedListItem(newArray);
      }
    } catch (error) {
      setError('Error removing from your list.');
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant='h4' gutterBottom>
        My List
      </Typography>

      {error && <Typography color='error'>{error}</Typography>}

      {loading && (
        <Box textAlign='center' mt={2}>
          <CircularProgress />
        </Box>
      )}

      <Grid container spacing={2}>
        {likedItems.map((item: any, index) => (
          <Grid item xs={12} sm={6} md={4} key={item._id + index}>
            <MediaCard
              media={item}
              onToggleFavorite={() => handleRemoveFromList(item._id)}
              isFavorite={true}
            />
          </Grid>
        ))}
      </Grid>

      {!hasMore && !loading && (
        <Typography textAlign='center' mt={2}>
          No more items to load.
        </Typography>
      )}
    </Box>
  );
};

export default MyListPage;
