import { LoadingProps } from "@/interfaces/components";
import { Center, Spinner, Text, VStack } from "@chakra-ui/react";

const Loading = (props: LoadingProps) => {
  return (
    <Center>
      <VStack spacing={3}>
        <Spinner color="brand.purple" />
        <Text>{props.text}</Text>
      </VStack>
    </Center>
  );
};

export default Loading;
