import React from "react";
import {
  Box,
  Flex,
  useColorModeValue,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  Heading,
  Container,
} from "@chakra-ui/react";
import { IoMenu } from "react-icons/io5";
import Items from "@/layout/header/items";
import VersionItem from "@/layout/header/version";

const Header = () => {
  const bg = useColorModeValue("bg.light", "bg.dark");
  const mobileNav = useDisclosure();
  return (
    <Box as="header" position="sticky" top="0" bg={bg} w="full" py={6} mb={10}>
      <Container maxW="85%">
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <HStack>
            <Heading fontSize="18px">svgl</Heading>
          </HStack>
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={2}
              mr={1}
              display={{ base: "none", md: "inline-flex" }}
            >
              <Items />
            </HStack>
            <Box display={{ base: "inline-flex", md: "none" }}>
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu header"
                variant="ghost"
                icon={<IoMenu size={32} />}
                onClick={mobileNav.onOpen}
              />

              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                />

                <Button w="full" variant="ghost">
                  Features
                </Button>
                <Button w="full" variant="ghost">
                  Pricing
                </Button>
                <Button w="full" variant="ghost">
                  Blog
                </Button>
                <Button w="full" variant="ghost">
                  Company
                </Button>
                <Button w="full" variant="ghost">
                  Sign in
                </Button>
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
