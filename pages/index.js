import { chakra, Box } from "@chakra-ui/react";
import Search from "components/search";
import Grid from "components/grid";
import Card from "components/card";
import Icons from "data/icons";
import Show from "animations/show";

export default function Index() {
  return (
    <>
      <Box overflow="hidden">
        <Box mx="auto">
          <Box
            pos="relative"
            pb={{ base: 2, sm: 16, md: 20, lg: 28, xl: 32 }}
            w="full"
            border="solid 1px transparent"
          >
            <Box
              mt={{ base: "4", md: "8" }}
              mx="auto"
              maxW={{ base: "8xl" }}
              px={{ base: 4, sm: 6, lg: 8 }}
            >
              <Box
                textAlign="center"
                w={{ base: "full", md: 11 / 12, xl: 8 / 12 }}
                mx="auto"
              >
                <Show delay="0">
                  <chakra.h1
                    fontSize={{ base: "30px", sm: "5xl", md: "6xl" }}
                    letterSpacing="tight"
                    lineHeight="short"
                    fontWeight="extrabold"
                    mb={{ base: 4, md: 8 }}
                  >
                    Beautiful SVG vector icons
                  </chakra.h1>
                </Show>
                <Show delay="0.2">
                  <Search />
                </Show>
                <Show delay="0.4">
                  <Box mt={{ base: 4, md: 8 }}>
                    <Grid>
                      {Icons.map((link) => (
                        <>
                          <div key={link.id}>
                            <Card
                              title={link.title}
                              url={link.href}
                              icon={link.icon}
                            />
                          </div>
                        </>
                      ))}
                    </Grid>
                  </Box>
                </Show>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
