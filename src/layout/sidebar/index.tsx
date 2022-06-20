import { SidebarContentProps } from "@/interfaces/components";
import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { IoApps } from "react-icons/io5";
import Content from "./content";

const Index = ({ children }: SidebarContentProps) => {
  const sidebar = useDisclosure();
  return (
    <Box as="section">
      <Content display={{ base: "none", md: "unset" }} />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <Content w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: "90px" }} transition=".3s ease">
        <Flex
          as="header"
          display={{ base: "inline-flex", md: "none" }}
          align="center"
          justify="space-between"
          w="full"
          px="4"
          borderBottomWidth="1px"
          borderColor="blackAlpha.300"
          h="14"
        >
          <IconButton
            aria-label="Menu"
            onClick={sidebar.onOpen}
            icon={<IoApps />}
            size="sm"
          />
        </Flex>

        <Box as="main" p="4">
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Index;
