import { chakra, Box } from "@chakra-ui/react";
import Search from "components/search";
import Items from "components/items/all";
import Loader from "animations/loader";

export default function Index() {
  return (
    <>
      <Box mt="6">
        <Box w="full" border="solid 1px transparent">
          <Search />
          <Box mt={{ base: 4, md: 8 }}>
            <Items />
          </Box>
        </Box>
      </Box>
    </>
  );
}
