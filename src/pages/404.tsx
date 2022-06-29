import CustomLink from "@/common/link";
import { Flex, Center, Heading, Text, Button } from "@chakra-ui/react";
import { House } from "phosphor-react";

const Error = () => {
  return (
    <>
      <Center>
        <Flex direction="column" justifyContent="center" alignItems="center">
          <Heading mb="2">Error 404</Heading>
          <Text mb="3">The page you are trying to access does not exist.</Text>
          <CustomLink href="/">
              <Text fontFamily="Inter-Semibold">Go home</Text>
          </CustomLink>
        </Flex>
      </Center>
    </>
  );
};

export default Error;
