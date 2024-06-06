import React from 'react';
import {
  SimpleGrid,
  Flex,
  Spinner,
  Heading,
  Text,
  Box,
  Card,
  CardBody,
  Stack,
  Image,
  LinkBox,
  LinkOverlay,
  Button,
  Icon,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import Error from './Error';
import { useSeatGeek } from '../utils/useSeatGeek';
import { formatDateTimeFromUTC } from '../utils/formatDateTime';
import { FavoriteItem, useFavorites } from '../context/FavoritesContext';
import { StarIcon } from '@chakra-ui/icons';

export interface Performers {
  image: string;
}

export interface Venue {
  name_v2: string;
  display_location: string;
  timezone: string;
}
//TODO Ensure consistency for all venue and event IDs being strings or numbers
export interface EventProps {
  id: string;
  short_title: string;
  datetime_utc: string;
  performers: Performers[];
  venue: Venue;
}

interface EventItemProps {
  event: EventProps;
  favorites: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (id: string) => void;
}

const Events: React.FC = () => {
  const { data, error } = useSeatGeek('/events', {
    type: 'concert',
    sort: 'score.desc',
    per_page: '24',
  });
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  if (error) return <Error />;

  if (!data) {
    return (
      <Flex justifyContent="center" alignItems="center" minHeight="50vh">
        <Spinner size="lg" />
      </Flex>
    );
  }

  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Events' }]} />
      <SimpleGrid spacing="6" m="6" minChildWidth="350px">
        {data.events?.map((event: EventProps) => (
          //TODO Ensure consistency for all venue and event IDs being strings or numbers
          <EventItem
            key={event.id.toString()}
            favorites={favorites}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
            event={event}
          />
        ))}
      </SimpleGrid>
    </>
  );
};

const EventItem: React.FC<EventItemProps> = ({
  event,
  favorites,
  addFavorite,
  removeFavorite,
}) => {
  const isFavorite = favorites.some((fav) => fav.id === event.id.toString());

  const handleFavoriteToggle = () => {
    const id = event.id.toString();
    if (isFavorite) {
      removeFavorite(id);
    } else {
      addFavorite({ id, type: 'venue', name: event.short_title });
    }
  };
  return (
    <LinkBox
      as={Card}
      variant="outline"
      overflow="hidden"
      bg="gray.50"
      borderColor="gray.200"
      _hover={{ bg: 'gray.100' }}
    >
      <Image src={event.performers[0].image} />
      <CardBody>
        <Stack spacing="2">
          <Heading
            size="md"
            noOfLines={1}
            display={'flex'}
            justifyContent={'space-between'}
            alignContent={'space-between'}
            alignItems={'center'}
          >
            <LinkOverlay as={Link} to={`/events/${event.id}`}>
              {event.short_title}
            </LinkOverlay>
            <Button onClick={handleFavoriteToggle}>
              <Icon as={StarIcon} color={isFavorite ? 'yellow.500' : 'black'} />
            </Button>
          </Heading>
          <Box>
            <Text fontSize="sm" color="gray.600">
              {event.venue.name_v2}
            </Text>
            <Text fontSize="sm" color="gray.600">
              {event.venue.display_location}
            </Text>
          </Box>
          <Text
            fontSize="sm"
            fontWeight="bold"
            color="gray.600"
            justifySelf={'end'}
          >
            {formatDateTimeFromUTC(event.datetime_utc, {
              timeZone: event.venue.timezone,
            })}
          </Text>
        </Stack>
      </CardBody>
    </LinkBox>
  );
};

export default Events;
