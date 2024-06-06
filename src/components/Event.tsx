import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Flex,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Box,
  Spinner,
  Button,
  Stack,
  Tooltip,
} from '@chakra-ui/react';
import Breadcrumbs from './Breadcrumbs';
import Error from './Error';
import { useSeatGeek } from '../utils/useSeatGeek';
import { formatDateTimeFromUTC } from '../utils/formatDateTime';
import { type Venue } from './Events';
import FavoriteButton from './common/FavoriteButton';

interface EventInfoProps {
  event: {
    id: string;
    short_title: string;
    datetime_utc: string;
    venue: Venue;
    url: string;
  };
}

const Event: React.FC = () => {
  const { eventId } = useParams();
  const { data: event, error } = useSeatGeek(`events/${eventId}`);

  if (error) return <Error />;

  if (!event) {
    return (
      <Flex justifyContent="center" alignItems="center" minHeight="50vh">
        <Spinner size="lg" />
      </Flex>
    );
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Events', to: '/events' },
          { label: event.short_title },
        ]}
      />
      <Flex
        bgColor="gray.200"
        p={[4, 6]}
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading>{event.short_title}</Heading>
        <FavoriteButton
          id={event.id.toString()}
          type="event"
          name={event.short_title}
        />
      </Flex>
      <EventInfo event={event} />
    </>
  );
};

const EventInfo: React.FC<EventInfoProps> = ({ event }) => {
  const { datetime_utc } = event;
  const { timezone } = event.venue;
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <Stack spacing="6" m="6">
      <SimpleGrid columns={[1, 1, 2]} borderWidth="1px" borderRadius="md" p="4">
        <Stat>
          <StatLabel display="flex">
            <Box as="span">Venue</Box>
          </StatLabel>
          <StatNumber fontSize="xl">{event.venue.name_v2}</StatNumber>
          <StatHelpText>{event.venue.display_location}</StatHelpText>
        </Stat>
        <Stat>
          <StatLabel display="flex">
            <Box as="span">Date</Box>
          </StatLabel>
          <Tooltip
            label={formatDateTimeFromUTC(datetime_utc, {
              timeZone: userTimezone,
            })}
            placement="auto-start"
          >
            <StatNumber fontSize="xl">
              {formatDateTimeFromUTC(datetime_utc, { timeZone: timezone })}
            </StatNumber>
          </Tooltip>
        </Stat>
      </SimpleGrid>
      <Flex>
        <Button as="a" href={event.url} minWidth="0">
          Buy Tickets
        </Button>
      </Flex>
    </Stack>
  );
};

export default Event;
