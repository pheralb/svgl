import { chakra, Box, Container, Text } from "@chakra-ui/react";
import Search from "components/search";
import Items from "components/items/all";
import Show from "animations/show";

export default function Index() {
  return (
    <>
      <Box mt="10">
        <Box w="full" border="solid 1px transparent">
          <Box textAlign="center">
            <Show delay="0">
              <chakra.h1
                fontSize={{ base: "30px", sm: "35px", md: "6xl" }}
                letterSpacing="tight"
                lineHeight="short"
                fontWeight="extrabold"
                mb={{ base: 4, md: 8 }}
              >
                Beautiful SVG vector logos
              </chakra.h1>
            </Show>
            <Search />
          </Box>
          <Box mt={{ base: 4, md: 8 }}>
            <Items />
          </Box>
        </Box>
      </Box>
    </>
  );
}
