import CustomLink from "@/common/link";
import {
  Button,
  CloseButton,
  IconButton,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { List } from "phosphor-react";
import { Links } from "./links";

const Mobile = () => {
  const bg = useColorModeValue("bg.light", "bg.dark");
  const mobileNav = useDisclosure();
  return (
    <>
      <IconButton
        display={{ base: "flex", md: "none" }}
        aria-label="Open menu navbar"
        variant="ghost"
        icon={<List size={22} />}
        onClick={mobileNav.onOpen}
      />

      <VStack
        pos="absolute"
        top={0}
        left={0}
        right={0}
        display={mobileNav.isOpen ? "flex" : "none"}
        flexDirection="column"
        p={4}
        pb={4}
        bg={bg}
        spacing={3}
        rounded="sm"
        shadow="sm"
        borderWidth="1px"
        zIndex={2}
      >
        <CloseButton aria-label="Close menu" onClick={mobileNav.onClose} />
        {Links.map((link) => (
          <CustomLink
            key={link.title}
            href={link.slug}
            external={link.external}
          >
            <Button variant="ghost">{link.title}</Button>
          </CustomLink>
        ))}
      </VStack>
    </>
  );
};

export default Mobile;
