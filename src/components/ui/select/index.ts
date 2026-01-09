import { Select as SelectPrimitive } from "bits-ui";

import Group from "./select-group.svelte";
import Label from "./select-label.svelte";
import Item from "./select-item.svelte";
import Content from "./select-content.svelte";
import Trigger from "./select-trigger.svelte";

const Root = SelectPrimitive.Root;

export {
  Root,
  Group,
  Label,
  Item,
  Content,
  Trigger,
  //
  Root as Select,
  Group as SelectGroup,
  Label as SelectLabel,
  Item as SelectItem,
  Content as SelectContent,
  Trigger as SelectTrigger,
};
