import React from "react";
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

const SVGCard = (props: SVGCardProps) => {
  const bg = useColorModeValue("bg.light", "bg.dark");
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
              shadow: "md",
            }}
            transition="all 0.2s"
          >
            <Center>
              <Image boxSize="50px" src={props.svg} alt={props.title} />
            </Center>
            <Text mt="2" fontWeight="light" textAlign="center">
              {props.title}
            </Text>
          </Box>
        </CustomLink>
      </Tap>
    </>
  );
};

export default SVGCard;
