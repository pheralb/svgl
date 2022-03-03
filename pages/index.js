import { chakra, Box, Container, Text, Flex, Icon } from "@chakra-ui/react";
import Search from "components/search";
import Items from "components/items/all";
import Show from "animations/show";
import { rocket } from "components/svg";

export default function Index() {
  return (
    <>
      <Box mt="6">
        <Box w="full" border="solid 1px transparent">
          <chakra.h1
            fontSize={{ base: "25px", sm: "35px", md: "6xl" }}
            textAlign="center"
            letterSpacing="tight"
            lineHeight="short"
            fontWeight="extrabold"
            mb="3"
          >
            Beautiful SVG vector logos
          </chakra.h1>
          <Search />
          <Box mt={{ base: 4, md: 8 }}>
            <Items />
          </Box>
        </Box>
      </Box>
    </>
  );
}
