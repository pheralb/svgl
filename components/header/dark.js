import React from "react";
import { useColorMode, useColorModeValue, IconButton } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMoon, IoSunnyOutline } from "react-icons/io5";

const Index = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const iconChange = useColorModeValue(<IoSunnyOutline size="25" />, <IoMoon size="25" />);
  const keyChange = useColorModeValue("light", "dark");

  function toggleTheme() {
    toggleColorMode();
  }

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <motion.div
        key={keyChange}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <IconButton
          aria-label="Toggle theme"
          bg="transparent"
          border="0"
          variant="outline"
          icon={iconChange}
          onClick={toggleTheme}
        ></IconButton>
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
