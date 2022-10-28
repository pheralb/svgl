import React, {CSSProperties} from "react";
import { SVGCardProps } from "@/interfaces/components";
import {
  Box,
  Center,
  Image,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Tap from "@/animations/tap";
import CustomLink from "@/common/link";
import { Smiley } from "phosphor-react";

const shortHiddenTextCss = (text: string) => {
  const styleValue : CSSProperties = {
    whiteSpace : "nowrap",
    overflow : "hidden",
    textOverflow : "ellipsis",
    maxWidth : "100%"
  };
  if (text.length <= 15) return {};
  return styleValue;
}


const SVGCard = (props: SVGCardProps) => {
  const bg = useColorModeValue("bg.light", "bg.dark");
  const color = useColorModeValue("rgb(0,0,0, .1)", "rgb(255,255,255, .1)");
  return (
    <>
      <Tap>
        <CustomLink href={`/svg/${props.id}`}>
          <Box
            bg={bg}
            p={4}
            cursor="pointer"
            borderRadius="10px"
            borderWidth="1px"
            mb="2"
            _hover={{
              border:`1px solid ${color}`,
              transform: "scale(1.03)",
            }}
            transition="all 0.2s" >
            <Center>
              <Image height="40px" src={props.svg} alt={props.title} />
            </Center>
            <Text title={props.title} style={shortHiddenTextCss(props.title)} mt="3" fontWeight="light" textAlign="center">
              {props.title}
            </Text>
          </Box>
        </CustomLink>
      </Tap>
    </>
  );
};

export default SVGCard;
