import React from "react";
import { CustomIconBtnProps } from "@/interfaces/components";
import { IconButton } from "@chakra-ui/react";

const CustomIconBtn = (props: CustomIconBtnProps) => {
  return (
    <IconButton
      variant="ghost"
      aria-label={props.title}
      icon={props.icon}
      onClick={props.onClick}
      mr={props.mr}
      ml={props.ml}
    />
  );
};

export default CustomIconBtn;
