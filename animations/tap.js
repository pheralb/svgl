import React from "react";
import { motion } from "framer-motion";

const Tap = ({ children }) => {
  return (
    <motion.div whileHover={{ scale: 1.040 }} whileTap={{ scale: 0.98 }}>
      {children}
    </motion.div>
  );
};

export default Tap;
