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
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import Error from './Error';
import { useSeatGeek } from '../utils/useSeatGeek';
import { formatDateTimeFromUTC } from '../utils/formatDateTime';
import FavoriteButton from './common/FavoriteButton';

export interface Performers {
  image: string;
}

export interface Venue {
  name_v2: string;
  display_location: string;
  timezone: string;
}
export interface EventProps {
  id: number;
  short_title: string;
  datetime_utc: string;
  performers: Performers[];
  venue: Venue;
}

interface EventItemProps {
  event: EventProps;
}

const Events: React.FC = () => {
  const { data, error } = useSeatGeek('/events', {
    type: 'concert',
    sort: 'score.desc',
    per_page: '24',
  });

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
          <EventItem
            key={event.id}
            event={event}
          />
        ))}
      </SimpleGrid>
    </>
  );
};

const EventItem: React.FC<EventItemProps> = ({ event }) => {
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
            <FavoriteButton
              id={event.id}
              type="event"
              name={event.short_title + ' at ' + event.venue.name_v2}
            />
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
