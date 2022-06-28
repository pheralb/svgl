import { useState } from "react";
import { Input, Text, Image, HStack, Box, Center } from "@chakra-ui/react";
import useSWR from "swr";
import useDebounce from "@/hooks/useDebounce";
import { SVGCardProps } from "@/interfaces/components";
import CustomLink from "@/common/link";
import Error from "@/components/error";
import { getSvgByQuery } from "@/services";
import CustomIconBtn from "@/common/iconBtn";
import { Trash } from "phosphor-react";
import Tap from "@/animations/tap";

const Search = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const { data, error } = useSWR(`${getSvgByQuery}${debouncedSearch}`);

  if (error) {
    <Error title="Error" description="an error occurred with your search" />;
  }

  const handleClear = () => {
    setSearch("");
  };

  return (
    <>
      <Input
        width="full"
        variant="flushed"
        size="lg"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {data && data.length > 0 && (
        <>
          <HStack spacing={4} mt={4} overflowY="hidden">
            {data.map((item: SVGCardProps) => (
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
          <CustomIconBtn
            title="clear"
            icon={<Trash size={16} />}
            onClick={handleClear}
          />
        </>
      )}
    </>
  );
};

export default Search;
