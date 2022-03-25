import React from "react";
import Link from "next/link";
import {
  Box,
  Text,
  Image,
  Center,
  HStack,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { FiExternalLink } from "react-icons/fi";
import download from "downloadjs";
import toast from "react-hot-toast";
import Tap from "animations/tap";

const Index = ({ title, url, href }) => {
  const bgColor = useColorModeValue("#F2F2F2", "#1D1D1D");
  const color = useColorModeValue("black", "white");

  const downloadSvg = (url) => {
    toast(`Downloading ${title}...`, {
      icon: "🥳",
      style: {
        borderRadius: "10px",
        background: bgColor,
        color: color,
      },
    });
    download(url);
  };

  return (
    <Box
      p={4}
      borderRadius="10px"
      borderWidth="1px"
      mb="2"
      _hover={{
        shadow: "md",
      }}
    >
      <Center>
        <Image src={href} alt={title} boxSize="40px" />
      </Center>
      <Text mt="2" fontWeight="light" textAlign="center">
        {title}
      </Text>
      <Center>
        <HStack spacing="1" mt="1">
          <Tap>
            <IconButton
              as="button"
              variant="ghost"
              aria-label="Download SVG"
              icon={<IoCloudDownloadOutline size="16" />}
              onClick={() => downloadSvg(href)}
            />
          </Tap>
          <Tap>
            <Link href={url} passHref>
              <IconButton
                as="a"
                variant="ghost"
                aria-label="Go to Vue SVG page"
                icon={<FiExternalLink size="16" />}
              />
            </Link>
          </Tap>
        </HStack>
      </Center>
    </Box>
  );
};

export default Index;
