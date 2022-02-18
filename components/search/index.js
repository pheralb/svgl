import { useMemo, useRef, useState } from "react";
import { createAutocomplete } from "@algolia/autocomplete-core";
import Link from "next/link";
import {
  chakra,
  Box,
  Input,
  InputLeftElement,
  InputGroup,
  Image,
  Center,
  Button,
  Flex,
} from "@chakra-ui/react";
import { IoCloudDownloadOutline, IoLink, IoSearch } from "react-icons/io5";
import { Algolia } from "components/svg";

const AutocompleteItem = ({ id, title, href, url }) => {
  return (
    <>
      <Box
        w="100%"
        id={id}
        borderWidth="1px"
        borderRadius="10px"
        roundedTop={3}
        mt="3"
      >
        <Box py={12} px={6}>
          <Center>
            <Image src={href} alt={title} boxSize="60px" mb="3" />
          </Center>
          <chakra.h2 fontSize={{ base: "2xl", md: "2xl" }} fontWeight="bold">
            {title}
          </chakra.h2>
          <Box mt="3">
            <Link href={href} passHref>
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
            <Link href={url} passHref>
              <Button
                rightIcon={<IoLink />}
                colorScheme="teal"
                variant="outline"
                border="0"
              >
                {title} website
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default function Search(props) {
  const [autocompleteState, setAutocompleteState] = useState({
    collections: [],
  });

  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        placeholder: "Search icons...",
        onStateChange: ({ state }) => setAutocompleteState(state),
        getSources: () => [
          {
            sourceId: "svgs-next-api",
            getItems: ({ query }) => {
              if (!!query) {
                return fetch(`/api/search?q=${query}`).then((res) =>
                  res.json()
                );
              }
            },
          },
        ],
        ...props,
      }),
    [props]
  );

  const formRef = useRef(null);
  const inputRef = useRef(null);

  const formProps = autocomplete.getFormProps({
    inputElement: inputRef.current,
  });
  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current,
  });

  return (
    <form ref={formRef} {...formProps}>
      <Flex>
        <InputGroup w="full">
          <InputLeftElement pointerEvents="none" mt="1">
            <IoSearch size="20" />
          </InputLeftElement>
          <Input
            w="100%"
            shadow="none"
            size="lg"
            type="tel"
            placeholder="Search icons..."
            _focus={{ shadow: "md" }}
            ref={inputRef}
            {...inputProps}
          />
        </InputGroup>
        <Box mt="4" ml="3" mr="2" cursor="pointer">
          <Link href="https://www.algolia.com/" passHref>
            <Algolia width="70px" />
          </Link>
        </Box>
      </Flex>
      <>
        {autocompleteState.collections.map((collection, index) => {
          const { items } = collection;
          return (
            <div key={`${index}`}>
              {items.length > 0 && (
                <ul {...autocomplete.getListProps()}>
                  {items.map((item) => (
                    <AutocompleteItem key={item.id} {...item} />
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </>
    </form>
  );
}
