import React from "react";
import { SVGCardProps } from "@/interfaces/components";
import { Box, Flex, Image, useColorModeValue } from "@chakra-ui/react";

const SVGCard = (props: SVGCardProps) => {
  const bg = useColorModeValue("bg.light", "bg.dark");
  return (
    <Box bg={bg} shadow="sm" maxW="50%" borderWidth="2px" borderRadius="10px" p="5">
      <Flex direction="column" justifyContent="center" alignItems="center">
        <Image boxSize="50px" src={props.svg} alt={props.title} />
      </Flex>
    </Box>
  );
};

export default SVGCard;
