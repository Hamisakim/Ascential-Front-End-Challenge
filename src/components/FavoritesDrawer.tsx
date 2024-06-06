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
  Button,
  IconButton,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { useFavorites } from '../context/FavoritesContext';
import { useNavigate } from 'react-router-dom';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
}) => {
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
              <ListItem
                key={item.id + item.type} //? to Prevent duplicate keys when the draw is opened and closed
                display={'flex'}
                justifyContent={'space-between'}
                alignContent={'space-between'}
              >
                <Button
                  variant="link"
                  onClick={() => handleNavigate(item.id, item.type)}
                >
                  {item.name}
                </Button>
                <IconButton
                  ml={2}
                  size="sm"
                  icon={<DeleteIcon />}
                  onClick={() => removeFavorite(item.id)}
                  aria-label={''}
                  _hover={{ color: 'red.500' }}
                >
                  Remove
                </IconButton>
              </ListItem>
            ))}
          </List>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default FavoritesDrawer;
