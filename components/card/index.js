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
  const toastBg = useColorModeValue("#F2F2F2", "#1D1D1D");
  const toastColor = useColorModeValue("black", "white");
  const bgImage = useColorModeValue("transparent", "#E9E9E9");
  const borderRds = useColorModeValue("0", "15px");

  const downloadSvg = (url) => {
    toast(`Downloading ${title}...`, {
      icon: "🥳",
      style: {
        borderRadius: "10px",
        background: toastBg,
        color: toastColor,
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
      transition="all 0.2s"
    >
      <Center>
        <Image
          src={href}
          alt={title}
          boxSize="45px"
          bg={bgImage}
          borderRadius={borderRds}
          p="1"
        />
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
