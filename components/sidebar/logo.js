import React from "react";
import Link from "next/link";
import { HStack, Icon, Text } from "@chakra-ui/react";
import { svgl } from "components/svg";
import Tap from "animations/tap";

const Logo = () => {
  return (
    <Tap>
      <Link href="/" passHref>
        <HStack cursor="pointer">
          <Icon
            as={svgl}
            name="logo"
            boxSize="30px"
            mr="2"
            ml="1"
            borderRadius="full"
            bg="transparent"
          />
          <Text fontSize="2xl" ml="2">
            svgl
          </Text>
        </HStack>
      </Link>
    </Tap>
  );
};

export default Logo;
