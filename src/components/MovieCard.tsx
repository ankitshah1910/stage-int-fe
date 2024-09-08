import React from 'react';
import MediaCard from './MediaCard';
import { Movie } from '@/types/type';

interface MovieCardProps {
  movie: Movie;
  onToggleFavorite: (movieId: string) => void;
  isFavorite: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onToggleFavorite,
  isFavorite,
}) => {
  return (
    <MediaCard
      media={movie}
      onToggleFavorite={onToggleFavorite}
      isFavorite={isFavorite}
    />
  );
};

export default MovieCard;
