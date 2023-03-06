import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";

const HomePage = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  if (isLoading)
    return (
      <Flex alignItems="center" justifyContent="center" h="100vh" w="100%">
        <Spinner size="xl" color="blue.600" />
      </Flex>
    );

  // if (!user) router.push("/api/auth/login");
  if (!user)
    return (
      <Box>
        <Text fontSize="xl" fontWeight="semibold">
          Please log in to access the content!
        </Text>
      </Box>
    );

  return (
    <Box>
      <Text fontSize="xl" fontWeight="semibold">
        Welcome {user.nickname}!
      </Text>
    </Box>
  );
};

export default HomePage;
