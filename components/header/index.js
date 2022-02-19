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
import {
  IoApps,
  IoBookOutline,
  IoCloseSharp,
  IoLogoGithub,
  IoLogoTwitter,
} from "react-icons/io5";
import Link from "next/link";
import Hover from "animations/hover";
import Show from "animations/show";
import { BiLinkExternal } from "react-icons/bi";

const Header = () => {
  const mobileNav = useDisclosure();
  const bg = useColorModeValue("#fffffe", "#16161a");
  const border = useColorModeValue("0", "1px");
  const borderRadius = useColorModeValue("10px", "0");

  return (
    <>
      <Box
        w="full"
        bg={bg}
        mt="5"
        mb="5"
        px={{ base: 3, md: 5 }}
        py="3"
        pb="3"
        borderRadius={borderRadius}
        borderBottomWidth={border}
        shadow="sm"
        pos="sticky"
        top="2"
        zIndex="1000"
      >
        <Show>
          <Flex alignItems="center" justifyContent="space-between" mx="auto">
            <Hover>
              <Link href="/" passHref>
                <Flex cursor="pointer">
                  <chakra.a title="SVGParty" display="flex" alignItems="center">
                    <Image
                      src="/images/logo.png"
                      boxSize="25px"
                      alt="SVGParty logo"
                    />
                    <VisuallyHidden>SVGParty</VisuallyHidden>
                  </chakra.a>
                  <chakra.h1
                    fontSize="1xl"
                    fontWeight="bold"
                    ml="3"
                  >
                    SVGParty
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
                  href="https://github.com/pheralb/SVGParty/tree/main/public/library"
                  passHref
                >
                  <Button
                    variant="ghost"
                    rightIcon={<BiLinkExternal />}
                    fontWeight="light"
                  >
                    Library
                  </Button>
                </Link>
                <Link href="https://twitter.com/SVGPartyhq" passHref>
                  <IconButton
                    aria-label="Twitter profile"
                    bg="transparent"
                    border="0"
                    variant="outline"
                    icon={<IoLogoTwitter size="25" />}
                  />
                </Link>
                <Link href="https://github.com/pheralb/SVGParty" passHref>
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
                  borderWidth="2px"
                  bg={bg}
                  top={0}
                  left={0}
                  right={0}
                  display={mobileNav.isOpen ? "flex" : "none"}
                  flexDirection="column"
                  pt="4"
                  pb={4}
                  spacing={3}
                  rounded="sm"
                  shadow="sm"
                >
                  <Button
                    bg="transparent"
                    border="0"
                    variant="outline"
                    leftIcon={<IoCloseSharp size="25" />}
                    fontWeight="light"
                    onClick={mobileNav.onClose}
                  >
                    Close
                  </Button>
                  <Link
                    href="https://github.com/pheralb/SVGParty/tree/main/public/library"
                    passHref
                  >
                    <Button
                      bg="transparent"
                      border="0"
                      variant="outline"
                      leftIcon={<IoBookOutline size="25" />}
                      fontWeight="light"
                    >
                      Library
                    </Button>
                  </Link>
                  <Link href="https://github.com/pheralb/SVGParty" passHref>
                    <Button
                      bg="transparent"
                      border="0"
                      variant="outline"
                      leftIcon={<IoLogoGithub size="25" />}
                      fontWeight="light"
                    >
                      Github
                    </Button>
                  </Link>
                  <Dark />
                </VStack>
              </Box>
            </HStack>
          </Flex>
        </Show>
      </Box>
    </>
  );
};

export default Header;
