import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAuth } from '@/context/authContext';

interface MediaCardProps {
  media: any;
  onToggleFavorite: (mediaId: string) => void;
  isFavorite: boolean;
}

const MediaCard: React.FC<MediaCardProps> = ({
  media,
  onToggleFavorite,
  isFavorite,
}) => {
  const { isAuthenticated } = useAuth();

  return (
    <Card sx={{ maxWidth: 345, position: 'relative' }}>
      {isAuthenticated && (
        <IconButton
          onClick={() => onToggleFavorite(media._id)}
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: 'white',
            boxShadow: 2,
            '&:hover': {
              boxShadow: 4,
            },
            borderRadius: '50%',
            padding: '8px',
            color: isFavorite ? 'red' : 'gray',
          }}
        >
          <FavoriteIcon />
        </IconButton>
      )}
      <CardMedia
        component='img'
        height='140'
        image={`https://www.stage.in/_next/image?url=https%3A%2F%2Fmedia.stage.in%2Fshow%2Fvertical%2Fsmall%2F${media.posterUrl}&w=384&q=75`}
        alt={media.title}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {media.title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {media.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MediaCard;
