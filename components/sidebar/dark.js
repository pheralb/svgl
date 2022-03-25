import React from "react";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import Item from "./item";

const Index = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const iconChange = useColorModeValue(IoSunnyOutline, IoMoonOutline);
  const theme = useColorModeValue("Light", "Dark");

  function toggleTheme() {
    toggleColorMode();
  }

  return (
    <Item icon={iconChange} onClick={toggleTheme}>
      {theme}
    </Item>
  );
};

export default Index;
