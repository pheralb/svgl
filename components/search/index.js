import { useMemo, useRef, useState } from "react";
import { createAutocomplete } from "@algolia/autocomplete-core";
import {
  Box,
  Input,
  InputLeftElement,
  InputGroup,
  Flex,
  HStack,
  Text,
  Image,
  Icon,
  Link,
} from "@chakra-ui/react";
import { IoSearch } from "react-icons/io5";
import { FiExternalLink } from "react-icons/fi";
import { Algolia } from "components/svg";
import NextLink from "next/link";

const AutocompleteItem = ({ id, title, href, url }) => {
  return (
    <>
      <NextLink href={`/svg/${id}`} passHref>
        <Link
          href={`/svg/${id}`}
          style={{ textDecoration: "none" }}
          _focus={{ outline: "0" }}
        >
          <Box
            id={id}
            w="100%"
            borderWidth="1px"
            borderRadius="6px"
            mt="3"
            cursor="pointer"
            _hover={{ shadow: "md" }}
            transition="all 0.2s"
          >
            <HStack py={6} px={6} spacing={2}>
              <Image src={href} alt={title} boxSize="20px" mr="2" />
              <Text fontSize="18px" fontWeight="light">
                {title}
              </Text>
              <Icon as={FiExternalLink} />
            </HStack>
          </Box>
        </Link>
      </NextLink>
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
        placeholder: "Search svgs...",
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
            autoFocus
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
