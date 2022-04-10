import React from "react";
import { Box, Flex, Button, Text, Icon } from "@chakra-ui/react";
import { IoHome, IoWarning } from "react-icons/io5";
import Link from "next/link";
import Show from "animations/show";

const Offline = () => {
  return (
    <>
      <Show delay="0">
        <Box px={{ base: 4, lg: 20 }} py={{ base: "3", md: "24" }}>
          <Flex align="center" justify="center" direction="column" w="full">
            <Icon name="error" boxSize="80px" mb="3" as={IoWarning} />
            <Text fontSize="40px" mb="2">
              Oh no!
            </Text>
            <Text fontSize="20px" mb="3">
              No internet connection
            </Text>
            <Link href="/" passHref>
              <Button
                leftIcon={<IoHome />}
                borderWidth="1px"
                variant="outline"
                fontWeight="light"
                mb="4"
              >
                Refresh
              </Button>
            </Link>
          </Flex>
        </Box>
      </Show>
    </>
  );
};

export default Offline;
