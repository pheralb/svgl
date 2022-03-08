import Head from "next/head";
import {
  chakra,
  Box,
  Flex,
  SimpleGrid,
  Button,
  Image,
  Container,
  Center,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Error from "components/error";
import { IoArrowBackOutline, IoCloudDownloadOutline } from "react-icons/io5";
import { BiLinkExternal } from "react-icons/bi";
import Link from "next/link";
import Show from "animations/show";
import Loader from "animations/loader";
import confetti from "canvas-confetti";
import download from "downloadjs";

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

export default function Icon() {
  const { query } = useRouter();
  const { data, error } = useSWR(
    () => query.id && `/api/search?id=${query.id}`,
    fetcher
  );

  if (error) return <Error />;
  if (!data) return <Loader />;

  const downloadSvg = (url) => {
    confetti({
      particleCount: 200,
      startVelocity: 30,
      spread: 300,
      gravity: 1.2,
      origin: { y: 0 },
    });
    download(url);
  };

  return (
    <>
      <Head>
        <title>{data.title} - SVGL</title>
      </Head>
      <Show delay="0">
        <Container maxW="100%" borderWidth="1px" borderRadius="30px">
          <SimpleGrid columns={{ base: 1, md: 1, lg: 2 }} spacing={0}>
            <Box py={{ base: "10", md: "24" }}>
              <Center>
                <Image
                  src={data.href}
                  alt={data.title}
                  w={{ base: "30%", md: "20%", lg: "30%" }}
                  fit="cover"
                  loading="lazy"
                />
              </Center>
            </Box>
            <Flex
              direction="column"
              alignItems="start"
              justifyContent="center"
              px={{ base: 4, lg: 4 }}
              py={{ base: "3", md: "0", lg: "10" }}
            >
              <chakra.h1
                mb={3}
                fontSize={{ base: "4xl", md: "4xl", lg: "5xl" }}
                fontWeight="semibold"
                lineHeight="shorter"
              >
                {data.title}
              </chakra.h1>
              <Flex direction={{ base: "column", md: "row" }} w="100%" mt="2">
                <Button
                  w={{ base: "100%", md: "auto" }}
                  mb={{ base: "2", md: "0" }}
                  leftIcon={<IoCloudDownloadOutline />}
                  variant="primary"
                  fontWeight="light"
                  mr="2"
                  onClick={() => downloadSvg(data.href)}
                >
                  Download .svg
                </Button>
                <Link href={data.url} passHref>
                  <Button
                    w={{ base: "100%", md: "auto" }}
                    fontWeight="light"
                    borderWidth="1px"
                    rightIcon={<BiLinkExternal />}
                  >
                    {data.title} website
                  </Button>
                </Link>
              </Flex>
            </Flex>
          </SimpleGrid>
          <Link href="/" passHref>
            <Button
              leftIcon={<IoArrowBackOutline />}
              variant="outline"
              fontWeight="light"
              w="100%"
              border="0"
              mt="4"
              mb="4"
            >
              Continue discovering
            </Button>
          </Link>
        </Container>
      </Show>
    </>
  );
}
