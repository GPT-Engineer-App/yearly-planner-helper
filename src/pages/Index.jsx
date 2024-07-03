import { Container, Text, VStack, Box, Button, useDisclosure, SimpleGrid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import EventModal from "../components/EventModal";
import { useEvents } from "../integrations/supabase/index.js";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";

const Index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDate, setSelectedDate] = useState(null);

  const { data: events, error, isLoading } = useEvents();
  const { session, logout } = useSupabaseAuth();

  const handleDayClick = (date) => {
    setSelectedDate(date);
    onOpen();
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading events: {error.message}</Text>;

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Yearly Planner</Text>
        <Box>
          <SimpleGrid columns={4} spacing={4}>
            {Array.from({ length: 12 }).map((_, index) => (
              <GridItem key={index} w="100%" h="150px" bg="gray.200" onClick={() => handleDayClick(new Date(2023, index, 1))}>
                <Text>{new Date(2023, index).toLocaleString('default', { month: 'long' })}</Text>
              </GridItem>
            ))}
          </SimpleGrid>
        </Box>
        <Box>
          {events && events.map(event => (
            <Text key={event.id}>{event.name} - {event.date}</Text>
          ))}
        </Box>
        {session ? (
          <Button onClick={logout}>Logout</Button>
        ) : (
          <Button as="a" href="/login">Login</Button>
        )}
      </VStack>
      <EventModal isOpen={isOpen} onClose={onClose} date={selectedDate} />
    </Container>
  );
};

export default Index;