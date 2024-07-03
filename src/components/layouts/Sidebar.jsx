import { Box, Flex, IconButton, VStack, Text } from "@chakra-ui/react";
import { FaCalendarAlt, FaLayerGroup } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Flex direction="column" h="100vh" w="250px" bg="gray.800" color="white" p={4}>
      <Box mb={8}>
        <Text fontSize="2xl" fontWeight="bold">Planner App</Text>
      </Box>
      <VStack spacing={4} align="stretch">
        <Link to="/">
          <Flex align="center">
            <IconButton aria-label="Calendar" icon={<FaCalendarAlt />} variant="ghost" colorScheme="whiteAlpha" />
            <Text ml={4}>Yearly Planner</Text>
          </Flex>
        </Link>
        <Link to="/categories">
          <Flex align="center">
            <IconButton aria-label="Categories" icon={<FaLayerGroup />} variant="ghost" colorScheme="whiteAlpha" />
            <Text ml={4}>Categories</Text>
          </Flex>
        </Link>
      </VStack>
    </Flex>
  );
};

const SidebarLayout = ({ children }) => {
  return (
    <Flex>
      <Sidebar />
      <Box flex="1" p={4} className="main-content">
        {children}
      </Box>
    </Flex>
  );
};

export default SidebarLayout;