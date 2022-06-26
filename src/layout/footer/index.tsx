import CustomLink from "@/common/link";
import { Flex, Heading, HStack, Icon, Text } from "@chakra-ui/react";
import { RocketLaunch, TwitterLogo } from "phosphor-react";
import React from "react";

type Props = {};

const Index = (props: Props) => {
  return (
    <Flex direction="column" pt="8" pb="8" justifyContent="center" alignItems="center">
      <HStack>
        <Icon as={RocketLaunch} />
        <CustomLink href="https://twitter.com/pheralb_" external={true}>
          Created by Pablo
        </CustomLink>
      </HStack>
    </Flex>
  );
};

export default Index;
