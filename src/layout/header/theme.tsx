import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";
import CustomIconBtn from "@/common/iconBtn";
import { Moon, Sun } from "phosphor-react";

const Theme = () => {
  const { toggleColorMode } = useColorMode();
  const key = useColorModeValue("light", "dark");
  const icon = useColorModeValue(<Moon size={22} />, <Sun size={22} />);

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <motion.div
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
