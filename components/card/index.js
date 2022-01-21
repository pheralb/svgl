import React from "react";
import Link from "next/link";
import { Box, Text, Icon, Image, Center } from "@chakra-ui/react";
import Hover from "animations/hover";

const Index = ({ title, url, href }) => {
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
          <Center>
            <Image src={href} alt={title} boxSize="60px" />
          </Center>
          <Text mt="2" fontWeight="light" textAlign={"center"}>
            {title}
          </Text>
        </Box>
      </Link>
    </Hover>
  );
};

export default Index;
