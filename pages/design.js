import React from "react";
import Head from "next/head";
import download from "downloadjs";
import { Box, Button, Flex, HStack, Link, Text } from "@chakra-ui/react";
import Show from "animations/show";
import Grid from "components/grid";
import DesignCard from "components/card/design";
import { RiFontSize, RiPaletteLine } from "react-icons/ri";
import { IoMdImages } from "react-icons/io";
import { HiOutlineExternalLink } from "react-icons/hi";
import { IoCloudDownloadOutline } from "react-icons/io5";
import CardImage from "components/card/image";

const Design = () => {
  const downloadSvg = (url) => {
    download(url);
  };

  return (
    <>
      <Head>
        <title>Design - SVGL</title>
      </Head>
      <Box mt="6">
        <Box w="full" border="solid 1px transparent">
          <Show>
            <Text
              as="h1"
              fontSize={{ base: "25px", sm: "35px", md: "5xl", lg: "6xl" }}
              letterSpacing="tight"
              lineHeight="short"
              fontWeight="extrabold"
              mb="3"
            >
              Design
            </Text>
          </Show>
          <Show delay={0.3}>
            <Box mt={{ base: 4, md: 5 }}>
              <Grid>
                <DesignCard title="Fonts" icon={RiFontSize}>
                  <HStack spacing={2}>
                    <Link
                      href="https://fonts.google.com/specimen/Poppins"
                      isExternal
                    >
                      Poppins
                    </Link>
                    <HiOutlineExternalLink size="20px" />
                  </HStack>
                </DesignCard>
                <DesignCard title="Colors" icon={RiPaletteLine}>
                  <Flex color="white">
                    <Box bg="lightDark.900" p="2">
                      <Text fontSize="15px">#16161a</Text>
                    </Box>
                    <Box bg="light.100" p="2">
                      <Text fontSize="15px" color="black">
                        #f9f9f9
                      </Text>
                    </Box>
                    <Box bg="#6748E6" p="2">
                      <Text fontSize="15px" color="white">
                        #6748E6
                      </Text>
                    </Box>
                  </Flex>
                </DesignCard>
              </Grid>
              <Box mt="4">
                <DesignCard title="Images" icon={IoMdImages}>
                  <HStack spacing={3}>
                    <CardImage title="Banner" image="/images/banner.png">
                      <Button
                        w={{ base: "100%", md: "auto" }}
                        leftIcon={<IoCloudDownloadOutline />}
                        variant="primary"
                        fontWeight="light"
                        mt="2"
                        onClick={() =>
                          downloadSvg(
                            "https://svgl.vercel.app/images/banner.png"
                          )
                        }
                      >
                        Download
                      </Button>
                    </CardImage>
                    <CardImage title="Logo" image="/images/logo.png">
                      <Button
                        w={{ base: "100%", md: "auto" }}
                        leftIcon={<IoCloudDownloadOutline />}
                        variant="primary"
                        fontWeight="light"
                        mt="2"
                        onClick={() =>
                          downloadSvg(
                            "https://svgl.vercel.app/images/logo.png"
                          )
                        }
                      >
                        Download
                      </Button>
                    </CardImage>
                  </HStack>
                </DesignCard>
              </Box>
            </Box>
          </Show>
        </Box>
      </Box>
    </>
  );
};

export default Design;
