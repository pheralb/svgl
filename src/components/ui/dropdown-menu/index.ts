import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

import Item from "./dropdown-menu-item.svelte";
import Label from "./dropdown-menu-label.svelte";
import Group from "./dropdown-menu-group.svelte";
import Trigger from "./dropdown-menu-trigger.svelte";
import Content from "./dropdown-menu-content.svelte";
import Shortcut from "./dropdown-menu-shortcut.svelte";
import Separator from "./dropdown-menu-separator.svelte";

const Sub = DropdownMenuPrimitive.Sub;
const Root = DropdownMenuPrimitive.Root;

export {
  Content,
  Root as DropdownMenu,
  Content as DropdownMenuContent,
  Group as DropdownMenuGroup,
  Item as DropdownMenuItem,
  Separator as DropdownMenuSeparator,
  Shortcut as DropdownMenuShortcut,
  Label as DropdownMenuLabel,
  Sub as DropdownMenuSub,
  Trigger as DropdownMenuTrigger,
  Group,
  Item,
  Root,
  Separator,
  Shortcut,
  Sub,
  Trigger,
  Label,
};
