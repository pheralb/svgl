import React from "react";
import {
  Menu,
  Button,
  MenuButton,
  MenuList,
  useDisclosure,
  MenuItem,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import useSWR from "swr";
import { IoCaretDownOutline } from "react-icons/io5";
import { githubVersionPackage } from "@/services";
import CustomLink from "@/common/link";

const VersionItem = () => {
  const { data, error } = useSWR(githubVersionPackage);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue("bg.light", "bg.dark");

  if (error) return <Text>Error loading version</Text>;
  if (!data) return <Text>loading...</Text>;

  return (
    <Menu isOpen={isOpen}>
      <MenuButton
        as={Button}
        variant="ghost"
        borderWidth="1px"
        borderRadius={5}
        aria-label="Version dropdown"
        rightIcon={<IoCaretDownOutline size={14} />}
        _focus={{
          borderColor: "transparent",
        }}
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
      >
        {data?.tag_name}
      </MenuButton>
      <MenuList onMouseEnter={onOpen} onMouseLeave={onClose} bg={bg}>
        <CustomLink href={data?.html_url} external={true}>
          <MenuItem>Releases</MenuItem>
        </CustomLink>
      </MenuList>
    </Menu>
  );
};

export default VersionItem;
