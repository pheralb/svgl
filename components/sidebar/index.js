import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { IoAlbums, IoAlbumsOutline } from "react-icons/io5";
import Categories from "components/items/categories";
import SideItem from "./sideItem";

export default function Index({ children }) {
  const sidebar = useDisclosure();

  const SidebarContent = (props) => (
    <Box
      as="nav"
      pos="fixed"
      zIndex="sticky"
      h={{ base: "full", md: "90%" }}
      pb="10"
      px={{ base: 2, md: 6 }}
      overflowX="hidden"
      overflowY="auto"
      bg="brand.600"
      w="30"
      {...props}
    >
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        aria-label="Main Navigation"
        pt="2"
      >
        <SideItem
          fontWeight="semibold"
          fontSize="18px"
          borderBottomWidth="1px"
          borderRadius="0px"
          mb="3"
        >
          <Icon as={IoAlbumsOutline} mr="2" />
          Categories
        </SideItem>
        <Categories />
      </Flex>
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
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: "60" }} transition=".3s ease">
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="4"
          h="14"
          display={{ base: "inline-flex", md: "none" }}
        >
          <Button
            onClick={sidebar.onOpen}
            leftIcon={<IoAlbumsOutline />}
            size="md"
            borderWidth="1px"
            bg="transparent"
            w="100%"
          >
            Categories
          </Button>
        </Flex>
        <Box as="main" p="4">
          {children}
        </Box>
      </Box>
    </Box>
  );
}
