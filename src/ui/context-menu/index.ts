import { ContextMenu as ContextMenuPrimitive } from 'bits-ui';

import Item from './context-menu-item.svelte';
import Label from './context-menu-label.svelte';
import Content from './context-menu-content.svelte';
import CheckboxItem from './context-menu-checkbox-item.svelte';

const Sub = ContextMenuPrimitive.Sub;
const Root = ContextMenuPrimitive.Root;
const Trigger = ContextMenuPrimitive.Trigger;
const Group = ContextMenuPrimitive.Group;

export {
  Sub,
  Root,
  Item,
  Label,
  Group,
  Trigger,
  Content,
  CheckboxItem,
  //
  Root as ContextMenu,
  Sub as ContextMenuSub,
  Item as ContextMenuItem,
  Label as ContextMenuLabel,
  Group as ContextMenuGroup,
  Content as ContextMenuContent,
  Trigger as ContextMenuTrigger,
  CheckboxItem as ContextMenuCheckboxItem
};
