import BoxIcon from "@lucide/svelte/icons/box";
import HouseIcon from "@lucide/svelte/icons/house";
import CloudIcon from "@lucide/svelte/icons/cloud";
import HeartIcon from "@lucide/svelte/icons/heart";

export const sidebarLinks = [
  {
    title: "Home",
    href: "/",
    icon: HouseIcon,
  },
  {
    title: "Favorites",
    href: "/favorites",
    icon: HeartIcon,
  },
  {
    title: "API",
    href: "/api",
    icon: CloudIcon,
  },
  {
    title: "Extensions",
    href: "/extensions",
    icon: BoxIcon,
  },
];
