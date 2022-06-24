import React from "react";
import {
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
} from "@chakra-ui/react";
import { ArrowSquareOut, Copy, DownloadSimple } from "phosphor-react";
import confetti from "canvas-confetti";
import download from "downloadjs";
import { toast } from "react-hot-toast";
import { ToastTheme } from "@/theme/toast";
import { SVGCardProps } from "@/interfaces/components";

// Download SVG =>
const downloadSvg = (url?: string) => {
  confetti({
    particleCount: 200,
    startVelocity: 30,
    spread: 300,
    gravity: 1.2,
    origin: { y: 0 },
  });
  download(url || "");
};

// Copy to clipboard =>
const copyToClipboard = (url?: string) => {
  fetch(url || "").then((response) => {
    response.text().then((content) => {
      navigator.clipboard.writeText(content);
      toast("Copied to clipboard", ToastTheme);
    });
  });
};

const SVGInfo = (props: SVGCardProps) => {
  return (
    <Flex
      pt="7"
      pb="7"
      direction="column"
      align="center"
      justify="center"
      borderWidth="1px"
      borderRadius="10px"
    >
      <Image
        src={props.href}
        alt={props.title}
        fit="cover"
        loading="lazy"
        width="85px"
      />
      <Heading mt={6} mb={6} fontSize="4xl">
        {props.title}
      </Heading>
      <HStack spacing={4}>
        <Button
          variant="ghost"
          borderWidth="1px"
          leftIcon={<Copy />}
          onClick={() => copyToClipboard(props.href)}
        >
          Copy to clipboard
        </Button>
        <Button
          mb={{ base: "2", md: "0" }}
          leftIcon={<DownloadSimple />}
          variant="primary"
          mr="2"
          onClick={() => downloadSvg(props.href)}
        >
          Download .svg
        </Button>
        <Link href={props.url} isExternal={true}>
          {props.title} website <Icon as={ArrowSquareOut} ml="1" />
        </Link>
      </HStack>
    </Flex>
  );
};

export default SVGInfo;
