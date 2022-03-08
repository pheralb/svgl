import { Box, Image } from "@chakra-ui/react";
import React from "react";

const CardImage = ({title, image, children}) => {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={image} alt={title} width="60" />
      <Box p="6">
        <Box
          mt="1"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {title}
        </Box>
        {children}
      </Box>
    </Box>
  );
};

export default CardImage;
