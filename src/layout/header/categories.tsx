import React from "react";
import useSWR from "swr";
import { getCategorySvgs } from "@/services";
import CustomLink from "@/common/link";
import { Box } from "@chakra-ui/react";
import { RaceBy } from "@uiball/loaders";

const Categories = () => {
  const { data, error } = useSWR(getCategorySvgs);

  if (error) return <div>failed to load</div>;
  if (!data)
    return <RaceBy size={52} lineWeight={3} speed={1.4} color="#4343E5" />;

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
