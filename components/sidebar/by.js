import React from "react";
import { Center, useColorModeValue, VStack } from "@chakra-ui/react";
import Link from "next/link";

const Index = () => {
  const color = useColorModeValue("gray.400", "gray.600");
  return (
    <>
      <Center color={color}>
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
