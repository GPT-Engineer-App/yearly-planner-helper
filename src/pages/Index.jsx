import { Container, Text, VStack, Box, Button, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import EventModal from "../components/EventModal";

const Index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDayClick = (date) => {
    setSelectedDate(date);
    onOpen();
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Yearly Planner</Text>
        <Box>
          {/* Placeholder for the calendar grid */}
          <Button onClick={() => handleDayClick(new Date())}>Click a Day</Button>
        </Box>
      </VStack>
      <EventModal isOpen={isOpen} onClose={onClose} date={selectedDate} />
    </Container>
  );
};

export default Index;