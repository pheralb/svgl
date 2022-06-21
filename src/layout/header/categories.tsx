import React from "react";
import useSWR from "swr";
import { getCategorySvgs } from "@/services";
import CustomLink from "@/common/link";
import { Box, Text } from "@chakra-ui/react";

const Categories = () => {
  const { data, error } = useSWR(getCategorySvgs);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <>
      {data.map((category: string) => (
        <Box key={category} p="4" borderRadius="5px" borderWidth="1px">
          <CustomLink href={`/category/${category}`}>{category}</CustomLink>
        </Box>
      ))}
    </>
  );
};

export default Categories;
