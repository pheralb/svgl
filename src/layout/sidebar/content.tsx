import React from "react";
import { SidebarContentProps } from "@/interfaces/components";
import {
  Box,
  Divider,
  Flex,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { HandGrabbing } from "phosphor-react";
import CustomLink from "@/common/link";
import Categories from "./categories";

const Content = (props: SidebarContentProps) => {
  const bg = useColorModeValue("bg.light", "bg.dark");
  return (
    <Box
      as="nav"
      pos="fixed"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      w="240px"
      bg={bg}
      {...props}
    >
      <Flex
        as="nav"
        mt="5"
        ml="7"
        mr="6"
        direction="column"
        aria-label="Main Sidenav"
      >
        <CustomLink href="/">
          <HandGrabbing size={50} />
        </CustomLink>
        <Box mt="6" ml="1">
          <Divider mb="4" />
          <Heading fontSize="16px" mt="3" mb="3">
            Categories
          </Heading>
          <Categories />
        </Box>
      </Flex>
    </Box>
  );
};

export default Content;
