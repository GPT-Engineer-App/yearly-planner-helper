import { Container, Text, VStack, Box, Button, useDisclosure } from "@chakra-ui/react";
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
  if (error) return <Text>Error loading events</Text>;

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Category Manager</Text>
        <Box>
          {/* Placeholder for the calendar grid */}
          <Button onClick={() => handleDayClick(new Date())}>Click a Day</Button>
        </Box>
        <Box>
          {events.map(event => (
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