import React from "react";
import {
  chakra,
  Box,
  Flex,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  Container,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import Dark from "components/header/dark";
import { IoApps, IoLogoGithub, IoLogoTwitter } from "react-icons/io5";
import Link from "next/link";
import Hover from "animations/hover";

const Header = () => {
  const mobileNav = useDisclosure();
  const bg = useColorModeValue("#fffffe", "#16161a");
  return (
    <>
      <chakra.header
        w="full"
        px={{ base: 2, md: 6 }}
        bg={bg}
        py={6}
        pb="0"
        pos="sticky"
        top="0"
        zIndex="1000"
      >
        <Container maxW="container.xxl" pb="4">
          <Flex alignItems="center" justifyContent="space-between" mx="auto">
            <Hover>
              <Link href="/" passHref>
                <Flex cursor="pointer">
                  <chakra.a title="iconr" display="flex" alignItems="center">
                    <Image
                      src="/images/logo.png"
                      boxSize="25px"
                      alt="iconr logo"
                    />
                    <VisuallyHidden>iconr</VisuallyHidden>
                  </chakra.a>
                  <chakra.h1
                    fontSize="3xl"
                    fontWeight="bold"
                    fontFamily="Eina-Bold"
                    ml="3"
                  >
                    iconr
                  </chakra.h1>
                </Flex>
              </Link>
            </Hover>
            <HStack display="flex" alignItems="center">
              <HStack
                spacing={2}
                color="brand.500"
                display={{ base: "none", md: "inline-flex" }}
              >
                <Link
                  href="https://github.com/pheralb/iconr/tree/main/public/library"
                  passHref
                >
                  <Button variant="ghost">Library</Button>
                </Link>
                <Link href="https://twitter.com/iconrhq" passHref>
                  <IconButton
                    aria-label="Twitter profile"
                    bg="transparent"
                    border="0"
                    variant="outline"
                    icon={<IoLogoTwitter size="25" />}
                  />
                </Link>
                <Link href="https://github.com/pheralb/iconr" passHref>
                  <IconButton
                    aria-label="Github Repository"
                    bg="transparent"
                    border="0"
                    variant="outline"
                    icon={<IoLogoGithub size="25" />}
                  />
                </Link>
                <Dark />
              </HStack>
              <Box display={{ base: "inline-flex", md: "none" }}>
                <IconButton
                  display={{ base: "flex", md: "none" }}
                  aria-label="Open menu"
                  fontSize="20px"
                  variant="ghost"
                  icon={<IoApps />}
                  onClick={mobileNav.onOpen}
                />
                <VStack
                  pos="absolute"
                  borderBottomWidth="1px"
                  bg={bg}
                  top={0}
                  left={0}
                  right={0}
                  display={mobileNav.isOpen ? "flex" : "none"}
                  flexDirection="column"
                  pb={4}
                  m={2}
                  spacing={3}
                  rounded="sm"
                  shadow="sm"
                >
                  <CloseButton
                    aria-label="Close menu"
                    onClick={mobileNav.onClose}
                  />
                  <Link
                    href="https://github.com/pheralb/iconr/tree/main/public/library"
                    passHref
                  >
                    <Button variant="ghost">Library</Button>
                  </Link>
                  <Link href="https://github.com/pheralb/iconr" passHref>
                    <IconButton
                      aria-label="Github Repository"
                      bg="transparent"
                      border="0"
                      variant="outline"
                      icon={<IoLogoGithub size="25" />}
                    />
                  </Link>
                  <Dark />
                </VStack>
              </Box>
            </HStack>
          </Flex>
        </Container>
      </chakra.header>
    </>
  );
};

export default Header;
