import { chakra, Box } from "@chakra-ui/react";
import Search from "components/search";
import Items from "components/items/all";
import Loader from "animations/loader";

export default function Index() {
  return (
    <>
      <Box mt="6">
        <Box w="full" border="solid 1px transparent">
          <chakra.h1
            fontSize={{ base: "25px", sm: "35px", md: "5xl", lg: "6xl" }}
            letterSpacing="tight"
            textAlign="center"
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
