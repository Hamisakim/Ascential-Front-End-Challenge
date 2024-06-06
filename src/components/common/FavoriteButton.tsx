import React from 'react';
import { Button, Icon } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { useFavorites } from '../../context/FavoritesContext';

interface FavoriteButtonProps {
  id: string;
  type: 'event' | 'venue';
  name: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ id, type, name }) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = favorites.some((fav) => fav.id === id);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFavorite(id);
    } else {
      addFavorite({ id, type, name });
    }
  };

  return (
    <Button onClick={handleFavoriteToggle}>
      <Icon as={StarIcon} color={isFavorite ? 'yellow.500' : 'black'} />
    </Button>
  );
};

export default FavoriteButton;
