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


const MIMETYPE = 'text/plain';

// Return content of svg as blob =>
const getSvgContent = async (url: string | undefined, isSupported: boolean) => {
  const response =  await fetch(url || "");
  const content = await response.text(); 

  // It was necessary to use blob because in chrome there were issues with the copy to clipboard
  const blob = new Blob([content], { type: MIMETYPE });
  return isSupported ? blob : content;
}

// Copy to clipboard =>
const copyToClipboard = async (url?: string) => {
  const data = {
    [MIMETYPE]: getSvgContent(url, true)
  };
  try {
    const clipboardItem = new ClipboardItem(data);
    await navigator.clipboard.write([clipboardItem]);
  } catch (error) {
    // This section works as a fallback on Firefox
    const content = await getSvgContent(url, false) as string;
    await navigator.clipboard.writeText(content);
  }
  toast("Copied to clipboard", ToastTheme);
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
        src={props.slug}
        alt={props.title}
        fit="cover"
        loading="lazy"
        width="85px"
      />
      <Heading mt={6} mb={6} fontSize="4xl">
        {props.title}
      </Heading>
      <Flex direction={{ base: "column", md: "row" }}>
        <Button
          variant="ghost"
          borderWidth="1px"
          leftIcon={<Copy />}
          onClick={() => copyToClipboard(props.slug)}
          mb={{ base: "2", md: "0" }}
          mr={{ base: "0", md: "3" }}
        >
          Copy to clipboard
        </Button>
        <Button
          leftIcon={<DownloadSimple />}
          variant="primary"
          onClick={() => downloadSvg(props.slug)}
          mb={{ base: "2", md: "0" }}
          mr={{ base: "0", md: "3" }}
        >
          Download .svg
        </Button>
        <Link href={props.url} isExternal={true}>
          {props.title} website <Icon as={ArrowSquareOut} mt="2" />
        </Link>
      </Flex>
    </Flex>
  );
};

export default SVGInfo;
