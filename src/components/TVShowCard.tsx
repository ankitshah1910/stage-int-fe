import React from 'react';
import MediaCard from './MediaCard';
import { TVShow } from '@/types/type';

interface TVShowCardProps {
  tvShow: TVShow;
  onToggleFavorite: (tvShowId: string) => void;
  isFavorite: boolean;
}

const TVShowCard: React.FC<TVShowCardProps> = ({
  tvShow,
  onToggleFavorite,
  isFavorite,
}) => {
  return (
    <MediaCard
      media={tvShow}
      onToggleFavorite={onToggleFavorite}
      isFavorite={isFavorite}
    />
  );
};

export default TVShowCard;
