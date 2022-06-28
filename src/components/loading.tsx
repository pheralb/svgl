import { LoadingProps } from "@/interfaces/components";
import { Center, Spinner, Text, VStack } from "@chakra-ui/react";
import { LeapFrog } from "@uiball/loaders";

const Loading = (props: LoadingProps) => {
  return (
    <Center>
      <VStack spacing={3} mt="3">
        <LeapFrog size={32} speed={2.5} color="#4343E5" />
        <Text>{props.text}</Text>
      </VStack>
    </Center>
  );
};

export default Loading;
