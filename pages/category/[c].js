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
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Error from "components/error";
import Grid from "components/grid";
import Card from "components/card";
import { IoArrowBackOutline } from "react-icons/io5";
import Link from "next/link";
import Show from "animations/show";
import Loader from "animations/loader";

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
    () => query.c && `/api/search?c=${query.c}`,
    fetcher
  );

  if (error) return <Error />;
  if (!data) return <Loader />;

  return (
    <>
      <Head>
        <title>{query.c} icons - iconr</title>
      </Head>
      <Show delay="0">
        <Box w="100%" borderBottomWidth="1px" p="4" mb="3" textAlign="center">
          <Text fontSize="5xl" pt="5">
            {query.c} icons
          </Text>
          <Link href="/" passHref>
            <Button
              leftIcon={<IoArrowBackOutline />}
              colorScheme="twitter"
              variant="outline"
              fontWeight="bold"
              border="0"
              mt="4"
              mb="4"
            >
              Continue discovering
            </Button>
          </Link>
        </Box>
      </Show>
      <Show delay="0.2">
        <Container maxW={{ base: "100%", md: "90%" }}>
          <Grid>
            {data.map((link) => (
              <>
                <div key={link.id}>
                  <Card
                    title={link.title}
                    url={`/icon/${link.id}`}
                    href={link.href}
                  />
                </div>
              </>
            ))}
          </Grid>
        </Container>
      </Show>
    </>
  );
}
