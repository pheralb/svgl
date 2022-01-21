import React from "react";
import {
  Box,
  Flex,
  SimpleGrid,
  Button,
  Container,
  Center,
  Text,
  Icon,
} from "@chakra-ui/react";
import {
  IoAlertOutline,
  IoArrowBackOutline,
  IoHome,
  IoShapesOutline,
} from "react-icons/io5";
import Link from "next/link";
import Show from "animations/show";

const Error = () => {
  return (
    <>
      <Show delay="0">
        <Container
          maxW={{ base: "100%", md: "75%" }}
          borderWidth="1px"
          borderRadius="30px"
        >
          <Box px={{ base: 4, lg: 20 }} py={{ base: "3", md: "24" }}>
            <Flex align="center" justify="center" direction="column" w="full">
              <Icon name="error" boxSize="80px" mb="3" as={IoShapesOutline} />
              <Text fontSize="40px" mb="2">
                Oh no!
              </Text>
              <Text fontSize="20px" mb="3">
                This page does not exist.
              </Text>
            </Flex>
          </Box>
          <Link href="/" passHref>
            <Button
              leftIcon={<IoHome />}
              colorScheme="twitter"
              variant="outline"
              fontWeight="bold"
              w="100%"
              border="0"
              mb="4"
            >
              Go home
            </Button>
          </Link>
        </Container>
      </Show>
    </>
  );
};

export default Error;
