import React from "react";
import {
  Icon,
  Link,
  Center,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { IoRocketOutline } from "react-icons/io5";

const Index = () => {
  const color = useColorModeValue("gray.400", "gray.600");
  return (
    <>
      <HStack color={color} ml="6" spacing="3">
        <Icon boxSize="6" as={IoRocketOutline} />
        <Link href="https://github.com/pheralb" isExternal="true">
          Built by Pablo
        </Link>
      </HStack>
    </>
  );
};

export default Index;
