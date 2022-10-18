import { useEffect, useRef, useState } from "react";
import {
  Input,
  Text,
  Image,
  HStack,
  Box,
  Center,
  Spinner,
} from "@chakra-ui/react";
import useDebounce from "@/hooks/useDebounce";
import { SearchProps, SVGCardProps } from "@/interfaces/components";
import CustomLink from "@/common/link";
import { getSvgByQuery } from "@/services";
import CustomIconBtn from "@/common/iconBtn";
import { Trash } from "phosphor-react";
import Tap from "@/animations/tap";

const Search = ({ availableFocus = false }: SearchProps) => {
  const [search, setSearch] = useState("");
  const [empty, setEmpty] = useState(false);
  const [results, setResults] = useState<SVGCardProps[]>([]);
  const debouncedSearch = useDebounce(search, 500);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (debouncedSearch) {
      fetch(getSvgByQuery + debouncedSearch).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setEmpty(data.length === 0);
            setResults(data);
          });
        }
      });
    }
  }, [debouncedSearch]);

  useEffect(() => {
    const isFocusAvailable = availableFocus && searchRef.current;

    if (!isFocusAvailable) return;

    const timeoutId = setTimeout(() => {
      searchRef.current?.focus();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [availableFocus]);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmpty(false);
    setSearch(e.target.value);
  };

  const handleClear = () => {
    setSearch("");
    setResults([]);
  };

  return (
    <>
      <Input
        width="full"
        variant="flushed"
        size="lg"
        placeholder="Search svgs..."
        value={search}
        onChange={handleFilter}
        ref={searchRef}
      />
      {search && !empty && results.length === 0 && (
        <Box pt="4">
          <Spinner />
        </Box>
      )}
      {search && empty && <Box pt="3">No results found!</Box>}
      {results && results.length > 0 && (
        <>
          <HStack
            spacing={4}
            mt={4}
            overflowX="auto"
            overflowY="hidden"
            alignItems="start"
          >
            {results.map((item: SVGCardProps) => (
              <Tap key={item.title}>
                <CustomLink href={`/svg/${item.id}`}>
                  <Box
                    mb="2"
                    p="3"
                    shadow="sm"
                    borderWidth="1px"
                    borderRadius="5px"
                    width="100%"
                  >
                    <Center>
                      <Image
                        width="25px"
                        mb="2"
                        src={item.slug}
                        alt={item.title}
                      />
                    </Center>
                    <Text>{item.title}</Text>
                  </Box>
                </CustomLink>
              </Tap>
            ))}
          </HStack>
          <Box p="3">
            <CustomIconBtn
              title="clear"
              icon={<Trash size={16} />}
              onClick={handleClear}
            />
          </Box>
        </>
      )}
    </>
  );
};

export default Search;
