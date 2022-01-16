import React from "react";
import { Center } from "@chakra-ui/react";
import Link from "next/link";

const Index = () => {
  return (
    <>
      <Center h="100px" color="gray.500">
        <Link href="https://github.com/pheralb" passHref>
          Built by Pablo Hdez
        </Link>
      </Center>
    </>
  );
};

export default Index;
