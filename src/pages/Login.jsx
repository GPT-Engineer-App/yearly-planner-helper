import { Container, Box, Heading } from "@chakra-ui/react";
import { SupabaseAuthUI } from "../integrations/supabase/auth.jsx";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, [session, navigate]);

  return (
    <Container centerContent>
      <Box p={4} borderWidth={1} borderRadius="lg" boxShadow="lg">
        <Heading mb={4}>Login</Heading>
        <SupabaseAuthUI />
      </Box>
    </Container>
  );
};

export default Login;