import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  List,
  ListItem,
  ListIcon,
  Button,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { useFavorites } from '../context/FavoritesContext';
import { useNavigate } from 'react-router-dom';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({ isOpen, onClose }) => {
  const { favorites, removeFavorite } = useFavorites();
  const navigate = useNavigate();

  const handleNavigate = (id: string, type: 'event' | 'venue') => {
    navigate(`/${type}s/${id}`);
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Your Favorites</DrawerHeader>
        <DrawerBody>
          <List spacing={3}>
            {favorites.map((item) => (
              <ListItem key={item.id}>
                <Button variant="link" onClick={() => handleNavigate(item.id, item.type)}>
                  <ListIcon as={StarIcon} color="yellow.500" />
                  {item.name}
                </Button>
                <Button ml={2} size="sm" onClick={() => removeFavorite(item.id)}>Remove</Button>
              </ListItem>
            ))}
          </List>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default FavoritesDrawer;
