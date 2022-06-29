import React from "react";
import {
  Box,
  Flex,
  useColorModeValue,
  HStack,
  Button,
  Container,
  Heading,
  Icon,
  useDisclosure,
  Collapse,
} from "@chakra-ui/react";
import { ArrowSquareOut, MagnifyingGlass, Sticker, X } from "phosphor-react";
import Theme from "./theme";
import Tap from "@/animations/tap";
import Mobile from "./mobile";
import { Links } from "./links";
import CustomLink from "@/common/link";
import Categories from "./categories";
import Search from "@/components/search";
import CustomIconBtn from "@/common/iconBtn";
import { useHotkeys } from "react-hotkeys-hook";

const Header = () => {
  const bg = useColorModeValue("bg.light", "bg.dark");
  const { isOpen, onToggle } = useDisclosure();
  useHotkeys("ctrl+k", (e) => {
    e.preventDefault();
    onToggle();
  });
  return (
    <>
      <Box
        as="header"
        position="sticky"
        top="0"
        bg={bg}
        borderBottomWidth="1px"
        w="full"
        py={6}
        zIndex={1}
        shadow="sm"
      >
        <Container maxW={{ base: "full", md: "70%" }}>
          <Flex alignItems="center" justifyContent="space-between" mx="auto">
            <CustomLink href="/">
              <Tap>
                <HStack spacing={3} cursor="pointer">
                  <Sticker size={32} color="#4343e5" weight="bold" />
                  <Heading fontSize="19px">svgl</Heading>
                </HStack>
              </Tap>
            </CustomLink>
            <HStack display="flex" alignItems="center" spacing={1}>
              <HStack
                spacing={1}
                mr={1}
                display={{ base: "none", md: "inline-flex" }}
              >
                {Links.map((link) => (
                  <CustomLink
                    key={link.title}
                    href={link.slug}
                    external={link.external}
                  >
                    <Button variant="ghost" fontFamily="Inter-Semibold">
                      {link.title}
                      {link.external ? (
                        <Icon as={ArrowSquareOut} ml="2" />
                      ) : null}
                    </Button>
                  </CustomLink>
                ))}
                <CustomIconBtn
                  title="Toggle Search bar"
                  icon={
                    isOpen ? <X size={22} /> : <MagnifyingGlass size={22} />
                  }
                  onClick={onToggle}
                />
                <Theme />
              </HStack>
              <Box display={{ base: "inline-flex", md: "none" }}>
                <Mobile />
              </Box>
            </HStack>
          </Flex>
          <Collapse in={isOpen} animateOpacity>
            <Box mt="3">
              <Search />
            </Box>
          </Collapse>
          <Box mt="2" display={{ base: "block", md: "none" }}>
            <Search />
          </Box>
        </Container>
      </Box>
      <Box p="4" overflowX="hidden" overflowY="auto">
        <HStack
          justifyContent={{ base: "none", md: "center" }}
          spacing={4}
          overflowX="auto"
          overflowY="hidden"
          bg={bg}
          pb="4"
          borderBottomWidth="1px"
        >
          <Categories />
        </HStack>
      </Box>
    </>
  );
};

export default Header;
