import React from "react";
import CustomIconBtn from "@/common/iconBtn";
import CustomLink from "@/common/link";
import { IoLogoGithub, IoLogoTwitter } from "react-icons/io5";

const Socials = () => {
  return (
    <>
      <CustomLink href="https://github.com/pheralb/svgl" external={true}>
        <CustomIconBtn title="Github" icon={<IoLogoGithub size={20} />} />
      </CustomLink>
      <CustomLink href="https://twitter.com/pheralb_" external={true}>
        <CustomIconBtn title="Twitter" icon={<IoLogoTwitter size={20} />} />
      </CustomLink>
    </>
  );
};

export default Socials;
