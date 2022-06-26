import { useState } from "react";
import { Flex, Input, Text, Image } from "@chakra-ui/react";
import useSWR from "swr";
import useDebounce from "@/hooks/useDebounce";
import { SVGCardProps } from "@/interfaces/components";
import CustomLink from "@/common/link";
import Error from "@/components/error";
import { getSvgByQuery } from "@/services";
import CustomIconBtn from "@/common/iconBtn";
import { Trash } from "phosphor-react";

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
        <Flex direction="column" mt={2} p="2" overflowY="hidden">
          {data.map((item: SVGCardProps) => (
            <CustomLink key={item.title} href={`/svg/${item.id}`}>
              <Flex
                direction="row"
                mb="2"
                shadow="sm"
                p="3"
                borderWidth="1px"
                borderRadius="5px"
              >
                <Image width="20px" mr="2" src={item.href} alt={item.title} />
                <Text>{item.title}</Text>
              </Flex>
            </CustomLink>
          ))}
          <CustomIconBtn
            title="clear"
            icon={<Trash size={16} />}
            onClick={handleClear}
          />
        </Flex>
      )}
    </>
  );
};

export default Search;
