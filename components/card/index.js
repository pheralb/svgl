import React from "react";
import Link from "next/link";
import { Box, Text, Icon } from "@chakra-ui/react";
import Hover from "animations/hover";

const Index = ({ title, url, icon }) => {
  return (
    <Hover>
      <Link href={url} passHref>
        <Box
          shadow="sm"
          _hover={{ shadow: "md", border: "1px", borderColor: "#4bbfb7" }}
          borderWidth="1px"
          p={4}
          cursor="pointer"
        >
          <Icon as={icon} alt={title} boxSize="60px" />
          <Text mt="2" fontWeight="semibold">
            {title}
          </Text>
        </Box>
      </Link>
    </Hover>
  );
};

export default Index;
