import Head from "next/head";
import {
  chakra,
  Box,
  useColorModeValue,
  Flex,
  Badge,
  Input,
  VisuallyHidden,
  SimpleGrid,
  Button,
  InputGroup,
  InputRightElement,
  Image,
  Container,
  Center,
  Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Error from "components/error";
import { IoArrowBackOutline, IoCloudDownloadOutline } from "react-icons/io5";
import Link from "next/link";
import Show from "animations/show";
import Loader from "animations/loader";
import Hover from "animations/hover";

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

  return (
    <>
      <Head>
        <title>{data.title} - iconr</title>
      </Head>
      <Show delay="0">
        <Container
          maxW={{ base: "100%", md: "100%", lg: "75%" }}
          borderWidth="1px"
          borderRadius="30px"
        >
          <SimpleGrid columns={{ base: 1, md: 1, lg: 2 }} spacing={0}>
            <Box py={{ base: "10", md: "24" }}>
              <Center>
                <Image
                  src={data.href}
                  alt={data.title}
                  w={{ base: "30%", md: "20%", lg: "50%" }}
                  fit="cover"
                  loading="lazy"
                />
              </Center>
            </Box>
            <Flex
              direction="column"
              alignItems="start"
              justifyContent="center"
              px={{ base: 4, lg: 20 }}
              py={{ base: "3", md: "0", lg: "24" }}
            >
              <chakra.h1
                mb={6}
                fontSize={{ base: "4xl", md: "4xl", lg: "5xl" }}
                fontWeight="semibold"
                lineHeight="shorter"
              >
                {data.title}
              </chakra.h1>
              <Hover>
                <Link href={`/category/${data.category}`} passHref>
                  <Badge
                    borderWidth="1px"
                    _hover={{ borderColor: "#51d1c8" }}
                    textTransform="lowercase"
                    fontSize="md"
                    color="gray.500"
                    bg="transparent"
                    px={3}
                    py={1}
                    mb={3}
                    rounded="full"
                    fontWeight="light"
                    cursor="pointer"
                  >
                    {data.category}
                  </Badge>
                </Link>
              </Hover>
              <Stack direction="row" spacing={0} mt="2">
                <Hover>
                  <Link href={data.href} passHref>
                    <Button
                      leftIcon={<IoCloudDownloadOutline />}
                      colorScheme="black"
                      variant="outline"
                      bg="transparent"
                      fontWeight="light"
                      mr="2"
                    >
                      Download .svg
                    </Button>
                  </Link>
                </Hover>
                <Link href={data.url} passHref>
                  <Button
                    colorScheme="teal"
                    variant="outline"
                    fontWeight="light"
                    borderWidth="1px"
                  >
                    {data.title} website
                  </Button>
                </Link>
              </Stack>
            </Flex>
          </SimpleGrid>
          <Link href="/" passHref>
            <Button
              leftIcon={<IoArrowBackOutline />}
              colorScheme="twitter"
              variant="outline"
              fontWeight="bold"
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
