import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Venues from './components/Venues';
import Venue from './components/Venue';
import Events from './components/Events';
import Event from './components/Event';
import { Flex, Heading, Button, useDisclosure } from '@chakra-ui/react';
import { FavoritesProvider } from './context/FavoritesContext';
import FavoritesDrawer from './components/FavoritesDrawer';

const App: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <FavoritesProvider>
      <Router>
        <Nav onOpenFavorites={onOpen} />
        <FavoritesDrawer isOpen={isOpen} onClose={onClose} />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/venues" Component={Venues} />
          <Route path="/venues/:venueId" Component={Venue} />
          <Route path="/events" Component={Events} />
          <Route path="/events/:eventId" Component={Event} />
        </Routes>
      </Router>
    </FavoritesProvider>
  );
};

const Nav: React.FC<{ onOpenFavorites: () => void }> = ({ onOpenFavorites }) => (
  <Flex
    as="nav"
    bg="gray.700"
    color="white"
    padding="24px"
    justifyContent="space-between"
    alignItems="center"
  >
    <Heading size="md">Ascential Front End Challenge</Heading>
    <Button onClick={onOpenFavorites}>Favorites</Button>
  </Flex>
);

export default App;
