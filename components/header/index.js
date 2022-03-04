import React from "react";
import {
  Box,
  Flex,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import Dark from "components/header/dark";
import {
  IoApps,
  IoBookOutline,
  IoCloseSharp,
  IoLogoGithub,
  IoLogoTwitter,
} from "react-icons/io5";
import { BiLinkExternal } from "react-icons/bi";
import Link from "next/link";
import Hover from "animations/tap";
import Show from "animations/show";
import { svgl } from "components/svg";
import HEADER_LINKS from "./links";

const Header = () => {
  const mobileNav = useDisclosure();
  const bg = useColorModeValue("light.100", "lightDark.900");
  return (
    <>
      <Box
        w="full"
        bg={bg}
        px={{ base: 3, md: 16 }}
        pl={{ base: 3, md: 16 }}
        py="5"
        pos="sticky"
        top="0"
        zIndex="1000"
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <HStack spacing="1" alignItems="center">
            <Hover>
              <Link href="/" passHref>
                <IconButton
                  as={svgl}
                  cursor="pointer"
                  name="logo"
                  boxSize="40px"
                  mr="2"
                  borderRadius="full"
                  bg="transparent"
                />
              </Link>
            </Hover>
            {HEADER_LINKS.map((link) => (
              <Link key={link.id} href={link.href} passHref>
                <Button
                  as="a"
                  variant="ghost"
                  variantColor="teal"
                  fontWeight="light"
                  borderRadius="0"
                  _hover={{
                    transform: "translateY(-1px)",
                    transition: "all .1s",
                    borderBottomWidth: "1px",
                  }}
                >
                  {link.title}
                  {link.external && (
                    <Icon as={BiLinkExternal} ml="2" w="4" h="4" />
                  )}
                </Button>
              </Link>
            ))}
          </HStack>
          <HStack display="flex" alignItems="center">
            <HStack spacing={3} display={{ base: "none", md: "inline-flex" }}>
              <Link href="https://github.com/pheralb/svgl" passHref>
                <IconButton
                  aria-label="Github Repository"
                  bg="transparent"
                  border="0"
                  variant="outline"
                  icon={<IoLogoGithub size="30" />}
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
                  href="https://github.com/pheralb/svgl/tree/main/public/library"
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
                <Link href="https://github.com/pheralb/svgl" passHref>
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
      </Box>
    </>
  );
};

export default Header;
