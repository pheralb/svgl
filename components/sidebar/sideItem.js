import React from "react";
import { Flex } from "@chakra-ui/react";

const SideItem = (props) => {
  const { icon, children, ...rest } = props;
  return (
    <Flex
      align="center"
      px="4"
      mx="2"
      rounded="md"
      py="3"
      role="group"
      transition=".15s ease"
      {...rest}
    >
      {children}
    </Flex>
  );
};

export default SideItem;
