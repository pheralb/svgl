import React from "react";
import {
  Box,
  Flex,
  useColorModeValue,
  HStack,
  Button,
  Container,
  Heading,
  Center,
  Icon,
  Input,
} from "@chakra-ui/react";
import { ArrowSquareOut, Sticker } from "phosphor-react";
import Theme from "./theme";
import Tap from "@/animations/tap";
import Mobile from "./mobile";
import { Links } from "./links";
import CustomLink from "@/common/link";
import Categories from "./categories";

const Header = () => {
  const bg = useColorModeValue("bg.light", "bg.dark");
  return (
    <>
      <Box
        position="sticky"
        top="0"
        bg={bg}
        borderBottomWidth="1px"
        w="full"
        py={6}
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
                <Theme />
              </HStack>
              <Box display={{ base: "inline-flex", md: "none" }}>
                <Mobile />
              </Box>
            </HStack>
          </Flex>
        </Container>
      </Box>
      <HStack
        justifyContent="center"
        p="4"
        spacing={4}
        overflowY="hidden"
        bg={bg}
        borderBottomWidth="1px"
      >
        <Categories />
      </HStack>
    </>
  );
};

export default Header;
