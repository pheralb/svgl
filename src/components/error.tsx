import { ErrorProps } from "@/interfaces/components";
import {
  Button,
  Center,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ArrowClockwise, ArrowSquareOut, Warning } from "phosphor-react";
import { useRouter } from "next/router";
import CustomLink from "@/common/link";

const Error = (props: ErrorProps) => {
  const router = useRouter();

  const handleRefresh = () => {
    router.reload();
  };

  return (
    <Center>
      <VStack>
        <Warning size={90} />
        <Heading fontSize="3xl">{props.title}</Heading>
        <Text>{props.description}</Text>
        <HStack>
          <Button
            variant="ghost"
            borderWidth="1px"
            leftIcon={<ArrowClockwise />}
            onClick={handleRefresh}
          >
            Refresh
          </Button>
          <CustomLink href="https://github.com/pheralb/svgl/issues/new" external={true}>
            <Button variant="ghost" rightIcon={<ArrowSquareOut />}>
              Create issue
            </Button>
          </CustomLink>
        </HStack>
      </VStack>
    </Center>
  );
};

export default Error;
