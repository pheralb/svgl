import React from "react";
import { Center, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

const Index = () => {
  return (
    <>
      <Center h="100px" mt="8" mb="8" color="gray.500">
        <VStack>
          <Link href="https://github.com/pheralb" passHref>
            Built by Pablo Hdez
          </Link>
        </VStack>
      </Center>
    </>
  );
};

export default Index;
