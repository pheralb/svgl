import { Box, VStack, Icon, Text, Divider } from "@chakra-ui/react";
import React from "react";

const Design = ({ icon, title, children }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      _hover={{ shadow: "md", transition: "all .2s" }}
    >
      <Box p="6">
        <VStack spacing={3}>
          <Icon as={icon} w={16} h={16} />
          <Text fontSize="3xl" fontWeight="semibold">
            {title}
          </Text>
          <Divider />
          <Box fontSize="2xl">{children}</Box>
        </VStack>
      </Box>
    </Box>
  );
};

export default Design;
