import React from "react";
import { Box, Flex, Button, Container, Text, Icon } from "@chakra-ui/react";
import { IoHome, IoShapesOutline } from "react-icons/io5";
import Link from "next/link";
import Show from "animations/show";

const Error = () => {
  return (
    <>
      <Show delay="0">
        <Box px={{ base: 4, lg: 20 }} py={{ base: "3", md: "24" }}>
          <Flex align="center" justify="center" direction="column" w="full">
            <Icon name="error" boxSize="80px" mb="3" as={IoShapesOutline} />
            <Text fontSize="40px" mb="2">
              Oh no!
            </Text>
            <Text fontSize="20px" mb="3">
              This page does not exist.
            </Text>
            <Link href="/" passHref>
              <Button
                leftIcon={<IoHome />}
                colorScheme="twitter"
                variant="outline"
                fontWeight="bold"
                border="0"
                mb="4"
              >
                Go home
              </Button>
            </Link>
          </Flex>
        </Box>
      </Show>
    </>
  );
};

export default Error;
