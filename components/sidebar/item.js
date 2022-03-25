import React from "react";
import { useRouter } from 'next/router';
import { Flex, Icon, useColorModeValue } from "@chakra-ui/react";
import { FiExternalLink } from "react-icons/fi";
import Tap from "animations/tap";

const Item = (props) => {

  const { icon, external, children, href, ...rest } = props;
  const { pathname } = useRouter();
  const isActive = pathname === href;
  const borderColor = useColorModeValue("dark.800", "white");

  return (
    <Tap>
      <Flex
        align="center"
        px="5"
        pl="4"
        py="4"
        cursor="pointer"
        transition=".15s ease"
        borderColor={borderColor}
        borderLeftWidth={isActive ? "2px" : ''}
        {...rest}
      >
        {icon && <Icon ml="2" mr="4" boxSize="6" as={icon} />}
        {children}
        {external && <Icon ml="3" mr="4" boxSize="4" as={FiExternalLink} />}
      </Flex>
    </Tap>
  );
};

export default Item;
