import React from "react";
import Link from "next/link";
import { Box, Text, Icon, Image, Center } from "@chakra-ui/react";
import Tap from "animations/tap";

const Index = ({ title, url, href }) => {
  return (
    <Tap>
      <Link href={url} passHref>
        <Box
          _hover={{
            shadow: "md",
            transform: "translateY(-4px)",
            transition: "all .3s",
          }}
          p={4}
          cursor="pointer"
          borderRadius="10px"
          mb="3"
        >
          <Center>
            <Image src={href} alt={title} boxSize="60px" />
          </Center>
          <Text mt="2" fontWeight="light" textAlign={"center"}>
            {title}
          </Text>
        </Box>
      </Link>
    </Tap>
  );
};

export default Index;
