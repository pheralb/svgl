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
        <CustomLink 
          key={category}
          href={`/category/${category}`}>
          <Box
            p={4}
            borderRadius="4px"
            borderWidth="1px"
            _hover={{
              border:"1px solid rgb(0,0,0, .1)",
              transform: "scale(0.98)",
            }}>
          {category}
          </Box>
        </CustomLink>
      ))}
    </>
  );
};

export default Categories;
