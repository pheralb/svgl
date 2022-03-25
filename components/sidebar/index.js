import React from "react";
import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Flex,
  IconButton,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { IoApps } from "react-icons/io5";

import Logo from "components/sidebar/logo";
import Item from "components/sidebar/item";
import SidebarLinks from "components/sidebar/links";
import Dark from "components/sidebar/dark";
import By from "components/sidebar/by";
import ModalSearch from "components/search/modal";

export default function Index({ children }) {
  const sidebar = useDisclosure();
  const border = useColorModeValue("dark.200", "dark.800");
  const bg = useColorModeValue("gray.100", "lightDark.900");

  const SidebarContent = (props) => (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      borderColor={border}
      borderRightWidth="1px"
      shadow="sm"
      w="56"
      {...props}
    >
      <Box px="5" pt="8" pb="5" align="center">
        <Logo />
      </Box>
      <Flex direction="column" as="nav" aria-label="Main Navigation">
        {SidebarLinks.map((link) => (
          <NextLink key={link.id} href={link.href} passHref>
            <Item icon={link.icon} external={link.external}>
              {link.title}
            </Item>
          </NextLink>
        ))}
        <ModalSearch />
        <Dark />
      </Flex>
      <Box mt="8" align="center">
        <By />
      </Box>
    </Box>
  );

  return (
    <Box as="section" minH="100vh">
      <SidebarContent display={{ base: "none", md: "unset" }} />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent bg={bg}>
          <DrawerCloseButton borderWidth="1px" />
          <DrawerBody>
            <SidebarContent pt="6" borderRight="none" />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 56 }} transition=".3s ease">
        <Box
          as="header"
          align="center"
          justify="space-between"
          w="full"
          p="5"
          display={{ base: "inline-flex", md: "none" }}
        >
          <IconButton
            aria-label="Menu"
            onClick={sidebar.onOpen}
            icon={<IoApps />}
            size="md"
            w="100%"
            variant="ghost"
            borderWidth="1px"
          />
        </Box>
        <Box as="main" pt={{ base: "0", md: "6" }} pb={{ base: "0", md: "6" }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
