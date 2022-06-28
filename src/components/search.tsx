import { useEffect, useState } from "react";
import { Input, Text, Image, HStack, Box, Center } from "@chakra-ui/react";
import useDebounce from "@/hooks/useDebounce";
import { SVGCardProps } from "@/interfaces/components";
import CustomLink from "@/common/link";
import { getSvgByQuery } from "@/services";
import CustomIconBtn from "@/common/iconBtn";
import { Trash } from "phosphor-react";
import Tap from "@/animations/tap";

const Search = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<SVGCardProps[]>([]);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      fetch(getSvgByQuery + debouncedSearch).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setResults(data);
          });
        }
      });
    }
  }, [debouncedSearch]);

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
        onChange={(e) => setSearch(e.target.value)}
      />
      {results && results.length > 0 && (
        <>
          <HStack spacing={4} mt={4} overflowX="auto" overflowY="hidden">
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
