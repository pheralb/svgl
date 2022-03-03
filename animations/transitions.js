import React from "react";
import { motion } from "framer-motion";

const Transitions = ({ key, children }) => {
  return (
    <motion.div
      key={key}
      initial="initial"
      animate="animate"
      variants={{
        initial: {
          opacity: 0,
        },
        animate: {
          opacity: 1,
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export default Transitions;
