import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";
import CustomIconBtn from "@/common/iconBtn";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

const Theme = () => {
  const { toggleColorMode } = useColorMode();
  const key = useColorModeValue("light", "dark");
  const icon = useColorModeValue(
    <IoMoonOutline size={20} />,
    <IoSunnyOutline size={20} />
  );
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <motion.div
        style={{ display: "inline-block" }}
        key={key}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <CustomIconBtn
          title="Toggle theme"
          icon={icon}
          onClick={toggleColorMode}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default Theme;
