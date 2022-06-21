import React, { FC } from "react";
import { motion } from "framer-motion";

type ShowProps = {
  children: React.ReactNode;
  delay?: number;
};

const Show = ({ children, delay }: ShowProps) => {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.4,
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
};

export default Show;
