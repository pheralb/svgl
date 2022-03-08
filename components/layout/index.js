import React from "react";
import { Box } from "@chakra-ui/react";

const Index = ({ children }) => {
  return (
    <Box as="main" px={{ base: 6, md: 16 }} pl={{ base: 6, md: 16 }}>
      {children}
    </Box>
  );
};

export default Index;
