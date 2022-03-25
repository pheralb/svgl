import { IoHomeOutline, IoLogoGithub } from 'react-icons/io5';
import { FiTwitter } from 'react-icons/fi';

const SidebarLinks = [
  {
    id: 1,
    href: "/",
    external: false,
    title: "Browse",
    icon: IoHomeOutline,
  },
  {
    id: 2,
    href: "https://github.com/pheralb/svgl/",
    external: true,
    title: "Github",
    icon: IoLogoGithub,
  },
  {
    id: 3,
    href: "https://twitter.com/pheralb_",
    external: true,
    title: "Twitter",
    icon: FiTwitter,
  }
];

export default SidebarLinks;
