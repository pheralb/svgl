import React from "react";
import { motion } from "framer-motion";

type TapAnimation = {
  children: React.ReactNode;
};

const Tap = ({ children } : TapAnimation) => {
  return (
    <motion.div whileTap={{ scale: 0.97 }}>
      {children}
    </motion.div>
  );
};

export default Tap;
