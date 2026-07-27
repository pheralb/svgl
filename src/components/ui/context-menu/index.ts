import { ContextMenu as ContextMenuPrimitive } from "bits-ui";

import Trigger from "./context-menu-trigger.svelte";
import Group from "./context-menu-group.svelte";
import Item from "./context-menu-item.svelte";
import Content from "./context-menu-content.svelte";
import Shortcut from "./context-menu-shortcut.svelte";
import Separator from "./context-menu-separator.svelte";
import Label from "./context-menu-label.svelte";

const Sub = ContextMenuPrimitive.Sub;
const Root = ContextMenuPrimitive.Root;

export {
  Sub,
  Root,
  Item,
  Label,
  Group,
  Trigger,
  Content,
  Shortcut,
  Separator,
  //
  Root as ContextMenu,
  Sub as ContextMenuSub,
  Item as ContextMenuItem,
  Group as ContextMenuGroup,
  Content as ContextMenuContent,
  Trigger as ContextMenuTrigger,
  Shortcut as ContextMenuShortcut,
  Separator as ContextMenuSeparator,
  Label as ContextMenuLabel,
};
